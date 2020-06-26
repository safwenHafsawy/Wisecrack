import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav,NavbarBrand} from 'react-bootstrap';
import { userContext } from './userContext';

function Navigationbar(){
    const [Token] = useContext(userContext);
    if(Token === ""){
    return(
            <Navbar
                id="navbar"
                bg="success"
                expand="lg"
                className="navbar navbar-expand-lg navbar-sucess bg-success"
                collapseOnSelect={true}
                >
            <NavbarBrand><Link to="/home" id="navBrand" className="nav-link">Wisecrack</Link></NavbarBrand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link
                            to='/login'
                            className="nav-link"
                            id="navItem"
                        >
                            Login
                        </Link>
                        <Link
                            to='/signup'
                            className="nav-link"
                            id="navItem"
                        >
                            Sign up
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>        
    )
}else{
    return(
        <Navbar
        id="navbar"
        bg="success"
        expand="lg"
        className="navbar navbar-expand-lg navbar-sucess bg-success"
        collapseOnSelect={true}
    >
    <NavbarBrand><Link to="/" id="navBrand" className="nav-link">Wisecrack</Link></NavbarBrand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Link
                    to='/'
                    className="nav-link"
                    id="navItem"
                >
                    Home
                </Link>
                <Link
                    to='/createnote'
                    className="nav-link"
                    id="navItem"
                >
                    Create Note
                </Link>
                <Link
                    to='/logout'
                    className="nav-link"
                    id="navItem"
                >
                    Logout
                </Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar> 
    )
}
}
export default Navigationbar;