import React, { useContext } from "react";
import { assets } from "../assets_admin/assets";
import { Admincontext } from "../Context/Admincontext.jsx";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { aToken , setaToken } = useContext(Admincontext);
  const navigate = useNavigate();
  
  const logout = () => {
    navigate("/");
    setaToken("")
    localStorage.removeItem('atoken')
  }


  return (
    <nav className="w-full bg-white shadow-md px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img
            src={assets.admin_logo}
            alt="Logo"
            className="w-24 h-10 object-contain"
          />
          <h1 className="text-xl font-semibold text-blue-600 hidden sm:block">
            Dashboard
          </h1>
        </div>

        {/* Right: User Role + Logout */}
        <div className="flex items-center gap-4">
          <h3 className="text-base font-medium text-gray-700">
            {aToken ? "Admin" : "Doctor"}
          </h3>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
