import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';

function Filter({ onFilterChange, selectedExperience }) {
  const handleExperienceChange = (value) => {
    onFilterChange('workExperience', value);
  };

  return (
    <Col className="col-3">
      <div className="filtersSection">
        <h3 className="mb-3">Filtry &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
        <Form className="FilterContainer">
          <Form.Group className="mb-3">
            <Form.Label name="workExperience" className="titleForm">Doświadczenie zawodowe</Form.Label>
            <Form.Check
              name="workExperience"
              className="checkElements"
              label="Brak doświadczenia "
              type="radio"
              checked={selectedExperience === 0}
              onChange={() => handleExperienceChange(0)}
            />
            <Form.Check
              name="workExperience"
              className="checkElements"
              label="Minimum 1 rok"
              type="radio"
              checked={selectedExperience === 1}
              onChange={() => handleExperienceChange(1)}
            />
            <Form.Check
              name="workExperience"
              className="checkElements"
              label="Minimum 2 lata"
              type="radio"
              checked={selectedExperience === 2}
              onChange={() => handleExperienceChange(2)}
            />
            <Form.Check
              name="workExperience"
              className="checkElements"
              label="Minimum 5 lat"
              type="radio"
              checked={selectedExperience === 5}
              onChange={() => handleExperienceChange(5)}
            />
          </Form.Group>
        </Form>
      </div>
    </Col>
  );
}

export default Filter;
