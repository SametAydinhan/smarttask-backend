import { Request, Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

interface JwtPayload {
    userId: number;
}

declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if(!token) {
        return res.status(401).json({message: "Token is missing."})
    }

    try {
        const decoded = jwt.verify(token, SECRET) as JwtPayload;
        req.userId = decoded.userId;
        next();
    } catch(error) {
        return res.status(403).json({message: "Invalid or expired token."});
    }
}