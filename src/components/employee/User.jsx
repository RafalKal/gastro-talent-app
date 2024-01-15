import React, { useEffect } from 'react';
import './user.css';

function User() {
  useEffect(() => {
    // Dodaj Bootstrap CSS do nagłówka dokumentu
    const bootstrapCss = document.createElement('link');
    bootstrapCss.href = '//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css';
    bootstrapCss.rel = 'stylesheet';
    document.head.appendChild(bootstrapCss);

    // Dodaj jQuery i Bootstrap JS na końcu dokumentu
    const jqueryScript = document.createElement('script');
    jqueryScript.src = '//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js';
    document.body.appendChild(jqueryScript);

    const bootstrapJs = document.createElement('script');
    bootstrapJs.src = '//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js';
    document.body.appendChild(bootstrapJs);

    // Czyszczenie po odmontowaniu komponentu
    return () => {
      document.head.removeChild(bootstrapCss);
      document.body.removeChild(jqueryScript);
      document.body.removeChild(bootstrapJs);
    };
  }, []);

  // Funkcja do tworzenia gwiazdek oceny
  const createRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="fa fa-star checked"></span>);
      } else {
        stars.push(<span key={i} className="fa fa-star"></span>);
      }
    }
    return stars;
  };

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
              <h5>Kshiti Ghelani</h5>
              <h6>Web Developer i Designer</h6>
              <p className="proile-rating">RANKING: <span>8/10</span></p>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">O mnie</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Historia</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edytuj profil"/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="profile-work">
              <p>LINKI DO PRAC</p>
              <a href="">Link do strony internetowej</a><br/>
              <a href="">Profil Bootsnipp</a><br/>
              <a href="">Profil Bootply</a>
              <p>UMIEJĘTNOŚCI</p>
              <p>Web Designer: {createRatingStars(4)}</p>
              <p>Web Developer: {createRatingStars(5)}</p>
              <p>WordPress: {createRatingStars(3)}</p>
              <p>WooCommerce: {createRatingStars(4)}</p>
              <p>PHP, .Net: {createRatingStars(3)}</p>
            </div>
          </div>
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="row">
                  <div className="col-md-6">
                    <label>Id użytkownika</label>
                  </div>
                  <div className="col-md-6">
                    <p>Kshiti123</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Imię</label>
                  </div>
                  <div className="col-md-6">
                    <p>Kshiti Ghelani</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>kshitighelani@gmail.com</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Telefon</label>
                  </div>
                  <div className="col-md-6">
                    <p>123 456 7890</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Zawód</label>
                  </div>
                  <div className="col-md-6">
                    <p>Web Developer i Designer</p>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div className="row">
                  <div className="col-md-6">
                    <label>Doświadczenie</label>
                  </div>
                  <div className="col-md-6">
                    <p>Ekspert</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Stawka za godzinę</label>
                  </div>
                  <div className="col-md-6">
                    <p>10$/hr</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Liczba projektów</label>
                  </div>
                  <div className="col-md-6">
                    <p>230</p>
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
                    <p>6 miesięcy</p>
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