import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Components/layout/Landing';
import Navbar from './Components/layout/Navbar';
import Register from './Components/auth/Register';
import Signin from './Components/auth/Signin';
import Alert from './Components/layout/Alert';
import store from './store';
import { loadUser } from './actions/auth';
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
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
