import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost, addComment } from '../../actions/post';

const CommentForm = ({ postID, addComment }) => {
	const [ commentData, setCommentData ] = useState('');

	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Leave a comment</h3>
			</div>
			<form
				className='form my-1'
				onSubmit={(e) => {
					e.preventDefault();
					addComment(postID, commentData);
					setCommentData('');
				}}
			>
				<textarea
					name='text'
					value={commentData}
					cols='30'
					rows='5'
					placeholder='Write a comment'
					onChange={(e) => setCommentData(e.target.value)}
				/>
				<input type='submit' className='btn btn-dark my-1' />
			</form>
		</div>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired
};

export default connect(null, { getPost, addComment })(CommentForm);
