// import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin'); 

  return isAdmin ? children : <Navigate to="/admin" />;
};


ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default ProtectedRoute;
