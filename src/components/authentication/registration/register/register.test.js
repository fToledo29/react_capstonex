import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import 'enzyme-to-json';
import { mount, shallow } from 'enzyme';
import Register from './register';
import { BrowserRouter } from 'react-router-dom';

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
		wrapper.mount();
		expect(wrapper).toMatchSnapshot();
		wrapper.unmount();
	});

	it('Spinner works ok', () => {
		wrapper.mount();
		wrapper.instance().setState({spinnerOn: true});

		expect(wrapper.state('spinnerOn')).toEqual(true);
		wrapper.unmount();
	});

	it('Show feedback message', () => {
		wrapper.mount();
		const feedbackEl = wrapper.find(`FormGroup[controlId='register-email'] .invalid-feedback`);

		expect(feedbackEl.text()).toEqual('Please Enter a valid email.');
		wrapper.unmount();
	});

	it('Validate when submit button', () => {

		wrapper = shallow(<Register {...props}/>).dive().dive();

		jest.spyOn(wrapper.instance(), 'handleSubmit');

		wrapper.instance().forceUpdate();

		wrapper.find('.register-form').simulate('submit', {
			currentTarget: {
				checkValidity: () => true,
			},
			preventDefault: () => null,
			stopPropagation: () => null,
			text: 'Testing!!'
		});

		expect(wrapper.instance().handleSubmit).toHaveBeenCalled();

	});

});