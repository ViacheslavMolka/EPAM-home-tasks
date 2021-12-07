import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getTimeFromMins } from '../../helpers/timeHelper';
import { unique } from '../../helpers/uniqueArray';
import { getCourses, getAuthors } from '../../selectors';

import './CourseInfo.css';

function CourseInfo() {
	const { courseId } = useParams();
	const { courses } = useSelector(getCourses);
	const { authors } = useSelector(getAuthors);

	const infoArray = courses.find((item) => item.id === courseId);
	const authorsList = [];
	infoArray &&
		infoArray.authors.forEach((a) => {
			authors.forEach((b) => {
				if (a === b.id) {
					authorsList.push(b.name);
				}
			});
		});
	const authorsLine = unique(authorsList).join(', ');

	if (courses.length === 0) {
		return <Navigate to='/courses' />;
	}

	return (
		infoArray && (
			<div className='infoCard'>
				<Link className='link' to='/courses'>
					Back to courses
				</Link>
				<span className='infoTitle'>{infoArray.title}</span>
				<div className='infoWrapper'>
					<p>{infoArray.description}</p>
					<div className='infoSection'>
						<span>
							<strong>ID:</strong> {infoArray.id}
						</span>
						<span>
							<strong>Duration:</strong> {getTimeFromMins(infoArray.duration)}{' '}
							hours
						</span>
						<span>
							<strong>Created:</strong> {infoArray.creationDate}
						</span>
						<span>
							<strong>Authors:</strong> {authorsLine}
						</span>
					</div>
				</div>
			</div>
		)
	);
}

export default CourseInfo;
