export const errorHandler = (err, req, res, next) => {
    const errMsg = err.message || 'Something went wrong';
    res.status(500).json({
        message: errMsg
    });
};
//# sourceMappingURL=error.js.map