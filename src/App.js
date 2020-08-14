import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { SelectCurrentUser } from "./redux/user/user.selector";

import { setCurrentUser } from "./redux/user/user-action";
import { auth, createUserProfileDocument } from "./utils/firebase.utils";

import "./App.css";

import Hompage from "./pages/hompage/hompage";
import ShopPage from "./pages/shop/shop.page";
import Header from "./components/header/header";
import SigninSignup from "./pages/signin-signup/signin-signup";
import Checkout from "./pages/checkout/checkout";

class App extends Component {
    unsubscribeFromAuth = null;
    componentDidMount() {
        const { setCurrentUser } = this.props;
        // this an open subscription method. so we need not unsubscribe after component is closed.
        // onAuthStateChange()= adds an observer for changes to the user sign in state
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = createUserProfileDocument(userAuth);

                (await userRef).onSnapshot((snapshot) => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data(),
                    });
                });
            }
            setCurrentUser(userAuth);
        });
    }
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }
    render() {
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path="/" component={Hompage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route
                        path="/signin"
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to="/" />
                            ) : (
                                <SigninSignup />
                            )
                        }
                    />
                    <Route path="/checkout" component={Checkout} />
                </Switch>
            </div>
        );
    }
}
const mapStateToProps = createStructuredSelector({
    currentUser: SelectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
