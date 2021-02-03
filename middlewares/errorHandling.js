// 404 Handling middleware
const urlNotFound = (req, res, next) =>{
    const error = new Error(`The requested URL: ${req.url} was NOT found on this server!`);
    error.statusCode = 404;
    next(error);
}


// Express Global Error Handling middleware
// All Errors are passed directly to it
const globalErrorHandling = (error, req, res, next) =>{
    res
    .status(error.statusCode || 500)
    .json({ok: 0, error: error.message});
}

module.exports = {
    urlNotFound,
    globalErrorHandling
}