import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post';

const Post = ({ match: { params: { id } }, post: { post }, getPost }) => {
	useEffect(
		() => {
			getPost(id);
		},
		[ getPost, id ]
	);

	return (
		<Fragment>
			{post && (
				<Fragment>
					<Link to='/posts' className='btn'>
						Back To Posts
					</Link>
					<div className='post bg-white p-1 my-1'>
						<div>
							<Link to={`/profile/user/${post.user}`}>
								<img className='round-img' src={post.avatar} alt='' />
								<h4>{post.name}</h4>
							</Link>
						</div>
						<div>
							<p className='my-1'>{post.text}</p>
						</div>
					</div>
				</Fragment>
			)}
			<div className='post-form'>
				<div className='bg-primary p'>
					<h3>Leave A Comment</h3>
				</div>
				<form className='form my-1'>
					<textarea name='text' cols='30' rows='5' placeholder='Comment on this post' required />
					<input type='submit' className='btn btn-dark my-1' value='Submit' />
				</form>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	post: state.post
});

Post.propTypes = {
	post: PropTypes.object.isRequired,
	getPost: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getPost })(Post);
