import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema({
  senderName:{
     type: String,
      required: true
     },
  receiverName:{ 
    type: String,
     required: true
     },
  pickupAddress:{
     type: String, 
     required: true
    },
  deliveryAddress:{
     type: String,
      required: true 
    },
  packageDetails:{ 
    type: String, 
    required: true
 },
}, { timestamps: true });

const Delivery = mongoose.model("Delivery", DeliverySchema);
export default Delivery;
