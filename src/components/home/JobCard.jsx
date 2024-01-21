import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import './jobcard.css';
import { GrLocation } from 'react-icons/gr';
import { HiOutlineClock } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function JobCard({ cookData, userData }) {
    const navigate = useNavigate();

    const handleMoreClick = () => {
        navigate(`/cook/${cookData.id}`);
    };

    function formatYearsOfExperience(years) {
        if (years === 1) {
            return `${years} rok`;
        } else if (years > 1 && years < 5) {
            return `${years} lata`;
        } else {
            return `${years} lat`;
        }
    }

    return (
        <Card className="custom-card-body">
            <Row>
                <Col md={9}>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <Card.Title className="jobTitle">{cookData.profession}</Card.Title>
                            <Button className="jobDetails" onClick={handleMoreClick}>Więcej</Button>
                        </div>
                        <p className="jobName">Imie i Nazwisko: {cookData.user?.firstname} {cookData.user?.lastname}</p>
                        <div className="job-details">
                            <Row className="job-info ps-0">
                                <Col md={12}>
                                    <GrLocation className="nav-icon mb-1 pw-1 " />
                                    <span className="iconText">
                                        Miasto: {cookData.user?.address?.city ?? 'Brak danych'}
                                    </span>
                                </Col>
                            </Row>
                            <Row className="job-info ps-0">
                                <Col md={12}>
                                    <HiOutlineClock className="nav-icon mb-1" />
                                    <span className="iconText">Doświadczenie: {formatYearsOfExperience(cookData.yearsOfExperience)}</span>
                                </Col>
                            </Row>
                        </div>
                        <p className="aboutJob">
                            Popisowe danie: {cookData.signatureDishes?.map((dish, index) => (
                                <span key={index}>{(index ? ', ' : '') + dish}</span>
                            ))}
                        </p>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default JobCard;
