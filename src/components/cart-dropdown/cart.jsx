import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { selectCartItems } from "../../redux/cart/cart.selector";
import { ToggleCartHidden } from "../../redux/cart/cart.action";

import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";
import "./cart.style.scss";
const Cart = ({ cartItems, history, dispatch }) => {
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {cartItems.length ? (
                    cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                ) : (
                    <span className="empty-message">Your Cart is empty</span>
                )}
            </div>
            <CustomButton
                onClick={() => {
                    history.push("/checkout");
                    dispatch(ToggleCartHidden());
                }}
            >
                Go To CheckOut
            </CustomButton>
        </div>
    );
};
const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state),
});
export default withRouter(connect(mapStateToProps)(Cart));
