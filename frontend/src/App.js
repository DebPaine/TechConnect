import React, { Fragment } from 'react';
import Landing from './Components/layout/Landing';
import Navbar from './Components/layout/Navbar';
import Register from './Components/auth/Register';
import Signin from './Components/auth/Signin';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

const App = () => (
	<Router>
		<Fragment>
			<Navbar />
			<Route exact path='/' component={Landing} />
			<section className='container'>
				<Switch>
					<Route exact path='/register' component={Register} />
					<Route exact path='/signin' component={Signin} />
				</Switch>
			</section>
		</Fragment>
	</Router>
);

export default App;
