import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Dropdown, Button } from 'react-bootstrap';
import './home.css';
import JobCard from './JobCard';
import Filter from './Filter';
import axios from '../../api/axios';

function Home() {
    const [cooks, setCooks] = useState([]);

    useEffect(() => {
        const fetchCooksData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('JWT token is missing');
                    return;
                }

                const response = await axios.get('http://localhost:8080/api/v1/cooks/is-visible', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setCooks(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching cooks data:', error);
            }
        };

        fetchCooksData();
    }, []);
    return (
        <Container fluid className="px-4">
            <Row className="mt-5 topContainer ">
                <Col className="welcomeDiv">
                    <h2 className="padding-items1">
                        Znajdź <span className="blue-text">nową pracę</span> już dzisiaj!
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col className="welcomeDiv">
                    <p className="padding-items2">Tysiące ofert pracy czeka na Ciebie!</p>
                </Col>
            </Row>
            <Row className="searchTop">
                <InputGroup className="mb-3 inputSearch" >
                    <Form.Select aria-label="Default select example" >
                        <option >Jakiej pracy szukasz</option>
                        <option value="1">Kucharz</option>
                        <option value="2">Kelner</option>
                        <option value="3">Menedżer</option>
                        <option value="4">Tester</option>
                    </Form.Select>
                    <Form.Select aria-label="Default select example">
                        <option >Lokalizacja</option>
                        <option value="a">Praca zdalna</option>
                        <option value="b">Niedaleko mnie (5km)</option>
                        <option value="c">W zasięgu 10 km</option>
                        <option value="d">W zasięgu 25 km</option>
                        <option value="e">W zasięgu 50 km</option>
                    </Form.Select>
                    <Button>
                        Szukaj pracy
                    </Button>
                </InputGroup>
            </Row>
            <Row className="px-5 customFilterRow">
                <Filter /> {/* Filter component */}
                <Col>
                    <Row>
                        <Col xs={6}>
                            <h3 className="jobCount">3177 Ofert Pracy</h3>
                        </Col>
                        <Col xs={6} className="text-end">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Filtruj po
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Lokalizacja</Dropdown.Item>
                                    <Dropdown.Item>Wynagrodzenie</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        {cooks.map(cook => (
                            <JobCard key={cook.id} cookData={cook} />
                        ))}
                    </Row>
                    <div>Pagination</div>
                </Col>
                <Col className="col-3">
                    <div className="customEmail">
                        <h3>Email me for jobs</h3>
                        <p>Short description</p>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Subscribe
                            </Button>
                        </Form>
                    </div>
                </Col>

            </Row>
        </Container>
    );
}

export default Home