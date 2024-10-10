// src/components/OrderCard.jsx
import React, { useState } from "react";

const OrderCard = ({ addOrder, nextStep }) => {
    const [amount, setAmount] = useState(0);

    // Function to generate random amount between 5 and 2
    const generateRandomAmount = () => {
        const randomAmount = (Math.random() * (5 - 2) + 2).toFixed(2);
        setAmount(randomAmount);
    };

    // Confirm the order and go to the next step
    const confirmOrder = () => {
        addOrder(parseFloat(amount)); // Add order to state
        nextStep(); // Proceed to checkout
    };

    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Order</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                className="w-full p-2 border rounded mb-4"
            />
            <div className="flex space-x-4">
                <button
                    onClick={generateRandomAmount}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Random Amount
                </button>
                <button
                    onClick={confirmOrder}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default OrderCard;
