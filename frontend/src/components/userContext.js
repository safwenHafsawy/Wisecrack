import React,{ useState } from 'react';

export const userContext = React.createContext();

export const UserProvider = (props) => {
    const [Token, setToken] = useState(localStorage.getItem("token") || "");
    return(
        <userContext.Provider value={[Token, setToken]}>
            {props.children}
        </userContext.Provider>    
    )
};
