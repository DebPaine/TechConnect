import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileBio from './ProfileBio';
import ProfileExp from './ProfileExp';
import ProfileEdu from './ProfileEdu';

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
					<div className='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileBio profile={profile} />
					</div>
					<div className='profile-exp bg-white p-2'>
						<h2 className='text-primary'>Experience</h2>
						{profile.experience.length > 0 ? (
							<ProfileExp profile={profile} />
						) : (
							<h4>No experience details added by user</h4>
						)}
					</div>
					<div className='profile-edu bg-white p-2'>
						<h2 className='text-primary'>Education</h2>
						{profile.education.length > 0 ? (
							<ProfileEdu profile={profile} />
						) : (
							<h4>No education details added by user</h4>
						)}
					</div>
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
