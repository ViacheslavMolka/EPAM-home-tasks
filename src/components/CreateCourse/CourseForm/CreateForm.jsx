import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../../common/Button/Button';
import Input from '../../../common/Input/Input';
import { buttonText } from '../../../constants';
import { getDate, getTimeFromMins } from '../../../helpers/timeHelper';
import { unique } from '../../../helpers/uniqueArray';
import { updateCurrentCourse, addCourse } from '../../../store/courses/thunk';
import { addAuthors } from '../../../store/authors/thunk';
import { addNewAuthors } from '../../../store/authors/actionCreators';
import { getAllCourses, getAllAuthors } from '../../../selectors';

import './CreateCourse.css';

function CourseForm() {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const { authors } = useSelector(getAllAuthors);
	const { courses } = useSelector(getAllCourses);
	const { courseId } = useParams();
	const dispatch = useDispatch();

	const currentCourse = courses.find((item) => item.id === courseId);
	const currentAuthors = [];
	currentCourse &&
		currentCourse.authors.forEach((a) => {
			authors.forEach((b) => {
				if (a === b.id) {
					currentAuthors.push(b);
				}
			});
		});

	const [authorsArray, setAuthorsArray] = React.useState(
		currentAuthors.length ? currentAuthors : []
	);
	const [authorName, setAuthorName] = React.useState('');
	const [values, setValues] = React.useState(
		currentCourse || {
			id: uuidv4(),
			title: '',
			description: '',
			creationDate: getDate(),
			duration: '',
			authors: [],
		}
	);

	const onAuthorChange = (e) => {
		setAuthorName(e.target.value);
	};
	const onAuthorCreate = () => {
		dispatch(addAuthors(token, { name: authorName }));
		setAuthorName('');
	};
	const onDelete = (id) => {
		const newArr = authorsArray.filter((item) => item.id !== id);
		setAuthorsArray(newArr);
	};
	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};
	React.useEffect(() => {
		setValues({
			...values,
			authors: authorsArray.map((item) => item.id),
		});
	}, [authorsArray, setAuthorsArray]);

	const onUpdateCourse = () => {
		if (
			!values.title ||
			!values.description ||
			!authors.length > 0 ||
			!values.duration
		) {
			alert('Please, fill in all fields');
		} else {
			dispatch(addNewAuthors(authorsArray));
			dispatch(updateCurrentCourse(courseId, token, values));
			navigate('/courses');
		}
	};

	const onSubmitCourse = () => {
		if (
			!values.title ||
			!values.description ||
			!authors.length > 0 ||
			!values.duration
		) {
			alert('Please, fill in all fields');
		} else {
			dispatch(addNewAuthors(authorsArray));
			dispatch(addCourse(token, values));
			navigate('/courses');
		}
	};

	if (!token) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='createCourseForm'>
			<div className='title'>
				<Input
					placeholderText='Enter title...'
					inputName='title'
					labelText='Title'
					value={values.title}
					onChange={handleChange}
				/>
				<Button
					type='submit'
					buttonText={
						currentCourse ? buttonText.updateCourse : buttonText.createCourse
					}
					onClick={currentCourse ? onUpdateCourse : onSubmitCourse}
				/>
			</div>
			<div className='description'>
				<label htmlFor='description'>Description</label>
				<br />
				<textarea
					type='text'
					id='description'
					name='description'
					value={values.description}
					onChange={handleChange}
				/>
			</div>
			<div className='authorsWrapper'>
				<div>
					<div className='addAuthor'>
						<span>Add author</span>
						<Input
							placeholderText='Enter author name...'
							inputName='name'
							labelText='Author name'
							value={authorName}
							onChange={onAuthorChange}
						/>
						<Button
							disabled={authorName === '' && true}
							buttonText={buttonText.createAuthor}
							onClick={onAuthorCreate}
						/>
					</div>
					<div className='duration'>
						<span className='durationTitle'>Duration</span>
						<Input
							placeholderText='Enter duration in minutes...'
							inputName='duration'
							labelText='Duration'
							type='number'
							value={values.duration}
							onChange={handleChange}
						/>
						<span className='durationHours'>
							Duration: {getTimeFromMins(values.duration)} hours
						</span>
					</div>
				</div>
				<div className='authorList'>
					<span className='authorsTitle'>Authors</span>
					{unique(authors).map((item, idx) => {
						let isDisabled = false;
						authorsArray.forEach((a) => {
							if (item.name === a.name) {
								isDisabled = true;
							}
						});
						return (
							<li key={`author${idx}`}>
								{item.name}
								<Button
									disabled={isDisabled}
									buttonText={buttonText.addAuthor}
									onClick={() => setAuthorsArray([...authorsArray, item])}
								/>
							</li>
						);
					})}
					<span>Course authors</span>
					{authorsArray.length > 0 ? (
						authorsArray.map((item, idx) => (
							<li key={`courseAuthor${idx}`}>
								{item.name}
								<Button
									buttonText={buttonText.deleteAuthor}
									onClick={() => onDelete(item.id)}
								/>
							</li>
						))
					) : (
						<span>Author list is empty</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default CourseForm;
