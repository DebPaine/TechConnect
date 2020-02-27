import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

const CreateProfile = ({ createProfile, history }) => {
	const [ formData, setFormData ] = useState({
		company: '',
		website: '',
		location: '',
		bio: '',
		status: '',
		githubusername: '',
		skills: '',
		youtube: '',
		facebook: '',
		twitter: '',
		instagram: '',
		linkedin: ''
	});

	const [ displaySocialInputs, toggleSocialInputs ] = useState(false);

	const {
		company,
		website,
		location,
		bio,
		status,
		githubusername,
		skills,
		youtube,
		facebook,
		twitter,
		instagram,
		linkedin
	} = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history);
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Create Your Profile</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Let's get some information to make your profile stand out
			</p>
			<small>* required field</small>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<select name='status' value={status} onChange={onChange}>
						<option value=''>* Select Professional Status</option>
						<option value='Developer'>Developer</option>
						<option value='Junior Developer'>Junior Developer</option>
						<option value='Senior Developer'>Senior Developer</option>
						<option value='Manager'>Manager</option>
						<option value='Student or Learning'>Student or Learning</option>
						<option value='Instructor'>Instructor or Teacher</option>
						<option value='Intern'>Intern</option>
						<option value='Other'>Other</option>
					</select>
					<small className='form-text'>Give us an idea of where you are at in your career</small>
				</div>
				<div className='form-group'>
					<input type='text' placeholder='Company' name='company' value={company} onChange={onChange} />
					<small className='form-text'>Could be your own company or one you work for</small>
				</div>
				<div className='form-group'>
					<input type='text' placeholder='Website' name='website' value={website} onChange={onChange} />
					<small className='form-text'>Could be your own or a company website</small>
				</div>
				<div className='form-group'>
					<input type='text' placeholder='Location' name='location' value={location} onChange={onChange} />
					<small className='form-text'>City & Country suggested (eg. Mumbai, India)</small>
				</div>
				<div className='form-group'>
					<input type='text' placeholder='* Skills' name='skills' value={skills} onChange={onChange} />
					<small className='form-text'>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Github Username'
						name='githubusername'
						value={githubusername}
						onChange={onChange}
					/>
					<small className='form-text'>
						If you want your latest repos and a Github link, include your username
					</small>
				</div>
				<div className='form-group'>
					<textarea placeholder='A short bio of yourself' name='bio' value={bio} onChange={onChange} />
					<small className='form-text'>Tell us a little about yourself</small>
				</div>

				<div className='my-2'>
					<button
						type='button'
						className='btn btn-light'
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>

				{displaySocialInputs && (
					<Fragment>
						<div className='form-group social-input'>
							<i className='fab fa-twitter fa-2x' />
							<input
								type='text'
								placeholder='Twitter URL'
								name='twitter'
								value={twitter}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x' />
							<input
								type='text'
								placeholder='Facebook URL'
								name='facebook'
								value={facebook}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-youtube fa-2x' />
							<input
								type='text'
								placeholder='YouTube URL'
								name='youtube'
								value={youtube}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-linkedin fa-2x' />
							<input
								type='text'
								placeholder='Linkedin URL'
								name='linkedin'
								value={linkedin}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-instagram fa-2x' />
							<input
								type='text'
								placeholder='Instagram URL'
								name='instagram'
								value={instagram}
								onChange={onChange}
							/>
						</div>
					</Fragment>
				)}
				<input type='submit' className='btn btn-primary my-1' />
				<Link to='/dashboard' className='btn btn-light my-1'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
