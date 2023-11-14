import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from "../../../api/axios";
import Pagination from '../../Pagination';

import "./users.css";

const USERS_URL = '/api/v1/users';

const Users = () => {
    const [usersData, setUsersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const effectRan = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${USERS_URL}?pageNumber=${currentPage}&pageSize=5`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                setUsersData(response.data.content);
                setTotalPages(response.data.totalPages);
                console.log(response.data.content);
                console.log(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (effectRan.current === false) {
            fetchData();
            effectRan.current = true;
        } else {
            fetchData();
        }
    }, [currentPage]);

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

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="table-container" >
            <Table responsive="sm" className="table">
                <thead>
                    <tr className="table-header">
                        <th>Id</th>
                        <th>Email</th>
                        <th>Rola</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.role === "POTENTIAL_EMPLOYEE" ? "Employee" : user.role === "POTENTIAL_EMPLOYER" ? "Employer" : "Admin"}</td>
                            <td>
                                <button onClick={() => handleEdit(user.id)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                                <button onClick={() => handleViewProfile(user.id)}>View Profile</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Users;