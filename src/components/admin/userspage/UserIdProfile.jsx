import React, { useState, useEffect } from 'react';
import axios from "../../../api/axios";
import { useParams, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
const UserIdProfile = () => {

    const { id } = useParams();
    const [usersData, setUsersData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('JWT token is missing');
                    return;
                }

                const response = await axios.get(`/api/v1/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                setUsersData(response.data.content);
                console.log(response.data.content);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    return (
        <div>
            <Button variant="primary" onClick={() => navigate(-1)}>
                Go Back
            </Button>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Role</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserIdProfile;
