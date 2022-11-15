// Create ToDo model with title and description.
import * as mongoose from "mongoose";

export interface ToDoDoc extends mongoose.Document {
    title: string;
    description: string;
}

const ToDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export const ToDo = mongoose.model('Todo', ToDoSchema);