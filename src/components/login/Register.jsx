import { useRef, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import axios from "../../api/axios";

const USER_REGEX = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ][a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const NIP_REGEX = /^[0-9]{10}$/;
const REGON_9_REGEX = /^[0-9]{9}$/;
const REGON_14_REGEX = /^[0-9]{14}$/;

const REGISTER_URL = "/api/v1/auth/register";
const Register = () => {

    const userRef = useRef();

    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);
    const [FirstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);
    const [LastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [birth, setBirth] = useState("");
    const [validBirth, setValidBirth] = useState(false);
    const [birthFocus, setBirthFocus] = useState(false);

    const [role, setRole] = useState("");
    const [validRole, setValidRole] = useState(false);
    const [roleFocus, setRoleFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [companyName, setCompanyName] = useState("");
    const [validCompanyName, setValidCompanyName] = useState(false);
    const [companyNameFocus, setCompanyNameFocus] = useState(false);

    const [nip, setNip] = useState("");
    const [validNip, setValidNip] = useState(false);
    const [nipFocus, setNipFocus] = useState(false);

    const [regon, setRegon] = useState("");
    const [validRegon, setValidRegon] = useState(false);
    const [regonFocus, setRegonFocus] = useState(false);

    const [dateEstablishmentCompany, setDateEstablishmentCompany] = useState("");
    const [validDateEstablishmentCompany, setValidDateEstablishmentCompany] = useState(false);
    const [dateEstablishmentCompanyFocus, setDateEstablishmentCompanyFocus] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(firstName);
        console.log('Valid First Name:', result);
        console.log('First Name:', firstName);
        setValidFirstName(result);
    }, [firstName]);

    useEffect(() => {
        const result = USER_REGEX.test(lastName);
        console.log(result);
        console.log(lastName);
        setValidLastName(USER_REGEX.test(lastName));
    }, [lastName]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        const isValidDate = birth !== "";
        const currentDate = new Date();
        const selectedDate = new Date(birth);
        const isDateValid = selectedDate <= currentDate;
        setValidBirth(isValidDate && isDateValid);
    }, [birth]);

    useEffect(() => {
        console.log(role);
    }, [role]);

    useEffect(() => {
        setValidCompanyName(USER_REGEX.test(companyName));
    }, [companyName]);

    useEffect(() => {
        setValidNip(NIP_REGEX.test(nip));
    }, [nip]);

    useEffect(() => {
        const isRegon9 = REGON_9_REGEX.test(regon);
        const isRegon14 = REGON_14_REGEX.test(regon);

        setValidRegon(isRegon9 || isRegon14);
    }, [regon]);

    useEffect(() => {
        const isValidDate = dateEstablishmentCompany !== "";
        const currentDate = new Date();
        const selectedDate = new Date(dateEstablishmentCompany);
        const isDateValid = selectedDate <= currentDate;
        setValidDateEstablishmentCompany(isValidDate && isDateValid);
    }, [dateEstablishmentCompany]);


    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
        console.log(matchPassword);
    }, [password, matchPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let userData = {
                email,
                password,
                role,
            };

            if (role === "POTENTIAL_EMPLOYEE") {
                userData = {
                    ...userData,
                    firstname: firstName,
                    lastname: lastName,
                    dateOfBirth: birth,
                };
            } else if (role === "POTENTIAL_EMPLOYER") {
                userData = {
                    ...userData,
                    nip,
                    dateEstablishmentCompany,
                    companyName,
                    regon,
                };
            }
            console.log(userData);
            const response = await axios.post(REGISTER_URL, JSON.stringify(userData), {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Rejestracja udana!',
                text: 'Teraz możesz się zalogować.',
            });
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (err) {
            if (!err?.response) {
                setErrorMsg("Brak odpowiedzi serwera");
            } else if (err.response?.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Błąd',
                    text: 'Email jest już zajęty',
                });
            } else if (err.response?.status === 409) {
                Swal.fire({
                    icon: 'error',
                    title: 'Błąd',
                    text: 'Błąd rejestracji',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Błąd',
                    text: 'Błąd',
                });
            }
        }
    };

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={handleSubmit} className="loginForm">
                <h1>Rejestracja</h1>
                <label htmlFor="role">
                    Rola
                    {validRole && (
                        <FontAwesomeIcon icon={faCheck} className="valid loginIcons" />
                    )}
                    {!validRole && role && (
                        <FontAwesomeIcon icon={faTimes} className={role ? "invalid" : "hide"} />
                    )}
                </label>
                <select
                    name="role"
                    value={role}
                    ref={userRef}
                    onChange={(e) => {
                        setRole(e.target.value);
                        setValidRole(e.target.value !== "");
                    }}
                    className="loginInput"
                    required
                    aria-invalid={!validRole}
                    aria-describedby="roleNote"
                    onFocus={() => setRoleFocus(true)}
                    onBlur={() => setRoleFocus(false)}
                >
                    <option value="" disabled hidden>
                        Wybierz rolę
                    </option>
                    <option value="POTENTIAL_EMPLOYEE">Employee</option>
                    <option value="POTENTIAL_EMPLOYER">Employer</option>
                </select>
                <p id="roleNote" className={roleFocus && role && !validRole ? "instructions" : "offscreen"}>
                    {!validRole && role && (
                        <>
                            <FontAwesomeIcon icon={faTimes} className="invalid" />
                            <span id="registerFormSpan">Wybierz rolę</span>
                        </>
                    )}
                </p>

                {role === "POTENTIAL_EMPLOYEE" && (
                    <>
                        <label htmlFor="firstName">
                            Imię
                            {validFirstName && (
                                <FontAwesomeIcon icon={faCheck} className="valid" />
                            )}
                            {!validFirstName && firstName && (
                                <FontAwesomeIcon icon={faTimes} className={firstName ? "invalid" : "hide"} />
                            )}
                        </label>
                        <input
                            className="loginInput"
                            type="text"
                            id="firstName"
                            autoComplete="off"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required
                            aria-invalid={validFirstName ? "false" : "true"}
                            aria-describedby="firstNameNote"
                            onFocus={() => setFirstNameFocus(true)}
                            onBlur={() => setFirstNameFocus(false)}
                        /><p id="firstNameNote" className={FirstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                            {!validFirstName && firstName && (
                                <>
                                    <span id="registerFormSpan">Imię musi mieć co najmniej 4 znaki</span>
                                </>
                            )}
                        </p>


                        <label htmlFor="email">
                            Nazwisko
                            {validLastName && (
                                <FontAwesomeIcon icon={faCheck} className="valid" />
                            )}
                            {!validLastName && lastName && (
                                <FontAwesomeIcon icon={faTimes} className={lastName ? "invalid" : "hide"} />
                            )}
                        </label>
                        <input
                            className="loginInput"
                            type="text"
                            id="lastName"
                            autoComplete="off"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required
                            aria-invalid={validLastName ? "false" : "true"}
                            aria-describedby="lastNameNote"
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={() => setLastNameFocus(false)}
                        />
                        <p id="lastNameNote" className={LastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                            {!validLastName && lastName && (
                                <>
                                    <span id="registerFormSpan">Nazwisko musi mieć co najmniej 4 znaki</span>
                                </>
                            )}
                        </p>


                        <label htmlFor="email">
                            Email
                            {validEmail && (
                                <FontAwesomeIcon icon={faCheck} className="valid" />
                            )}
                            {!validEmail && email && (
                                <FontAwesomeIcon icon={faTimes} className={email ? "invalid" : "hide"} />
                            )}
                        </label>
                        <input
                            className="loginInput"
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailNote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailNote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                            {!validEmail && email && (
                                <>
                                    <span id="registerFormSpan">Email musi być w formacie example@example.com</span>
                                </>
                            )}
                        </p>


                        <label htmlFor="birth">
                            Data urodzenia
                            {validBirth && (
                                <FontAwesomeIcon icon={faCheck} className="valid" />
                            )}
                            {!validBirth && birth && (
                                <FontAwesomeIcon icon={faTimes} className="invalid" />
                            )}
                        </label>
                        <input
                            className="loginInput"
                            type="date"
                            id="birth"
                            autoComplete="off"
                            onChange={(e) => setBirth(e.target.value)}
                            value={birth}
                            required
                            aria-invalid={validBirth ? "false" : "true"}
                            aria-describedby="birthNote"
                            onFocus={() => setBirthFocus(true)}
                            onBlur={() => setBirthFocus(false)}
                        />
                        <p id="birthNote" className={birthFocus && birth && !validBirth ? "instructions" : "offscreen"}>
                            {!validBirth && birth && (
                                <>
                                    <span id="registerFormSpan">Data urodzenia nie może być w przyszłości</span>
                                </>
                            )}
                        </p>


                        <label htmlFor="password">
                            Hasło
                            {validPassword && (
                                <FontAwesomeIcon icon={faCheck} className="valid" />
                            )}
                            {!validPassword && password && (
                                <FontAwesomeIcon icon={faTimes} className={password ? "invalid" : "hide"} />

                            )}
                        </label>
                        <input
                            className="loginInput"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="passwordNote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="passwordNote" className={passwordFocus && password && !validPassword ? "instructions" : "offscreen"}>
                            {!validPassword && password && (
                                <>
                                    <span id="registerFormSpan">Hasło musi się składać z co najmniej 8 słów, 1 dużego wyrazu oraz 1 cyfry</span>
                                </>
                            )}
                        </p>


                        <label htmlFor="confirmPassword">
                            Potwierdź hasło
                            {validMatch && matchPassword && (
                                <FontAwesomeIcon icon={faCheck} className="valid" />
                            )}
                            {!validMatch && matchPassword && (
                                <FontAwesomeIcon icon={faTimes} className="invalid" />
                            )

                            }
                        </label>
                        <input
                            className="loginInput"
                            type="password"
                            id="confirmPassword"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmNote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmNote" className={matchFocus && matchPassword && !validMatch ? "instructions" : "offscreen"}>
                            {!validMatch && matchPassword && (
                                <>
                                    <span id="registerFormSpan">Hasla muszą się zgadzać</span>
                                </>
                            )}
                        </p>
                        <button disabled={!validFirstName || !validLastName || !validEmail || !validBirth || !validPassword || !validMatch || !validRole ? true : false} className="loginButton">Zarejestruj się</button>
                    </>
                )}

                {role === "POTENTIAL_EMPLOYER" && (
                    <>
                        <label htmlFor="email">
                            Email
                            {validEmail && (
                                <FontAwesomeIcon icon={faCheck} className="valid" />
                            )}
                            {!validEmail && email && (
                                <FontAwesomeIcon icon={faTimes} className={email ? "invalid" : "hide"} />
                            )}
                        </label>
                        <input
                            className="loginInput"
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailNote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailNote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                            {!validEmail && email && (
                                <>
                                    <span id="registerFormSpan">Email musi być w formacie example@example.com</span>
                                </>
                            )}
                        </p>


                        <label htmlFor="companyName">
                            Nazwa Firmy
                            {validCompanyName && (
                                <FontAwesomeIcon icon={faCheck} className="valid" />
                            )}
                            {!validCompanyName && companyName && (
                                <FontAwesomeIcon icon={faTimes} className={companyName ? "invalid" : "hide"} />
                            )}
                        </label>
                        <input
                            className="loginInput"
                            type="text"
                            id="companyName"
                            autoComplete="off"
                            onChange={(e) => setCompanyName(e.target.value)}
                            value={companyName}
                            required
                            aria-invalid={validCompanyName ? "false" : "true"}
                            aria-describedby="companyNameNote"
                            onFocus={() => setCompanyNameFocus(true)}
                            onBlur={() => setCompanyNameFocus(false)}
                        />
                        <p id="companyNameNote" className={companyNameFocus && companyName && !validCompanyName ? "instructions" : "offscreen"}>
                            {!validCompanyName && companyName && (
                                <>
                                    <span id="registerFormSpan">Nazwa firmy musi mieć co najmniej 4 słowa</span>
                                </>
                            )}
                        </p>


                        <label htmlFor="regon">
                            Numer REGON
                            {validRegon && (
                                <FontAwesomeIcon icon={faCheck} className="valid" />
                            )}
                            {!validRegon && regon && (
                                <FontAwesomeIcon icon={faTimes} className={regon ? "invalid" : "hide"} />
                            )}
                        </label>
                        <input
                            className="loginInput"
                            type="text"
                            id="regon"
                            autoComplete="off"
                            onChange={(e) => setRegon(e.target.value)}
                            value={regon}
                            required
                            aria-invalid={!validRegon}
                            aria-describedby="regonNote"
                            onFocus={() => setRegonFocus(true)}
                            onBlur={() => setRegonFocus(false)}
                        />
                        <p id="regonNote" className={regonFocus && regon && !validRegon ? "instructions" : "offscreen"}>
                            {!validRegon && regon && (
                                <>
                                    <span id="registerFormSpan">Numer REGON musi składać się z 9 lub 14 cyfr</span>
                                </>
                            )}
                        </p>


                        <label htmlFor="dateEstablishmentCompany">
                            Data założenia firmy
                            {validDateEstablishmentCompany && (
                                <FontAwesomeIcon icon={faCheck} className="valid" />
                            )}
                            {!validDateEstablishmentCompany && dateEstablishmentCompany && (
                                <FontAwesomeIcon icon={faTimes} className="invalid" />
                            )}
                        </label>
                        <input
                            className="loginInput"
                            type="date"
                            id="dateEstablishmentCompany"
                            autoComplete="off"
                            onChange={(e) => setDateEstablishmentCompany(e.target.value)}
                            value={dateEstablishmentCompany}
                            required
                            aria-invalid={!validDateEstablishmentCompany}
                            aria-describedby="dateEstablishmentCompanyNote"
                            onFocus={() => setDateEstablishmentCompanyFocus(true)}
                            onBlur={() => setDateEstablishmentCompanyFocus(false)}
                        />
                        <p id="dateEstablishmentCompanyNote" className={dateEstablishmentCompanyFocus && dateEstablishmentCompany && !validDateEstablishmentCompany ? "instructions" : "offscreen"}>
                            {!validDateEstablishmentCompany && dateEstablishmentCompany && (
                                <>
                                    <span id="registerFormSpan">Data założenia firmy nie może być w przyszłości</span>
                                </>
                            )}
                        </p>


                        <label htmlFor="nip">
                            NIP
                            {validNip && (
                                <FontAwesomeIcon icon={faCheck} className="valid" />
                            )}
                            {!validNip && nip && (
                                <FontAwesomeIcon icon={faTimes} className={nip ? "invalid" : "hide"} />
                            )}
                        </label>
                        <input
                            className="loginInput"
                            type="text"
                            id="nip"
                            autoComplete="off"
                            onChange={(e) => setNip(e.target.value)}
                            value={nip}
                            required
                            aria-invalid={validNip ? "false" : "true"}
                            aria-describedby="nipNote"
                            onFocus={() => setNipFocus(true)}
                            onBlur={() => setNipFocus(false)}
                        />
                        <p id="nipNote" className={nipFocus && nip && !validNip ? "instructions" : "offscreen"}>
                            {!validNip && nip && (
                                <>
                                    <span id="registerFormSpan">NIP musi składać się z cyfr, oraz być długi na 10 słów</span>
                                </>
                            )}
                        </p>


                        <label htmlFor="password">
                            Hasło
                            {validPassword && (
                                <FontAwesomeIcon icon={faCheck} className="valid" />
                            )}
                            {!validPassword && password && (
                                <FontAwesomeIcon icon={faTimes} className={password ? "invalid" : "hide"} />

                            )}
                        </label>
                        <input
                            className="loginInput"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="passwordNote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="passwordNote" className={passwordFocus && password && !validPassword ? "instructions" : "offscreen"}>
                            {!validPassword && password && (
                                <>
                                    <span id="registerFormSpan">Hasło musi się składać z co najmniej 8 słów, 1 dużego wyrazu oraz 1 cyfry</span>
                                </>
                            )}
                        </p>


                        <label htmlFor="confirmPassword">
                            Potwierdź hasło
                            {validMatch && matchPassword && (
                                <FontAwesomeIcon icon={faCheck} className="valid" />
                            )}
                            {!validMatch && matchPassword && (
                                <FontAwesomeIcon icon={faTimes} className="invalid" />
                            )

                            }
                        </label>
                        <input
                            className="loginInput"
                            type="password"
                            id="confirmPassword"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmNote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmNote" className={matchFocus && matchPassword && !validMatch ? "instructions" : "offscreen"}>
                            {!validMatch && matchPassword && (
                                <>
                                    <span id="registerFormSpan">Hasla muszą się zgadzać</span>
                                </>
                            )}
                        </p>

                        <button disabled={!validEmail || !validPassword || !validMatch || !validRole || !validCompanyName || !validDateEstablishmentCompany || !validNip || !validRegon ? true : false} className="loginButton">Zarejestruj się</button>
                    </>
                )}

            </form>
        </div>
    );
}

export default Register;