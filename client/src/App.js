/* React Requirements */
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* Redux Requirements */
import { Provider } from 'react-redux';
import store from './store';

/* HOST® Authorisation Components */
import Login from './components/authorisation/Login';
import Register from './components/authorisation/Register';

/* HOST® Layout Compenents */
import Navigation from './components/layout/Navigation';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';

/* HOST® App Theme */
import './App.css';

const App = () =>

	<Provider store={store}>
		<Router>
			<Fragment>
				<Navigation />
				<Route exact path="/" component={Landing} />
				<main className="container">
					<Alert />
					<Switch>
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
					</Switch>
				</main>
			</Fragment>
		</Router>
	</Provider>	

export default App;