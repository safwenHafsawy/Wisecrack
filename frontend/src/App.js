import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/home';
import CreateNote from './components/createNote';
import Notes from './components/notes';
import Update from './components/updateNote';
import Navbar from './components/navbar';
import Signup from './components/signup';
import Login from './components/login';
import Logout from './components/logout';
import { UserProvider } from './components/userContext';
import './App.css';


function App() {
  return(
    <UserProvider>
      <BrowserRouter>
        <Navbar /><br />
        <Route exact path = '/' component = {Notes} />
        <Route path='/home' component={Home} />
        <Route path='/createnote' component={CreateNote} />
        <Route path='/editnote/:id' component ={Update} />
        <Route path='/signup' component={Signup} />
        <Route path= '/login' component={Login} />
        <Route path='/logout' component={Logout} />
      </BrowserRouter>
    </UserProvider>
  )
}

export default App;
