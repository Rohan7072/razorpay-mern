import crypto from "crypto";
import razorpayInstance from "../config/razorpay.js";
import { PaymentRepository } from "../repositories/payment.repository.js";

const repo = new PaymentRepository();

export class PaymentController {
  async createOrder(req, res) {
    try {
      const { amount } = req.body;
      if (!amount || isNaN(amount)) return res.status(400).json({ error: true, message: "Invalid amount" });

      const options = {
        amount: Math.round(Number(amount) * 100),
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
      };

      const order = await razorpayInstance.orders.create(options);

      await repo.create({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        status: "Created"
      });

      return res.json({ error: false, message: "Order created", data: order });
    } catch (err) {
      console.error("createOrder error:", err);
      return res.status(500).json({ error: true, message: err.message });
    }
  }

  async verifyPayment(req, res) {
    try {
      const { orderId, paymentId, signature, amount } = req.body;

      const sign = orderId + "|" + paymentId;
      const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign).digest("hex");
      const status = expected === signature ? "success" : "failed";

      await repo.create({
        orderId,
        paymentId,
        signature,
        amount,
        currency: "INR",
        status,
      });

      return res.json({ success: true, status });
    } catch (err) {
      console.error("verifyPayment error:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const payments = await repo.getAll();
      return res.json({ error: false, message: "Payments fetched", data: payments });
    } catch (err) {
      console.error("getAll error:", err);
      return res.status(500).json({ error: true, message: err.message });
    }
  }
}
