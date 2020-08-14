import React, { Component } from "react";
import "./signin.style.scss";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { auth, signInWithGoogleAuth } from "../../utils/firebase.utils";

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: "", password: "" });
        } catch (error) {
            console.log("Something went wrong");
        }
    };
    handleOnChange = (event) => {
        const { value, name } = event.target;
        // dynamically set value
        this.setState({ [name]: value });
    };
    render() {
        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        value={this.state.email}
                        required
                        handleChange={this.handleOnChange}
                        label="Email"
                    />

                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        required
                        handleChange={this.handleOnChange}
                        password="Password"
                        label="Password"
                    />

                    <div className="buttons">
                        <CustomButton type="submit" value="Submit form">
                            Signin
                        </CustomButton>
                        <CustomButton
                            onClick={signInWithGoogleAuth}
                            isGoogleSignIn
                        >
                            Signin With Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default Signin;
