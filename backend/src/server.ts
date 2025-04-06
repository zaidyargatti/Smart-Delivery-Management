import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import route from "./routes/user.route.js";
import path from "./routes/delivry.route.js";
import way from "./routes/partner.route.js";
import street from "./routes/customer.route.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", route);
app.use("/api/delivery",path)
app.use("/api/partner",way)
app.use("/api/customer",street)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://locallhost${PORT}`);
});
