
import React, { useState } from 'react';
import PayPalButton from '@/Components/PayPalButton';
import TextInput from '@/Components/TextInput';


import { PayPalScriptProvider } from "@paypal/react-paypal-js";



const PaymentProcess = () => {
    const [step, setStep] = useState(1); // Step state controls which card is interactive
    const [orderAmount, setOrderAmount] = useState('');
    const [orders, setOrders] = useState([]);

    
    // Generate random amount
    const generateRandomAmount = () => {
        const randomAmount = (Math.random() * (5000 - 1) + 1).toFixed(2);
        setOrderAmount(randomAmount);
    };

    // Confirm order
    const confirmOrder = () => {
        if (orderAmount) {
            setOrders([...orders, { id: orders.length + 1, amount: orderAmount }]);
            setStep(2); // Unlock step 2 (Order Bill/Checkout)
        }
    };

    // Proceed to payment
    const proceedToPayment = () => {
        setStep(3); // Unlock step 3 (Payment Method)
    };

 // Payment Success
    const handlePayment=()=>{
        alert('Payment successful!');
        // Reset the entire process 
        setStep(1);
        setOrders([]);
        setOrderAmount('');
    }

    return (
        <div className="container mx-auto mt-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Order Card */}
            {/* <form action="orders" method="post"> */}
                <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Create an Order</h2>
                    <TextInput
                        type="number"
                        className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Amount"
                        value={orderAmount}
                        onChange={(e) => setOrderAmount(e.target.value)}
                        disabled={step > 1} // Disable input once order is confirmed
                    />
                    {/* <input
                        type="number"
                        className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Amount"
                        value={orderAmount}
                        onChange={(e) => setOrderAmount(e.target.value)}
                        disabled={step > 1} // Disable input once order is confirmed
                    /> */}
                    <div className="flex space-x-4">
                        <button
                            onClick={generateRandomAmount}
                            className={`bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-all duration-300 ${
                                step > 1 && 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={step > 1} // Disable once order is confirmed
                        >
                            Generate Random Amount
                        </button>
                        <button
                            onClick={confirmOrder}
                            className={`bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition-all duration-300 ${
                                step > 1 && 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={step > 1} // Disable once order is confirmed
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>
            {/* </form> */}

                {/* Order Bill/Checkout Card */}
                <div className={`bg-white shadow-lg rounded-lg p-6 transition-transform transform ${step >= 2 ? 'hover:scale-105' : ''}`}>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Bill</h2>
                    {orders.length > 0 ? (
                        <ul className="space-y-2">
                            {orders.map((order) => (
                                <li key={order.id} className="bg-gray-100 p-2 rounded shadow">
                                    Order #{order.id}: <span className="font-semibold">${order.amount}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No orders yet.</p>
                    )}
                    <button
                        onClick={proceedToPayment}
                        className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-all duration-300 ${
                            step < 2 && 'opacity-50 cursor-not-allowed'
                        }`}
                        disabled={step < 2} // Disable until the order is confirmed
                    >
                        Proceed to Payment
                    </button>
                </div>

                {/* Payment Method Card */}
                <div className={`bg-white shadow-lg rounded-lg p-6 transition-transform transform ${step >= 3 ? 'hover:scale-105' : ''}`}>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Method</h2>
                    {step >= 3 ? (
                        <>
                           
                           <PayPalScriptProvider options={{ "client-id": "AYolWC1EtQxbXggy-aGU_QQl7VI-3ay8trypcrdAXdUmblMSX_tONcxyvGGuzgbT5a2y_V0SSMo08Pru" }}>
                               totol amount is {orderAmount} in USD
                                <PayPalButton amount={orderAmount} />
                            </PayPalScriptProvider>

                        </>
                    ) : (
                        <p className="text-gray-500">Complete the order and checkout to proceed with payment.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentProcess;


// import React, { useState } from "react";
// import OrderCard from "@/Components/OrderCard";
// import CheckoutCard from "@/Components/CheckoutCard";
// import PaymentMethodCard from "@/Components/PaymentMethodCard";


// const PaymentProcess = () => {

//     const [step, setStep] = useState(1); // Controls which card is visible
//     const [orders, setOrders] = useState([]); // List of created orders
//     const [totalAmount, setTotalAmount] = useState(0); // Total amount of orders
//     const [paymentStatus, setPaymentStatus] = useState(null); // Track payment status
    
//     // Move to the next step
//     const nextStep = () => setStep((prevStep) => prevStep + 1);

//     // Add a new order
//     const addOrder = (amount) => {
//         const newOrder = { id: orders.length + 1, amount };
//         setOrders([...orders, newOrder]);
//         setTotalAmount((prevAmount) => prevAmount + amount);
//     };
    
//   return (
//     <>
//      <div className="container mx-auto p-4 flex justify-between space-x-4">
//             {/* Order Card */}
//             {step === 1 && <OrderCard addOrder={addOrder} nextStep={nextStep} />}
            
//             {/* Checkout Card */}
//             {step === 2 && (
//                 <CheckoutCard orders={orders} totalAmount={totalAmount} nextStep={nextStep} />
//             )}

//             {/* Payment Method Card */}
//             {step === 3 && (
//                 <PaymentMethodCard totalAmount={totalAmount} setPaymentStatus={setPaymentStatus} />
//             )}

//             {/* Payment Success */}
//             {paymentStatus === "success" && (
//                 <div className="w-full p-6 bg-green-500 text-white rounded-lg shadow-lg">
//                     <h2 className="text-xl font-bold">Payment Successful!</h2>
//                     <p>Thank you for your payment of ${totalAmount.toFixed(2)}.</p>
//                 </div>
//             )}
//         </div>
//     </>
//   )
// }

// export default PaymentProcess



