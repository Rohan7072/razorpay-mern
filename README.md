# 💳 Razorpay MERN Integration

A simple full-stack **MERN (MongoDB, Express, React, Node.js)** project demonstrating **Razorpay payment gateway integration** using MVC + Repository pattern.

---

## 🚀 Features

- 💰 Create Razorpay orders directly from backend  
- ✅ Verify payments securely using signature validation  
- 🧾 Store payment details in MongoDB  
- 🧩 Fetch all payment records on the frontend  
- 🎨 Clean React UI (Vite + Axios + Tailwind-ready)

---

## 📁 Project Structure

razorpay-mern/
│
├── backend/
│ ├── config/razorpay.js
│ ├── controllers/payment.controller.js
│ ├── repositories/payment.repository.js
│ ├── routes/payment.routes.js
│ ├── models/payment.model.js
│ ├── app.js
│ ├── server.js
│ └── .env
│
└── frontend/
├── src/
│ ├── App.jsx
│ └── main.jsx
├── vite.config.js
├── package.json
└── .env


---

## ⚙️ Backend Setup

### 1️⃣ Install dependencies
```bash
cd backend
npm install

2️⃣ Add environment variables

Create a .env file in /backend folder:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/razorpayDB
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173

3️⃣ Run backend server
npm run dev


✅ Server will run at http://localhost:5000

💻 Frontend Setup
1️⃣ Install dependencies
cd frontend
npm install

2️⃣ Create .env file
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx

3️⃣ Start frontend
npm run dev


App runs at http://localhost:5173

🧠 Testing Payment (Razorpay Test Mode)

Use Razorpay’s test card:

Field	Value
Card Number	4111 1111 1111 1111
Expiry	Any future date
CVV	123
OTP	123456

✅ Payment will succeed instantly in test mode.

📊 API Endpoints
Method	Endpoint	Description
POST	/api/payment/create-order	Create Razorpay order
POST	/api/payment/verify-payment	Verify signature & store payment
GET	/api/payment/all	Get all payments
🧰 Tech Stack

Frontend: React (Vite), Axios

Backend: Node.js, Express

Database: MongoDB (Mongoose)

Payments: Razorpay SDK

🧑‍💻 Author

Rohan Raikar
🔗 GitHub
