import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './user.css';
import 'font-awesome/css/font-awesome.min.css';
import AuthContext from '/src/context/AuthProvider';

function Settings() {
  const { auth } = useContext(AuthContext);

  // Inicjalizacja stanu danych użytkownika
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
  address: {
    city: "",
    postalCode: "",
    street: "",
    houseNumber: ""
  }
    // Dodaj inne pola, jeśli są dostępne
  });

  // Inicjalizacja stanu danych zawodu
 

  // Efekt pobierający dane użytkownika
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
  }, [auth.id, auth.token]);

  // Efekt pobierający dane zawodu
  

  // Obsługa zmiany danych użytkownika
 const handleUserDataChange = (e) => {
  const { name, value } = e.target;
  if (name.startsWith("address.")) {
    // Obsługa zagnieżdżonych pól adresu
    const addressKey = name.split(".")[1];
    setUserData(prevUserData => ({
      ...prevUserData,
      address: {
        ...prevUserData.address,
        [addressKey]: value
      }
    }));
  } else {
    // Obsługa pozostałych pól
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  }
};


  // Obsługa zmiany danych zawodu
  

  // Obsługa przycisku "Submit" do zapisu zmian
  const handleFormSubmit = () => {
  const userId = auth.id;
  const payload = {
    ...userData,
    address: {
      ...userData.address,
      houseNumber: parseInt(userData.address.houseNumber),
    },
    // Usuń lub zakomentuj pola, które nie są potrzebne lub powodują problemy
    // authorities: undefined,
    // profiles: undefined,
    // role: undefined,
  };
console.log(userData);
  axios.put(`http://localhost:8080/api/v1/employees/${userId}`, payload, {
    headers: {
      'Authorization': `Bearer ${auth.token}`
    }
  })
  .then(response => {
    console.log("Zapisano zmiany!", response.data);
    // Logika po udanej aktualizacji
  })
  .catch(error => {
    console.error("Błąd przy zapisywaniu zmian", error);
    // Logika obsługi błędów
  });
};


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
              <h5>{userData.firstName} {userData.lastName}</h5>
             
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">O mnie</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            {/* Usunięty link do edycji profilu */}
          </div>
        </div>
        <div className="row">
          
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="row">
                  <div className="col-md-6">
                    <label>Imię</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Imię" value={userData.firstname} onChange={handleUserDataChange}  name="firstname"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Nazwisko</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Nazwisko" value={userData.lastname} onChange={handleUserDataChange}  name="lastname"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <input type="email" className="form-control" placeholder="Email" value={userData.email} onChange={handleUserDataChange}   name="email"/>
                  </div>
                   
                </div>
                 <div className="row">
                  <div className="col-md-6">
                    <label>numer telefonu</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="numer" value={userData.phoneNumber} onChange={handleUserDataChange}  name="phoneNumber"/>
                  </div>
                   
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>data urodzin</label>
                  </div>
                  <div className="col-md-6">
                    <input
  type="date"
  className="form-control"
  placeholder="data"
  value={userData.dateOfBirth}
  onChange={handleUserDataChange}
  name="dateOfBirth" // Zmień tutaj
/>
                  </div>
                   {/* Pole numeru telefonu */}
  

  {/* Pole miasta */}
 {/* Pole miasta */}
<div className="col-md-6">
  <label>Miasto</label>
</div>
<div className="col-md-6">
  <input type="text" className="form-control" placeholder="Miasto" value={userData.address.city} onChange={handleUserDataChange} name="address.city"/>
</div>

{/* Pole ulicy */}
<div className="col-md-6">
  <label>Ulica</label>
</div>
<div className="col-md-6">
  <input type="text" className="form-control" placeholder="Ulica" value={userData.address.street} onChange={handleUserDataChange} name="address.street"/>
</div>

{/* Pole numeru domu */}
<div className="col-md-6">
  <label>Numer domu</label>
</div>
<div className="col-md-6">
  <input type="text" className="form-control" placeholder="Numer domu" value={userData.address.houseNumber} onChange={handleUserDataChange} name="address.houseNumber"/>
</div>

{/* Pole kodu pocztowego */}
<div className="col-md-6">
  <label>Kod pocztowy</label>
</div>
<div className="col-md-6">
  <input type="text" className="form-control" placeholder="Kod pocztowy" value={userData.address.postalCode} onChange={handleUserDataChange} name="address.postalCode"/>
</div>

                </div>
                
               
              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                {/* Dodaj inne dane użytkownika do zmiany, jeśli są dostępne */}
              </div>
            </div>
          </div>
        </div>
         <div className="mt-5 text-center">
          <button className="btn btn-primary profile-button" type="button" onClick={handleFormSubmit}>Save Profile</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
