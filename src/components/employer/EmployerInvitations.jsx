import React, { useState, useEffect, useContext } from 'react';
import { Table, Container, Form, Button } from 'react-bootstrap';
import AuthContext from '/src/context/AuthProvider';
import axios from 'axios';

function Invitations() {
  const { auth } = useContext(AuthContext);
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/invitations/employer/${auth.id}`, {
      headers: {
        'Authorization': `Bearer ${auth.token}`
      }
    })
      .then(async (response) => {
        const invitationsData = response.data;

        const enhancedInvitations = await Promise.all(invitationsData.map(async (invitation) => {
          try {
            const userResponse = await axios.get(`http://localhost:8080/api/v1/users/${invitation.cook.empId}`, {
              headers: {
                'Authorization': `Bearer ${auth.token}`
              }
            });

            const { firstname, lastname } = userResponse.data;
            return {
              ...invitation,
              cook: {
                ...invitation.cook,
                firstname,
                lastname,
              },
            };
          } catch (error) {
            console.error("Błąd przy pobieraniu danych o kucharzu", error);
            return invitation;
          }
        }));

        setInvitations(enhancedInvitations);
      })
      .catch(error => {
        console.error("Błąd przy pobieraniu danych zaproszeń", error);
      });
  }, [auth.id, auth.token]);

  const handleStatusChange = (index, selectedStatus) => {
    const updatedInvitations = [...invitations];
    updatedInvitations[index].status = selectedStatus;
    setInvitations(updatedInvitations);
  };

  const handleSaveChanges = (id, updatedStatus) => {
    const invitationToUpdate = invitations.find(invitation => invitation.id === id);

    if (invitationToUpdate && invitationToUpdate.cook && invitationToUpdate.cook.empId) {
      const updatedInvitation = {
        cookId: invitationToUpdate.cook.id,
        employerId: auth.id,
        interviewDate: invitationToUpdate.interviewDate,
        status: updatedStatus,
      };

      axios.put(
        `http://localhost:8080/api/v1/invitations/${id}`,
        updatedInvitation,
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        }
      )
        .then(response => {
          console.log("Zaktualizowano status pomyślnie", response);
        })
        .catch(error => {
          console.error("Błąd podczas aktualizacji statusu", error);
        });
    } else {
      console.error("Nieprawidłowe dane zaproszenia lub kucharza");
    }
  };

  return (
    <Container fluid className="main-content px-3">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Kucharz</th>
            <th>Status</th>
            <th>Data rozmowy</th>
          </tr>
        </thead>
        <tbody>
          {invitations.map((invitation, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{`${invitation.cook.firstname} ${invitation.cook.lastname}`}</td>
              <td>
                <Form.Control
                  as="select"
                  value={invitation.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="INVITED">Zaproszony</option>
                  <option value="INTERVIEW_CONDUCTED">Rozmowa odbyta</option>
                  <option value="REJECTED">Odrzucony</option>
                  <option value="ACCEPTED">Przyjęty</option>
                  <option value="CANCELLED">Odwołany</option>
                </Form.Control>
              </td>
              <td>{invitation.interviewDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => {
        invitations.forEach(invitation => {
          handleSaveChanges(invitation.id, invitation.status);
        });
      }}>
        Zapisz zmiany
      </Button>
    </Container>
  );
}

export default Invitations;
