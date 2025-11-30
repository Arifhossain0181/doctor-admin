
import React from 'react';
import { createContext } from 'react';


export const APPContext = createContext(null);
 

const APPProvider = ({children}) => {
    const value ={

    }

    return (
        <APPContext.Provider value={value}>
            {children}
        </APPContext.Provider>
    )
}
export default APPProvider;

