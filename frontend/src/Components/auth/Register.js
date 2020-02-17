import React, { Fragment, useState } from 'react';
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
		console.log(formData);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			alert("Password don't match!!");
		} else {
		}
	};
	return (
		<Fragment>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Create Your Account
			</p>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<input type='text' placeholder='Name' name='name' value={name} onChange={onChange} required />
				</div>
				<div className='form-group'>
					<input type='email' placeholder='Email Address' name='email' value={email} onChange={onChange} />
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a Gravatar email
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						minLength='6'
						value={password}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						minLength='6'
						value={password2}
						onChange={onChange}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <a href='login.html'>Sign In</a>
			</p>
		</Fragment>
	);
};

export default Register;
