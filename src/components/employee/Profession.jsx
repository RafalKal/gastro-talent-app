import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '/src/context/AuthProvider';
import './Profession.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profession() {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    canHandlePressure: false,
    cookingStyles: [],
    education: {
      comprehensiveSchool: {
        comprehensiveSchoolCity: "",
        comprehensiveSchoolName: "",
        comprehensiveSchoolType: "",
      },
      educationGraduationDate: "",
      educationLevel: "",
      university: {
        universityCity: "",
        universityName: "",
      },
    },
    isCertifiedSousChef: false,
    professionalExperiences: [{
      company: "",
      endDate: "",
      jobDescription: "",
      position: "",
      profession: "",
      startDate: ""
    }],
    signatureDishes: [""],
    userId: auth.id,
    yearsOfExperience: 0,
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchProfessionData = async () => {
      const profileId = Number(auth.id) + 1;

      try {
        const response = await axios.get(`http://localhost:8080/api/v1/cooks/${profileId}`, {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });

        if (response.data) {
          setFormData({
            ...response.data,
            cookingStyles: response.data.cookingStyles || [], // Ensure cookingStyles is an array
            education: {
              ...response.data.education,
              educationGraduationDate: response.data.education.educationGraduationDate || '', // Prevent null or undefined
            },
            professionalExperiences: response.data.professionalExperiences.map(exp => ({
              ...exp,
              startDate: exp.startDate || '', // Prevent null or undefined
              endDate: exp.endDate || '', // Prevent null or undefined
            })),
            signatureDishes: response.data.signatureDishes || [''], // Ensure signatureDishes is an array with at least an empty string
          });
          setIsEdit(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("Profil zawodowy nie istnieje, tworzenie nowego.");
          setIsEdit(false);
        } else {
          console.error("Błąd przy ładowaniu danych", error);
        }
      }
    };

    fetchProfessionData();
  }, [auth.id, auth.token]);




const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === 'checkbox' && name === 'cookingStyles') {
    // Tworzenie nowej tablicy stylów gotowania w zależności od tego, czy checkbox został zaznaczony czy nie.
    setFormData(prevFormData => ({
      ...prevFormData,
      cookingStyles: checked 
        ? [...prevFormData.cookingStyles, value] 
        : prevFormData.cookingStyles.filter(style => style !== value),
    }));
  } else if (type === 'checkbox') {
    // Aktualizacja dla innych checkboxów, które nie są częścią tablicy cookingStyles.
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: checked,
    }));
  } else {
    // Aktualizacja dla innych pól input, które nie są checkboxami.
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  }
};



const handleNestedChange = (e, nestedField, subField = null) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [nestedField]: subField
      ? {
          ...prevFormData[nestedField],
          [subField]: {
            ...prevFormData[nestedField][subField],
            [name]: value,
          },
        }
      : {
          ...prevFormData[nestedField],
          [name]: value,
        },
  }));
};


const handleComplexNestedChange = (e, nestedField, index) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => {
    const updatedArray = [...prevFormData[nestedField]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    return {
      ...prevFormData,
      [nestedField]: updatedArray,
    };
  });
};

const handleArrayChange = (e, index, field) => {
  const { value } = e.target;
  setFormData((prevFormData) => {
    const newArray = [...prevFormData[field]];
    newArray[index] = value;
    return {
      ...prevFormData,
      [field]: newArray,
    };
  });
};




const handleSubmit = async (e) => {
  e.preventDefault();
  const profileId = isEdit ? Number(auth.id) + 1 : auth.id;
  const url = isEdit ? `http://localhost:8080/api/v1/cooks/${profileId}` : 'http://localhost:8080/api/v1/cooks';
  const method = isEdit ? 'put' : 'post';

  try {
    const response = await axios[method](url, formData, {
      headers: {
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error("Błąd przy wysyłaniu formularza", error);
  }
};






  
return (
  <div className="profession-form-container">
    <h2>Formularz Profesji</h2>
    <form onSubmit={handleSubmit} className="profession-form">
        <div className=" form-group">
        <input 
          type="checkbox" 
          id="canHandlePressure"
          name="canHandlePressure" 
          className="form-check-input"
          checked={formData.canHandlePressure}
          onChange={handleChange} 
        />
        <label htmlFor="canHandlePressure" className="form-check-label">Can Handle Pressure</label>
      </div>
       <div className="mb-3">
          <label className="form-label">Style gotowania:</label>
          <div className="d-flex flex-wrap"></div>
  {[
    'POLISH_CUISINE', 'FRENCH_CUISINE', 'ITALIAN_CUISINE', 'SPANISH_CUISINE',
    'MEXICAN_CUISINE', 'JAPANESE_CUISINE', 'INDIAN_CUISINE', 'THAI_CUISINE',
    'GREEK_CUISINE', 'AMERICAN_CUISINE', 'CHINESE_CUISINE', 'GERMAN_CUISINE',
    'BRAZILIAN_CUISINE', 'RUSSIAN_CUISINE', 'KOREAN_CUISINE', 'VIETNAMESE_CUISINE',
    'MOROCCAN_CUISINE', 'ETHIOPIAN_CUISINE', 'CAJUN_CUISINE', 'CARIBBEAN_CUISINE',
    'AUSTRALIAN_CUISINE'
  ].map(style => (
    <div key={style} className="form-check">
      <input 
        type="checkbox" 
        name="cookingStyles" 
        value={style}
        checked={formData.cookingStyles.includes(style)} // to sprawdza, czy dany styl jest już zaznaczony
        onChange={handleChange} 
        className="form-check-input" 
      />
      <label className="form-check-label">
        {style.replace(/_/g, ' ').toLowerCase()}
      </label>
    </div>
  ))
}
        </div>
         {/* Typ ukończonej szkoły */}
        <div className="form-group">
          <label htmlFor="comprehensiveSchoolType">Typ ukończonej szkoły:</label>
          <select 
  name="comprehensiveSchoolType"
  value={formData.education.comprehensiveSchool.comprehensiveSchoolType}
  onChange={(e) => handleNestedChange(e, 'education', 'comprehensiveSchool')}>
  <option value="HIGH_SCHOOL">Liceum</option>
  <option value="TECHNICAL_SCHOOL">Technikum</option>
  <option value="VOCATIONAL_SCHOOL">Szkoła zawodowa</option>
</select>

        </div>
       {/* Miasto szkoły */}
<div className="form-group">
  <label htmlFor="comprehensiveSchoolCity">Miasto szkoły:</label>
  <input 
    type="text" 
    name="comprehensiveSchoolCity" 
    value={formData.education.comprehensiveSchool.comprehensiveSchoolCity}
    onChange={(e) => handleNestedChange(e, 'education', 'comprehensiveSchool')}
  />
</div>

{/* Nazwa szkoły */}
<div className="form-group">
  <label htmlFor="comprehensiveSchoolName">Nazwa szkoły:</label>
  <input 
    type="text" 
    name="comprehensiveSchoolName" 
    value={formData.education.comprehensiveSchool.comprehensiveSchoolName}
    onChange={(e) => handleNestedChange(e, 'education', 'comprehensiveSchool')}
  />
</div>

        {/* Poziom edukacji */}
        <div className="form-group">
          <label htmlFor="educationLevel">Poziom edukacji:</label>
          <select 
            name="educationLevel" 
            value={formData.education.educationLevel}
            onChange={(e) => handleNestedChange(e, 'education')}>
            <option value="ELEMENTARY">Podstawowe</option>
            <option value="SECONDARY">Średnie</option>
            <option value="VOCATIONAL">Zawodowe</option>
            <option value="HIGHER">Wyższe</option>
            <option value="MASTER">Magisterskie</option>
            <option value="DOCTORATE">Doktorat</option>
          </select>
        </div>

        {/* Data ukończenia edukacji */}
        <div className="form-group">
          <label htmlFor="educationGraduationDate">Data ukończenia edukacji:</label>
          <input 
            type="date" 
            name="educationGraduationDate" 
            value={formData.education.educationGraduationDate}
            onChange={(e) => handleNestedChange(e, 'education')}
          />
        </div>

        {/* Uniwersytet */}
<div className="form-group">
  <label htmlFor="universityName">Nazwa uniwersytetu:</label>
  <input 
    type="text" 
    name="universityName" 
    value={formData.education.university.universityName}
    onChange={(e) => handleNestedChange(e, 'education', 'university')}
  />
  <label htmlFor="universityCity">Miasto uniwersytetu:</label>
  <input 
    type="text" 
    name="universityCity" 
    value={formData.education.university.universityCity}
    onChange={(e) => handleNestedChange(e, 'education', 'university')}
  />
</div>

        {/* Doświadczenie zawodowe */}
       {formData.professionalExperiences.map((experience, index) => (
  <div key={index} className="form-group mb-3">
    <label htmlFor={`company-${index}`}>Firma:</label>
    <input 
      type="text" 
      name="company" 
      id={`company-${index}`}
      value={experience.company}
      onChange={(e) => handleComplexNestedChange(e, 'professionalExperiences', index)} 
    />

    <label htmlFor={`startDate-${index}`}>Data rozpoczęcia:</label>
    <input 
      type="date" 
      name="startDate" 
      id={`startDate-${index}`}
      value={experience.startDate}
      onChange={(e) => handleComplexNestedChange(e, 'professionalExperiences', index)} 
    />

    <label htmlFor={`endDate-${index}`}>Data zakończenia:</label>
    <input 
      type="date" 
      name="endDate" 
      id={`endDate-${index}`}
      value={experience.endDate}
      onChange={(e) => handleComplexNestedChange(e, 'professionalExperiences', index)} 
    />

    <label htmlFor={`jobDescription-${index}`}>Opis stanowiska:</label>
    <textarea 
      name="jobDescription" 
      id={`jobDescription-${index}`}
      value={experience.jobDescription}
      onChange={(e) => handleComplexNestedChange(e, 'professionalExperiences', index)} 
    />

    <label htmlFor={`position-${index}`}>Pozycja:</label>
    <input 
      type="text" 
      name="position" 
      id={`position-${index}`}
      value={experience.position}
      onChange={(e) => handleComplexNestedChange(e, 'professionalExperiences', index)} 
    />

<label htmlFor={`profession-${index}`}>Profesja:</label>
    <select 
      name="profession" 
      id={`profession-${index}`}
      value={experience.profession}
      onChange={(e) => handleComplexNestedChange(e, 'professionalExperiences', index)}>
      <option value="COOK">Kucharz</option>
      <option value="WAITER">Kelner</option>
      <option value="BREWER">Piwowar</option>
      <option value="NUTRITION_SPECIALIST">Specjalista Żywienia</option>
      <option value="BARTENDER">Barman</option>
      <option value="CULINARY_CRITIC">Krytyk Kulinarny</option>
      <option value="ORGANIZER_OF_CATERING_SERVICES">Organizator Usług Cateringowych</option>
      <option value="BARISTA">Barista</option>
      <option value="RESTAURANT_MANAGER">Menedżer Restauracji</option>
      <option value="FOOD_SUPPLIER">Dostawca Potraw</option>
      <option value="SOMMELIER">Sommelier</option>
      <option value="FOOD_TECHNOLOGIST">Technolog Żywności</option>
      <option value="BAKER">Piekarz</option>
      <option value="CONFECTIONER">Cukiernik</option>
      <option value="DIETITIAN">Dietetyk</option>
    </select>
  </div>
))}

         {/* Czy jest certyfikowanym sous-chefem */}
        <div className="form-group">
          <label htmlFor="isCertifiedSousChef">Certyfikowany sous-chef:</label>
          <input 
            type="checkbox" 
            id="isCertifiedSousChef"
            name="isCertifiedSousChef" 
            checked={formData.isCertifiedSousChef}
            onChange={handleChange} 
          />
        </div>

       {/* Potrawy sygnaturowe */}
<div className="form-group mb-3">
  <label htmlFor="signatureDishes">Potrawy sygnaturowe:</label>
  {formData.signatureDishes.map((dish, index) => (
    <input 
      key={index}
      type="text" 
      name="signatureDishes" 
      value={dish}
      onChange={(e) => handleArrayChange(e, index, 'signatureDishes')} 
    />
  ))}
</div>


        {/* Lata doświadczenia */}
        <div className="form-group mb-3">
          <label htmlFor="yearsOfExperience">Lata doświadczenia:</label>
          <input 
            type="number" 
            name="yearsOfExperience" 
            value={formData.yearsOfExperience} 
            onChange={handleChange} 
          />
        </div>

        {/* Przycisk wysyłania */}
         <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Utwórz Profesję
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profession;

