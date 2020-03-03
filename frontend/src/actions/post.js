import axios from 'axios';
import {
	GET_POSTS,
	GET_POST,
	POST_ERROR,
	LIKE_UNLIKE,
	DELETE_POST,
	ADD_POST,
	ADD_COMMENT,
	DELETE_COMMENT
} from './types';
import { setAlert } from './alert';

// Get all posts
export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/posts');
		dispatch({ type: GET_POSTS, payload: res.data });
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.data, status: err.response.status }
		});
	}
};

// Get individual post
export const getPost = (postID) => async (dispatch) => {
	try {
		const res = await axios.get(`/posts/${postID}`);
		dispatch({ type: GET_POST, payload: res.data });
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.data, status: err.response.status }
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
			payload: { msg: err.response.data, status: err.response.status }
		});
	}
};

// Add comment
export const addComment = (postID, text) => async (dispatch) => {
	try {
		const res = axios.post(`/posts/${postID}/comment`, { text });
		dispatch({ type: ADD_COMMENT, payload: res.data });
		dispatch(setAlert('New comment added', 'success'));
	} catch (err) {
		const errors = err.response.data.errors;
		if (Array.isArray(errors) === true && errors.length > 0) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		} else {
			dispatch(setAlert(errors, 'danger'));
		}
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.data, status: err.response.status }
		});
	}
};

// Delete comment
export const deleteComment = (postID, commentID) => async (dispatch) => {
	try {
		await axios.delete(`/posts/${postID}/comment/${commentID}`);
		dispatch({ type: DELETE_COMMENT, payload: commentID });
		dispatch(setAlert('Comment deleted', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.data, status: err.response.status }
		});
		dispatch(setAlert('Error deleting comment', 'danger'));
	}
};

// Add post
export const addPost = (text) => async (dispatch) => {
	try {
		const res = await axios.post('/posts', { text });
		dispatch({ type: ADD_POST, payload: res.data });
		dispatch(setAlert('New post added', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
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

// Delete post
export const deletePost = (postID) => async (dispatch) => {
	try {
		await axios.delete(`/posts/${postID}`);
		dispatch(setAlert('Post deleted', 'success'));
		dispatch({ type: DELETE_POST, payload: postID });
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.data, status: err.response.status }
		});
	}
};
