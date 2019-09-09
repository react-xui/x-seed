import { shallow } from 'enzyme';
import React from 'react';
import Seed from '../components/Seed';
const setup = ({ ...props }) => {
    const wrapper = shallow(<Seed {...props} />);
    return {
        props,
        wrapper,
    };
};


describe('Test Seed', () => {
    it('测试初始化赋值', () => {
        const { wrapper } = setup({ value: "123" });
        expect(wrapper.html()).toEqual('<div class=\"Seed\">hello world...<a href=\"https://github.com/React-xui/x-seed\">https://github.com/React-xui/x-seed</a></div>');
    });''
});