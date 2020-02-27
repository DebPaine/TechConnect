import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Components/layout/Landing';
import Navbar from './Components/layout/Navbar';
import Register from './Components/auth/Register';
import Signin from './Components/auth/Signin';
import Alert from './Components/layout/Alert';
import Dashboard from './Components/dashboard/Dashboard';
import CreateProfile from './Components/profile/CreateProfile';
import PrivateRoute from './Components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import store from './store';
import './App.css';

const App = () => {
	useEffect(() => {
		if (localStorage.token) {
			store.dispatch(loadUser());
		}
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/register' component={Register} />
							<Route exact path='/signin' component={Signin} />
							<PrivateRoute exact path='/dashboard' component={Dashboard} />
							<PrivateRoute exact path='/create-profile' component={CreateProfile} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
