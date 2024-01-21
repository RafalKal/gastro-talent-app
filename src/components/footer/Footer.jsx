import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaYinYang } from 'react-icons/fa';
import './footer.css';

function Footer() {
    return (
        <footer>
            <Container fluid className="footerContainer">
                <Row>
                    <Col md={12} className="text-center mt-4">
                        <FaYinYang size={50} />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={12} className="text-center">
                        <p>GastroTalent</p>
                    </Col>
                </Row>
                <Row className="mt-5 justify-content-center">
                    <Col md={12} className="text-center">
                        <a href="#employers" className="mx-4 footer-link">Pracodawcy</a>
                        <span className="mx-5"></span>
                        <a href="#job" className=" mx-4 footer-link">Praca</a>
                        <span className="mx-5"></span>
                        <a href="#fast" className=" mx-4 footer-link">Pracownicy</a>
                        <span className="mx-5"></span>
                        <a href="#help" className=" mx-4 footer-link">Pomoc</a>
                        <span className="mx-5"></span>
                        <a href="#rights" className=" mx-4 footer-link">Prawa</a>
                    </Col>
                </Row>
                <Row className="mt-5 justify-content-center">
                    <Col className="text-center mb-3 mt-5">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                            <FaFacebook size={30} className="social-icon" />
                        </a>
                        <span className="mx-5"></span>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                            <FaInstagram size={30} className="social-icon" />
                        </a>
                        <span className="mx-5"></span>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                            <FaTwitter size={30} className="social-icon" />
                        </a>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <p>© 2023 GastroTalent</p>
                    </Col>
                </Row>
            </Container>
        </footer >
    );
}

export default Footer