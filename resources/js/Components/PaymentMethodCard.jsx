// src/components/PaymentMethodCard.jsx
import React, { useState } from "react";

const PaymentMethodCard = ({ totalAmount, setPaymentStatus }) => {
    const [paymentMethod, setPaymentMethod] = useState("paypal");

    // Handle payment process (mocked for now)
    const processPayment = () => {
        // Mock successful payment response
        setTimeout(() => {
            setPaymentStatus("success");
        }, 1000);
    };

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
            <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            >
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
            </select>
            <button
                onClick={processPayment}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Pay ${totalAmount.toFixed(2)}
            </button>
        </div>
    );
};

export default PaymentMethodCard;
