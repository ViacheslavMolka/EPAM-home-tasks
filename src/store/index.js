import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import authors from './authors/reducer';
import courses from './courses/reducer';
import user from './user/reducer';

const middleware = [reduxThunk];

const rootReducer = combineReducers({ courses, authors, user });

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
