import React,{useEffect, useContext} from 'react';
import { userContext} from './userContext';
import {useHistory} from 'react-router-dom';

const Logout = () =>{
    const [ , SetToken] = useContext(userContext);
    const history = useHistory();
    useEffect(
        () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userID');
            SetToken("");
            history.push('/home');
        }, []
    )
    return(
        <div></div>
    )

}

export default Logout ;