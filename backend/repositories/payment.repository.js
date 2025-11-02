import { Payment } from "../models/payment.model.js";

export class PaymentRepository {
  async create(data) {
    return Payment.create(data);
  }

  async getAll() {
    return Payment.find().sort({ createdAt: -1 });
  }
}
