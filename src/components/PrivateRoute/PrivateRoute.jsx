import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUser } from '../../selectors';

function PrivateRoute({ children }) {
	const { role } = useSelector(getUser);
	return role === 'admin' ? children : <Navigate to='/courses' />;
}

export default PrivateRoute;
