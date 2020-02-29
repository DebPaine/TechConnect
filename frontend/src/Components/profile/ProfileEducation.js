import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ profile: { education } }) => {
	return (
		<Fragment>
			{education.map((edu) => (
				<Fragment key={edu._id}>
					<h3>{edu.school}</h3>
					<p>
						<Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{' '}
						{!edu.to ? 'Now' : <Moment format='DD/MM/YYYY'>{edu.to}</Moment>}
					</p>
					<p>
						<strong>Degree: </strong>
						{edu.degree}
					</p>
					<p>
						<strong>Field Of Study: </strong>
						{edu.fieldofstudy}
					</p>
					<p>
						<strong>Description: </strong>
						{edu.description}
					</p>
				</Fragment>
			))}
		</Fragment>
	);
};

ProfileEducation.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileEducation;
