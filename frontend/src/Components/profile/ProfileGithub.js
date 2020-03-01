import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ profile: { githubusername }, getGithubRepos, repos }) => {
	useEffect(
		() => {
			getGithubRepos(githubusername);
		},
		[ getGithubRepos, githubusername ]
	);

	return (
		<Fragment>
			{!repos.length > 0 ? (
				<h4>No Github repo for the user</h4>
			) : (
				<Fragment>
					<h2 className='text-primary my-1'>
						<i className='fab fa-github' /> Github Repos
					</h2>
					{repos.map((repo) => (
						<Fragment key={repo.id}>
							<div className='repo bg-white p-1 my-1'>
								<div>
									<h4>
										<a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
											{repo.name}
										</a>
									</h4>
									<p>{repo.description}</p>
								</div>
								<div>
									<ul>
										<li className='badge badge-primary'>Stars: {repo.stargazers_count}</li>
										<li className='badge badge-dark'>Watchers: {repo.watchers_count}</li>
										<li className='badge badge-light'>Forks: {repo.forks_count}</li>
									</ul>
								</div>
							</div>
						</Fragment>
					))}
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	repos: state.profile.repos
});

ProfileGithub.propTypes = {
	profile: PropTypes.object.isRequired,
	repos: PropTypes.array.isRequired,
	getGithubRepos: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
