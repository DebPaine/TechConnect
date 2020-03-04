import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getPost } from '../../actions/post';

const Post = ({ match: { params: { id } }, post: { post }, getPost }) => {
	useEffect(
		() => {
			getPost(id);
		},
		[ getPost, id ]
	);

	return post === null ? (
		<h4>Loading ...</h4>
	) : (
		<Fragment>
			<Link to='/posts' className='btn btn-light'>
				Back to posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postID={post._id} />
			<div className='comments'>
				{post.comments.map((comment) => <CommentItem key={comment._id} postID={post._id} comment={comment} />)}
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	post: state.post
});

Post.propTypes = {
	post: PropTypes.object,
	getPost: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getPost })(Post);
