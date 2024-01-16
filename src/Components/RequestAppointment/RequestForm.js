import React, { useEffect, useState } from 'react';
import GlobalApi from '../../Services/GlobalApi';
import { useParams } from 'react-router-dom';
import './RequestForm.css';

const RequestForm = () => {
  const { id } = useParams();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    nameOfDoctor: '',
    nameOfPatient: '',
    patientId: '',
    doctorId: id,
    request: 'pending', // Set the default value for request
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDoctorSelect = async (doctorId) => {
    try {
      const response = await GlobalApi.getDoctorById(doctorId); // Assuming you have a method to fetch a doctor by ID
      setSelectedDoctor(response.data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        nameOfDoctor: response.data.name,
      }));
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Assuming you have the doctorId and patientId from somewhere
      const data = {
        ...formData,
        doctorId: selectedDoctor.id,
        patientId: formData.patientId, // Replace with the actual patientId
      };

      // Use the API endpoint to submit the request
      const response = await GlobalApi.addRequest(data);

      if (response.status === 200) {
        // Request was successful, show confirmation message
        setShowConfirmation(true);
        // Reset the form data
        setFormData({
          nameOfDoctor: '',
          nameOfPatient: '',
          patientId: '',
          doctorId: id,
          request: 'pending',
        });
      } else {
        // Request failed, handle errors
        console.error('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  useEffect(() => {
    handleDoctorSelect(id);
  }, [id]);

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      {selectedDoctor && (
        <div className="request-form-container" style={{display:'flex',flexDirection:'column'}}>
          {showConfirmation && <p className="confirmation-message">Form submitted successfully!</p>}
          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column'}}>
            <input type="text" name="nameOfDoctor" value={formData.nameOfDoctor} onChange={handleInputChange} disabled style={{ display: 'none' }} />
            <input type="text" name="doctorId" value={formData.doctorId} onChange={handleInputChange} disabled style={{ display: 'none' }} />
            <br />
           
            <label style={{display:'flex',flexDirection:'column'}}>
              Name of Patient:
              <input type="text" name="nameOfPatient" value={formData.nameOfPatient} onChange={handleInputChange} />
            </label>
            
            <br/>
            <label style={{display:'flex',flexDirection:'column'}}>
              PatientId:
              <input type="text" name="patientId" value={formData.patientId} onChange={handleInputChange} />
            </label>
           
            <br />
            <input type="text" name="request" value={formData.request} onChange={handleInputChange} disabled style={{ display: 'none' }} />
            <br />
            <button style={{marginTop:'-15px'}} type="submit">Submit Request</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RequestForm;
