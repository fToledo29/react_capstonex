import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import 'enzyme-to-json';
import { shallow } from 'enzyme';
import Menu from './menu';

describe('Menu', () => {

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

		wrapper = shallow(<Menu {...props}/>).dive().dive();
	});

	it('Menu Renders correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('Home Menu Option', () => {
		expect(wrapper.find('.nav-link .login-label').text()).toContain(`Home`);
	});

	it('About Menu Option', () => {
		expect(wrapper.find('.nav-link.menu-about').text()).toContain(`About`);
	});

	it('Products Menu Option', () => {
		expect(wrapper.find('.nav-link.menu-products').text()).toContain(`Products`);
	});

	it('Top Viewed Products Menu Option', () => {
		expect(wrapper.find('.nav-link.menu-chart').text()).toContain(`Top Viewed Products`);
	});

	it('Login Menu Option', () => {
		expect(wrapper.find('.nav-buttons .login-label.login').text()).toContain(`Login`);
	});

	it('Register Menu Option', () => {
		expect(wrapper.find('.nav-buttons .login-label.register').text()).toContain(`Register`);
	});
});
