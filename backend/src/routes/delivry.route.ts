import { Router } from "express";
import { createDelivery, deleteDelivery, getAllDeliveries, getDeliveryById, updateDelivery } from "../controllers/delivry.controller.js";
import protect from "../middleware/auth.middleware.js";

const path = Router()

path.post("/createDelivery",protect,createDelivery)
path.get("/",protect,getAllDeliveries)
path.get("/:id",protect,getDeliveryById)
path.put("/:id",protect,updateDelivery)
path.delete("/:id",protect,deleteDelivery)

export default path