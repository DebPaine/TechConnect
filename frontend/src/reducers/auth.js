import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	SIGNIN_SUCCESS,
	SIGNIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	SIGNOUT
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	gotResponse: false,
	isAuthenticated: null,
	user: null
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case REGISTER_SUCCESS:
		case SIGNIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, ...payload, gotResponse: true, isAuthenticated: true };
		case USER_LOADED:
			return { ...state, isAuthenticated: true, gotResponse: true, user: payload };
		case REGISTER_FAIL:
		case SIGNIN_FAIL:
		case AUTH_ERROR:
		case SIGNOUT:
			localStorage.removeItem('token');
			return { ...state, token: null, gotResponse: true, isAuthenticated: false, user: null };
		default:
			return state;
	}
}
