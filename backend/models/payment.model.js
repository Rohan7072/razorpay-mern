import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  signature: String,
  amount: Number,
  currency: String,
  status: String,
}, { timestamps: true });

export const Payment = mongoose.model("Payment", paymentSchema);
