import React from 'react';
import './App.css';
import { Menu } from './components/menu/menu';
import { 
	Route,
	BrowserRouter as Router
} from 'react-router-dom';
import Switch from 'react-bootstrap/esm/Switch';
import { About } from './components/about/about';
import { Home } from './components/home/home';
import { SignIn } from './components/authentication/signIn/signIn';

function App() {
  return (
	<div className="App">
		<Router>
			<Menu></Menu>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/login" component={SignIn} />
				{/* <Route path="/addProduct" component={AddProductPage} />
				<Route path="/product/:productName" component={ProductDetail} /> */}
			</Switch>
		</Router>
	</div>
  );
}

export default App;
