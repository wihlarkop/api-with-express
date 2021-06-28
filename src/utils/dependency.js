import {decodeJwt} from './token.js'
import JsonResponse from "./response.js";

const jwtBearer = async (req, res, next) => {
    const auth = req.headers.authorization

    let token = auth.split(" ")[1]

    if (!token) {
        token = auth
    }

    if (auth) {
        try {
            await decodeJwt(token, process.env.ACCESS_TOKEN_SECRET_KEY, false)
            next()
        } catch (err) {
            res.json(JsonResponse({}, 'Unauthorized', 403, 403))
        }
    } else {
        res.json(JsonResponse({}, 'Token Required', 401, 401))
    }
}


export default jwtBearer;