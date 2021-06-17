import Router from "express";
import axios from "axios"
import JsonResponse from "../utils/response.js";

const fetchRouter = Router();

fetchRouter.get('/user/list', async (req, res) => {
    await axios.get(`${process.env.BASE_URL}/users`)
        .then(result => {
            let datas = []

            for (let us in result.data) {
                const row = result.data[us]
                data.push({
                    "id": row.id,
                    "username": row.username,
                    "email": row.email,
                    "name": row.name,
                    "phone": row.phone,
                    "address": (`${row.address.street}, ${row.address.city}`),
                    "company": row.company.name
                })
            }
            return res.json(JsonResponse(datas, "Success Fetch Data", 200))
        })
        .catch(err => {
            return res.status(400).json(JsonResponse({}, "Something Wrong, Please Try Again", 400))
        })
})

fetchRouter.get('/user/:id/detail', async (req, res) => {
    const user_id = req.params.id
    let data = []
    let todos = []
    
    await axios.get(`${process.env.BASE_URL}/todos?userId=${user_id}`)
        .then(result => {
            let todo = result.data

            for (let us in todo) {
                const row = todo[us]
                todos.push({
                    "id": row.id,
                    "title": row.title,
                    "status": row.completed,
                })
            }
        })

    await axios.get(`${process.env.BASE_URL}/users/${user_id}`)
        .then(result => {
            let user = result.data

            data.push({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "name": user.name,
                "phone": user.phone,
                "address": (`${user.address.street}, ${user.address.city}`),
                "company": user.company.name,
                "todos": todos

            })
            return res.json(JsonResponse(data, "Success Fetch Data", 200))
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json(JsonResponse({}, "Something Wrong, Please Try Again", 400))
        })
})

export default fetchRouter;