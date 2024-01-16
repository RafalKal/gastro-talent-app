import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './jobview.css';

function JobView() {
    const { jobid } = useParams();

    const employeeInfo = {
        name: 'Stasiu Karwala',
        position: 'Frontend Developer',
        experience: '5 years',
        email: 'onesaremissing@gmail.com',
        skills: [
            { skill: 'React', rating: 5 },
            { skill: 'JavaScript', rating: 5 },
            { skill: 'HTML', rating: 4 },
            { skill: 'CSS', rating: 3 },
            { skill: 'Zaspokajanie mamusi', rating: 1 }
        ],
        aboutMe: 'Passionate about creating user-friendly and visually appealing web applications.',
        avatarUrl: '/public/avatar.jpg',
    };

    const [selectedOption, setSelectedOption] = useState('');
    const [CompanyEmail, setEmail] = useState('');
    const [meetingDate, setMeetingDate] = useState(null);

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
            alert('Nie można ustawić daty wstecz!');
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
            alert('Wypełnij wszystkie pola formularza!');
        }
    };

    return (
        <Container fluid className="px-3">
            <Row className="mb-4">
                <Col className="">
                    <img src={employeeInfo.avatarUrl} alt="Avatar" className="avatar" />
                    <h1>{employeeInfo.name}</h1>
                    <h3>{employeeInfo.position}</h3>
                    <h2>E-mail kandydata:</h2>
                    <h2>{employeeInfo.email}</h2>
                </Col>
                <Col className="">
                    <Container>
                        <Row>
                            <Col className="">
                                <h4>Experience:</h4>
                                <p>{employeeInfo.experience}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="">
                                <h4>Skills:</h4>
                                <ul>
                                    {employeeInfo.skills.map((skill, index) => (
                                        <li key={index}>
                                            {skill.skill}
                                            {' '}
                                            {Array.from({ length: 5 }, (_, i) => (
                                                i < skill.rating ? (
                                                    <span key={i} className="star" role="img" aria-label="star">⭐</span>
                                                ) : (
                                                    <span key={i} className="star-outline" role="img" aria-label="star outline">⚫</span>
                                                )
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="">
                                <h4>About Me:</h4>
                                <p>{employeeInfo.aboutMe}</p>
                            </Col>
                        </Row>
                    </Container>
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
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
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
