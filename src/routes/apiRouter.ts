import { Router } from "express";
import { createToDoController, getToDoController } from "../controllers/apiController";

const toDoRouter = Router();

toDoRouter.get("/", getToDoController);

toDoRouter.post("/", createToDoController);

export default toDoRouter;