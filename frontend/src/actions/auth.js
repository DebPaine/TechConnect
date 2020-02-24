import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from './types';
import { setAlert } from './alert';
import { setAuthToken } from '../utils/setAuthToken';

// Register user
export const register = (name, email, password) => async (dispatch) => {
	try {
		const res = await axios.post('/register', {
			name,
			email,
			password
		});
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		const errors = err.response.data.error;
		if (Array.isArray(errors) === true && errors.length > 0) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		} else {
			dispatch(setAlert(errors, 'danger'));
		}
		dispatch({
			type: REGISTER_FAIL
		});
	}
};

// Load user
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get('/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data // data = user
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};
