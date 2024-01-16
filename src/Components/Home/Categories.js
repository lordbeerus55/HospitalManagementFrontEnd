import React, { useState, useEffect } from "react";

import "./Categories.css";
import { useNavigate } from "react-router-dom";
import {
  LiaToothSolid,
  LiaBoneSolid,
  LiaHeartbeatSolid,
} from "react-icons/lia";
import { IconContext } from "react-icons";
import { PiEar } from "react-icons/pi";
import { LuBrain } from "react-icons/lu";

const CategoryCard = ({ category, onClick }) => {
  return (
    <div
      className="imagestyles"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        textAlign: "center",
        cursor: "pointer",
        zIndex: -1,
        height: "200px",
      }}
      onClick={onClick}
    >
      
      <IconContext.Provider value={{ color: "black", size: "50px" }}>
        {category.logo}
      </IconContext.Provider>

      <text style={{ borderColor: "red", border: "100px", zIndex: 3 }}>
        {category.label}
      </text>
    </div>
  );
};

const Categories = () => {
  const navigate = useNavigate();
  const categories = [
    { label: "Dentist", logo: <LiaToothSolid /> },
    { label: "Orthologist", logo: <LiaBoneSolid /> },
    { label: "Cardiologist", logo: <LiaHeartbeatSolid /> },
    { label: "NeuroSurgeon", logo: <LuBrain /> },
    { label: "Otologist", logo: <PiEar /> },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const handleButtonClick = async (categoryLabel) => {
    navigate(`/doctors/${categoryLabel}`);

    // Fetch doctors for the selected category
    try {
      const response = await fetch(
        `http://localhost:8082/api/doctors/getDoctorBySpecialization/${categoryLabel}`
      );
      const data = await response.json();
      setDoctors(data);
      setSelectedCategory(categoryLabel);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    // You can add additional logic here when the selected category changes
  }, [selectedCategory]);

  return (
    <div style={{ backgroundColor: "black", zIndex: -1 }}>
      <h1
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "beige",
        }}
      >
        Categories
      </h1>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 3,
          height: "250px",
        }}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.label}
            category={category}
            onClick={() => handleButtonClick(category.label)}
          />
        ))}
      </div>
      <div style={{ backgroundColor: "beige" }}>
        <h1 style={{ color: "beige" }}>fafafa</h1>
      </div>
      {selectedCategory && (
        <div>
          <h2>Doctors in {selectedCategory}</h2>
          <ul>
            {doctors.map((doctor) => (
              <li key={doctor.id}>{doctor.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Categories;
