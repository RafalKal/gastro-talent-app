import React from 'react';
import './user.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';

function createRatingStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fa fa-star yellow-star"></i>);
    } else {
      stars.push(<i key={i} className="fa fa-star text-secondary"></i>);
    }
  }
  return stars;
}

function User() {
    
  return (
    <div className="container emp-profile">
      <form method="post">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
              <div className="file btn btn-lg btn-primary">
                Zmień zdjęcie
                <input type="file" name="file"/>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>Grazyna Kowalska</h5>
              <h6> kucharz</h6>
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
            <div className="profile-work">
              <p>LINKI DO PRAC</p>
              <a href="">Link do swoich dań</a><br/>
              <a href="">linkedin</a><br/>
              <a href="">facebook</a>
              <p>UMIEJĘTNOŚCI</p>
              <p>kuchnia polska: {createRatingStars(4)}</p>
              <p>kuchnia włoska: {createRatingStars(5)}</p>
              <p>kuchnia niemiecka: {createRatingStars(3)}</p>
              <p>kuchnia tajska: {createRatingStars(4)}</p>
              <p>kuchnia indysjska: {createRatingStars(3)}</p>
            </div>
          </div>
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="row">
                  <div className="col-md-6">
                    <label>Imie</label>
                  </div>
                  <div className="col-md-6">
                    <p>Grazyna</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Nazwisko</label>
                  </div>
                  <div className="col-md-6">
                    <p>Kowalska</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>Grazyna@gmail.com</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Telefon</label>
                  </div>
                  <div className="col-md-6">
                    <p>123 456 789</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Zawód</label>
                  </div>
                  <div className="col-md-6">
                    <p>kucharz</p>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div className="row">
                  <div className="col-md-6">
                    <label>Doświadczenie</label>
                  </div>
                  <div className="col-md-6">
                    <p>4 lata</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Stawka za godzinę</label>
                  </div>
                  <div className="col-md-6">
                    <p>30zł/h</p>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <label>Poziom języka angielskiego</label>
                  </div>
                  <div className="col-md-6">
                    <p>Ekspert</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Dostępność</label>
                  </div>
                  <div className="col-md-6">
                    <p>pół etatu</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label>O sobie</label><br/>
                    <p>Twoje szczegółowe informacje</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default User;