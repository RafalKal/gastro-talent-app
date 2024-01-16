import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Link } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser, FaSignInAlt } from 'react-icons/fa';
import AuthContext from '../../context/AuthProvider';
import RequireAuth from '../RequireAuth';
import "./navapp.css"

const NavApp = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        navigate('/login');
    }


    return (
        <Navbar expand="sm" className="bg-body-tertiary">
            <Container fluid className="navContainer">
                <Navbar.Brand href="#home">GastroTalent</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="ms-3">Home</Nav.Link>
                    </Nav>
                    {auth?.role === 'ADMIN' && (
                        <NavDropdown
                            title="Admin"
                            id="basic-nav-dropdown"
                            className="ms-0 me-3"
                            align="end"
                        >
                            <NavDropdown.Item href="/admin">Strona admina</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>Wyloguj się</NavDropdown.Item>
                        </NavDropdown>
                    )}

                    {auth?.role === 'POTENTIAL_EMPLOYEE' && (
                        <NavDropdown
                            title="Pracownik"
                            id="basic-nav-dropdown"
                            className="ms-0 me-3"
                            align="end"
                        >
                            <NavDropdown.Item href="/user">Strona pracownika</NavDropdown.Item>
                            <NavDropdown.Item href="/profession">Profesja</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>Wyloguj się</NavDropdown.Item>
                        </NavDropdown>
                    )}

                    {auth?.role === 'POTENTIAL_EMPLOYER' && (
                        <NavDropdown
                            title="Pracodawca"
                            id="basic-nav-dropdown"
                            className="ms-0 me-3"
                            align="end"
                        >
                            <NavDropdown.Item href="/employer">Strona pracodawcy</NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>Wyloguj się</NavDropdown.Item>
                        </NavDropdown>
                    )}

                    {!auth?.role && (
                        <Nav.Link href="/login" className="me-3 signup-link d-flex align-items-center">
                            <FaUser className="nav-icon" />
                            <span className="ms-1">Login/SignUp</span>
                        </Nav.Link>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavApp

/* <NavDropdown
                            title={<IoChevronDown />}
                            id="basic-nav-dropdown"
                            className="menu-align-right ms-0 position-static"
                        >
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */
