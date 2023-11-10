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

    const [errorMessages, setErrorMessages] = useState([]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setErrorMessages(prevErrors => prevErrors.filter(error => !error.includes(name)));
        setState({
            ...state,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = [];

        if (!state.firstname.trim()) {
            errors.push("Imię nie może być puste.");
        }

        if (!state.lastname.trim()) {
            errors.push("Nazwisko nie może być puste.");
        }

        if (!state.dateOfBirth) {
            errors.push("Data urodzenia nie może być pusta.");
        } else {
            const birthDate = new Date(state.dateOfBirth);
            const currentDate = new Date();

            if (birthDate >= currentDate) {
                errors.push("Data urodzenia musi być w przeszłości.");
            }
        }

        if (!state.email.trim()) {
            errors.push("Email nie może być pusty.");
        } else if (!/\S+@\S+\.\S+/.test(state.email)) {
            errors.push("Nieprawidłowy adres Email.");
        }

        if (!state.password.trim()) {
            errors.push("Hasło nie może być puste.");
        } else if (state.password.length < 8) {
            errors.push("Hasło musi mieć co najmniej 8 znaków.");
        } else if (!/[A-Z]/.test(state.password)) {
            errors.push("Hasło musi zawierać przynajmniej jedną wielką literę.");
        } else if (!/\d/.test(state.password)) {
            errors.push("Hasło musi zawierać przynajmniej jedną cyfrę.");
        }

        if (!state.role) {
            errors.push("Wybierz rolę.");
        } else if (!["POTENTIAL_EMPLOYEE", "POTENTIAL_EMPLOYER"].includes(state.role)) {
            errors.push("Wybierz poprawną rolę.");
        }

        setErrorMessages(errors);

        return errors.length === 0;
    };

    const handleOnSubmit = async (evt) => {
        evt.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const { dateOfBirth, email, firstname, lastname, password, role } = state;
            const response = await fetch("http://localhost:8080/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstname,
                    lastname,
                    dateOfBirth,
                    role,
                }),
            });

            if (!response.ok) {
                try {
                    const errorData = await response.json();
                    if (response.status === 400 && errorData.errors) {
                        const errorMessages = errorData.errors.map((error) => {
                            const [field, errorMessage] = error.split(": ");
                            switch (errorMessage) {
                                case "Last name cannot be blank":
                                    return `Nazwisko nie może być puste.`;
                                case "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit":
                                    return `Hasło musi mieć co najmniej 8 znaków i zawierać przynajmniej jedną małą literę, jedną dużą literę i jedną cyfrę.`;
                                case "First name cannot be blank":
                                    return `Imię nie może być puste.`;
                                case "Password cannot be blank":
                                    return `Hasło nie może być puste.`;
                                case "Date of birth cannot be null":
                                    return `Data urodzenia nie może być pusta.`;
                                case "Email already exists":
                                    return `Podany email już istnieje.`;
                                case "Invalid email address":
                                    return `Nieprawidłowy adres email.`;
                                default:
                                    return `${field}: ${errorMessage}`;
                            }
                        });
                        alert(`${errorMessages.join("\n")}`);
                        setErrorMessages(errorMessages);
                    }
                } catch (jsonError) {
                    console.error("Błąd parsowania JSON:", jsonError);
                    alert("Wystąpił nieprawidłowy format odpowiedzi z serwera.");
                }
            } else {
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
                    `,
                });

                setTimeout(() => {
                    window.location.reload();
                }, 3000);

                const emptyState = {};
                for (const key in state) {
                    emptyState[key] = "";
                }
                setState(emptyState);
                setErrorMessages([]);
            }
        } catch (error) {
            console.error("Wystąpił błąd:", error);
            alert("Wystąpił błąd. Spróbuj ponownie.");
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
                <span className="loginSpan">lub użyj swojego emaila do rejestracji</span>
                <input
                    className="loginInput"
                    type="text"
                    name="firstname"
                    value={state.firstname}
                    onChange={handleChange}
                    placeholder="Imię"
                />{errorMessages.filter(error => error.includes("Imię")).map((error, index) => (
                    <div key={index} className="error-container">
                        <p className="error-message">{error}</p>
                    </div>
                ))}
                <input
                    className="loginInput"
                    type="text"
                    name="lastname"
                    value={state.lastname}
                    onChange={handleChange}
                    placeholder="Nazwisko"
                /> {errorMessages.filter(error => error.includes("Nazwisko")).map((error, index) => (
                    <div key={index} className="error-container">
                        <p className="error-message">{error}</p>
                    </div>
                ))}
                <input
                    className="loginInput"
                    type="date"
                    name="dateOfBirth"
                    value={state.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Data urodzenia"
                />
                {errorMessages.filter(error => error.includes("Data urodzenia")).map((error, index) => (
                    <div key={index} className="error-container">
                        <p className="error-message">{error}</p>
                    </div>
                ))}
                <input
                    className="loginInput"
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {errorMessages.filter(error => error.includes("Email")).map((error, index) => (
                    <div key={index} className="error-container">
                        <p className="error-message">{error}</p>
                    </div>
                ))}
                <input
                    className="loginInput"
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Hasło"
                />
                {errorMessages.filter(error => error.includes("Hasło")).map((error, index) => (
                    <div key={index} className="error-container">
                        <p className="error-message">{error}</p>
                    </div>
                ))}
                <select name="role" value={state.role} onChange={handleChange} className="loginInput">
                    <option value="" disabled hidden>Wybierz rolę</option>
                    <option value="POTENTIAL_EMPLOYEE">Pracownik</option>
                    <option value="POTENTIAL_EMPLOYER">Pracodawca</option>
                </select>
                {errorMessages.filter(error => error.includes("Wybierz rolę")).map((error, index) => (
                    <div key={index} className="error-container">
                        <p className="error-message">{error}</p>
                    </div>
                ))}
                <button className="loginButton">Zarejestruj się</button>
            </form>
        </div>
    );
}

export default Register;
