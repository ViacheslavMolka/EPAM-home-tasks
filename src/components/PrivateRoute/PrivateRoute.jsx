import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getCurrentUser } from '../../selectors';

function PrivateRoute({ children }) {
	const { role } = useSelector(getCurrentUser);
	return role === 'admin' ? children : <Navigate to='/courses' />;
}

export default PrivateRoute;
