import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PostItem = ({ post: { _id, user, text, name, avatar, comments, likes, date }, auth }) => {
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
						Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
					</p>
					<button type='button' className='btn btn-light'>
						<i className='fas fa-thumbs-up' /> {likes.length > 0 && <span>{likes.length}</span>}
					</button>
					<button type='button' className='btn btn-light'>
						<i className='fas fa-thumbs-down' />
					</button>
					<Link to={`/post/${_id}`} className='btn btn-primary'>
						Discussion {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
					</Link>
					{user === auth.user._id && (
						<button type='button' className='btn btn-danger'>
							<i className='fas fa-times' />
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
	auth: PropTypes.array.isRequired,
	post: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PostItem);
