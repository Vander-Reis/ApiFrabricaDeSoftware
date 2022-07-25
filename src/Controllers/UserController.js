class UserController {

   async create(request, response) {

    const { name, email, password, school } = request.body;

    return response.status(201).json({
        name, 
        email, 
        password,
        school
    })

   }

}

module.exports = UserController;