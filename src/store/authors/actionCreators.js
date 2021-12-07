import { authorsTypes } from './actionTypes';

export const loadAuthors = (payload) => ({ type: authorsTypes.load, payload });

export const addNewAuthors = (payload) => ({ type: authorsTypes.add, payload });
