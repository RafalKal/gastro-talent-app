import React, { useState } from "react";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import Swal from 'sweetalert2';

function Register() {

    const [state, setState] = useState({
        dateOfBirth: "",
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        role: "",

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
        const { dateOfBirth, email, firstname, lastname, password, role } = state;
        fetch("http://localhost:8080/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                firstname,
                lastname,
                dateOfBirth,
                role
            })
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: "Udało Ci się zarejestrować!",
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
                    window.location.reload();
                }, 5000);
            })
            .catch(error => {
                if (error.response.status === 400) {
                    alert("Błędne dane rejestracji");
                } else if (error.response.status === 500) {
                    alert("Błąd serwera");
                } else {
                    alert("Nieznany błąd");
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
                    name="firstname"
                    value={state.firstname}
                    onChange={handleChange}
                    placeholder="Imię"
                />
                <input
                    className="loginInput"
                    type="text"
                    name="lastname"
                    value={state.lastname}
                    onChange={handleChange}
                    placeholder="Nazwisko"
                />
                <input
                    className="loginInput"
                    type="date"
                    name="dateOfBirth"
                    value={state.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Data urodzenia"
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
                <select name="role" value={state.role} onChange={handleChange} className="loginInput">
                    <option value="" disabled selected hidden>Wybierz rolę</option>
                    <option value="POTENTIAL_EMPLOYEE">Pracownik</option>
                    <option value="POTENTIAL_EMPLOYER">Pracodawca</option>
                </select>
                <button className="loginButton">Zarejestruj się</button>
            </form>
        </div>
    );
}

export default Register;
