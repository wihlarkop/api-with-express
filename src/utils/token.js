import jwt from "jsonwebtoken";

export const generateAccessToken = async function (username, created) {
    const payload = {
        "username": username,
        "created": created,
    }
    return await encodeJwt(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '30s'})
}

export const generateRefreshToken = async function (username, created) {
    const payload = {
        "username": username,
        "created": created,
    }
    return await encodeJwt(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: "60m"})
}

export const decodeJwt = async function (token, secret_key, expiration = true) {
    return jwt.verify(token, secret_key, {algorithm: "HS256", ignoreExpiration: expiration});
}


export const encodeJwt = async function (payload, secret_key) {
    return await jwt.sign(payload, secret_key, {algorithm: "HS256"})
}
