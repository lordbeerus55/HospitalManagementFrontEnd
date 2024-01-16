import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import { PiHouseLine } from "react-icons/pi";
import { IconContext } from "react-icons";
import { IoCalendarOutline } from "react-icons/io5";

const NavigationBar = () => {
  return (
    <nav className="nav" style={{position:'relative'}}>
      <div className="content-container">
        <ul
          className="nav-list"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <li
            className="nav-item"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Link to="/" className="nav-link">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  verticalAlign:'middle'
                }}
              >
                <IconContext.Provider value={{ color: "black", size: "30px" }}>
                  <PiHouseLine
                    style={{ marginRight: "2px", verticalAlign: "middle" }}
                  />
                </IconContext.Provider>
                {/* <span style={{ verticalAlign: "middle" }}>Home</span> */}
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/appointment" className="nav-link">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  verticalAlign:'middle'
                }}
              >
                <IconContext.Provider value={{ color: "black", size: "30px" }}>
                  <IoCalendarOutline
                    style={{ marginRight: "2px", verticalAlign: "middle" }}
                  />
                </IconContext.Provider>
                {/* <span style={{ verticalAlign: "middle" }}>Appointment</span> */}
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/inputdoctors" className="nav-link">
              Add Doctors
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
