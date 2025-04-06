import { Router } from "express";
import { createPartner, deletePartner, getAllPartners, updatePartner } from "../controllers/partner.cotroller.js";

const way=Router()

way.get("/",getAllPartners)
way.post("/",createPartner)
way.put("/:id",updatePartner)
way.delete("/:id",deletePartner)

export default way