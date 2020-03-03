import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts, addPost } from '../../actions/post';
import PostItem from './PostItem';

const Posts = ({ post: { posts }, getPosts, addPost }) => {
	const [ postData, setPostData ] = useState('');

	useEffect(
		() => {
			getPosts();
		},
		[ getPosts ]
	);

	return (
		<Fragment>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome to the community!
			</p>
			<div className='post-form'>
				<div className='bg-primary p'>
					<h3>Say Something...</h3>
				</div>
				<form
					className='form my-1'
					onSubmit={(e) => {
						e.preventDefault();
						addPost(postData);
						setPostData('');
					}}
				>
					<textarea
						name='text'
						value={postData}
						cols='30'
						rows='5'
						placeholder='Create a post'
						onChange={(e) => setPostData(e.target.value)}
					/>
					<input type='submit' className='btn btn-dark my-1' />
				</form>
			</div>
			{posts.length < 1 ? (
				<h4>Loading ...</h4>
			) : (
				posts.map((post, index) => <PostItem key={post._id} post={post} index={index} />)
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	post: state.post
});

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired,
	addPost: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getPosts, addPost })(Posts);
