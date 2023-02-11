import React from "react";
import { Navigate, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomeView from "./features/home/HomeView";
import LoginView from "./features/login/LoginView";
import SignUpView from "./features/signup/SignUp";
import NavView from './features/Nav/NavView';

function AuthenticatedApp() {

    return (
        <div>
            <Router>
                <NavView/>
                <Routes>
                    <Route path="/home" element= {<HomeView />} />
                    <Route path="/about" element= {<HomeView />} />
                    <Route path="/browse" element= {<HomeView />} />
                    <Route path="/help" element= {<HomeView />} />
                    <Route path="/login" element= {<LoginView />} />
                    <Route path="/signup" element= {<SignUpView />} />
                    <Route path='/' element={ <Navigate to="/home" /> }/>
                    <Route path='*' element={ <Navigate replace to='/home' />} />
                </Routes>
            </Router>
        </div>
    );
}

export default AuthenticatedApp;