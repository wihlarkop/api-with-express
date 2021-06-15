import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const Todo = mongoose.model('todo', TodoSchema)

export default Todo;
