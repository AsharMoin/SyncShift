import { Request, Response, NextFunction } from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log("to implement auth validation")
    next()
}

export default authMiddleware