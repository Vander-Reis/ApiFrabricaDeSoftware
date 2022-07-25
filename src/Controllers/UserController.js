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

}

module.exports = UserController;