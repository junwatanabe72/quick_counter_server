import express from "express";
import usersController from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.post("/", usersController.create);
usersRouter.get("/", usersController.index);
usersRouter.patch("/:id", usersController.update);
export { usersRouter };
