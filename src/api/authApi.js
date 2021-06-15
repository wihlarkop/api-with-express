import Bcrpyt from "bcrypt";
import Router from "express";

import {generateAccessToken} from "../utils/token.js"
import JsonResponse from "../utils/response.js"
import User from "../models/userModel.js";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
    const uname = req.body.username
    const pwd = req.body.password


    User.findOne({"username": uname}).then((user) => {
        if (!user) {
            res.json(JsonResponse({}, 'User Not Found'))
        } else {
            const check_password = Bcrpyt.compare(pwd, user.password)
            if (!check_password) {
                res.json(JsonResponse({}, "Wrong Password"))
            } else {
                const token = generateAccessToken(user.username, user.created)
                const data = {"token": token, "username": user.username}
                res.json(JsonResponse(data, "Success Register"))
            }
        }
    })

})

authRouter.post("/register", async (req, res) => {
    const uname = req.body.username
    const pwd = req.body.password
    const hashing_password = Bcrpyt.hashSync(pwd, 10)

    const user = new User({
        "username": uname,
        "password": hashing_password
    })

    await User.create(user).then((user) => {
        const token = generateAccessToken(user.username, user.created)
        const data = {"token": token, "username": user.username}
        res.json(JsonResponse(data, "Success Register"))
    }).catch(err => {
        res.json(JsonResponse("", "Email Has Registered", 400, 400))
    })
})

export default authRouter;