import express from "express";
import { PaymentController } from "../controllers/payment.controller.js";

const router = express.Router();
const controller = new PaymentController();

router.post("/create-order", (req, res) => controller.createOrder(req, res));
router.post("/verify-payment", (req, res) => controller.verifyPayment(req, res));
router.get("/all", (req, res) => controller.getAll(req, res));

export default router;
