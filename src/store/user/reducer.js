import { userTypes } from './actionTypes';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
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
		case userTypes.current:
			return {
				isAuth: true,
				name: action?.payload?.name,
				email: action?.payload?.email,
				token: state.token,
				role: action?.payload?.role,
			};
		default:
			return state;
	}
}
