// RequestList.js
import React, { useEffect, useState } from "react";
import GlobalApi from "../Services/GlobalApi";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const requestsData = await Promise.all(
        Array.from({ length: 99 }, async (_, i) => {
          try {
            const request = await GlobalApi.getRequestById(i + 1);
            return request.data;
          } catch (error) {
            console.error(`Error fetching request ${i + 1}:`, error);
            return null;
          }
        })
      );
      setRequests(requestsData.filter((request) => request !== null));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSelectedPatientId(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if selectedPatientId is empty, if yes, display all requests
    if (selectedPatientId === '') {
      fetchData();
    } else {
      // Filter the requests based on the selected patientId
      const filteredRequests = requests.filter((request) => request.patientId === parseInt(selectedPatientId, 10));
      setRequests(filteredRequests);
    }
  };

  return (
    <div>
      <h1>Requests</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select Patient ID:
          <input type="text" value={selectedPatientId} onChange={handleInputChange} />
        </label>
        <button type="submit">Filter Requests</button>
      </form>

      {requests.map((request) => (
        <div key={request.id}>
          {/* Display request details as needed */}
          <p>{`Request ID: ${request.id} Status: ${request.request} PatientId: ${request.patientId}`}</p>
        </div>
      ))}
    </div>
  );
};

export default RequestList;
