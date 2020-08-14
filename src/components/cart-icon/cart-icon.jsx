import React from "react";
import { connect } from "react-redux";

import { ToggleCartHidden } from "../../redux/cart/cart.action";
import { selectCartItemsCount } from "../../redux/cart/cart.selector";

import { ReactComponent as Shopping } from "../../assets/shopping-bag.svg";
import "./cart-icon.style.scss";

const CartIcon = ({ toggleCartHidden, itemCount }) => {
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <Shopping className="shopping-icon" />
            <span className="item-count">{itemCount}</span>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(ToggleCartHidden()),
});
const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
