import moment from "moment";
import Router from "express";

import Diary from "../models/diaryModel.js";
import JsonResponse from "../utils/response.js"

const diaryRouter = Router();


diaryRouter.get('/list', async (req, res) => {
    let diaries = []

    await Diary.find({}).then(diary => {
        diary.forEach(data => {
            diaries.push({
                "id": data.id,
                "date": moment(data.date).format("YYYY-MM-DD"),
                "post": data.post
            })
        })

        res.json(JsonResponse(diaries, "Success get data", 200, 200))
    }).catch(err => {
        res.json(JsonResponse("", "Failed to fetch data", 400, 400))
    })
})

diaryRouter.post("/add", async (req, res) => {
    const diary = new Diary({
        date: req.body.date,
        post: req.body.post
    })

    await Diary.create(diary).then(data => {
        console.log(data)
        return res.json(JsonResponse(data, "Success Insert Data"))
    }).catch(err => {
        console.log(err)
        return res.json(JsonResponse("", "Failed To Insert Data", 400, 400))
    })
})

export default diaryRouter;