import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './user.css';
import 'font-awesome/css/font-awesome.min.css';
import AuthContext from '/src/context/AuthProvider';
import { Link } from 'react-router-dom';

function User() {
const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  address: {
    city: "",
    postalCode: "",
    street: "",
    houseNumber: ""
  }
    
    
  });

const [chiefData, setChiefData] = useState({
  professionalexperiences:{
    profession: "",
  }
  });

  useEffect(() => {
    // Tutaj możesz użyć tokena do uwierzytelnienia i pobrania danych użytkownika
    const userId = auth.id;
    axios.get(`http://localhost:8080/api/v1/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${auth.token}` // Dodaj token do nagłówka
      }
    })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error("Błąd przy pobieraniu danych użytkownika", error);
      });
  }, [auth.id,auth.token]);

useEffect(() => {
    // Tutaj możesz użyć tokena do uwierzytelnienia i pobrania danych użytkownika
    const profileId = Number(auth.id) + 1;
    axios.get(`http://localhost:8080/api/v1/cooks/${profileId}`, {
      headers: {
        'Authorization': `Bearer ${auth.token}` // Dodaj token do nagłówka
      }
    })
      .then(response => {
        setChiefData(response.data);
      })
      .catch(error => {
        console.error("Błąd przy pobieraniu danych użytkownika", error);
      });
  }, [auth.id,auth.token]);

  
  return (
    <div className="container emp-profile">
      <form method="post">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
              <div className="file btn btn-lg btn-primary">
                Zmień zdjęcie
                <input type="file" name="file" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>{userData.firstname} {userData.lastname}</h5>
              <h6>{chiefData.profession}</h6>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">O mnie</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
      <Link to="/user/settings" className="profile-edit-btn">Edytuj profil</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
          </div>
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="row">
                  <div className="col-md-6">
                    <label>Imię</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.firstname}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Nazwisko</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.lastname}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Zawód</label>
                  </div>
                  <div className="col-md-6">
                    <p>{chiefData.profession}</p>
                  </div>
                </div>
                 <div className="row">
                  <div className="col-md-6">
                    <label>nr telefonu</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.phoneNumber}</p>
                  </div>
                </div>
                 <div className="row">
                  <div className="col-md-6">
                    <label>Miasto</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.address.city}</p>
                  </div>
                </div>
                 <div className="row">
                  <div className="col-md-6">
                    <label>Kod pocztowy</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.address.postalCode}</p>
                  </div>
                </div>
                 <div className="row">
                  <div className="col-md-6">
                    <label>Ulica</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.address.street}</p>
                  </div>
                </div>
                 <div className="row">
                  <div className="col-md-6">
                    <label>nr domu</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.address.houseNumber}</p>
                  </div>
                </div>
                
              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default User;
