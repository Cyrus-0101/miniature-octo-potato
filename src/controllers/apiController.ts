import { Request, Response } from "express";
import { ToDo, ToDoDoc } from "../models/ToDo";

// CREATE
export const createToDoController = async (req: Request, res: Response) => {
    const toDo: ToDoDoc = new ToDo({
        title: req.body['title'],
        description: req.body['description']
    });

    const result: ToDoDoc = await toDo.save();

    return res.status(201).json({
        message: "success",
        result
    });
};

// READ
export const getToDoController = async (req: Request, res: Response) => {

    const toDos: ToDoDoc[] = await ToDo.find({});

    if (toDos.length === 0) {
        return res.status(404).json({
            message: "No To-Dos found. Add some!"
        });
    }

    return res.status(200).json({
        message: "success",
        toDos
    });
};
