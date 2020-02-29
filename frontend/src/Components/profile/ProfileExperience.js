import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ profile: { experience } }) => {
	return (
		<Fragment>
			{experience.map((exp) => (
				<Fragment key={exp._id}>
					<h3 className='text-dark'>{exp.company}</h3>
					<p>
						<Moment format='DD/MM/YYYY'>{exp.from}</Moment> -{' '}
						{!exp.to ? 'Now' : <Moment format='DD/MM/YYYY'>{exp.to}</Moment>}
					</p>
					<p>
						<strong>Position: </strong>
						{exp.title}
					</p>
					<p>
						<strong>Description: </strong>
						{exp.description}
					</p>
				</Fragment>
			))}
		</Fragment>
	);
};

ProfileExperience.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileExperience;
