import jwt from "jsonwebtoken";
import { Request, Response, NextFunction,RequestHandler } from "express";
import User from "../models/user.model.js";

const protect:RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.replace("Bearer ", "");

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

            (req as any).user = await User.findById(decoded.id).select("-password");

            if (!(req as any).user) {
              res.status(401).json({ message: "Not authorized, user not found" });
              return 
            }
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed!" });
            return 
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token provided!" });
          return 
    }
};

export default protect;
