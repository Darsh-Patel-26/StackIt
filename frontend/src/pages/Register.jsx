// src/pages/Register.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ setToken }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", formData);
      const token = res.data.message.data;
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/list");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
      {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
        >
          <option value="User">User</option>
          <option value="Guest">Guest</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
