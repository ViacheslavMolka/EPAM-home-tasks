import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

import { Button } from '../../../../common/Button/Button';
import { getTimeFromMins } from '../../../../helpers/timeHelper';
import { deleteCourse } from '../../../../store/courses/actionCreators';

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
	const dispatch = useDispatch();

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
				<div className='btnGroup'>
					<Button
						buttonText='Show course'
						onClick={() => navigate(`/courses/${id}`)}
					/>
					<Button
						className='materialBtn'
						buttonText={<DeleteIcon />}
						onClick={() => dispatch(deleteCourse(id))}
					/>
					<Button
						className='materialBtn'
						buttonText={<CreateIcon />}
						onClick={() => {}}
					/>
				</div>
			</div>
		</div>
	);
}

CourseCard.propTypes = {
	description: PropTypes.string,
	title: PropTypes.string,
	duration: PropTypes.number,
	creationDate: PropTypes.string,
	authors: PropTypes.array,
	id: PropTypes.string,
};

export default CourseCard;
