// AcceptRequestButton.js
import React, { useState } from "react";
import "./AcceptRequestButton.css";

const AcceptRequestButton = () => {
  const [requestId, setRequestId] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "requestId") {
      setRequestId(value);
    } else if (name === "requestStatus") {
      setRequestStatus(value);
    }
  };

  const handleAcceptRequest = async (status) => {
    try {
      const response = await fetch(
        `http://localhost:8082/api/request/${requestId}/${status}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data); // Assuming the response is in JSON format
      } else {
        console.error("Failed to update request status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating request status:", error.message);
    }
  };

  return (
    <div className="accept-request-button-container">
      <div className="accept-request-button">
        <form>
          <label>
            Request ID:
            <input
              type="text"
              name="requestId"
              value={requestId}
              onChange={handleInputChange}
            />
          </label>
          <br />

          <button type="button" onClick={() => handleAcceptRequest("Accept")}>
            Accept
          </button>
          <button type="button" onClick={() => handleAcceptRequest("Reject")}>
            Reject
          </button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </div>
  );
};

export default AcceptRequestButton;
