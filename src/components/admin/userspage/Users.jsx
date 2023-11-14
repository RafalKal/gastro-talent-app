import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

import axios from "../../../api/axios";
const USERS_URL = '/api/v1/users'

const Users = () => {

    const [usersData, setUsersData] = useState([]);
    const effectRan = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (effectRan.current === false) {
            const fetchData = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(USERS_URL, {
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
            fetchData();
            return () => {
                effectRan.current = true;
            };
        }
    }, []);

    const handleEdit = (userId) => {
        alert(`Edit user with ID: ${userId}`);
    };

    const handleDelete = (userId) => {
        alert(`Delete user with ID: ${userId}`);
    };

    const handleViewProfile = (userId) => {
        console.log(`View profile of user with ID: ${userId}`);
        navigate(`/admin/users/${userId}`);
    };


    return (
        <div>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Imię i nazwisko</th>
                        <th>Rola</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.firstname} {user.lastname}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleEdit(user.id)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                                <button onClick={() => handleViewProfile(user.id)}>View Profile</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Users;