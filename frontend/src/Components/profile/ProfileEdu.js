import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileEdu = ({ profile: { education } }) => {
	return (
		<Fragment>
			{/* <h2 className='text-primary'>Education</h2>
            <
            {education} */}
			<Fragment>
				<h3>University Of Washington</h3>
				<p>Sep 1993 - June 1999</p>
				<p>
					<strong>Degree: </strong>Masters
				</p>
				<p>
					<strong>Field Of Study: </strong>Computer Science
				</p>
				<p>
					<strong>Description: </strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
					placeat, dolorum ullam ipsam, sapiente suscipit dicta eius velit amet aspernatur asperiores modi
					quidem expedita fugit.
				</p>
			</Fragment>
		</Fragment>
	);
};

ProfileEdu.propTypes = {};

export default ProfileEdu;
