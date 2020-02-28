import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED } from './types';

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

// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const res = await axios.put('/profile/experience', formData);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(setAlert('Experience added', 'success', 3000));
		history.push('/dashboard');
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

// Delete experience
export const deleteExperience = (exp_id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/profile/experience/${exp_id}`);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
		dispatch(setAlert('Experience deleted', 'success', 3000));
	} catch (err) {
		dispatch(setAlert(err.response.data, 'danger', 3000));
	}
};

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const res = await axios.put('/profile/education', formData);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		dispatch(setAlert('Education added', 'success', 3000));
		history.push('/dashboard');
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.data, status: err.response.status }
		});
		const errors = err.response.data.errors;
		if (Array.isArray(errors) === true && errors.length > 0) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		} else {
			dispatch(setAlert(errors, 'danger', 3000));
		}
	}
};

// Delete education
export const deleteEducation = (edu_id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/profile/education/${edu_id}`);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
		dispatch(setAlert('Education deleted', 'success', 3000));
	} catch (err) {
		dispatch(setAlert(err.response.data, 'danger'));
	}
};

// Delete profile and account
export const deleteAccount = () => async (dispatch) => {
	if (window.confirm("Are you sure you wan't to delete your account? This is permanent and can't be undone!")) {
		try {
			axios.delete('/profile');
			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELETED });
			dispatch(setAlert('Account deleted successfully', 3000));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.data, status: err.response.status }
			});
		}
	}
};
