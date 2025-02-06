import {createContext, useEffect, useState} from 'react'

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    
    const[data, setData] = useState(null);
    const[user, setUser] = useState(null);
    const[isAuthenticated, setIsAuthenticated] = useState(false);

    const login =(userData)=>{


        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAuthenticated(true);

    }

    const logout =()=>{
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    }
    const getData = ()=>{
        const receivedData = localStorage.getItem('user');
        if(receivedData)
        {
            setUser(JSON.parse(receivedData));
        }
    }

    const tDetails = (tData)=>{
        setData(tData);
        localStorage.setItem('tDetails', JSON.stringify(tData));
    }
    console.log("tdetails", data)

    const getTData = () =>{
        const receivedData = localStorage.getItem('tDetails');
        if(receivedData)
        {
            setData(JSON.parse(receivedData));
        }
    }
    
    useEffect(()=>{
        getData()
        getTData()
    }, []);

    return(
        <AuthContext.Provider value={{user, login, getData,tDetails, data, isAuthenticated, logout}}>
            {children}
        </AuthContext.Provider> 
    );

}