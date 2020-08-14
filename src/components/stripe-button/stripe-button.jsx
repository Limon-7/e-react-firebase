import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishKey =
        "pk_test_51HFNDmAijnAOz4v0oz9DxmIRWq13Mqoht7CLg19sCW25FPBNpfWJWDw9wyUTfo8hHOb0ep8Pwvx3jF2s7ESjEwTw00Qpz2ZyA0";
    const onToken = (token) => {
        console.log("payment sucessfull", token);
        alert("successfull");
    };
    return (
        <StripeCheckout
            label="Pay Now"
            name="Eshop.ltd"
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your Total Price is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishKey}
        />
    );
};

export default StripeCheckoutButton;
