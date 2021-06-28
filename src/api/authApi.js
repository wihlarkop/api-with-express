import Bcrpyt from "bcrypt";
import Router from "express";

import {User, UserToken} from "../models/userModel.js";
import JsonResponse from "../utils/response.js"
import {decodeJwt, generateAccessToken, generateRefreshToken} from "../utils/token.js"


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
                .then(async (result) => {
                    if (!result) throw "Wrong Password"

                    const accessToken = await generateAccessToken(username, created)
                    const refreshToken = await generateRefreshToken(username, created)

                    const token = new UserToken({
                        username: username,
                        token: refreshToken
                    })

                    try {
                        await UserToken.create(token).catch(e => {
                            console.log(e)
                        })
                    } catch {
                        return res.status(400).json(JsonResponse({}, "Something Wrong, Please Try Again", 400))
                    }

                    const resData = {
                        "access_token": accessToken,
                        "refresh_token": refreshToken
                    }
                    return res.status(200).json(JsonResponse(resData, '', 200))
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
        return res.json(JsonResponse({}, `${result.username} Success Register`, 200))
    }).catch(err => {
        return res.status(400).json(JsonResponse("", "Email Has Registered", 400))
    })
})

authRouter.post("/refresh-token", async (req, res) => {
    const token = req.body.token;

    if (!token) return res.status(401).json(JsonResponse({}, "Token Required", 401))

    const tokenInDb = await UserToken.findOne({"token": token})

    if (!tokenInDb) return res.status(403).json(JsonResponse({}, "Please Login Again", 403))

    const checkToken = await decodeJwt(token, process.env.REFRESH_TOKEN_SECRET_KEY, false)

    if (!checkToken) return res.status(403).json(JsonResponse({}, "Please Login Again", 403))

    const newToken = await generateAccessToken(checkToken.username, checkToken.created)

    return res.status(200).json(JsonResponse(newToken, '', 200))

})

export default authRouter;