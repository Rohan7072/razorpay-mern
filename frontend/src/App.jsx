import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [amount, setAmount] = useState("");
  const [payments, setPayments] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false); // ✅ overlay state

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payment/all");
      console.log("Payments API response:", res.data);
      setPayments(res.data.data || []);
    } catch (err) {
      console.error("fetchPayments error:", err);
    }
  };

  const handlePayment = async () => {
    if (!amount) return alert("Enter amount");

    try {
      setShowOverlay(true); // ✅ Show overlay before popup starts

      const res = await axios.post("http://localhost:5000/api/payment/create-order", { amount });
      const order = res.data.data;

      if (!order) {
        alert("Order not created properly!");
        console.error("Backend response:", res.data);
        setShowOverlay(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Secure Payment",
        description: "Transaction in process",
        handler: async (response) => {
          await axios.post("http://localhost:5000/api/payment/verify-payment", {
            orderId: order.id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount,
          });
          alert("✅ Payment Success!");
          setShowOverlay(false);
          fetchPayments();
        },
        modal: {
          ondismiss: () => setShowOverlay(false), // Hide overlay if closed
        },
        prefill: { name: "Rohan", email: "rohan@test.com", contact: "9999999999" },
        theme: { color: "#0d9488" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // ✅ Small delay so TEST label hides behind overlay
      setTimeout(() => {
        document.body.style.overflow = "hidden"; // prevent scroll
      }, 200);
    } catch (err) {
      console.error("Payment creation error:", err);
      setShowOverlay(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "Poppins, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>💳 Razorpay Demo (Production feel)</h1>

      <div style={{ margin: "16px 0" }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount (₹)"
          style={{
            padding: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
        <button
          onClick={handlePayment}
          style={{
            marginLeft: "8px",
            padding: "8px 16px",
            fontSize: "16px",
            backgroundColor: "#0d9488",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </div>

      <h2 style={{ fontSize: "20px", marginTop: "24px" }}>📋 Payment History</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th>Order ID</th>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{p.orderId}</td>
              <td>{p.paymentId || "-"}</td>
              <td>₹{p.amount}</td>
              <td>{p.status}</td>
              <td>{new Date(p.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Overlay shown during payment */}
      {showOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255,255,255,0.95)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(3px)",
          }}
        >
          <div
            style={{
              border: "5px solid #ccc",
              borderTop: "5px solid #0d9488",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <h2 style={{ marginTop: 20, color: "#333" }}>Processing Secure Payment...</h2>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default App;
