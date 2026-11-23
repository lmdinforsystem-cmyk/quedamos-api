//Error propio que incluye el código de estado HTTP
class AppError extends Error {
    constructor(message, statusCode) {
        super(message); 
        this.statusCode = statusCode;
    }
}

export default AppError;