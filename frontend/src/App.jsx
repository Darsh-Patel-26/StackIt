// App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AskQuestion from "./pages/AskQuestion";
import QuestionsList from "./pages/QuestionsList";
import QuestionDetails from "./pages/QuestionDetails";
import Navbar from "./components/Navbar";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar token={token} setToken={setToken} />
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/ask" element={token ? <AskQuestion /> : <Navigate to="/login" />} />
            <Route path="/list" element={<QuestionsList />} />
            <Route path="/question/:id" element={<QuestionDetails />} />
            <Route path="*" element={<Navigate to="/list" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
