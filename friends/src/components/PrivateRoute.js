import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const fetchedToken = localStorage.getItem('token');

    return (
        <Route
            {...rest}
            render = {props => {
                if(fetchedToken) {
                    return <Component />
                } else {
                    return <Redirect to='/login' />
                }
            }}
        />
    );
};

export default PrivateRoute;