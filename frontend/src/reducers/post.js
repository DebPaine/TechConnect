import { GET_POSTS, POST_ERROR, CLEAR_POSTS } from '../actions/types';

const initialState = {
	post: null,
	posts: [],
	gotResponse: false,
	error: {}
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				gotResponse: true
			};
		case CLEAR_POSTS:
			return {
				...state,
				posts: [],
				post: null,
				gotResponse: true
			};
		case POST_ERROR:
			return {
				...state,
				gotResponse: true,
				error: payload
			};
		default:
			return state;
	}
}
