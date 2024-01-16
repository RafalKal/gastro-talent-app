import React, { useState } from 'react';

function Ustawienia() {
  const [formData, setFormData] = useState({
    imie: 'Grażyna',
    nazwisko: 'Kowalska',
    email: 'grazyna.kowalska@gmail.com',
    numerTelefonu: '123 456 789',
    zawod: 'kucharz',
    umiejetnosci: {
      projektowanieStron: 4,
      programowanieWeb: 5,
      wordpress: 3,
      wooCommerce: 4,
      phpDotNet: 3,
    },
    wymagania: 'Wymagania użytkownika',
    zdjecieProfilowe: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (nazwaUmiejetnosci, nowaWartosc) => {
    setFormData({
      ...formData,
      umiejetnosci: {
        ...formData.umiejetnosci,
        [nazwaUmiejetnosci]: nowaWartosc,
      },
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, zdjecieProfilowe: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Przetwarzaj dane formularza lub wysyłaj je na serwer
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src={formData.zdjecieProfilowe}
              alt="Profile"
            />
            <input
              type="file"
              className="file btn btn-lg btn-primary"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>
       <div className="col-md-3 border-right">
          {/* Zdjęcie profilowe i dane użytkownika */}
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Ustawienia profilu</h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Imię</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Imię"
                    name="imie"
                    value={formData.imie}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Nazwisko</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nazwisko"
                    name="nazwisko"
                    value={formData.nazwisko}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Numer Telefonu</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Wprowadź numer telefonu"
                    name="numerTelefonu"
                    value={formData.numerTelefonu}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <label className="labels">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Wprowadź adres email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <label className="labels">Zawód</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Wprowadź zawód"
                    name="zawod"
                    value={formData.zawod}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-12">
                  <label className="labels">Umiejętności</label>
                  <div>
                    <div className="d-flex align-items-center">
                      <span className="mr-2"> kuchnia:</span>
                      <input
                        type="number"
                        className="form-control"
                        name="projektowanieStron"
                        value={formData.umiejetnosci.projektowanieStron}
                        onChange={(e) =>
                          handleSkillChange('projektowanieStron', parseInt(e.target.value, 10))
                        }
                        min="0"
                        max="5"
                      />
                    </div>
                    {/* Powtórz powyższy blok dla innych umiejętności */}
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <label className="labels">Wymagania</label>
                  <textarea
                    className="form-control"
                    placeholder="Wymagania użytkownika"
                    name="wymagania"
                    value={formData.wymagania}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-primary profile-button" type="submit">
                  Zapisz profil
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-4">
          {/* Edycja doświadczenia lub innych informacji */}
        </div>
        <div className="col-md-4">
          {/* Edycja doświadczenia lub innych informacji */}
        </div>
      </div>
    </div>
  );
}

export default Ustawienia;
