const JsonResponse = (data = {}, message, code) => {
    return {
        "data": data,
        "message": message,
        "code": code
    }
}


export default JsonResponse;