import Bcrpyt from "bcrypt";
import Router from "express";

import {generateAccessToken} from "../utils/token.js"
import JsonResponse from "../utils/response.js"
import User from "../models/userModel.js";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
    const uname = req.body.username
    const pwd = req.body.password

    if (uname === undefined || uname === "") {
        res.json(JsonResponse({}, "Username Required", 400))
    }

    if (pwd === undefined || pwd === "") {
        res.json(JsonResponse({}, "Password Required", 400))
    }

    await User.findOne({"username": uname})
        .then((user) => {
            if (!user) throw "User Not Found"

            const username = user.username
            const created = user.createdAt
            const check_password = Bcrpyt.compare(pwd, user.password)
                .then((result) => {
                    if (!result) throw "Wrong Password"

                    generateAccessToken(username, created)
                        .then((token) => {
                            const data = {"token": token, "username": username}
                            res.json(JsonResponse(data, "Success Login", 200))
                        })
                        .catch(() => {
                            res.json(JsonResponse({}, "Unauthorized", 400))
                        })
                })
                .catch((result) => {
                    res.json(JsonResponse({}, result, 400))
                })
        })
        .catch((result) => {
            res.json(JsonResponse({}, result, 400))
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