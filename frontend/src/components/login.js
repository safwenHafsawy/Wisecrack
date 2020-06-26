import React,{useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userContext } from './userContext';
import {Fade} from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [ ,setToken ] = useContext(userContext);
    const [appear, setAppear] = useState(false);
    const history = useHistory();
   
    useEffect(()=> {
        setAppear(true)
    }, [])

    function updateEmail(event){
        setEmail(event.target.value);
    }
    
    function updatePw(event){
        setPassword(event.target.value);
    }


    function SubmitInfo(event){
        event.preventDefault();
        const userInfo =({
            email,
            password
        })
        fetch('http://localhost:5000/auth/login' , {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userInfo)
            
        })
        .then((res) => res.json())
        .then(data => {
            if(!data.user){
                setError("Invalid Email or Password")
            }else{
                const {user, token} = data
                localStorage.setItem("token", token);
                localStorage.setItem('userID', user);
                setToken(token);
                history.push('/')
            }
        })
}
    
        return(
            <Fade in={appear}>
            <div className="d-flex justify-content-center">           
                <form onSubmit={SubmitInfo} className="form-horizontal">
                        <p id="formHeader">Login</p>
                        <p id="formError">{error}</p>
                        <input 
                            id="formItems"
                            name ="email"
                            value ={email}
                            type="text" 
                            className="form-control" 
                            placeholder="Email address" 
                            onChange={updateEmail}
                            required
                            />
                        <input 
                            id="formItems"
                            name ="password"
                            value ={password}
                            type="password" 
                            className="form-control" 
                            placeholder="Password"  
                            onChange = {updatePw}
                            required
                            />            
                        <button className="btn btn"
                                id="formBtn" >
                                Login
                        </button>        
                        <p id="formItems">
                            Don't have an account ? <Link to ='/signup'>Sign up from here</Link>
                        </p>
                    </form>
                </div>
            </Fade>
                
        )
    }

export default Login;