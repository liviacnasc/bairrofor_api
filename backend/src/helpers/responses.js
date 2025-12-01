export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
        this.success = false
    }
}

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