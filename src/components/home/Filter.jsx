import React, { useState } from 'react'
import { Container, Row, Col, Form, InputGroup, Dropdown, Button, Card } from 'react-bootstrap';

function Filter() {
    const [selectedTab, setSelectedTab] = useState('hourly');

    const handleTabChange = (event) => {
        setSelectedTab(event.target.value);
    };
    return (
        <Col className="col-3">
            <div className="filtersSection">
                <h3 className="mb-3">Filtry &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                <Form className="FilterContainer">
                    <Form.Group className="mb-3">
                        <Form.Label className="titleForm">Lokalizacja &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                        <Form.Check name="location" className="checkElements" label="Praca zdalna" type="radio" />
                        <Form.Check name="location" className="checkElements" label="Niedaleko (5 km)" type="radio" />
                        <Form.Check name="location" className="checkElements" label="W zasięgu 10 km" type="radio" />
                        <Form.Check name="location" className="checkElements" label="W zasięgu 25 km" type="radio" />
                        <Form.Check name="location" className="checkElements" label="W zasięgu 50 km" type="radio" />
                    </Form.Group>

                    {selectedTab === 'hourly' && (
                        <Form.Group className="mb-3">
                            <Form.Label className="titleForm">Wynagrodzenie &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Form.Label>
                            <Form.Select onChange={handleTabChange} value={selectedTab}>
                                <option value="hourly">Godzinowe</option>
                                <option value="monthly">Miesięczne</option>
                                <option value="yearly">Roczne</option>
                            </Form.Select>
                            <Form.Check name="hourlyStake" className="checkElements mt-3" label="Wszystkie" type="radio" />
                            <Form.Check name="hourlyStake" className="checkElements" label="21 PLN" type="radio" />
                            <Form.Check name="hourlyStake" className="checkElements" label="25 PLN" type="radio" />
                            <Form.Check name="hourlyStake" className="checkElements" label="35 PLN" type="radio" />
                            <Form.Check name="hourlyStake" className="checkElements" label="50 PLN" type="radio" />
                            <Form.Check name="hourlyStake" className="checkElements" label="75 PLN" type="radio" />
                        </Form.Group>
                    )}
                    {selectedTab === 'monthly' && (
                        <Form.Group className="mb-3">
                            <Form.Label className="titleForm">Wynagrodzenie &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Form.Label>
                            <Form.Select onChange={handleTabChange} value={selectedTab}>
                                <option value="hourly">Godzinowe</option>
                                <option value="monthly">Miesięczne</option>
                                <option value="yearly">Roczne</option>
                            </Form.Select>
                            <Form.Check name="hourlyStake" className="checkElements mt-3" label="Wszystkie" type="radio" />
                            <Form.Check name="monthlyStake" className="checkElements" label="3 500 PLN" type="radio" />
                            <Form.Check name="monthlyStake" className="checkElements" label="3 500 PLN" type="radio" />
                            <Form.Check name="monthlyStake" className="checkElements" label="4 000 PLN" type="radio" />
                            <Form.Check name="monthlyStake" className="checkElements" label="5 000 PLN" type="radio" />
                            <Form.Check name="monthlyStake" className="checkElements" label="8 000 PLN" type="radio" />
                        </Form.Group>
                    )}
                    {selectedTab === 'yearly' && (
                        <Form.Group className="mb-3">
                            <Form.Label className="titleForm">Wynagrodzenie &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Form.Label>
                            <Form.Select onChange={handleTabChange} value={selectedTab}>
                                <option value="hourly">Godzinowe</option>
                                <option value="monthly">Miesięczne</option>
                                <option value="yearly">Roczne</option>
                            </Form.Select>
                            <Form.Check name="yearlyStake" className="checkElements mt-3" label="Wszystkie" type="radio" />
                            <Form.Check name="yearlyStake" className="checkElements" label="42 000 PLN" type="radio" />
                            <Form.Check name="yearlyStake" className="checkElements" label="48 000 PLN" type="radio" />
                            <Form.Check name="yearlyStake" className="checkElements" label="60 000 PLN" type="radio" />
                            <Form.Check name="yearlyStake" className="checkElements" label="96 000 PLN" type="radio" />
                            <Form.Check name="yearlyStake" className="checkElements" label="96 000 PLN" type="radio" />
                        </Form.Group>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label name="publicationDate" className="titleForm">Data publikacji &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                        <Form.Check name="publicationDate" className="checkElements" label="24 godziny" type="radio" />
                        <Form.Check name="publicationDate" className="checkElements" label="3 dni" type="radio" />
                        <Form.Check name="publicationDate" className="checkElements" label="7 dni" type="radio" />
                        <Form.Check name="publicationDate" className="checkElements" label="21 dni" type="radio" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label name="employmentType" className="titleForm">Rodzaj zatrudnienia &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                        <Form.Check name="employmentType" className="checkElements" label="Tymczasowo" type="radio" />
                        <Form.Check name="employmentType" className="checkElements" label="Pół etat" type="radio" />
                        <Form.Check name="employmentType" className="checkElements" label="Pełen etat" type="radio" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label name="workExperience" className="titleForm">Doświadczenie zawodowe</Form.Label>
                        <Form.Check name="workExperience" className="checkElements" label="6 miesięcy" type="radio" />
                        <Form.Check name="workExperience" className="checkElements" label="1 rok" type="radio" />
                        <Form.Check name="workExperience" className="checkElements" label="2 lata" type="radio" />
                        <Form.Check name="workExperience" className="checkElements" label="5 lat" type="radio" />
                    </Form.Group>

                </Form>
            </div>
        </Col>)


}


export default Filter;