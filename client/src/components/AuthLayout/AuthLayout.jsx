import React from 'react';
import Login from './Login';
import Register from './Register';

const AuthLayout = () => {
    return (
        <div>
                <Login/>
                ||
                <Register/>
        </div>
    );
};

export default AuthLayout;