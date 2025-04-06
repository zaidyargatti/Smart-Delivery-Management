import { Request, Response,RequestHandler } from "express";
import Delivery from "../models/delivry.model.js";

 const createDelivery: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { senderName, receiverName, pickupAddress, deliveryAddress, packageDetails } = req.body;

    const newDelivery = await Delivery.create({
      senderName,
      receiverName,
      pickupAddress,
      deliveryAddress,
      packageDetails,
    });

    res.status(201).json({ delivery: newDelivery });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

 const getAllDeliveries:RequestHandler = async (req: Request, res: Response) => {
    try {
      const deliveries = await Delivery.find();
      res.status(200).json({ deliveries });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

   const getDeliveryById:RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const delivery = await Delivery.findById(id);
  
      if (!delivery) {
        res.status(404).json({ message: "Delivery not found" });
        return
      }
  
      res.status(200).json({ delivery });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

 const updateDelivery:RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedDelivery = await Delivery.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedDelivery) {
        res.status(404).json({ message: "Delivery not found" });
        return 
      }
  
      res.status(200).json({  delivery: updatedDelivery });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  const deleteDelivery:RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedDelivery = await Delivery.findByIdAndDelete(id);
  
      if (!deletedDelivery) {
         res.status(404).json({ message: "Delivery not found" });
         return 
      }
  
      res.status(200).json({ message: "Deleted", deleteDelivery });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  
  
export {
    createDelivery,
    getAllDeliveries,
    getDeliveryById,
    updateDelivery,
    deleteDelivery
}
