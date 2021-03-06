import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DashboardActions } from './DashboardActions';
import { getCurrentProfile } from '../../actions/profile';
import { deleteAccount } from '../../actions/profile';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ auth: { user }, profile: { profile }, deleteAccount, getCurrentProfile }) => {
	useEffect(
		() => {
			getCurrentProfile();
		},
		[ getCurrentProfile ]
	);

	return (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fa fa-user' /> Welcome {user && user.name}
			</p>
			{profile ? (
				<Fragment>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet created a profile</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
			{profile ? <br /> : ''}
			<button className='btn btn-danger' onClick={() => deleteAccount()}>
				<i className='fas fa-user-minus' /> Delete account
			</button>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
