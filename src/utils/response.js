const JsonResponse = (data = {}, message, code = 200, status_code = 200) => {
    return {
        "data": data,
        "message": message,
        "code": code,
        "status_code": status_code
    }
}


export default JsonResponse;