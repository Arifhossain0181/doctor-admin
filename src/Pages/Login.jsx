import React, { useState, useContext } from "react";
import { assets } from "../assets_admin/assets";
import {Admincontext} from "../Context/Admincontext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setaToken , backend_url} = useContext(Admincontext);




  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        if(state==="Admin"){
            const {data} = await axios.post(backend_url+`/api/admin/login`,{email,password})
            if(data.success){
                setaToken(data.token)
                toast.success("Login successful!");
            } else {
                toast.error(data.message || "Login failed");
            }
        }
        else {
            
        }
    }
    catch(error){
        console.log("Login Error:", error);
        toast.error(error.response?.data?.message || "Login failed. Please try again.")
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-[90vh] flex items-center justify-center px-4"
    >
      <div className="flex flex-col gap-4 bg-white shadow-xl border border-gray-200 p-8 rounded-2xl w-full max-w-sm">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-blue-600">
          {state} Login
        </h2>

        {/* Email */}
        <div className="w-full">
          <h3 className="text-gray-700 font-medium">Email</h3>
          <input
            type="email"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <h3 className="text-gray-700 font-medium">Password</h3>
          <input
            type="password"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 transition text-white w-full py-2 rounded-lg text-lg font-semibold shadow-md mt-3"
        >
          Login
        </button>

        {/* Toggle Login Type */}
        {state === "Admin" ? (
          <p className="text-sm text-gray-700 text-center">
            Doctor login?{" "}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-700 text-center">
            Admin login?{" "}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
