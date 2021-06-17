import Bcrpyt from "bcrypt";
import Router from "express";

import {generateAccessToken} from "../utils/token.js"
import JsonResponse from "../utils/response.js"
import User from "../models/userModel.js";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
    const uname = req.body.username
    const pwd = req.body.password

    if (uname === "") {
        return res.status(400).json(JsonResponse({}, "Username Required", 400))
    }

    if (pwd === "") {
        return res.status(400).json(JsonResponse({}, "Password Required", 400))
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
                            return res.json(JsonResponse(data, "Success Login", 200))
                        })
                        .catch(() => {
                            return res.status(400).json(JsonResponse({}, "Unauthorized", 400))
                        })
                })
                .catch((result) => {
                    return res.status(400).json(JsonResponse({}, result, 400))
                })
        })
        .catch((result) => {
            return res.status(400).json(JsonResponse({}, result, 400))
        })
})

authRouter.post("/register", async (req, res) => {
    const uname = req.body.username
    const pwd = req.body.password

    if (uname === "") {
        return res.status(400).json(JsonResponse({}, "Username Required", 400))
    }

    if (pwd === "") {
        return res.status(400).json(JsonResponse({}, "Password Required", 400))
    }
    const hashing_password = Bcrpyt.hashSync(pwd, 10)

    const user = new User({
        "username": uname,
        "password": hashing_password
    })

    await User.create(user).then((result) => {
        generateAccessToken(result.username, result.created)
            .then((token) => {
                const data = {"token": token, "username": result.username}
                return res.json(JsonResponse(data, "Success Register", 200))
            }).catch((err) => {
            return res.status(400).json(JsonResponse("", "Failed To Register", 400))
        })
    }).catch(err => {
        return res.status(400).json(JsonResponse("", "Email Has Registered", 400))
    })
})

export default authRouter;