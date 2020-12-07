import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import 'enzyme-to-json';
import { shallow } from 'enzyme';
import AddProductPage from './addProductPage';
import { AddForm } from '../addForm/addForm';

describe('ProductList', () => {

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

		wrapper = shallow(<AddProductPage {...props}/>).dive().dive();

	});

	it('AddProductPage Renders correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('Shows Add Product Header', () => {
		expect(wrapper.find('h1').text()).toContain('Add Product');
	});

	it('Add form component should be render', () => {
		expect(wrapper.find(AddForm)).toBeDefined();
	});
});	