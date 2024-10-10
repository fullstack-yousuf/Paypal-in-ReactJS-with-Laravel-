import React, { useState, useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { data } from "autoprefixer";

const PayPalButton = ({ amount }) => {
    const [orderID, setOrderID] = useState(false);
    const [error, setError] = useState(null);

    // Create an order on server-side
// Create an order on server-side using fetch
const createOrder = async () => {
    try {
        const response = await fetch('/paypal/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ amount })
        });
        
        const data = await response.json();
        setOrderID(data.id);
        return data.id;
    } catch (error) {
        setError(error.message);
        console.error('Create Order Error:', error);
    }
};


    

    // Capture the order
    const onApprove = async (data) => {
        try {
            const userId = 1; // Pass the user ID dynamically
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Get CSRF token
            const response = await fetch('/paypal/success', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken, // Include the CSRF token
                },
                body: JSON.stringify({
                    orderID: data.orderID,
                    user_id: userId,         // Add user ID to the request
                    total_amount: amount     // Add total amount to the request
                })
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const result = await response.json();
            console.log("Order and Payment processed successfully", result);
        } catch (error) {
            console.error("Error processing order and payment", error);
        }
        

    if (error) {
        return <div>Error: {error}</div>;
    }
    }
    return (
        <>
        <PayPalButtons
            createOrder={(data, actions) => {
                return createOrder();
            }}
            onApprove={onApprove}
            onError={(err) => setError(err.message)}
        />
        </>
    );

};
export default PayPalButton;
