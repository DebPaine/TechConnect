import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Post = ({ match: { params: { id } }, post: { name, text, user, avatar }, profile }) => {
	return (
		<Fragment>
			<Link to='/posts' className='btn'>
				Back To Posts
			</Link>
			<div className='post bg-white p-1 my-1'>
				<div>
					<Link to={`/profile/user/:${user}`}>
						<img className='round-img' src={avatar} alt='' />
						<h4>{name}</h4>
					</Link>
				</div>
				<div>
					<p className='my-1'>{text}</p>
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	post: state.post,
	profile: state.profile
});

Post.propTypes = {
	post: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Post);
