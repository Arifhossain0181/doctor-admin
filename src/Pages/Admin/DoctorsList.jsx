import React, { useContext, useEffect } from "react";
import { Admincontext } from "../../Context/Admincontext.jsx";

const DoctorsList = () => {
  const { doctors, aToken, getAlldoctors ,changeAvailability} = useContext(Admincontext);

  useEffect(() => {
    if (aToken) {
      getAlldoctors();
    }
  }, [aToken]);

  return (
    <div className="px-4 md:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Doctors List</h1>

      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-6
          
        "
      >
        {doctors.map((doc, index) => (
          <div
            key={doc._id || index}
            className="
              group
              bg-white 
              shadow-lg 
              rounded-xl 
              p-4 
              border 
              hover:shadow-2xl 
              transition 
              duration-300
              cursor-pointer
            "
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-full h-40 object-cover rounded-lg mb-3 group-hover:scale-105 transition duration-300
              group-hover:bg-blue-400"
            />

            <div>
              <h2 className="text-lg font-semibold group-hover:text-blue-600 transition">{doc.name}</h2>
              <p className="text-gray-600 text-sm">{doc.email}</p>
              <p className="text-gray-700 text-sm font-medium mt-1">
                {doc.specialization}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <input
                onChange={()=>changeAvailability(doc._id)}
                  type="checkbox"
                  checked={doc.available}
                  readOnly
                  className="w-4 h-4"
                />
                <label className="text-sm text-gray-700">Active</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
