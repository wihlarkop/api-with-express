import Router from "express";
import Todo from "../models/todoModel.js";
import JsonResponse from '../utils/response.js'

const todoRouter = Router();


todoRouter.get('/list', (req, res) => {
    const data = Todo.find({}).then(todo => {
        res.json(JsonResponse(todo))
    }).catch(err => {
        res.json(JsonResponse('', 'Failed to fetch data', 400, 400))
    })
})

todoRouter.post('/add', (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        status: req.body.status
    })

    todo.save().then(data => {
        res.json(JsonResponse(data, 'Success Insert Data'))
    }).catch(err => {
        res.json(JsonResponse('', '', err, 400, 400))
    })
})

todoRouter.delete('/delete/:id', (req, res) => {
    Todo.findOneAndDelete({'_id': req.params.id}).then(data => {
        res.json(JsonResponse(data, 'Success Delete Data'))
    }).catch(err => {
        res.json(JsonResponse('', '', err, 400, 400))
    })
})

export default todoRouter;