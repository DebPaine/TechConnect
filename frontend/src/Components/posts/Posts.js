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
			<h1 class='large text-primary'>Posts</h1>
			<p class='lead'>
				<i class='fas fa-user' /> Welcome to the community!
			</p>
			{posts.length < 1 ? (
				<h4>Posts not available</h4>
			) : (
				posts.map((post) => <PostItem key={post._id} post={post} />)
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
