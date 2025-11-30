import React, { useState, useContext } from "react";
import { assets } from "../../assets_admin/assets";
import { Admincontext } from "../../Context/Admincontext.jsx";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const { backend_url, aToken } = useContext(Admincontext);

  const [docimg, setDocimg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [fee, setFee] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!docimg) return toast.error("Please upload doctor image");
    if (!aToken) return toast.error("You are not authorized. Please login again.");

    // Prepare form data
    const formdata = new FormData();
    formdata.append("docimg", docimg); // MUST MATCH backend multer field name
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("experience", experience);
    formdata.append("fees", Number(fee));
    formdata.append("speciality", specialization);
    formdata.append("degree", degree);
    formdata.append("about", about);
    formdata.append("availability", "Available"); // required by backend
    formdata.append(
      "address",
      JSON.stringify({ line1: address1, line2: address2 })
    );

    try {
      const res = await fetch(`${backend_url}/api/admin/add-doctor`, {
        method: "POST",
        body: formdata,
        headers: { atoken: aToken },
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Doctor added successfully!");
        // Reset form
        setDocimg(null);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("");
        setFee("");
        setSpecialization("");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setAbout("");
      } else {
        toast.error(data.message || "Failed to add doctor");
      }
    } catch (error) {
      console.error("Add doctor error:", error);
      toast.error("Failed to add doctor. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 bg-white shadow-2xl rounded-2xl space-y-8"
    >
      <h3 className="text-3xl font-bold text-center text-blue-600">Add Doctor</h3>

      {/* Image Upload */}
      <div className="flex flex-col items-center gap-4">
        <label htmlFor="doc-img">
          <img
            src={docimg ? URL.createObjectURL(docimg) : assets.upload_area}
            alt="Upload"
            className="w-40 h-40 object-cover rounded-xl border shadow-md cursor-pointer hover:scale-105 transition-transform"
          />
        </label>
        <input
          type="file"
          id="doc-img"
          hidden
          onChange={(e) => setDocimg(e.target.files[0])}
        />
        <p className="text-lg font-semibold text-gray-600">Upload Doctor Image</p>
      </div>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <label className="font-semibold">Doctor Name</label>
            <input
              type="text"
              placeholder="Enter name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold">Experience</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select experience</option>
              {[...Array(20)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Fee</label>
            <input
              type="number"
              placeholder="Enter fee"
              required
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label className="font-semibold">Specialization</label>
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select specialization</option>
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Education</label>
            <input
              type="text"
              placeholder="Enter education"
              required
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold">Address</label>
            <input
              type="text"
              placeholder="Address line 1"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="w-full p-3 border rounded-lg mb-2"
            />
            <input
              type="text"
              placeholder="Address line 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold">About Doctor</label>
            <textarea
              rows="5"
              placeholder="Write about doctor"
              required
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-3 border rounded-lg"
            ></textarea>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-md hover:bg-blue-700 transition"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctor;
