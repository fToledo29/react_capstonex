import React from 'react';
import './App.css';
import Menu from './components/menu/menu';
import { 
	Route,
	BrowserRouter as Router
} from 'react-router-dom';
import Switch from 'react-bootstrap/esm/Switch';
import { About } from './components/about/about';
import { Home } from './components/home/home';
import SignIn from './components/authentication/signIn/signIn';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import AllProductsPage from './components/productManagemen/all-products-page/all-products-page';
import Register from './components/authentication/registration/register/register';
import AddProductPage from './components/productManagemen/addProduct/addProductPage/addProductPage';
import ViwProductPage from './components/productManagemen/viewProduct/viewProductPage/viewProductPage';
import ChartsPage from './components/productManagemen/viewChart/chart';
library.add(fas);

function App() {
  return (
	<div className="App">
		<Router>
			<Menu></Menu>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/login" component={SignIn} />
				<Route path="/register" component={Register} />
				<Route path="/products" component={AllProductsPage} />
				<Route path="/addProduct" component={AddProductPage} />
				<Route path="/viwProduct/:id" component={ViwProductPage} />
				<Route path="/chart" component={ChartsPage} />
			</Switch>
		</Router>
	</div>
  );
}

export default App;
