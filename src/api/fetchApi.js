import Router from "express";

import JsonResponse from "../utils/response.js";
import {userData} from "../utils/fetchData.js";

const fetchRouter = Router();

fetchRouter.get('/jph/user/list', async (req, res) => {
    const data = await userData()

    return res.json(JsonResponse(data, "Success Fetch Data", 200))
})

fetchRouter.get('/jph/user/:id/detail', async (req, res) => {
    const user_id = req.params.id

    const data = await userData(user_id)

    return res.json(JsonResponse(data, "Success Fetch Data", 200))
})

export default fetchRouter;