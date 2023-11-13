import React, { useState } from 'react';
import './styles.css';
import Login from './Login';
import Register from './Register';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';



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
        <body className="loginBody">
            <Navbar expand="sm" className="bg-body-tertiary">
                <Container fluid className="navContainer">
                    <Navbar.Brand href="#">GastroTalent</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav.Link href="/" className="me-3 signup-link d-flex align-items-center">
                            <span className="ms-1">Strona główna</span>
                        </Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
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
                </div>
            </div>
        </body>
    );
};

export default LoginRegister;
