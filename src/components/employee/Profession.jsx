import React, { useState } from 'react';
import axios from 'axios';
import './Profession.css';

function Profession() {
  const [formData, setFormData] = useState({
    canHandlePressure: false,
    cookingStyles: [],
    education: {
      comprehensiveSchool: {
        comprehensiveSchoolCity: "",
        comprehensiveSchoolName: "",
        comprehensiveSchoolType: "HIGH_SCHOOL",
      },
      educationGraduationDate: "",
      educationLevel: "DOCTORATE",
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
      profession: "COOK",
      startDate: ""
    }],
    signatureDishes: [""],
    userId: 2, // Zastąp właściwym ID użytkownika
    yearsOfExperience: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNestedChange = (e, nestedField) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [nestedField]: {
        ...formData[nestedField],
        [name]: value
      }
    });
  };

  const handleComplexNestedChange = (e, nestedField, index) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[nestedField]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    setFormData({
      ...formData,
      [nestedField]: updatedArray
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYWFAYWFhLmNvbSIsImlhdCI6MTcwNTQyMDczMywiZXhwIjoxNzA1NDIyMTczfQ.271g8Gqrnpcz4lAB3j2Z4NIlDNAZndg8KgXjt_go6Mg"; // Podmień na swój token

    try {
      const response = await axios.post('http://localhost:8080/api/v1/cooks', formData, {
        headers: {
          'Authorization ': token,
'Content-Type': 'application/json'
}
});
console.log(response.data);
// Obsługa odpowiedzi
} catch (error) {
console.error("Błąd przy wysyłaniu formularza", error);
// Obsługa błędów
}
};

return (
    <div className="profession-form-container">
      <form onSubmit={handleSubmit} className="profession-form">
        <div className="form-group">
          <label htmlFor="canHandlePressure">Can Handle Pressure:</label>
          <input 
            type="checkbox" 
            id="canHandlePressure"
            name="canHandlePressure" 
            checked={formData.canHandlePressure}
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label>Cooking Styles:</label>
          {['POLISH_CUISINE', 'FRENCH_CUISINE', 'ITALIAN_CUISINE', /* reszta tu bezie */].map(style => (
<div key={style}>
<label>
<input 
               type="checkbox" 
               name="cookingStyles" 
               value={style}
               onChange={handleChange} 
             /> {style.split('_').join(' ')}
</label>
</div>
))}
</div>
    <div className="form-group">
      <label>Education Level:</label>
      <select 
        name="educationLevel" 
        value={formData.education.educationLevel}
        onChange={(e) => handleNestedChange(e, 'education')}>
        <option value="ELEMENTARY">Elementary</option>
        <option value="SECONDARY">Secondary</option>
        <option value="VOCATIONAL">Vocational</option>
        <option value="HIGHER">Higher</option>
        <option value="MASTER">Master</option>
        <option value="DOCTORATE">Doctorate</option>
      </select>
    </div>

    <div className="form-group">
      <label>Comprehensive School City:</label>
      <input 
        type="text" 
        name="comprehensiveSchoolCity" 
        value={formData.education.comprehensiveSchool.comprehensiveSchoolCity}
        onChange={(e) => handleNestedChange(e, 'education')}
      />
    </div>

    {/* reszta tu bezie */}

    <div className="form-group">
      <label>Professional Experiences:</label>
      {formData.professionalExperiences.map((experience, index) => (
        <div key={index}>
          <input 
            type="text" 
            name="company" 
            value={experience.company}
            onChange={(e) => handleComplexNestedChange(e, 'professionalExperiences', index)} 
          />
          {/* reszta tu bezie */}
        </div>
      ))}
    </div>

    <div className="form-group">
      <label>Signature Dishes:</label>
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

    <div className="form-group">
      <label>Years of Experience:</label>
      <input 
        type="number" 
        name="yearsOfExperience" 
        value={formData.yearsOfExperience} 
        onChange={handleChange} 
      />
    </div>

    <button type="submit" className="submit-button">Utwórz Profesję</button>
  </form>
</div>
);
}

export default Profession;