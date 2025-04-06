import { Request, Response,RequestHandler } from "express";
import Customer from "../models/customer.model.js";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import  Jwt  from "jsonwebtoken";

const generateToken = (id: Types.ObjectId) => {
    return Jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d'
    })
}

 const registerCustomer:RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
     res.status(400).json({ message: "Customer already exists" });
     return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });


    res.status(201).json({ message: "Customer registered successfully",customer });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to register customer", error: error.message });
  }
};

 const loginCustomer:RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email });
    if (!customer) {
      res.status(400).json({ message: "Invalid credentials" });
      return
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
       res.status(400).json({ message: "Invalid credentials" });
       return
    }

    const token = generateToken(customer._id)

    res.status(200).json({
      token,
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};

export { registerCustomer, loginCustomer };