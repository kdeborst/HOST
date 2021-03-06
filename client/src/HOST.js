/* React Requirements */
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* Redux Requirements */
import { Provider } from 'react-redux';
import store from './store';
import { loadAccount } from './actions/authorisation';
import setAuthorisation from './helpers/setAuthorisation';

/* HOST® Routing Components */
import PrivateRoute from './components/routes/PrivateRoute';

/* HOST® Public Components */
import About from './components/public/About';

/* HOST® Authorisation Components */
import Login from './components/authorisation/Login';
import Register from './components/authorisation/Register';

/* HOST® Dashboard Compenents */
import Dashboard from './components/dashboard/Dashboard';
import CreateHostProfile from './components/forms/CreateHostProfile';
import EditProfile from './components/forms/EditProfile';
import CreateExperience from './components/forms/CreateExperience';

/* HOST® Layout Compenents */
import Navigation from './components/layout/Navigation';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';

/* HOST® App Theme */
import './HOST_Theme.css';

/* Run Authorisation Verification */
if(localStorage.token) {
	setAuthorisation(localStorage.token);
}

const HOST = () => { 
	
	useEffect(() => {
		store.dispatch(loadAccount());
	}, []);

	return (

		<Provider store={store}>
			<Router>
				<Fragment>
					<Navigation />
					<Route exact path="/" component={Landing} />
					<main className="container">
						<Alert />
						<Switch>
							<Route exact path="/about" component={About}/>
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							<PrivateRoute exact path="/update-profile" component={CreateHostProfile} />
							<PrivateRoute exact path="/edit-profile" component={EditProfile} />
							<PrivateRoute exact path="/add-experience" component={CreateExperience} />
						</Switch>
					</main>
				</Fragment>
			</Router>
		</Provider>	

	)
};

export default HOST;