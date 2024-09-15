import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';


const authUser = () => {
    var val = false;
    if(sessionStorage.getItem('login')){
        val = true;
    }
    else{
        val = false;
    }
     
    const user = val;

    // return user && user.login
    return user;
}
const ProtectedRoute = () =>{
    const isAuthenticated = authUser();
    return isAuthenticated ? 
        <Outlet />: (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;
