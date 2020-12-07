import React from 'react';
import 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Home } from './home';

describe('Home', () => {

	let wrapper;

	beforeAll(() => {
		wrapper = shallow(<Home />);
	});

	it('Home Renders correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('Show Title', () => {
		expect(wrapper.find('.home-title').text()).toContain(`Capstone home page`);
	});

});
