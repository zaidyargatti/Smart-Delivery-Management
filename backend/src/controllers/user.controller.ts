import { Request,Response,RequestHandler } from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";

const generateToken = (id: Types.ObjectId) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d'
    })
}

 const signup: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!email) {
            res.status(400).json({ message: "Email is required!" });
        }
        if (!username) {
         res.status(400).json({ message: "Username is required!" });
        }
        if (!password) {
            res.status(400).json({ message: "Password is required!" });
        }

        const user = await User.create({
            username,
            email,
            password,
        });

         res.status(201).json({ user });
         return;
    } catch (error) {
        
        console.error("Error while signing up user: ", error);
         res.status(500).json({ message: "Internal Server Error" });
         return;
    }
};

 const login: RequestHandler = async (req:Request, res:Response) => {
    try {
        const { email, password } = req.body;
        if (!email) {
             res.status(400).json({ message: "Email is required" })
        }
        if (!password) {
            res.status(400).json({ message: "password is required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ message: "Invalid Email or Password" })
            return
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
           res.status(400).json({ message: "Invalid Email or Password" })
        }
        const token = generateToken(user._id)
      res.status(200).json({ user, token: token })
    } catch (error) {
        console.error('Error while logging in User: ', error)
        res.status(500).json({ message: "Internal Server Error" })
        return
    }
}

export{
    signup,
    login
}
