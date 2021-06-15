import Router from "express";
import Todo from "../models/todoModel.js";
import JsonResponse from '../utils/response.js'

const todoRouter = Router();


todoRouter.get('/list', async (req, res) => {
    const data = await Todo.find({}).then(todo => {
        res.json(JsonResponse(todo))
    }).catch(err => {
        res.json(JsonResponse('', 'Failed to fetch data', 400, 400))
    })
})

todoRouter.post('/add', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
    })

    await Todo.create(todo).then(data => {
        res.json(JsonResponse(data, 'Success Insert Data'))
    }).catch(err => {
        res.json(JsonResponse('', '', err, 400, 400))
    })
})

todoRouter.put("/edit/:id", async (req, res) => {
    await Todo.updateOne({_id: req.params.id}, {"status": "Done"}).then(data => {
        res.json(JsonResponse(data, "Success Update Data"))
    }).catch(err => {
        res.json(JsonResponse("", "", err, 400, 400))
    })
})

todoRouter.delete("/delete/:id", async (req, res) => {
    await Todo.findOneAndDelete({_id: req.params.id}).then(data => {
        res.json(JsonResponse(data, "Success Delete Data"))
    }).catch(err => {
        res.json(JsonResponse("", "", err, 400, 400))
    })
})

export default todoRouter;