// src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/list" className="text-2xl font-bold text-blue-600">StackClone</Link>
        <div className="space-x-4">
          {token ? (
            <>
              <Link to="/ask" className="text-sm text-gray-700 hover:text-blue-600">Ask</Link>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="text-sm text-gray-700 hover:text-blue-600">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
