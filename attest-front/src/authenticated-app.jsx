import React from "react";
import { Navigate, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomeView from "./features/home/HomeView";
import ListItemPick from "./features/listItem/ListItemPick";
import ListItem from "./features/listItem/ListItemView";
import LoginView from "./features/login/LoginView";
import ProfileView from "./features/Profile/ProfileView";
import SignUpView from "./features/signup/SignUp";
import NavView from './features/Nav/NavView';

function AuthenticatedApp() {

    return (
        <div>
            <Router>
                <NavView/>
                <Routes>
                    <Route path='/home' element= {<HomeView />} />
                    <Route path='/about' element= {<HomeView />} />
                    <Route path='/browse' element= {<HomeView />} />
                    <Route path='/help' element= {<HomeView />} />
                    <Route path='/profile' element= {<ProfileView />} />
                    <Route path='/' element={ <Navigate to="/home" /> }/>
                    <Route path='/listitem/pick' element={ <ListItemPick /> }/>
                    <Route path='/listitem/new' element={<ListItem /> }/>
                    <Route path='*' element={ <Navigate replace to='/home' />} />
                </Routes>
            </Router>
        </div>
    );
}

export default AuthenticatedApp;