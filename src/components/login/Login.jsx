import React, { useState, useRef, useEffect } from "react";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "../../api/axios";
const LOGIN_URL = '/api/v1/auth/authenticate'

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg("");
    }, [user, password]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ email: user, password }), {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(JSON.stringify(response?.data));

            const token = response?.data?.token;
            const role = response?.data?.role;
            const id = response?.data?.id;

            setAuth({ user, password, role, token, id });
            setUser("");
            setPassword("");

            localStorage.setItem("id", response?.data?.id);
            localStorage.setItem("role", response?.data?.role);
            localStorage.setItem("token", response?.data?.token);

            navigate(from, { replace: true });

        } catch (error) {
            if (!error?.response) {
                setErrorMsg("Brak odpowiedzi serwera");
            } else if (error.response?.status === 401) {
                setErrorMsg("Nieupoważniony");
            } else if (error.response?.status === 403) {
                setErrorMsg("Niepoprawne dane logowania");
            } else {
                setErrorMsg("Login nie zadziałał");
            }
            errorRef.current.focus();
        }
    }

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit} className="loginForm">
                <p ref={errorRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errorMsg} </p>
                <h1>Logowanie</h1>
                <input
                    className="loginInput1"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    ref={userRef}
                    required
                />
                <input
                    className="loginInput1"
                    type="password"
                    name="password"
                    placeholder="••••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <a href="/forgotpassword" className="loginA">Zapomniałeś hasła?</a>
                <button className="loginButton">Zaloguj się</button>
            </form>
        </div>
    );
}

export default Login;
