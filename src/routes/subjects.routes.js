const { Router } = require("express");

const SubjectsController = require("../Controllers/SubjectsController");

const subjectsRouter = Router();

const subjectsController = new SubjectsController();

subjectsRouter.post("/:user_id", subjectsController.create);
subjectsRouter.get("/", subjectsController.show);

module.exports = subjectsRouter;