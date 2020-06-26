import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Fade } from 'react-bootstrap'

const initState = {
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    passwordConfirm : '',
    emailError : '',
    passwordError : '',
    appear : false,
};

class signup extends React.Component {
    constructor(props){
        super(props);
        this.state= initState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this);
    }    

    componentDidMount(){
        this.setState({
            appear : true
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    formValidation(){
        let emailError = '';
        let passwordError = '';

        if(!this.state.email.includes('@')){
            emailError = 'invalid email !';
            
        }
        if(this.state.password.length < 6){
            passwordError = "The password must be at least 6 characters long "
        }

        if(this.state.password !== this.state.passwordConfirm){
            passwordError = "Passwords Dont Match !"
        }

        if(emailError || passwordError){
            this.setState({emailError , passwordError});
            return false;
        }
        return true;
    }

    handleSubmit(event){
        event.preventDefault()
        const isValid = this.formValidation()
        if(isValid){
            const user = JSON.stringify(this.state)
            fetch('http://localhost:5000/auth/signup', {
                method : 'Post',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : user
            }).then( () =>{
                alert("Account created successfully !")
                this.props.history.push('/login')}
            )
        }   
    }

    render(){
            return(
            <Fade in={this.state.appear}>
                <div className='container-grid'>
                    <div className="row d-flex justify-content-center">
                        <form onSubmit={this.handleSubmit} className="form-horizontal">
                            <h6 id="formHeader">Signup</h6>
                            <input 
                                id="formItems"
                                name ="firstName"
                                value ={this.state.firstName}
                                type="text" 
                                className="form-control" 
                                placeholder="First Name" 
                                onChange={this.handleChange}
                                required
                            />
                            <input 
                                id="formItems"
                                name ="lastName"
                                value ={this.state.lastName}
                                type="text" 
                                className="form-control" 
                                placeholder="Last Name" 
                                onChange={this.handleChange}
                                required
                            />
                            <p id="formError">{this.state.emailError}</p>
                            <input 
                                id="formItems"
                                name ="email"
                                value ={this.state.email}
                                type="text" 
                                className="form-control" 
                                placeholder="Email address" 
                                onChange={this.handleChange}
                                required
                            />
                            <p id="formError">{this.state.passwordError}</p>
                            <input 
                                id="formItems"
                                name ="password"
                                value ={this.state.password}
                                type="password" 
                                className="form-control" 
                                placeholder="password" 
                                onChange={this.handleChange}
                                required
                            />
                            <input 
                                id="formItems"
                                name ="passwordConfirm"
                                value ={this.state.passwordConfirm}
                                type="password" 
                                className="form-control" 
                                placeholder="Password Confirmation"  
                                onChange = {this.handleChange}
                                required
                            />            
                            <div style={{fontSize : "12px", color:"red"}}>{this.state.noUser}</div>
                            <button className="btn btn" id="formBtn">Create my account</button>        
                            <p id="logInItems">Already have an account ? <Link to ='/Login'>Log in from here</Link></p>
                        </form>
                    </div>
                </div>
            </Fade>
            )
        }
}


export default withRouter(signup);