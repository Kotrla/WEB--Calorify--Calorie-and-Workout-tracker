import jwt from 'jsonwebtoken';

export const requireLogin = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error(error);
    
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decode;
    
    next();
  } catch (err) {
    return res.status(400).send("Unauthorized access");
  }
};
