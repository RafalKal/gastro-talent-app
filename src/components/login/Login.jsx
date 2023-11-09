import React from "react";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

function Login() {

    const [state, setState] = React.useState({
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

        const { email, password } = state;
        alert(`Email: ${email} hasło: ${password}`);

        for (const key in state) {
            setState({
                ...state,
                [key]: ""
            });
        }
    };

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleOnSubmit} className="loginForm">
                <h1>Logowanie</h1>
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
                <span className="loginSpan">lub użyj swojego konta</span>
                <input
                    className="loginInput"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                />
                <input
                    className="loginInput"
                    type="password"
                    name="password"
                    placeholder="••••••••••"
                    value={state.password}
                    onChange={handleChange}
                />
                <a href="#" className="loginA">Zapomniałeś hasła?</a>
                <button className="loginButton">Zaloguj się</button>
            </form>
        </div>
    );
}

export default Login;
