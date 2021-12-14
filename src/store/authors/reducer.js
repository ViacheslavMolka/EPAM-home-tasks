import { authorsTypes } from './actionTypes';

const initialState = {
	authors: [],
};

export default function authors(state = initialState, action) {
	switch (action.type) {
		case authorsTypes.load:
			if (state.authors.length > 0) {
				return {
					authors: state.authors,
				};
			}
			return {
				authors: action.payload,
			};
		case authorsTypes.add:
			return {
				authors: [...state.authors, ...action.payload],
			};
		default:
			return state;
	}
}
