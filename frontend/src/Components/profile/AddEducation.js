import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
	const [ educationData, setEducationData ] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});
	const { school, degree, fieldofstudy, from, to, current, description } = educationData;

	const [ toDate, toggleToDate ] = useState(true);

	const onChange = (e) => {
		setEducationData({ ...educationData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addEducation(educationData, history);
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Add your education</h1>
			<p className='lead'>
				<i className='fas fa-code-branch' /> Add any school/college that you have attended
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<input type='text' placeholder='* School' name='school' value={school} onChange={onChange} />
				</div>
				<div className='form-group'>
					<input type='text' placeholder='* Degree' name='degree' value={degree} onChange={onChange} />
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Field of study'
						name='fieldofstudy'
						value={fieldofstudy}
						onChange={onChange}
					/>
				</div>
				<div className='form-group'>
					<h4>* From Date</h4>
					<input type='date' name='from' value={from} onChange={onChange} />
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							value={current}
							checked={current}
							onClick={() => {
								setEducationData({ ...educationData, current: !current });
								toggleToDate(!toDate);
							}}
						/>{' '}
						Currently in school/college
					</p>
				</div>
				<div className='form-group'>
					<h4>To Date</h4>
					<input type='date' name='to' value={to} onChange={onChange} disabled={!toDate} />
				</div>
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Degree description'
						value={description}
						onChange={onChange}
					/>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));
