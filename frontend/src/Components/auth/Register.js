import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
	// formData = this.state, setFromData() = this.setState()
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});
	const { name, email, password, password2 } = formData;

	const onChange = (e) => {
		// [e.target.name]: e.target.value overwrites old value in ...formdata
		// useState() replaces old state instead of merging like this.setState()
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			alert("Password don't match!!");
		} else {
			console.log('Success');
		}
	};
	return (
		<Fragment>
			<h1 className='large text-primary'>Register</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Create Your Account
			</p>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<input type='text' placeholder='Name' name='name' value={name} onChange={onChange} required />
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

export default Register;
