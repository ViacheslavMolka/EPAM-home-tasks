import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { getTimeFromMins } from '../../helpers/dateHelper';
import { mockedAuthorsList, mockedCoursesList } from '../../constants';
import { unique } from '../../helpers/uniqueArray';

import './CourseInfo.css';

function CourseInfo() {
	const { courseId } = useParams();
	const infoArray = mockedCoursesList.find((item) => item.id === courseId);
	const authors = [];
	infoArray &&
		infoArray.authors.forEach((a) => {
			mockedAuthorsList.forEach((b) => {
				if (a === b.id) {
					authors.push(b.name);
				}
			});
		});
	const authorsLine = unique(authors).join(', ');

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
