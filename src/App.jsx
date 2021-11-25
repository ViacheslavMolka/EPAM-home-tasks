import React from 'react';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import './App.css';

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<Courses />
		</div>
	);
}

export default App;
