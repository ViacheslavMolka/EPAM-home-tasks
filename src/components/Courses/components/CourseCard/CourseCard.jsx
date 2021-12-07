import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../common/Button/Button';
import { getTimeFromMins } from '../../../../helpers/dateHelper';

import './CourseCard.css';

function CourseCard({
	description,
	title,
	duration,
	creationDate,
	authors,
	id,
}) {
	const authorsLine = authors.join(', ');
	const navigate = useNavigate();

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
				<Button
					buttonText='Show course'
					onClick={() => navigate(`/courses/${id}`)}
				/>
			</div>
		</div>
	);
}

export default CourseCard;
