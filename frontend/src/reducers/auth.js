import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	gotResponse: false,
	isAuthenticated: null,
	user: null
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	// payload is the token received from backend
	switch (type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, ...payload, gotResponse: true, isAuthenticated: true };
		case REGISTER_FAIL:
		case AUTH_ERROR:
			localStorage.removeItem('token');
			return { ...state, token: null, gotResponse: true, isAuthenticated: false };
		case USER_LOADED:
			return { ...state, isAuthenticated: true, gotResponse: true, user: payload };
		default:
			return state;
	}
}
