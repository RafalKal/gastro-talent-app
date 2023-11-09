import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser, FaSignInAlt } from 'react-icons/fa';
import './navapp.css';

const NavApp = () => {
    return (
        <Navbar expand="sm" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#home">GastroTalent</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className="ms-3">Home</Nav.Link>
                        <Nav.Link href="/user" className="ms-3">User</Nav.Link>
                    </Nav>
                    <Nav.Link href="/login" className="me-3 login-link d-flex align-items-center">
                        <FaSignInAlt className="nav-icon" />
                        <span className="ms-1">Login</span>
                    </Nav.Link>
                    <Nav.Link href="/signup" className="me-3 signup-link d-flex align-items-center">
                        <FaUser className="nav-icon" />
                        <span className="ms-1">SignUp</span>
                    </Nav.Link>
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
