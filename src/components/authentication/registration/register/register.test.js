import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import 'enzyme-to-json';
import { mount, shallow } from 'enzyme';
import Register from './register';
import { BrowserRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';

describe('Register', () => {

	const middlewares = [thunk];
	const mockStore = configureStore(middlewares);	
	let wrapper;
	let store;
	let props;

	beforeAll(() => {
		store = mockStore({
			data: {
				products: [],
				productsCopy: [],
				productToUpdate: {},
				productsToDelete: [],
				productViewMode: false,
			},
			userData: {},
			visitData: {},
			fieldsData: {},
		});

		props = {
			store: store,
			vistActions: {} ,
			actions: {} ,
			visitData: {} ,
			product: {} ,
			match: {params: {id: 1}, isExact: true, path: "", url: ""},
		};

		wrapper = mount((
			<BrowserRouter>
				<Register {...props}/>
			</BrowserRouter>
		));
		wrapper.mount();
		

	});

	it('Register Renders correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('Spinner works ok', () => {
		wrapper.instance().setState({spinnerOn: true});
		
		wrapper.instance().forceUpdate();

		wrapper.update();

		expect(wrapper.state('spinnerOn')).toEqual(true);
	});

});