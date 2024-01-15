import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import './jobcard.css';
import { FaSignInAlt } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { HiOutlineClock } from 'react-icons/hi';
import { TbPigMoney } from 'react-icons/tb';
import { BiCalendarCheck } from 'react-icons/bi';

function JobCard({jobId}) {
     const navigate = useNavigate();

     const handleCardClick = () => {
         navigate(`/jobs/${jobId}`)
     }
    
    return (
        <Card className="custom-card-body" onClick={handleCardClick}>
            <Row>
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
                                    <Button className="jobApply">Aplikuj</Button>
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