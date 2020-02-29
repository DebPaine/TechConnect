import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, gotResponse }, signout }) => {
	const authLinks = (
		<ul>
			<li>
				<Link to='/profiles'>
					<i className='fas fa-users' /> Developers
				</Link>
			</li>
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-user' /> Dashboard
				</Link>
			</li>
			<li>
				<Link to='/' onClick={signout}>
					<i className='fas fa-sign-out-alt' /> Sign out
				</Link>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to='/profiles'>
					<i className='fas fa-users' /> Developers
				</Link>
			</li>
		</ul>
	);

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-project-diagram' /> Developer Hub
				</Link>
			</h1>
			{gotResponse && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
		</nav>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

Navbar.propTypes = {
	signout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { signout })(Navbar);
