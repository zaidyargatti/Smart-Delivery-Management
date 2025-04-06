import { Router } from "express";
import { loginCustomer, registerCustomer } from "../controllers/customer.controller.js";


const street =Router()

street.post("/registerCustomer",registerCustomer)
street.post("/loginCustomer",loginCustomer)

export default street