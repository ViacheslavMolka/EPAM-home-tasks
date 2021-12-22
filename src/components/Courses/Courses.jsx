import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import { Button } from '../../common/Button/Button';
import { buttonText } from '../../constants';
import { unique } from '../../helpers/uniqueArray';
import { getCourses } from '../../store/courses/thunk';
import { getAuthors } from '../../store/authors/thunk';
import { getUser } from '../../store/user/thunk';
import { getAllAuthors, getAllCourses, getCurrentUser } from '../../selectors';

import './Courses.css';

function Courses() {
	const { courses } = useSelector(getAllCourses);
	const { authors } = useSelector(getAllAuthors);
	const { role } = useSelector(getCurrentUser);

	const [searchValue, setSearchValue] = React.useState('');
	const [searchResult, setSearchResult] = React.useState(courses);

	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setSearchValue(e.target.value.toLowerCase());
	};

	React.useEffect(() => {
		dispatch(getUser(token));
		dispatch(getCourses());
		dispatch(getAuthors());
	}, [dispatch, token]);

	React.useEffect(() => {
		if (searchValue === '') {
			setSearchResult(courses);
		}
	}, [searchValue, courses]);

	const handleSubmit = (e) => {
		const result = searchResult.filter(
			(item) =>
				item.title.toLowerCase().includes(searchValue) ||
				item.id.toLowerCase().includes(searchValue)
		);
		setSearchResult(result);
		e.preventDefault();
	};

	if (!token) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='courses'>
			<div className='searchBarWrapper'>
				<SearchBar onChange={handleChange} onSubmit={handleSubmit} />
				<Button
					buttonText={buttonText.addNewCourse}
					onClick={() => navigate('add')}
				/>
			</div>
			{searchResult &&
				searchResult.map((item, idx) => {
					const authorsList = [];
					item.authors.forEach((a) => {
						authors.forEach((b) => {
							if (a === b.id) {
								authorsList.push(b.name);
							}
						});
					});
					return (
						<div className='courseCardWrapper' key={`card${idx}`}>
							<CourseCard
								authors={unique(authorsList)}
								title={item.title}
								description={item.description}
								duration={item.duration}
								creationDate={item.creationDate}
								id={item.id}
								role={role}
							/>
						</div>
					);
				})}
		</div>
	);
}

export default Courses;
