const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class SubjectsController {

    async create(request, response) {
        const { name, description } = request.body;
        const { user_id } = request.params;

        const user = await knex("users").select("*")
        .where("id", user_id)
        .where("isAdmin", 1);
        
        const isAdmin = user.map(e => {
            return e.isAdmin;
        })

        if(isAdmin != 1) {
            throw new AppError("Você não é admim.");
        }

        const subjects_id = await knex("createSubjects").insert({
            name,
            description
        });

        response.status(201).json({
            subjects_id
        });
    }

    async show(request, response) {

        let subjects = await knex("createSubjects");

        return response.json({
            subjects
        })
    }

}

module.exports = SubjectsController;