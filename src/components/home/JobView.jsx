import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

function JobView() {
    const { id } = useParams();
    const [employeeInfo, setEmployeeInfo] = useState({});
    const [selectedOption, setSelectedOption] = useState('');
    const [CompanyEmail, setEmail] = useState('');
    const [meetingDate, setMeetingDate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('JWT token is missing');
                    return;
                }

                const response = await axios.get('/api/v1/cooks/${id}', {
                    headers: {
                        Authorization: 'Bearer ${token}'
                    },
                });

                setEmployeeInfo(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleMeetingDateChange = (date) => {
        if (date >= new Date()) {
            setMeetingDate(date);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Błąd',
                text: 'Nie można ustawić daty wstecz!',
            });
        }
    };

    const handleSubmitButtonClick = () => {
        if (selectedOption && CompanyEmail && meetingDate) {
            const isConfirmed = window.confirm('Czy zatwierdzasz swoją decyzję?');
            if (isConfirmed) {
                console.log('Selected Option:', selectedOption);
                console.log('E-mail firmy:', CompanyEmail);
                console.log('Data spotkania:', meetingDate);
            } else {
                console.log('Decyzja anulowana');
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Błąd',
                text: 'Wypełnij wszystkie pola formularza!',
            });
        }
    };

    // Wyciąganie danych z employeeInfo
    const {
        firstname, 
        lastname, 
        email,
        canHandlePressure,
        isCertifiedSousChef,
        professionalExperiences = []
    } = employeeInfo;

    // Zakładając, że interesuje nas tylko pierwsze doświadczenie zawodowe
    const firstExperience = professionalExperiences.length > 0 ? professionalExperiences[0] : {};

    return (
        <Container fluid className="px-3">
            <Row className="mb-4 align-items-center">
                <Col>
                    <strong>Imię i Nazwisko:</strong><h1>{firstname} {lastname}</h1>
                    <strong>Email:</strong><h2>{email}</h2>
                </Col>
                <Col className="col-6">
                    <h4>Doświadczenie:</h4>
                    <Table striped bordered hover style={{ width: '80%', margin: 'auto' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '20%' }}><strong>Miejsce pracy:</strong></td>
                                <td>{firstExperience.company}</td>
                            </tr>
                            <tr>
                                <td><strong>Opis pracy:</strong></td>
                                <td>{firstExperience.jobDescription}</td>
                            </tr>
                            <tr>
                                <td><strong>Data rozpoczęcia:</strong></td>
                                <td>{firstExperience.startDate}</td>
                            </tr>
                            <tr>
                                <td><strong>Data zakończenia:</strong></td>
                                <td>{firstExperience.endDate}</td>
                            </tr>
                            <tr>
                                <td><strong>Stanowisko:</strong></td>
                                <td>{firstExperience.position}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <h4>Umiejętności:</h4>
                    <ul>
                        <li>Czy potrafię znieść presję: {canHandlePressure ? 'Tak' : 'Nie'}</li>
                        <li>Czy jestem certyfikowanym pomocnikiem szefa kuchni: {isCertifiedSousChef ? 'Tak' : 'Nie'}</li>
                    </ul>
                </Col>
                <Col>
                    <Form>
                        <label htmlFor="selectOption">Zaplanuj spotkanie z kandydatem:</label>
                        <Form.Select
                            id="selectOption"
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            <option value="">-- Wybierz opcję --</option>
                            <option value="option1">Umów rozmowę</option>
                            <option value="option2">Odrzuć kandydata</option>
                            <option value="option3">Zaakceptuj kandydata</option>
                        </Form.Select>
                        <label htmlFor="CompanyEmail">E-mail firmy:</label>
                        <Form.Control
                            type="text"
                            id="CompanyEmail"
                            value={CompanyEmail}
                            onChange={handleEmailChange}
                            placeholder="Wprowadź e-mail firmy"
                        />
                        <label htmlFor="meetingDate">Data:</label>
                        <DatePicker
                            id="meetingDate"
                            selected={meetingDate}
                            onChange={handleMeetingDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="Czas"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText="Wybierz datę spotkania"
                            minDate={new Date()}
                        />
                        <button type="button" onClick={handleSubmitButtonClick}>
                            Zatwierdź
                        </button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default JobView;