import { coursesTypes } from './actionTypes';

const initialState = {
	courses: [],
};

export default function courses(state = initialState, action) {
	switch (action.type) {
		case coursesTypes.load:
			if (state.courses.length > 0) {
				return {
					courses: state.courses,
				};
			}
			return {
				courses: action.payload,
			};
		case coursesTypes.add:
			return {
				courses: [...state.courses, action.payload],
			};
		case coursesTypes.delete:
			const newCourses = state.courses.filter(
				(item) => item.id !== action.payload
			);
			return {
				courses: newCourses,
			};
		default:
			return state;
	}
}
