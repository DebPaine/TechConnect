import { GET_POSTS, GET_POST, POST_ERROR, CLEAR_POSTS, LIKE_UNLIKE } from '../actions/types';

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
		case GET_POST:
			return {
				...state,
				post: payload,
				gotResponse: true
			};
		case LIKE_UNLIKE:
			return {
				...state,
				posts: state.posts.map(
					(post) => (post._id === payload.postID ? { ...post, likes: payload.likes } : post)
				),
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
