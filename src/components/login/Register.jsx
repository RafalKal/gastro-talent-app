import React from "react";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

function Register() {

    const [state, setState] = React.useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleOnSubmit = evt => {
        evt.preventDefault();

        const { name, email, password } = state;
        alert(
            `Imie: ${name} email: ${email} hasło: ${password}`
        );

        for (const key in state) {
            setState({
                ...state,
                [key]: ""
            });
        }
    };

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={handleOnSubmit} className="loginForm">
                <h1>Rejestracja</h1>
                <div className="social-container">
                    <a href="#" className="social">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="social">
                        <FaGooglePlusG />
                    </a>
                    <a href="#" className="social">
                        <FaLinkedinIn />
                    </a>
                </div>
                <span className="loginSpan">lub użyj swój email do rejestracji</span>
                <input
                    className="loginInput"
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Imię"
                />
                <input
                    className="loginInput"
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    className="loginInput"
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Hasło"
                />
                <button className="loginButton">Zarejestruj się</button>
            </form>
        </div>
    );
}

export default Register;
