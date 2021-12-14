import { coursesAppService } from '../../services';
import {
	loadCourses,
	deleteCourse,
	updateCourse,
	addNewCourse,
} from '../../store/courses/actionCreators';

export const getCourses = () => {
	return (dispatch) => {
		coursesAppService
			.getCoursesData()
			.then((courses) => dispatch(loadCourses(courses.result)));
	};
};

export const removeCourse = (id, token) => {
	return (dispatch) => {
		coursesAppService
			.deleteCourse(id, token)
			.then((data) => {
				if (data.successful) {
					dispatch(deleteCourse(id));
				} else alert(data.message);
			})
			.catch((e) => alert(e));
	};
};

export const updateCurrentCourse = (id, token, values) => {
	return (dispatch) => {
		coursesAppService
			.updateCourse(id, token, values)
			.then((data) => {
				if (data.successful) {
					dispatch(updateCourse(data.result));
				} else alert(data.message);
			})
			.catch((e) => alert(e));
	};
};

export const addCourse = (id, token, values) => {
	return (dispatch) => {
		coursesAppService
			.addCourse(id, token, values)
			.then((data) => {
				if (data.successful) {
					dispatch(addNewCourse(data.result));
				} else alert(data.message);
			})
			.catch((e) => alert(e));
	};
};
