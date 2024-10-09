// import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPages from "../pages/LoginPages";
import IndividualPages from "../pages/IndividualPages";
import CorporateSignUpPages from "../pages/CorporateSignUpPages";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPages />} />
        <Route path="/signup/individual" element={<IndividualPages />} />
        <Route path="/signup/corporate" element={<CorporateSignUpPages />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
