import {createContext, useState, useEffect} from 'react';

export const Admincontext = createContext(null);

const AdminProvider = ({children}) => {
    const [aToken, setaToken] = useState(localStorage.getItem('atoken') || '');
    const backend_url = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (aToken) {
            localStorage.setItem('atoken', aToken);
        } else {
            localStorage.removeItem('atoken');
        }
    }, [aToken]);

    const value = {
        aToken,
        setaToken,
        backend_url,
    }
    
    return (
        <Admincontext.Provider value={value}>
            {children}
        </Admincontext.Provider>
    )
}

export default AdminProvider;