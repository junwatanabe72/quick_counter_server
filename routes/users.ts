import express from "express";
import usersController from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.post("/", usersController.create);
usersRouter.get("/:id", usersController.index);
export { usersRouter };
