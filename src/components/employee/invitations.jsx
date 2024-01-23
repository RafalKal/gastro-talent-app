import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '/src/context/AuthProvider';
import './invitations.css';
import 'font-awesome/css/font-awesome.min.css';

function Invitations()  {
    const [invitations, setInvitations] = useState([]);
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        const fetchInvitations = async () => {
            try {
               
                const responseCook = await axios.get(`http://localhost:8080/api/v1/cooks/by-user-id/${auth.id}`, {
                    headers: { 'Authorization': `Bearer ${auth.token}` }
                });
                const cookId = responseCook.data.id;

             
                const responseInvitations = await axios.get(`http://localhost:8080/api/v1/invitations/cook/${cookId}`, {
                    headers: { 'Authorization': `Bearer ${auth.token}` }
                });
                setInvitations(responseInvitations.data);
            } catch (error) {
                console.error("Błąd przy pobieraniu danych", error);
            }
        };

        fetchInvitations();
    }, [auth.id, auth.token]);
  

    return (
        <div className="container">
            {invitations.map(invitation => (
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
        </div>
    );
}

export default Invitations;
