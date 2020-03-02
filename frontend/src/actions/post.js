import axios from 'axios';
// import { setAlert } from './alert';
import { GET_POSTS, GET_POST, POST_ERROR, CLEAR_POSTS, LIKE_UNLIKE } from './types';

// Get all posts
export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/posts');
		dispatch({
			type: GET_POSTS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.status, status: err.response.status }
		});
	}
};

// Get individual post
export const getPost = (postID) => async (dispatch) => {
	dispatch({ type: CLEAR_POSTS });
	try {
		const res = await axios.get(`/posts/${postID}`);
		dispatch({
			type: GET_POST,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.status, status: err.response.status }
		});
	}
};

// Like/unlike posts
export const likeUnlikePosts = (postID) => async (dispatch) => {
	try {
		const res = await axios.put(`/posts/${postID}/like`);
		dispatch({ type: LIKE_UNLIKE, payload: { postID, likes: res.data } });
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.status, status: err.response.status }
		});
	}
};
// Add comments
export const addComment = (postID) => async (dispatch) => {
	try {
	} catch (err) {}
};
