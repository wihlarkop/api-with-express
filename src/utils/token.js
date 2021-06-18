import jwt from "jsonwebtoken";

export const generateAccessToken = async function (username, created) {
    const TOKEN_EXP = 3 * 60 * 60
    const expiration = Date.now() + TOKEN_EXP
    const payload = {
        "username": username,
        "created": created,
        "exp": expiration
    }
    return await encodeJwt(payload)
}

export const decodeJwt = function (token, expiration = true) {
    return jwt.verify(token, process.env.SECRET_KEY, {algorithm: "HS256", ignoreExpiration: expiration});
}


export const encodeJwt = async function (payload) {
    return await jwt.sign(payload, process.env.SECRET_KEY, {algorithm: "HS256"})
}
