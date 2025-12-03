import React from "react";
import Login from "./Pages/login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import {Admincontext} from "./Context/Admincontext.jsx";
import Navbar from "./ComPonent/Navbar.jsx";
import Sidebar from "./ComPonent/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard.jsx";
import AddDoctor from "./Pages/Admin/AddDoctor.jsx";
import DoctorsList from "./Pages/Admin/DoctorsList.jsx";
import APPointment from "./Pages/Admin/APPointment.jsx";
const App = () => {
  const { aToken } = useContext(Admincontext);
  return aToken ? (
    <div className="text-black-50">
      <ToastContainer />
      <Navbar />
    <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/adddoctor" element={<AddDoctor />} />
          <Route path="/doctorlist" element={<DoctorsList />} />
          <Route path="/APPointment" element={<APPointment />} />
         
        </Routes>
    </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
