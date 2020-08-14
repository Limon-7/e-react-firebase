import React, { Component } from "react";
import "./sign-up.style.scss";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { auth, createUserProfileDocument } from "../../utils/firebase.utils";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert("Password not same");
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            await createUserProfileDocument(user, { displayName });
            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.log(error);
        }
    };
    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">I haven't an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        handleChange={this.handleOnChange}
                        name="displayName"
                        value={displayName}
                        label="Display Name"
                        required
                    />

                    <FormInput
                        type="email"
                        handleChange={this.handleOnChange}
                        name="email"
                        value={email}
                        label="Email"
                        required
                    />
                    <FormInput
                        type="password"
                        handleChange={this.handleOnChange}
                        name="password"
                        value={password}
                        label="Password"
                        required
                    />
                    <FormInput
                        type="password"
                        handleChange={this.handleOnChange}
                        name="confirmPassword"
                        value={confirmPassword}
                        label="Confirm Password"
                        required
                    />
                    <CustomButton type="submit">SIGNUP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;
