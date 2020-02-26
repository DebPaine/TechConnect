import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, gotResponse }, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (!isAuthenticated && !gotResponse ? <Redirect to='/signin' /> : <Component {...props} />)}
	/>
);
const mapStateToProps = (state) => ({
	auth: state.auth
});

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PrivateRoute);
