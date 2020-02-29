import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';

const Profile = ({
	profile: { profile },
	auth: { isAuthenticated, gotResponse, user },
	getProfileById,
	match: { params: { id } }
}) => {
	useEffect(
		() => {
			getProfileById(id);
		},
		[ getProfileById, id ]
	);

	return (
		<Fragment>
			{!profile ? (
				''
			) : (
				<Fragment>
					<Link to='/profiles' className='btn btn-light'>
						Go back
					</Link>
					{isAuthenticated &&
					gotResponse &&
					user._id === profile.user._id && (
						<Link to='/edit-profile' className='btn btn-dark'>
							Edit my profile
						</Link>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getProfileById })(Profile);
