import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';

const Posts = ({ post: { posts }, getPosts }) => {
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
	getPosts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getPosts })(Posts);
