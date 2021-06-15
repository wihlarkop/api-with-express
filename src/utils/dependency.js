import decodeJwt from '../utils/token.js'
import JsonResponse from "./response";

export const jwtBearer = (req, res, next) => {
    const auth = req.header.authorization.split(" ")[1]
    const decode = decodeJwt(auth).then(user => {
        next()
    }).catch(err => {
        res.json(JsonResponse({}, 'Unauthorized', 401, 401))
    })
}

export default jwtBearer;