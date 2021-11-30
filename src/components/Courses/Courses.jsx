import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import { Button } from '../../common/Button/Button';
import {
	mockedAuthorsList,
	mockedCoursesList,
	buttonText,
} from '../../constants';
import { unique } from '../../helpers/uniqueArray';

import './Courses.css';

function Courses() {
	const [searchValue, setSearchValue] = React.useState('');
	const [searchResult, setSearchResult] = React.useState(mockedCoursesList);
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const handleChange = (e) => {
		setSearchValue(e.target.value.toLowerCase());
	};

	React.useEffect(() => {
		if (searchValue === '') {
			setSearchResult(mockedCoursesList);
		}
	}, [searchValue]);

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
			{searchResult.map((item, idx) => {
				const authors = [];
				item.authors.forEach((a) => {
					mockedAuthorsList.forEach((b) => {
						if (a === b.id) {
							authors.push(b.name);
						}
					});
				});
				return (
					<div className='courseCardWrapper' key={`card${idx}`}>
						<CourseCard
							authors={unique(authors)}
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
