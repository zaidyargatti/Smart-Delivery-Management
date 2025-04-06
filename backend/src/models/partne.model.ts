import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true
     },
    email: { 
        type: String, 
        required: true, 
        unique: true },
    phone: { 
        type: String,
         required: true, 
         unique: true },
    status: {
         type: String,
          enum: ["active", "inactive"], 
          default: "active" },
    currentLoad: {
         type: Number,
          default: 0
         },
    areas: {
         type: [String],
          default: [] },
    shift: {
      start: 
      { type: String,
         required: true
         }, 
      end: {
         type: String
         , required: true 
        },   
    },
    metrics: {
      rating: { 
        type: Number,
         default: 5 
        },
      completedOrders: {
         type: Number,
          default: 0 
        },
      cancelledOrders: {
         type: Number,
          default: 0 
        },
    },
  },
  { timestamps: true }
);

const Partner = mongoose.model("Partner", PartnerSchema);

export default Partner;
