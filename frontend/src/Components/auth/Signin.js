import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Signin = () => {
	// formData = this.state, setFromData() = this.setState()
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});
	const { email, password } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log('Success');
	};
	return (
		<Fragment>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Sign into your account
			</p>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<input type='email' placeholder='Email Address' name='email' value={email} onChange={onChange} />
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
				<input type='submit' className='btn btn-primary' value='Sign in' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Register here</Link>
			</p>
		</Fragment>
	);
};

export default Signin;
