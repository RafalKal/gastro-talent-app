// Importujemy potrzebne komponenty i funkcje
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Outlet, Link, } from 'react-router-dom';
import './sidebar.css';

const SidebarItem = ({ to, label }) => (
    <Nav.Link as={Link} to={to}>{label}</Nav.Link>
);

const SidebarPage = () => {
    return (
        <Container fluid className="adminContainer">
            <Row className="h-100">
                <Col md={3} className="bg-light sidebar h-100">
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <SidebarItem to="/admin" label="Strona admina" />
                        <SidebarItem to="/admin/users" label="Użytkownicy" />
                        <SidebarItem to="/admin/jobs" label="Lista prac" />
                        <SidebarItem to="/admin/profile" label="Profil admina" />
                    </Nav>
                </Col>

                <Col md={9} className="main-content h-100">
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
}

export default SidebarPage;