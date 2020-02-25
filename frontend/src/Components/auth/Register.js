import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

export const Register = ({ setAlert, register, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});
	const { name, email, password, password2 } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Password do not match', 'danger', 3000);
		} else {
			register(name, email, password);
		}
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Register</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Create Your Account
			</p>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
				</div>
				<div className='form-group'>
					<input type='email' placeholder='Email Address' name='email' value={email} onChange={onChange} />
					<small className='form-text'>Use your Gravatar email to display profile image</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						minLength='5'
						value={password}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						minLength='5'
						value={password2}
						onChange={onChange}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/signin'>Sign In</Link>
			</p>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, { setAlert, register })(Register);
