import React from 'react';
import 'enzyme-to-json';
import { shallow } from 'enzyme';
import { About } from './about';

describe('About', () => {

	let wrapper;

	beforeAll(() => {

		wrapper = shallow(<About />);

	});

	it('About Renders correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('Show Title', () => {
		expect(wrapper.find('.about-title').text()).toContain(`Company's history`);
	});
});
