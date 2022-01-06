import courses from '../courses/reducer';
import { loadCourses, addNewCourse } from '../courses/actionCreators';

describe('reducer tests', () => {
	it('should return the courses initial state', () => {
		expect(courses(undefined, {})).toEqual({
			courses: [],
		});
	});

	it('should handle a courses being added to an empty list', () => {
		const previousState = {
			courses: [],
		};
		const coursesMockData = [
			{
				title: 'Title',
				description: 'Description',
				duration: 20,
				authors: ['1a255b2b-f68e-4505-878d-5dd1d5c6534b'],
				creationDate: '14/12/2021',
				id: '369d6d8f-3c9f-4617-a862-7d69695735d2',
			},
		];
		expect(courses(previousState, loadCourses(coursesMockData))).toEqual({
			courses: coursesMockData,
		});
	});

	it('should handle a courses being added to an courses list', () => {
		const previousState = {
			courses: [
				{
					title: 'Title',
					description: 'Description',
					duration: 20,
					authors: ['1a255b2b-f68e-4505-878d-5dd1d5c6534b'],
					creationDate: '14/12/2021',
					id: '369d6d8f-3c9f-4617-a862-7d69695735d2',
				},
			],
		};
		const newCourse = {
			title: 'New title',
			description: 'New description',
			duration: 220,
			authors: ['id'],
			creationDate: '14/07/2011',
			id: '369d6d8f-3c9f-4617-a862-7d69695735d2',
		};
		expect(courses(previousState, addNewCourse(newCourse))).toEqual({
			courses: [...previousState.courses, newCourse],
		});
	});
});
