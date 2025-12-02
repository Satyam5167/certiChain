import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const authMiddleware = async(req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({message:"Token not provided"});

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err) return res.status(401).json({message:"Invalid Token"});
        req.userId = decoded.id;
        next();
    })
}

export default authMiddleware;
