import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { SelectCurrentUser } from "../../redux/user/user.selector";

import { auth } from "../../utils/firebase.utils";

import "./header.style.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon";
import Cart from "../cart-dropdown/cart";

const Header = ({ currentUser, hidden }) => {
    console.log("Hidden:", hidden);
    console.log("Currenuser:", currentUser);
    return (
        <div className="header">
            <Link to="/" className="logo-container">
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link className="option" to="/shop">
                    SHOP
                </Link>
                <Link className="option" to="/contact">
                    CONTACT
                </Link>
                {currentUser ? (
                    <div className="option" onClick={() => auth.signOut()}>
                        SIGNOUT
                    </div>
                ) : (
                    <Link className="option" to="/signin">
                        SIGNIN
                    </Link>
                )}

                <CartIcon />
            </div>
            {hidden ? null : <Cart />}
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: SelectCurrentUser,
    hidden: selectCartHidden,
});
export default connect(mapStateToProps)(Header);
