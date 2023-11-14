import React, { useState, useEffect, useRef } from 'react';
import axios from "../../../api/axios";
import { useParams, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const UserIdProfile = () => {

    const { id } = useParams();
    const [employeesData, setEmployeesData] = useState([]);
    const navigate = useNavigate();
    const effectRan = useRef(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('JWT token is missing');
                    return;
                }

                const response = await axios.get(`/api/employees/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                setEmployeesData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (effectRan.current === false) {
            fetchUserData();
            effectRan.current = true;
        }
    }, [id, effectRan]);

    return (
        <div>
            <Button variant="primary" onClick={() => navigate(-1)}>
                Wróć do poprzedniej strony
            </Button>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Imię nazwisko</th>
                        <th>Data urodzenia</th>
                        <th>Numer telefonu</th>
                        <th>Adres zamieszkania</th>
                        <th>Profile</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{employeesData.email}</td>
                        <td>{employeesData.firstname} {employeesData.lastname}</td>
                        <td>{employeesData.dateOfBirth}</td>
                        <td>{employeesData.phoneNumber}</td>
                        <td>
                            {employeesData.address ? (
                                <div>
                                    <p>Ulica: {employeesData.address.street}</p>
                                    <p>Numer domu: {employeesData.address.houseNumber}</p>
                                    <p>Miasto: {employeesData.address.city}</p>
                                    <p>Kod pocztowy: {employeesData.address.postalCode}</p>
                                </div>
                            ) : (
                                <p>Nie ma adresu</p>
                            )}
                        </td>
                        <td>{employeesData.profiles}pewno nic bo nie ma</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default UserIdProfile;

