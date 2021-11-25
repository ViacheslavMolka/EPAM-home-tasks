import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { mockedAuthorsList, mockedCoursesList } from '../../constants';
import { getDate, getTimeFromMins } from '../../helpers/DateHelper';

import './CreateCourse.css';

function CreateCourse({ onChangePage }) {
	const [authors, setAuthors] = React.useState([]);
	const [mockedAuthors, setMockedAuthors] = React.useState(mockedAuthorsList);
	const [authorName, setAuthorName] = React.useState('');
	const [values, setValues] = React.useState({
		id: uuidv4(),
		title: '',
		description: '',
		creationDate: getDate(),
		duration: '',
		authors: [],
	});
	const onAuthorChange = (e) => {
		setAuthorName(e.target.value);
	};
	const onAuthorCreate = () => {
		setMockedAuthors([...mockedAuthors, { name: authorName, id: uuidv4() }]);
		setAuthorName('');
	};
	const onDelete = (id) => {
		const newArr = authors.filter((item) => item.id !== id);
		setAuthors(newArr);
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
			authors: authors.map((item) => item.id),
		});
	}, [authors, setAuthors]);
	const onSubmit = () => {
		if (
			!values.title ||
			!values.description ||
			!authors.length > 0 ||
			!values.duration
		) {
			alert('Please, fill in all fields');
		} else {
			mockedAuthorsList.push(...authors);
			mockedCoursesList.push(values);
			onChangePage(false);
		}
	};
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
				<Button type='submit' buttonText='Create course' onClick={onSubmit} />
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
							buttonText='Create author'
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
					{mockedAuthors.map((item, idx) => (
						<li key={`author${idx}`}>
							{item.name}
							<Button
								buttonText='Add author'
								onClick={() => setAuthors([...authors, item])}
							/>
						</li>
					))}
					<span>Course authors</span>
					{authors.length > 0 ? (
						authors.map((item, idx) => (
							<li key={`courseAuthor${idx}`}>
								{item.name}
								<Button
									buttonText='Delete author'
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

export default CreateCourse;
