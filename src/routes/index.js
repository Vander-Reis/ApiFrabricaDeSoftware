const { Router } = require('express');

const usersRouter = require('./users.routes');
const subjectsRouter = require('./subjects.routes');
const routes = Router();

routes.use("/users", usersRouter);
routes.use("/subjects", subjectsRouter);

module.exports = routes;