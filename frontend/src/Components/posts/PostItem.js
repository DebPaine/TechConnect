import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { likeUnlikePosts, deletePost } from '../../actions/post';

const PostItem = ({
	post: { _id, user, text, name, avatar, likes, comments, date },
	index,
	auth,
	likeUnlikePosts,
	deletePost
}) => {
	return (
		<Fragment>
			<div className='post bg-white p-1 my-1'>
				<div>
					<Link to={`/profile/user/${user}`}>
						<img className='round-img' src={avatar} alt='' />
						<h4>{name}</h4>
					</Link>
				</div>
				<div>
					<p className='my-1'>{text}</p>
					<p className='post-date'>
						Posted on <Moment format='HH:mm DD/MM/YYYY,
						delete'>{date}</Moment>
					</p>
					{likes.filter((like) => like.user === auth.user._id).length > 0 ? (
						<button
							type='button'
							className='btn like'
							style={{ color: '#17a2b8' }}
							onClick={() => {
								const likeButton = document.querySelectorAll('.like')[index];
								likeButton.style.color = '#333';
								likeUnlikePosts(_id);
							}}
						>
							<i className='fas fa-thumbs-up' /> {likes.length > 0 && <span>{likes.length}</span>}
						</button>
					) : (
						<button
							type='button'
							className='btn btn-light like'
							onClick={() => {
								const likeButton = document.querySelectorAll('.like')[index];
								likeButton.style.color = '#17a2b8';
								likeUnlikePosts(_id);
							}}
						>
							<i className='fas fa-thumbs-up' /> {likes.length > 0 && <span>{likes.length}</span>}
						</button>
					)}

					<Link to={`/post/${_id}`} className='btn btn-primary'>
						Discussion {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
					</Link>
					{user === auth.user._id && (
						<button type='button' className='btn btn-danger' onClick={() => deletePost(_id)}>
							<i className='fas fa-times' /> <span>Delete post</span>
						</button>
					)}
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

PostItem.propTypes = {
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	likeUnlikePosts: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { likeUnlikePosts, deletePost })(PostItem);
