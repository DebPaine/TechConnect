import axios from 'axios';
// import { setAlert } from './alert';
import { GET_POSTS, GET_POST, POST_ERROR, CLEAR_POSTS, LIKE_UNLIKE, DELETE_POST } from './types';
import { setAlert } from './alert';

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
			payload: { msg: err.response.data, status: err.response.status }
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

// Add comments
export const addComment = (postID) => async (dispatch) => {
	try {
	} catch (err) {}
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
