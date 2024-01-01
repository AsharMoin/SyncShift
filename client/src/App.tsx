import React from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<UserHome />} />
      </Routes>
    </>
  );
}
