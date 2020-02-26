import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	gotResponse: false,
	repos: [],
	error: {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_PROFILE:
			return {
				...state,
				profile: payload,
				gotResponse: true
			};
		case PROFILE_ERROR:
			return {
				...state,
				profile: null,
				gotResponse: true,
				error: payload
			};
		default:
			return state;
	}
}
