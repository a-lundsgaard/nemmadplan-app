import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import NumberPicker from './numberPicker';


describe('NumberPicker component', () => {

    const onCountChange = jest.fn(); // mock callback function for numberpicker
    let wrapper: any;
    let incrementButton: any
    beforeEach(() => {
        wrapper = mount(<NumberPicker label={'Persons'} onChange={onCountChange} value={1} />); // rerenders component on each it case
        incrementButton = wrapper.find('button:last-child');
    });
    afterEach(() => {
        jest.clearAllMocks(); // clearing onCountChange mock function after each it case
    });

    it('renders', () => {
        expect(wrapper).not.toBeNull();
    });

    it('correctly increments the count by 1', () => {
        incrementButton.simulate('click');
        expect(wrapper.find('input').render().attr('value')).toEqual("2");
    });

    it('correctly increments the count by 1', () => {
        incrementButton.simulate('click');
        expect(wrapper.find('input').render().attr('value')).toEqual("2");
    });

    it('correctly calls hook once when value prop is 1', () => {
        expect(onCountChange).toBeCalledTimes(1);
    });

    it('correctly calls hook twice when value prop is > 1', () => {
        jest.clearAllMocks(); // clearing onCountChange mock function after each it case
        wrapper = mount(<NumberPicker label={'Persons'} onChange={onCountChange} value={5} />); // rerenders component on each it case
        expect(onCountChange).toBeCalledTimes(2);
    });

    it('correctly calls use effect by 1', () => {
        expect(onCountChange).toBeCalledTimes(1);
        incrementButton.simulate('click');
        expect(onCountChange).toBeCalledTimes(2);
      });

    it('correctly parses a number when manually changed input and clicked incremented afterwards', () => {
        expect(onCountChange).toBeCalledTimes(1);
        wrapper.find('input').simulate('change', { target: { value: '3' } })
        incrementButton.simulate('click');
        expect(wrapper.find('input').render().attr('value')).toEqual("4");
    });
});


