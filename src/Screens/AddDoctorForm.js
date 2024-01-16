// AddDoctorForm.js
import React, { useState } from "react";
import axios from "axios";

const AddDoctorForm = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    rating: 0,
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setDoctor((prevDoctor) => ({
        ...prevDoctor,
        photo: reader.result.split(",")[1], // Extract the base64 string (excluding the data URL prefix)
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP request to your backend API to add the doctor
      await axios.post("http://localhost:8082/api/doctors/addDoctor", doctor);

      console.log("Doctor added successfully!");
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  return (
    <div>
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={doctor.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Specialization:
          <select
            name="specialization"
            value={doctor.specialization}
            onChange={handleInputChange}
          >
            <option value="">Select Specialization</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dentist">Dentist</option>
            <option value="Otologist">Otologist</option>
            <option value="Neurosurgeon">Neurosurgeon</option>
            <option value="Orthologist">Orthologist</option>
          </select>
        </label>
        <br />
        <label>
          Rating:
          <input
            type="decimal"
            name="rating"
            value={doctor.rating}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Profile Photo:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
};

export default AddDoctorForm;
