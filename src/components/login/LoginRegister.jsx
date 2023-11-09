import React, { useState } from 'react';
import './styles.css';
import Login from './Login';
import Register from './Register';

const LoginRegister = () => {
    const [type, setType] = useState("signIn");

    const handleOnClick = text => {
        if (text !== type) {
            setType(text);
            return;
        }
    };

    const containerClass =
        "container loginContainer " + (type === "signUp" ? "right-panel-active" : "");

    return (
        <div className="Login">
            <div className={containerClass} id="loginContainer">
                <Register />
                <Login />
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Witaj z powrotem!</h1>
                            <p className="loginP">
                                Żeby przejść do strony, zaloguj się
                            </p>
                            <button
                                className="ghost"
                                id="signIn"
                                onClick={() => handleOnClick("signIn")}
                            >
                                Logowanie
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Witaj!</h1>
                            <p className="loginP">Zarejestruj się i rozpocznij z nami nową przygodę</p>
                            <button
                                className="ghost"
                                id="signUp"
                                onClick={() => handleOnClick("signUp")}
                            >
                                Rejestracja
                            </button>
                        </div>
                    </div>
                </div>
            </div>            <a href="/" className="loginButton mt-3">Strona glówna, na szybko button</a>
        </div>
    );
};

export default LoginRegister;
