import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';

const Profiles = ({ profiles, getAllProfiles }) => {
	useEffect(
		() => {
			getAllProfiles();
		},
		[ getAllProfiles ]
	);

	return (
		<Fragment>
			<h1 className='large text-primary'>Developers</h1>
			<p className='lead'>
				<i className='fab fa-connectdevelop' /> Browse and connect with developers
			</p>
			<Fragment>
				{profiles.length > 0 ? (
					profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />)
				) : (
					<h4>No profiles found</h4>
				)}
			</Fragment>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	profiles: state.profile.profiles
});

Profiles.propTypes = {
	getAllProfiles: PropTypes.func.isRequired,
	profiles: PropTypes.array.isRequired
};

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
