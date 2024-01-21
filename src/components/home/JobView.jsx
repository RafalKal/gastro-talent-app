import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import AuthContext from '/src/context/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import './jobview.css';

function JobView() {
    const { auth } = useContext(AuthContext);
    const [cookData, setCookData] = useState([]);
    const [userData, setUserData] = useState([]);

    const [selectedOption, setSelectedOption] = useState('');
    const [CompanyEmail, setEmail] = useState('');
    const [meetingDate, setMeetingDate] = useState(null);

    useEffect(() => {
        const userId = auth.id;
        axios.get(`http://localhost:8080/api/v1/users/${userId}`, {
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
        <Container fluid className="main-content px-3">
            <Row className="mb-4 align-items-center">
                <Col className="small-info">
                    <strong>Imię i Nazwisko:</strong><h1>{userData.firstname} {userData.lastname}</h1>
                    <strong>Email:</strong><h2>{userData.email}</h2>
                </Col>
                <Col className="big-info col-6">
                    <h4>Doświadczenie:</h4>
                    <Table striped bordered hover style={{ width: '80%', margin: 'auto' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '20%', }}><strong>Miejsce pracy:</strong></td>
                                <td>{cookData.professionalExperiences?.[0]?.company || ''}</td>
                            </tr>
                            <tr>
                                <td><strong>Opis pracy:</strong></td>
                                <td>{cookData.professionalExperiences?.[0]?.jobDescription || ''}</td>
                            </tr>
                            <tr>
                                <td><strong>Data rozpoczęcia:</strong></td>
                                <td>{cookData.professionalExperiences?.[0]?.startDate || ''}</td>
                            </tr>
                            <tr>
                                <td><strong>Data zakończenia:</strong></td>
                                <td>{cookData.professionalExperiences?.[0]?.endDate || ''}</td>
                            </tr>
                            <tr>
                                <td><strong>Stanowisko:</strong></td>
                                <td>{cookData.professionalExperiences?.[0]?.position || ''}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <h4>O mnie:</h4>
                    <ul>
                        <li>Ile lat pracuje w zawodzie: <b>{cookData.yearsOfExperience}</b></li>
                        <li>Czy potrafię znieść presję: <b>{cookData.canHandlePressure ? 'Tak' : 'Nie'}</b></li>
                        <li>Czy jestem certyfikowanym pomocnikiem szefa kuchni: <b>{cookData.isCertifiedSousChef ? 'Tak' : 'Nie'}</b></li>
                    </ul>
                    <h4>Style kulinarne:</h4>
                    <ul>
                        {cookData.cookingStyles && cookData.cookingStyles.length > 0 && (
                            cookData.cookingStyles.map((style, index) => (
                                <li key={index}>{style}</li>
                            ))
                        )}
                    </ul>
                    <h4>Popisowe danie:</h4>
                    <ul>
                        {cookData.signatureDishes && cookData.signatureDishes.length > 0 && (
                            cookData.signatureDishes.map((dish, index) => (
                                <li key={index}>{dish}</li>
                            ))
                        )}
                    </ul>

                </Col>
                <Col className="form-panel">
                    <Form>
                        <div className="form-panel-item">
                            <h4><b>Zaproś kandydata</b></h4>
                            <label htmlFor="selectOption"></label>
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
                        </div>
                        <div className="form-panel-item">
                            <label htmlFor="CompanyEmail">E-mail firmy:</label>
                            <Form.Control
                                type="text"
                                id="CompanyEmail"
                                value={CompanyEmail}
                                onChange={handleEmailChange}
                                placeholder="Wprowadź e-mail firmy"
                            />
                        </div>
                        <div className="form-panel-item">
                            <div>
                                <label htmlFor="meetingDate">Data:</label>
                            </div>
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
                        </div>
                        <div className="form-panel-item">
                            <button type="button" onClick={handleSubmitButtonClick}>
                                Zatwierdź
                            </button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default JobView;