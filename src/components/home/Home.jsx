import React, {useState } from 'react'
import { Container, Row, Col, Form, InputGroup, Dropdown, Button } from 'react-bootstrap';
import './home.css';
import JobCard from './JobCard';
import Filter from './Filter';

function Home() {

    const [searchText, setSearchText] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);

    const handleSearchButtonClick = () => {
        // Tutaj dodaj logikę filtrowania na podstawie searchText
        // Aktualizuj stan filteredJobs
        // Możesz użyć metody .filter() do porównania tekstu z danymi job

        // Przykładowa implementacja (dostosuj do struktury danych w JobCard):
        const filtered = allJobs.filter(job => job.title.includes(searchText));
        setFilteredJobs(filtered);
    };
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
                <InputGroup className="mb-3 inputSearch">
                    <Form.Control
                        type="text"
                        placeholder="Jakiej pracy szukasz"
                        aria-label="Job search input"
                        aria-describedby="basic-addon1"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button onClick={handleSearchButtonClick}>
                        Szukaj
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
                    <JobCard /> {/* Card component */}
                    <JobCard /> {/* Card component */}
                    <JobCard /> {/* Card component */}
                    <JobCard /> {/* Card component */}
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