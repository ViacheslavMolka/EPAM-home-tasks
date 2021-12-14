import { userTypes } from './actionTypes';

export const userLogin = (payload) => ({ type: userTypes.login, payload });

export const userLogout = () => ({ type: userTypes.logout });

export const currentUser = (payload) => ({ type: userTypes.current, payload });
