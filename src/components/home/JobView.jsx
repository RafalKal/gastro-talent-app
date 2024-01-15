import React from 'react';
import { useParams } from 'react-router-dom';
import './jobview.css'; 

function JobView() {
    const { jobid } = useParams();

    // Przykładowe dane pracownika
    const employeeInfo = {
        name: 'John Doe',
        position: 'Frontend Developer',
        experience: '5 years',
        skills: ['React', 'JavaScript', 'HTML', 'CSS'],
        aboutMe: 'Passionate about creating user-friendly and visually appealing web applications.',
        // Dodaj inne informacje o pracowniku według potrzeb
    };

    return (
        <div className="job-view-container">
            <div className="employee-details">
                
                <h2>{employeeInfo.name}</h2>
                <p>{employeeInfo.position}</p>
                <div className="details-container">
                    <div className="experience">
                        <h4>Experience:</h4>
                        <p>{employeeInfo.experience}</p>
                    </div>
                    <div className="skills">
                        <h4>Skills:</h4>
                        <ul>
                            {employeeInfo.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="about-me">
                        <h4>About Me:</h4>
                        <p>{employeeInfo.aboutMe}</p>
                    </div>
                </div>
                {/* Dodaj inne sekcje z informacjami o pracowniku według potrzeb */}
            </div>
        </div>
    );
}

export default JobView;