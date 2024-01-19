import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

function JobView() {
    const { id } = useParams();
    const [employeeInfo, setEmployeeInfo] = useState({
        name: '',
        position: '',
        experience: {
            company: '',
            start_date: '',
            end_date: '',
            job_description: '',
            position: '',
            profession: '',
        },
        email: '',
        skills: [],
        aboutMe: '',
        is_certified_sous_chef: false,
        can_handle_pressure: false,
        cooking_style: '',
    });

    const [selectedOption, setSelectedOption] = useState('');
    const [CompanyEmail, setEmail] = useState('');
    const [meetingDate, setMeetingDate] = useState(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`/api/v1/users/${id}`);
                const data = response.data;
                setEmployeeInfo(data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
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

    return (
        <Container fluid className="px-3">
            <Row className="mb-4 align-items-center">
                <Col className="">
                    <strong>Imie i Nazwisko:</strong><h1>{employeeInfo.name}</h1>
                    <strong>Stanowisko:</strong><h3>{employeeInfo.position}</h3>
                    <strong>Email:</strong><h2>{employeeInfo.email}</h2>
                </Col>
                <Col className="col-6">
                <h4>Doświadczenie:</h4>
                <Table striped bordered hover style={{ width: '80%', margin: 'auto' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '20%' }}><strong>Miejsce pracy:</strong></td>
                            <td>{employeeInfo.experience.company}</td>
                        </tr>
                        <tr>
                            <td><strong>Opis pracy:</strong></td>
                            <td>{employeeInfo.experience.job_description}</td>
                        </tr>
                        <tr>
                            <td><strong>Data rozpoczęcia:</strong></td>
                            <td>{employeeInfo.experience.start_date}</td>
                        </tr>
                        <tr>
                            <td><strong>Data zakończenia:</strong></td>
                            <td>{employeeInfo.experience.end_date}</td>
                        </tr>
                        <tr>
                            <td><strong>Stanowisko:</strong></td>
                            <td>{employeeInfo.experience.profession}</td>
                        </tr>
                    </tbody>
                </Table>
                    <h4>Umiejętności:</h4>
                    <ul>
                        {employeeInfo.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                    <h4>O mnie:</h4>
                    <p>{employeeInfo.aboutMe}</p>

                </Col>
                <Col className="">
                    <Form>
                        <label htmlFor="selectOption">Zaplanuj spotkanie z kandydatem:</label>
                        <Form.Select
                            id="selectOption"
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            <option value="">-- Select --</option>
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
                            placeholder="Enter company email"
                        />
                        <label htmlFor="meetingDate">Data:</label>
                        <DatePicker
                            id="meetingDate"
                            selected={meetingDate}
                            onChange={handleMeetingDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText="Wybierz datę spotkania"
                            minDate={new Date()}
                        />
                        <button type="button" onClick={handleSubmitButtonClick}>
                            Submit
                        </button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default JobView;
