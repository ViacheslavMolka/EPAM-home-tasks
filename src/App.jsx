import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';

import './App.css';

function App() {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	React.useEffect(() => {
		if (token) {
			navigate('/courses');
		}
	}, []);

	return (
		<div className='wrapper'>
			<Header />
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='registration' element={<Registration />} />
				<Route path='courses' element={<Courses />} />
				<Route path='courses/add' element={<CreateCourse />} />
				<Route path='courses/:courseId' element={<CourseInfo />} />
			</Routes>
		</div>
	);
}

export default App;
