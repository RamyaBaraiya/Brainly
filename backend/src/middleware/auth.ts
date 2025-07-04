import { NextFunction,Request,Response } from "express";
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET as string;

function authmiddleware(req:Request, res:Response, next:NextFunction) {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(403).json({
            message: 'Unauthorized'
        });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        //@ts-ignore
        req.userId = decoded.id;
        next()
    } catch (error) {
        return res.status(403).json({
            message: 'Unauthorized'
        });
    }
}
export default authmiddleware;