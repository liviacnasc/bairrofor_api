export function respostaErroPadrao(statusCode, message) {
    return {
        success: false,
        statusCode: statusCode,
        message: message
    }
}

export function respostaSucesso(statusCode, value) {
    return {
        success: true,
        statusCode: statusCode,
        value: value
    }
}