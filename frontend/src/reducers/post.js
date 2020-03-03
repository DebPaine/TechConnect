import {
	GET_POSTS,
	GET_POST,
	POST_ERROR,
	CLEAR_POSTS,
	LIKE_UNLIKE,
	ADD_POST,
	ADD_COMMENT,
	DELETE_COMMENT,
	DELETE_POST
} from '../actions/types';

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
		case ADD_COMMENT:
			return {
				...state,
				post: { ...state.post, comments: payload },
				gotResponse: true
			};
		case ADD_POST:
			return {
				...state,
				posts: [ payload, ...state.posts ],
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
		case DELETE_COMMENT:
			return {
				...state,
				post: state.post.comments.filter((comment) => comment._id !== payload),
				gotResponse: true
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== payload),
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
