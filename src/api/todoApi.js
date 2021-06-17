import Router from "express";
import Todo from "../models/todoModel.js";
import JsonResponse from "../utils/response.js"

const todoRouter = Router();


todoRouter.get("/list", async (req, res) => {
    const data = await Todo.find({}).then(todo => {
        return res.json(JsonResponse(todo))
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