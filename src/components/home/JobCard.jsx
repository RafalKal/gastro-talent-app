import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import './jobcard.css';
import { FaSignInAlt } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import AuthContext from '/src/context/AuthProvider';
import { HiOutlineClock } from 'react-icons/hi';
import { TbPigMoney } from 'react-icons/tb';
import axios from 'axios';
import { BiCalendarCheck } from 'react-icons/bi';

function JobCard({jobId}) {
    const navigate = useNavigate();
    const [cookData, setCookData] = useState([]);
    const [userData, setUserData] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const userId = auth.id;
        axios.get(`http://localhost:8080/api/v1/users`, {
            headers: {
                'Authorization': `Bearer ${auth.token}` // Dodaj token do nagłówka
              } 
        })
        .then(response => {
            setUserData(response.data);
        })
        .catch(error => {
            console.error("Błąd pobierania danych", error);
        });

    }, [auth.id, auth.token]);

    useEffect(() => {
        const cookId = auth.id;
        axios.get(`http://localhost:8080/api/v1/cooks/by-user-id/${cookId}`, {
        headers: {
            'Authorization': `Bearer ${auth.token}`
            }
        })
        .then(response => {
            setCookData(response.data);
        })
        .catch(error => {
            console.error("Błąd przy pobieraniu danych", error);
        });
    }, [auth.id, auth.token]);

     const handleCardClick = () => {
         navigate(`/cooks/by-user-id/${jobId}`)
     }
    
    return (
        <Card className="custom-card-body" onClick={handleCardClick}>
            <Row>
                <Col md={9}>
                    <Card.Body>
                        <Card.Title className="jobTitle">{userData.firstname} {userData.lastname}</Card.Title>
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
                                    <Button className="jobDetails">Więcej</Button>
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