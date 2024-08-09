// build our own error
export const errorHandler = (statusCode, message) =>{
    const error = new Error();
    errorMonitor.statusCode = statusCode;
    error.message = message;
    return error;
}