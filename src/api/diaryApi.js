import Router from "express";
import Diary from "../models/diaryModel.js";
import JsonResponse from "../utils/response.js"

const diaryRouter = Router();


diaryRouter.get('/list', async (req, res) => {
    const data = await Diary.find({}).then(diaries => {
        res.json(JsonResponse(diaries, "", 200, 200))
    }).catch(err => {
        res.json(JsonResponse("", "Failed to fetch data", 400, 400))
    })
})


export default diaryRouter;