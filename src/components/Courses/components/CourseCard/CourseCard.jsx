import React from 'react';

import { Button } from '../../../../common/Button/Button';
import { getTimeFromMins } from '../../../../helpers/DateHelper';

import './CourseCard.css';

function Header({ description, title, duration, creationDate, authors }) {
	const authorsLine = authors.join(', ');

	return (
		<div className='card'>
			<div className='firstSection'>
				<span>Title: {title}</span>
				<p>{description}</p>
			</div>
			<div className='secondSection'>
				<span className='authors'>
					<strong>Authors:</strong> {authorsLine}
				</span>
				<span>
					<strong>Duration:</strong> {getTimeFromMins(duration)}
				</span>
				<span>
					<strong>Created:</strong> {creationDate}
				</span>
				<Button buttonText='Show course' onClick={() => {}} />
			</div>
		</div>
	);
}

export default Header;
