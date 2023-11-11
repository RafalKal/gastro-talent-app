import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './jobcard.css';
import { FaSignInAlt } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { HiOutlineClock } from 'react-icons/hi';
import { TbPigMoney } from 'react-icons/tb';
import { BiCalendarCheck } from 'react-icons/bi';

function JobCard() {
    return (
        <Card className="custom-card-body">
            <Row>
                <Col md={3} className="d-flex justify-content-center align-items-center" >
                    <Card.Img src="src/assets/major.jpeg" alt="Job Image" className="job-image" />
                </Col>
                <Col md={9}>
                    <Card.Body>
                        <Card.Title className="jobTitle">Szkolna 17</Card.Title>
                        <p className="jobName">Tester nitro </p>
                        <div className="job-details">
                            <Row className="job-info ps-0">
                                <Col md={12} >
                                    <GrLocation className="nav-icon mb-1 pw-1 " />
                                    <a className="iconText">Bruksela</a>
                                    <span className="mx-2 mw-5"></span>
                                    <HiOutlineClock className="nav-icon mb-1" />
                                    <a className="iconText">Pełny Etat</a>
                                    <span className="mx-2"></span>
                                    <TbPigMoney className="nav-icon mb-1" />
                                    <a className="iconText">30 - 35K PLN</a>
                                    <span className="mx-2"></span>
                                    <BiCalendarCheck className="nav-icon mb-1" />
                                    <a className="iconText">1 dzień temu</a>
                                </Col>
                            </Row>
                        </div>
                        <p className="aboutJob">Zajebista praca, w akompaniamencie krzystofa kondonowicza testujesz smak nitro, zero przeciwskazań zapraszamy wszystkich chętnych</p>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default JobCard;