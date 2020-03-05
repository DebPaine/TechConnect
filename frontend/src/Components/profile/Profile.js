import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileBio from './ProfileBio';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({
	profile: { profile },
	auth: { isAuthenticated, gotResponse, user },
	getProfileById,
	match: { params: { id } },
	history
}) => {
	useEffect(
		() => {
			getProfileById(id);
		},
		[ getProfileById, id ]
	);

	return (
		<Fragment>
			{profile && (
				<Fragment>
					<Link to='' className='btn btn-light' onClick={() => history.goBack()}>
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
						<div className='profile-exp bg-white p-2'>
							<h2 className='text-primary'>Experience</h2>
							{profile.experience.length > 0 ? (
								<ProfileExperience profile={profile} />
							) : (
								<h4>No experience details added by the user</h4>
							)}
						</div>
						<div className='profile-edu bg-white p-2'>
							<h2 className='text-primary'>Education</h2>
							{profile.education.length > 0 ? (
								<ProfileEducation profile={profile} />
							) : (
								<h4>No education details added by the user</h4>
							)}
						</div>
						{profile.githubusername && (
							<div className='profile-github'>
								<ProfileGithub profile={profile} />
							</div>
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
