import React from "react";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import Swal from "sweetalert2";

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
        fetch("http://localhost:8080/api/v1/auth/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("id", data.id);
                localStorage.setItem("role", data.role);
                localStorage.setItem("token", data.token);
                Swal.fire({
                    title: "Witaj z powrotem!",
                    width: 600,
                    padding: "3em",
                    color: "#695F5F",
                    background: "#fff",
                    backdrop: `
                      url("../../src/assets/major.gif")
                      left top
                      no-repeat
                    `
                })
                setInterval(() => {
                    window.location.href = "/";
                }, 5000);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    alert("Niepoprawne dane logowania");
                } else if (error.response.status === 500) {
                    alert("Błąd serwera");
                }
            });

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
