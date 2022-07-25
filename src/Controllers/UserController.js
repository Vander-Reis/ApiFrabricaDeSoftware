const { hash } = require("bcryptjs");

const AppError = require("../utils/AppError.js");

// Conection db

const sqliteConnection = require("../database/sqlite");

class UserController {

   async create(request, response) {

    const { name, email,isAdmin = 0, password, school } = request.body;

    const database = await sqliteConnection();
    
    // verificar se o user já existe 
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(checkUserExists) {
        throw new AppError("Este e-mail já está em uso.");
    }

    // criptografia de senha
    const hashPassword = await hash(password, 8);

    // cadastra o user no banco 
    await database.run("INSERT INTO users (name, email, isAdmin, password, school) VALUES (?, ?, ?, ?, ?);",
    [name, email, isAdmin, hashPassword, school]);

    return response.status(201).json();

   }

   async update(request, response) {

    const { name, email, password, oldPassword } = request.body;
    const { id } = request.params; 

    // conexão com o banco

    const database = await sqliteConnection();

    // verificar se o usuario existe

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if(!user) {
        throw new AppError("Usuário não encontrado");
    }

    // verifica se o e-mail informado já está em uso
    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)",[email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError("Esté e-mail já está em uso.");
    }



    
   }

}

module.exports = UserController;