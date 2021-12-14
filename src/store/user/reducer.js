import { userTypes } from './actionTypes';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export default function user(state = initialState, action) {
	switch (action.type) {
		case userTypes.login:
			return {
				isAuth: true,
				...action.payload,
			};
		case userTypes.logout:
			return {
				...initialState,
			};
		default:
			return state;
	}
}
