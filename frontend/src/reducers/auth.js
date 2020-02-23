import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

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
			localStorage.removeItem('token');
			return { ...state, token: null, gotResponse: true, isAuthenticated: false };
		default:
			return state;
	}
}
