import React from 'react';

import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import { Button } from '../../common/Button/Button';
import CreateCourse from '../CreateCourse/CreateCourse';
import { mockedAuthorsList, mockedCoursesList } from '../../constants';
import './Courses.css';

function Courses() {
	const [searchValue, setSearchValue] = React.useState('');
	const [searchResult, setSearchResult] = React.useState(mockedCoursesList);
	const [isCreateCourse, setIsCreateCourse] = React.useState(false);

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

	if (isCreateCourse) {
		return <CreateCourse onChangePage={setIsCreateCourse} />;
	}

	return (
		<div className='courses'>
			<div className='searchBarWrapper'>
				<SearchBar onChange={handleChange} onSubmit={handleSubmit} />
				<Button
					buttonText='Add new course'
					onClick={() => setIsCreateCourse(true)}
				/>
			</div>
			{searchResult.map((item, idx) => {
				const authorsId = item.authors;
				const authors = [];
				authorsId.forEach((a) => {
					mockedAuthorsList.forEach((b) => {
						if (a === b.id) {
							authors.push(b.name);
						}
					});
				});
				return (
					<div className='courseCardWrapper' key={`card${idx}`}>
						<CourseCard
							authors={authors}
							title={item.title}
							description={item.description}
							duration={item.duration}
							creationDate={item.creationDate}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default Courses;
