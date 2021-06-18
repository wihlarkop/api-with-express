import Router from "express";

import Todo from "../models/todoModel.js";
import JsonResponse from "../utils/response.js"

const todoRouter = Router();


todoRouter.get("/list", async (req, res) => {
    let todos = []

    await Todo.find({}).then(todo => {
        todo.forEach(data => {
            todos.push({
                "id": data.id,
                "title": data.title,
                "status": data.status,
            })
        })
        return res.json(JsonResponse(todos, "Success Get Data", 200))
    }).catch(err => {
        return res.json(JsonResponse("", "Failed to fetch data", 400, 400))
    })
})

todoRouter.post("/add", async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
    })

    await Todo.create(todo).then(data => {
        return res.json(JsonResponse(data, "Success Insert Data"))
    }).catch(err => {
        return res.json(JsonResponse("", "Failed To Insert Data", 400, 400))
    })
})

todoRouter.put("/edit/:id", async (req, res) => {
    await Todo.updateOne({_id: req.params.id}, {"status": "Complete"}).then(data => {
        return res.json(JsonResponse(data, "Success Update Data"))
    }).catch(err => {
        return res.json(JsonResponse("", "Failed To Edit Data", 400, 400))
    })
})

todoRouter.delete("/delete/:id", async (req, res) => {
    await Todo.findOneAndDelete({_id: req.params.id}).then(data => {
        return res.json(JsonResponse(data, "Success Delete Data"))
    }).catch(err => {
        return res.json(JsonResponse("", "Failed To Delete", 400, 400))
    })
})

export default todoRouter;