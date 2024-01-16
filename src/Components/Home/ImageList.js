/* eslint-disable jsx-a11y/img-redundant-alt */
// ImageList.js
import React, { useEffect, useRef } from "react";
import "./ImageList.css"; // Import your CSS file for styling
import styled, { keyframes, css } from "styled-components";

const ImageList = ({ images }) => {
  const imageListRef = useRef(null);

  useEffect(() => {
    const container = imageListRef.current;

    if (container) {
      const scrollInterval = setInterval(() => {
        container.scrollLeft += 1; // Adjust the scroll speed as needed
      }, 20); // Adjust the interval (milliseconds) as needed

      // Clean up the interval when the component unmounts
      return () => clearInterval(scrollInterval);
    }
  }, [imageListRef.current]);
  return (
    <div className="image-list-container">
      <br />
      <br />
      <br />
      <div className="slider-container">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img
              src={`data:image/png;base64,${image}`}
              alt={`Image ${index + 1}`}
              style={{
                width: "450px",
                height: "300px",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img
              src={`data:image/png;base64,${image}`}
              alt={`Image ${index + 1}`}
              style={{
                width: "450px",
                height: "300px",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;

const common = styled.div`
  flex-shrink: 0;
`;
