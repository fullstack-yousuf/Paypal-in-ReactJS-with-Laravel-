// src/components/CheckoutCard.jsx
import React from "react";

const CheckoutCard = ({ orders, totalAmount, nextStep }) => {
    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Your Orders</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order.id} className="mb-2">
                        Order #{order.id}: ${order.amount.toFixed(2)}
                    </li>
                ))}
            </ul>
            <h3 className="mt-4 font-bold">Total Amount: ${totalAmount.toFixed(2)}</h3>
            <button
                onClick={nextStep}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
                Proceed to Payment
            </button>
        </div>
    );
};

export default CheckoutCard;
