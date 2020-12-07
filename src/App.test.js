import React from 'react';
import 'enzyme-to-json';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {

	let wrapper;
	let props;

	beforeAll(() => {

		props = {
			vistActions: {} ,
			actions: {} ,
			visitData: {} ,
			product: {} ,
			match: {params: {id: 1}, isExact: true, path: "", url: ""},
		};

		wrapper = shallow(<App {...props}/>);

	});

	it('App Renders correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});
});	