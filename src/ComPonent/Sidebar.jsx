import React from "react";
import { useContext } from "react";
import { Admincontext } from "../Context/Admincontext.jsx";
import { NavLink } from "react-router-dom";
import { assets } from "../assets_admin/assets";
const Sidebar = () => {
  const { aToken } = useContext(Admincontext);
  return (
    <div className="min-h-screen bg-white border-r shadow-2xl">
      {aToken && (
        <ul className="text-lime-500 mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 md:px-2 md:min-w-72 cursor-pointer ${
                isActive ? "bg-amber-500 border-r-4" : ""
              }`
            }
            to="/admin-dashboard"
          >
            <img src={assets.home_icon} alt="" />
            <h3>Dashboard</h3>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 md:px-2 md:min-w-72 cursor-pointer ${
                isActive ? "bg-amber-500 border-r-4" : ""
              }`
            }
            to="/appointment"
          >
            <img src={assets.appointment_icon} alt="" />
            <h3>Appointments</h3>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 md:px-2 md:min-w-72 cursor-pointer ${
                isActive ? "bg-amber-500 border-r-4" : ""
              }`
            }
            to="/adddoctor"
          >
            <img src={assets.add_icon} alt="" />
            <h3>Add Doctors</h3>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 md:px-2 md:min-w-72 cursor-pointer ${
                isActive ? "bg-amber-500 border-r-4" : ""
              }`
            }
            to="/doctorlist"
          >
            <img src={assets.people_icon} alt="" />
            <h3>Doctors list</h3>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
