'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Seed = require('../components/Seed');

var _Seed2 = _interopRequireDefault(_Seed);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var setup = function setup(_ref) {
    var props = _objectWithoutProperties(_ref, []);

    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(Input, props));
    return {
        props: props,
        wrapper: wrapper
    };
};

describe('Test Seed', function () {
    it('测试初始化赋值', function () {
        var _setup = setup({ value: "123" }),
            wrapper = _setup.wrapper;

        expect(wrapper.find('.Seed').html()).toEqual('hello world...<a href="https://github.com/React-xui/x-seed">https://github.com/React-xui/x-seed</a>');
    });'';
});