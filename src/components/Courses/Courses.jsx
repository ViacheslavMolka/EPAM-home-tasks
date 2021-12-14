import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import { Button } from '../../common/Button/Button';
import { buttonText } from '../../constants';
import { unique } from '../../helpers/uniqueArray';
import { coursesAppService } from '../../services';
import { loadCourses } from '../../store/courses/actionCreators';
import { loadAuthors } from '../../store/authors/actionCreators';
import { getAuthors, getCourses } from '../../selectors';

import './Courses.css';

function Courses() {
	const { courses } = useSelector(getCourses);
	const { authors } = useSelector(getAuthors);

	const [searchValue, setSearchValue] = React.useState('');
	const [searchResult, setSearchResult] = React.useState(courses);
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setSearchValue(e.target.value.toLowerCase());
	};

	React.useEffect(() => {
		coursesAppService
			.getCoursesData()
			.then((courses) => dispatch(loadCourses(courses.result)));
		coursesAppService
			.getAuthorsData()
			.then((authors) => dispatch(loadAuthors(authors.result)));
	}, [dispatch]);

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
							/>
						</div>
					);
				})}
		</div>
	);
}

export default Courses;
