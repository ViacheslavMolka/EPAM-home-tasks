import { coursesAppService } from '../../services';
import { loadAuthors, addNewAuthors } from '../../store/authors/actionCreators';

export const getAuthors = () => {
	return (dispatch) => {
		coursesAppService
			.getAuthorsData()
			.then((authors) => dispatch(loadAuthors(authors.result)));
	};
};

export const addAuthors = (token, values) => {
	return (dispatch) => {
		coursesAppService
			.addAuthors(token, values)
			.then((data) => {
				if (data.successful) {
					dispatch(addNewAuthors(data.result));
				} else alert(data.message);
			})
			.catch((e) => alert(e));
	};
};
