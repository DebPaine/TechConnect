import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/post';

const CommentItem = ({ comment: { _id, user, name, text, avatar, date }, postID, auth, deleteComment }) => (
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
				Posted on <Moment format='HH:mm DD/MM/YYYY'>{date}</Moment>
			</p>
			{user === auth.user._id && (
				<button type='button' className='btn btn-danger' onClick={() => deleteComment(postID, _id)}>
					<i className='fas fa-times' /> <span>Delete comment</span>
				</button>
			)}
		</div>
	</div>
);

const mapStateToProps = (state) => ({
	auth: state.auth
});

CommentItem.propTypes = {
	auth: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired,
	postID: PropTypes.string.isRequired,
	deleteComment: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { deleteComment })(CommentItem);
