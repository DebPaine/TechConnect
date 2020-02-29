import {
	GET_PROFILE,
	GET_PROFILES,
	GET_GITHUB_REPOS,
	UPDATE_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE
} from '../actions/types';

const initialState = {
	gotResponse: false,
	profile: null,
	profiles: [],
	repos: [],
	error: {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
			return {
				...state,
				profile: payload,
				profiles: [],
				gotResponse: true,
				error: {}
			};
		case GET_PROFILES:
			return { ...state, profiles: payload, gotResponse: true };
		case GET_GITHUB_REPOS:
			return { ...state, repos: payload, gotResponse: true };
		case PROFILE_ERROR:
			return {
				...state,
				profile: null,
				gotResponse: true,
				error: payload
			};
		case CLEAR_PROFILE:
			return {
				...state,
				gotResponse: true,
				profile: null,
				repos: []
			};
		default:
			return state;
	}
}
