import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DashboardActions } from './DashboardActions';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ auth: { user }, profile: { profile, gotResponse }, getCurrentProfile }) => {
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
				<DashboardActions />
			) : (
				<Fragment>
					<p>You have not yet created a profile</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
