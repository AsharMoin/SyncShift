import axios from "axios";
import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate(); // Hook for navigation

  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("/login", { employeeId });
      // Assuming the response contains an ID field
      const userId = res.data.employeeId;

      // Navigate to the /:id route with the obtained ID
      navigate(`/${userId}`, );
    } catch (error: any) {
      console.error(error.message);
      setError("Login failed. Please try again.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="employeeId">Employee ID:</label>
        <input
          type="number"
          id="employeeId"
          name="employeeId"
          placeholder="Enter your Employee ID"
          onChange={(e) => setEmployeeId(e.target.value)}
          autoComplete="off"
          value={employeeId}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
