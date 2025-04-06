import { Request, Response,RequestHandler } from "express";
import Partner from "../models/partne.model.js";

 const getAllPartners:RequestHandler = async (req: Request, res: Response) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch partners", error: error.message });
  }
};


 const createPartner:RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, areas, shift } = req.body;
    const partner = new Partner({
      name,
      email,
      phone,
      areas,
      shift,
      status: "active",
      currentLoad: 0,
      metrics: {
        rating: 5,
        completedOrders: 0,
        cancelledOrders: 0,
      },
    });
    await partner.save();
    res.status(201).json(partner);
  } catch (error: any) {
    res.status(400).json({ message: "Failed to create partner", error: error.message });
  }
};

const updatePartner:RequestHandler = async (req: Request, res: Response) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!partner) {
      res.status(404).json({ message: "Partner not found" });
      return;
    }
    res.status(200).json(partner);
  } catch (error: any) {
    res.status(400).json({ message: "Failed to update partner", error: error.message });
  }
};

 const deletePartner:RequestHandler = async (req: Request, res: Response) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) {
      res.status(404).json({ message: "Partner not found" });
      return;
    }
    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: "Failed to delete partner", error: error.message });
  }
};

export{
    getAllPartners,
    createPartner,
    updatePartner,
    deletePartner
}
