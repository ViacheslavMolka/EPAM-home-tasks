import { coursesAppService } from '../../services';
import { currentUser, userLogout } from '../../store/user/actionCreators';

export const getUser = (token) => {
	return (dispatch) => {
		coursesAppService
			.getCurrentUser(token)
			.then((user) => dispatch(currentUser(user.result)));
	};
};

export const logout = (token) => {
	return (dispatch) => {
		coursesAppService.logout(token).then((data) => {
			console.log(data);
			dispatch(userLogout());
		});
	};
};
