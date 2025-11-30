import {createContext, useState} from 'react';

export const doctorcontext = createContext(null);   

const DoctorProvider = ({children}) => {
    const value ={

    }
    return (
        <doctorcontext.Provider value={value}>
            {children}
        </doctorcontext.Provider>
    )
}

export default DoctorProvider;