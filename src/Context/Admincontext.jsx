import {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Admincontext = createContext(null);

const AdminProvider = ({children}) => {
    const [aToken, setaToken] = useState(localStorage.getItem('atoken') || '');
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        if (aToken) {
            localStorage.setItem('atoken', aToken);
        } else {
            localStorage.removeItem('atoken');
        }
    }, [aToken]);

    // Function to fetch all doctors
    
    const getAlldoctors = async () => {
        if (!aToken) {
            console.log("No token available, skipping fetch");
            return;
        }
        
        try {
            const {data} = await axios.get(backend_url+`/api/admin/all-doctors`, {
                headers: {
                    atoken: aToken
                }
            });
            
            if(data.success){
                setDoctors(data.doctors);
                console.log("Fetched doctors:", data.doctors);
            } else {
                toast.error(data.message || "Failed to fetch doctors");
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
            if (error.response?.status === 404) {
                console.log("Doctors endpoint not found. Backend may need this route: GET /api/admin/doctors");
                // Don't show error toast for 404, just log it
            } else {
                toast.error(error.response?.data?.message || "Error fetching doctors");
            }
        }
    }

    // avilability of doctors change
    const changeAvailability = async (doctorId) => {
        try {
            const {data} = await axios.post(backend_url+`/api/admin/change-availability`, {docId: doctorId}, {
                headers: {
                    atoken: aToken
                }
            });
            
            if(data.success){
                toast.success("Availability changed successfully");
                getAlldoctors(); // Refresh the doctors list
            } else {
                toast.error(data.message || "Failed to change availability");
            }
        } catch (error) {
            console.error("Error changing availability:", error);
            if (error.response?.status === 404) {
                toast.error("Backend endpoint not implemented yet");
                console.log("Backend needs: POST /api/admin/change-availability");
            } else {
                toast.error(error.response?.data?.message || "Failed to change availability");
            }
        }
    }

    const value = {
        aToken,
        setaToken,
        backend_url,
        doctors,
        getAlldoctors,
        changeAvailability
    }
    
    return (
        <Admincontext.Provider value={value}>
            {children}
        </Admincontext.Provider>
    )
}

export default AdminProvider;