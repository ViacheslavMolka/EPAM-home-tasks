import { coursesTypes } from './actionTypes';

export const loadCourses = (payload) => ({ type: coursesTypes.load, payload });

export const addNewCourse = (payload) => ({ type: coursesTypes.add, payload });

export const deleteCourse = (payload) => ({
	type: coursesTypes.delete,
	payload,
});
