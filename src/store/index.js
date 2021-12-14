import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import authors from './authors/reducer';
import courses from './courses/reducer';
import user from './user/reducer';

const rootReducer = combineReducers({ courses, authors, user });

const store = createStore(rootReducer, composeWithDevTools());

export default store;
