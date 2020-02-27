import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/profile/me');
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.data, status: err.response.status }
		});
	}
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
	try {
		const res = await axios.post('/profile', formData);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
		dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success', 3000));
		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.data, status: err.response.status }
		});
		const errors = err.response.data.errors;
		if (Array.isArray(errors) === true && errors.length > 0) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		} else {
			dispatch(setAlert(errors, 'danger'));
		}
	}
};
