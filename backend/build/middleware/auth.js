import jwt from 'jsonwebtoken';
export const requireLogin = (request, res, next) => {
    try {
        const req = request;
        if (!req.headers.authorization) {
            throw new Error('Unauthorized access');
        }
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET || '');
        req.user = decode;
        return next();
    }
    catch (err) {
        return res.status(400).send('Unauthorized access');
    }
};
//# sourceMappingURL=auth.js.map