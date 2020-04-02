// import React, { Component } from 'react'
// import {Route , Redirect, Router } from 'react-router-dom'

// const AuthRoute = ({Component: component , authenticated , ...rest}) => ( //small bracket dilectly returns withount writing return 
//     <Route {...rest}
//     render={(props)=> authenticated === true ? <Redirect to='/' /> : <Component {...props} />       } />
// );


// export default AuthRoute; 

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

AuthRoute.propTypes = {
  user: PropTypes.object
};

export default connect(mapStateToProps)(AuthRoute);
