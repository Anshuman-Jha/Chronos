import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

export interface AuthRequest extends Request {
    userId?: String,
    username?: String 
}

async function middleware(req: AuthRequest, res: Response, next: NextFunction) {

    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.json({
            message: "token not provided !!!"
        });
    }

    const token = authHeader.split(" ")[1];


    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {userId: String, username: String};
        req.userId = decoded.userId;
        req.username = decoded.username;
        next();
    }
    catch (error) {
        return res.json({
            message: "token not verified !!!"
        });
    }

};

export default middleware;