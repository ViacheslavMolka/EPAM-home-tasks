import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

import { Button } from '../../../../common/Button/Button';
import { getTimeFromMins } from '../../../../helpers/timeHelper';
import { getUser } from '../../../../selectors';
import { removeCourse } from '../../../../store/courses/thunk';

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
	const { role } = useSelector(getUser);
	const token = localStorage.getItem('token');

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
					{role === 'admin' && (
						<>
							<Button
								className='materialBtn'
								buttonText={<DeleteIcon />}
								onClick={() => dispatch(removeCourse(id, token))}
							/>
							<Button
								className='materialBtn'
								buttonText={<CreateIcon />}
								onClick={() => navigate(`/courses/update/${id}`)}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

CourseCard.propTypes = {
	description: PropTypes.string,
	title: PropTypes.string,
	duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	creationDate: PropTypes.string,
	authors: PropTypes.array,
	id: PropTypes.string,
};

export default CourseCard;
