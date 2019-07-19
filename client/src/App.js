/* Required Dependencies */
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* HOST® Authorisation Components */
import Login from './components/authorisation/Login';
import Register from './components/authorisation/Register';

/* HOST® Layout Compenents */
import Navigation from './components/layout/Navigation';
import Landing from './components/layout/Landing';

/* HOST® App Theme */
import './App.css';

const App = () =>

	<Router>
		<Fragment>
			<Navigation />
			<Route exact path="/" component={Landing} />
			<main className="container">
				<Switch>
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
				</Switch>
			</main>
		</Fragment>
	</Router>

export default App;