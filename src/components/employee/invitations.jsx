import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '/src/context/AuthProvider';
import './invitations.css';
import 'font-awesome/css/font-awesome.min.css';
import Pagination from '../Pagination'; 

function Invitations() {
    const [invitations, setInvitations] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const responseCook = await axios.get(`http://localhost:8080/api/v1/cooks/by-user-id/${auth.id}`, {
                    headers: { 'Authorization': `Bearer ${auth.token}` }
                });
                const cookId = responseCook.data.id;
                console.log(responseCook.data);

                const responseInvitations = await axios.get(`http://localhost:8080/api/v1/invitations/cook/${cookId}`, {
                    headers: { 'Authorization': `Bearer ${auth.token}` }
                });
                console.log(responseInvitations.data);
                setInvitations(responseInvitations.data);
            } catch (error) {
                console.error("Błąd przy pobieraniu danych", error);
            }
        };

        fetchInvitations();
    }, [auth.id, auth.token]);

    // Obliczanie ilości stron
      const totalPages = Math.ceil(invitations.length / itemsPerPage);
    

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    

    return (
        <div className="container">
        {invitations.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map(invitation => (
                <div key={invitation.id} className="card mt-5 border-5 pt-2 active pb-0 px-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <h4 className="card-title"><b>{invitation.employer.companyName}</b></h4>
                            </div>
                            <div className="col">
                                <h6 className="card-subtitle mb-2 text-muted">
                                    <p className="card-text text-muted small">
                                        Status: {invitation.status}<br />
                                        Data rozmowy: {new Date(invitation.interviewDate).toLocaleString()}<br />
                                        NIP: {invitation.employer.nip}<br />
                                        E-mail: {invitation.employer.email}
                                    </p>
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-white px-0">
                        <div className="row">
                            {/* Tutaj możesz umieścić dodatkowe elementy, jeśli są potrzebne */}
                        </div>
                    </div>
                </div>
            ))}
            {totalPages > 1 && (
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        )}
    </div>
    );
}

export default Invitations;
