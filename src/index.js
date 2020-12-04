import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore from './redux/store/configure-store';
import { loadProducts } from './redux/actions/productActions';
import { Provider } from 'react-redux';
import { keepSessionOn } from './redux/actions/userActions';
import * as actionTypes from './redux/actions/actionTypes';
import { loadFields } from './redux/actions/fieldsActions';

const store = configureStore();
store.dispatch(loadProducts());
const session = !!sessionStorage.getItem(actionTypes.LOGGED_IN_USER);
store.dispatch(keepSessionOn(session));
store.dispatch(loadFields());

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
