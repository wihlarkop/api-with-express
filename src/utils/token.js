import jwt from "jsonwebtoken";

const TOKEN_EXP = 3 * 60 * 60

export const generateAccessToken = (username, created) => {
    const expiration = Date.now() + TOKEN_EXP
    const payload = {
        "username": username,
        "created": created,
        "exp": expiration
    }
    return encodeJwt(payload)
}

export const decodeJwt = function (token, expiration = true) {
    return jwt.verify(token, process.env.SECRET_KEY, {algorithm: "HS256", ignoreExpiration: expiration});
}


export const encodeJwt = function (payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, {algorithm: "HS256"})
}

export default {generateAccessToken, decodeJwt};