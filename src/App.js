import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Screens/Home";
import NavigationBar from "./Components/NavBar/NavigationBar";
import AddDoctorForm from "./Screens/AddDoctorForm";
import DoctorDetails from "./Components/DoctorList/DoctorDetails";
import Appointment from "./Screens/Appointment";
import DoctorList from "./Screens/DoctorList";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <div style={{ overflowY: "auto", maxheight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/doctors/:specialization" element={<DoctorList />} />
          <Route path="/inputdoctors" element={<AddDoctorForm />} />
          <Route
            path="/doctors/:specialization/:id"
            element={<DoctorDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
