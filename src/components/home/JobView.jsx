import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './jobview.css';

function JobView() {
    const { jobid } = useParams();

    const employeeInfo = {
        name: 'Stasiu Karwala',
        position: 'Frontend Developer',
        experience: '5 years',
        skills: [
            { skill: 'React', rating: 5 },
            { skill: 'JavaScript', rating: 5 },
            { skill: 'HTML', rating: 4 },
            { skill: 'CSS', rating: 3 },
            { skill: 'Zaspokajanie mamusi', rating: 1}
        ],
        aboutMe: 'Passionate about creating user-friendly and visually appealing web applications.',
        avatarUrl: '/public/avatar.jpg',
    };

    const [selectedOption, setSelectedOption] = useState('');
    const [email, setEmail] = useState('');
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
        if (selectedOption && email && meetingDate) {
            const isConfirmed = window.confirm('Czy zatwierdzasz swoją decyzję?');
            if (isConfirmed) {
                console.log('Selected Option:', selectedOption);
                console.log('E-mail firmy:', email);
                console.log('Data spotkania:', meetingDate);
            } else {
                console.log('Decyzja anulowana');
            }
        } else {
            alert('Wypełnij wszystkie pola formularza!');
        }
    };

    return (
        <div className="job-view-container">
            <div className="employee-details">
                <img src={employeeInfo.avatarUrl} alt="Avatar" className="avatar" />
                <h1>{employeeInfo.name}</h1>
                <h3>{employeeInfo.position}</h3>
            </div>
            <div className="details-container">
                <div className="email">
                    <h4>E-mail</h4>
                    <h5>onesaremissing@gmail.com</h5>
                </div>
                <div className="experience">
                    <h4>Experience:</h4>
                    <p>{employeeInfo.experience}</p>
                </div>
                <div className="skills">
                    <h4>Skills:</h4>
                    <ul>
                        {employeeInfo.skills.map((skill, index) => (
                            <li key={index}>
                                {skill.skill}
                                {' '}
                                {Array.from({ length: 5 }, (_, i) => (
                                    i < skill.rating ? (
                                        <span key={i} role="img" aria-label="star">⭐</span>
                                    ) : (
                                        <span key={i} role="img" aria-label="star outline">⚫</span>
                                    )
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="about-me">
                    <h4>About Me:</h4>
                    <p>{employeeInfo.aboutMe}</p>
                </div>
            </div>
            <div className="form-container">
                <form>
                    <label htmlFor="selectOption">Select Option:</label>
                    <select
                        id="selectOption"
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        <option value="">-- Select --</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                    <label htmlFor="email">E-mail firmy:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter company email"
                    />
                    <label htmlFor="meetingDate">Data spotkania:</label>
                    <DatePicker
                        id="meetingDate"
                        selected={meetingDate}
                        onChange={handleMeetingDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select meeting date and time"
                        minDate={new Date()}
                    />
                    <button type="button" onClick={handleSubmitButtonClick}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default JobView;
