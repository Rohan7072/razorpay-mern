import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import paymentRoutes from "./routes/payment.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(bodyParser.json({ limit: "10mb" }));

app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => res.send("✅ Razorpay backend running"));

export default app;
