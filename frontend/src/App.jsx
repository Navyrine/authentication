import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header.jsx";
import HomePage from "./ui/home_page/HomePage.jsx";
import RegisterPage from "./ui/register_page/RegisterPage.jsx";
import LoginPage from "./ui/login_page/LoginPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
