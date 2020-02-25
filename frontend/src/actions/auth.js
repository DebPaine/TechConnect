import axios from 'axios';
import { setAlert } from './alert';
import { setAuthToken } from '../utils/setAuthToken';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	SIGNIN_SUCCESS,
	SIGNIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	SIGNOUT
} from './types';

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
		dispatch(setAlert(err.response.data, 'danger'));
	}
};

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
		dispatch(loadUser());
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

// Signin user
export const signin = (email, password) => async (dispatch) => {
	try {
		const res = await axios.post('/auth', {
			email,
			password
		});
		dispatch({
			type: SIGNIN_SUCCESS,
			payload: res.data
		});
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.error;
		if (Array.isArray(errors) === true && errors.length > 0) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		} else {
			dispatch(setAlert(errors, 'danger'));
		}
		dispatch({
			type: SIGNIN_FAIL
		});
	}
};

// Sign out
export const signout = () => (dispatch) => {
	dispatch({
		type: SIGNOUT
	});
};
