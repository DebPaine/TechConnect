import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlert } from './alert';

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
		console.log(errors);
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
