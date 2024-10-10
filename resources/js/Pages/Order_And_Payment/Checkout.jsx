import React from 'react';
import PayPalButton from '@/Components/PayPalButton';

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Checkout = () => {
    const amount = 0.5 // dynamic amount

    return (
        <div>
            <h2>Checkout</h2>
            <PayPalScriptProvider options={{ "client-id": "AYolWC1EtQxbXggy-aGU_QQl7VI-3ay8trypcrdAXdUmblMSX_tONcxyvGGuzgbT5a2y_V0SSMo08Pru" }}>
                <PayPalButton amount={amount} />
            </PayPalScriptProvider>
        </div>
    );
};

export default Checkout;
