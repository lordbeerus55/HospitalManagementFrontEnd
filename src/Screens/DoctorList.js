// DoctorList.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DoctorList.css';
import GlobalApi from '../Services/GlobalApi';

const DoctorList = () => {
  const { specialization } = useParams();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await GlobalApi.getDoctorBySpecialization(specialization);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, [specialization]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px', position: 'initial' }}>Doctors in {specialization}</h2>
      <div className="doctor-cards">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <Link to={`/doctors/${specialization}/${doctor.id}`}>
              <div className="doctor-details">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialization}</p>
                <p>Rating: {doctor.rating}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
