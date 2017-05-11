'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _elementClass = require('element-class');

var _elementClass2 = _interopRequireDefault(_elementClass);

var _ModalPortal = require('./ModalPortal');

var _ModalPortal2 = _interopRequireDefault(_ModalPortal);

var _ariaAppHider = require('../helpers/ariaAppHider');

var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var renderSubtreeIntoContainer = _reactDom2.default.unstable_renderSubtreeIntoContainer;

function getParentElement(parentSelector) {
  return parentSelector();
}

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    _classCallCheck(this, Modal);

    return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.node = document.createElement('div');
      this.node.className = this.props.portalClassName;

      var parent = getParentElement(this.props.parentSelector);
      parent.appendChild(this.node);
      this.renderPortal(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var currentParent = getParentElement(this.props.parentSelector);
      var newParent = getParentElement(newProps.parentSelector);

      if (newParent !== currentParent) {
        currentParent.removeChild(this.node);
        newParent.appendChild(this.node);
      }

      this.renderPortal(newProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.ariaHideApp) {
        ariaAppHider.show(this.props.getAppElement());
      }

      var state = this.portal.state;
      var now = Date.now();
      var closesAt = state.isOpen && this.props.closeTimeoutMS && (state.closesAt || now + this.props.closeTimeoutMS);

      if (closesAt) {
        if (!state.beforeClose) {
          this.portal.closeWithTimeout();
        }

        setTimeout(this.removePortal.bind(this), closesAt - now);
      } else {
        this.removePortal();
      }
    }
  }, {
    key: 'removePortal',
    value: function removePortal() {
      _reactDom2.default.unmountComponentAtNode(this.node);
      var parent = getParentElement(this.props.parentSelector);
      parent.removeChild(this.node);
      (0, _elementClass2.default)(document.body).remove('ReactModal__Body--open');
    }
  }, {
    key: 'renderPortal',
    value: function renderPortal(props) {
      if (props.isOpen) {
        (0, _elementClass2.default)(document.body).add('ReactModal__Body--open');
      } else {
        (0, _elementClass2.default)(document.body).remove('ReactModal__Body--open');
      }

      if (props.ariaHideApp) {
        ariaAppHider.toggle(this.props.getAppElement(), props.isOpen);
      }

      this.portal = renderSubtreeIntoContainer(this, _react2.default.createElement(_ModalPortal2.default, _extends({}, props, {
        defaultStyles: Modal.defaultStyles
      })), this.node);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null);
    }
  }], [{
    key: 'injectCSS',

    /* eslint-enable react/no-unused-prop-types */

    value: function injectCSS() {
      return process.env.NODE_ENV !== 'production' && console.warn('React-Modal: injectCSS has been deprecated ' + 'and no longer has any effect. It will be removed in a later version');
    }

    /* eslint-disable react/no-unused-prop-types */

  }]);

  return Modal;
}(_react.Component);

Modal.propTypes = {
  isOpen: _react2.default.PropTypes.bool.isRequired,
  style: _react2.default.PropTypes.shape({
    content: _react2.default.PropTypes.object,
    overlay: _react2.default.PropTypes.object
  }),
  portalClassName: _react2.default.PropTypes.string,
  /**
   * A function that returns the appElement that will be aria-hidden
   * when the modal is open. The function should return a DOMElement or
   * an array of DOMElements.
   */
  getAppElement: _react2.default.PropTypes.func.isRequired,
  onAfterOpen: _react2.default.PropTypes.func,
  onRequestClose: _react2.default.PropTypes.func,
  closeTimeoutMS: _react2.default.PropTypes.number,
  ariaHideApp: _react2.default.PropTypes.bool,
  shouldCloseOnOverlayClick: _react2.default.PropTypes.bool,
  parentSelector: _react2.default.PropTypes.func,
  role: _react2.default.PropTypes.string,
  contentLabel: _react2.default.PropTypes.string.isRequired
};
Modal.defaultProps = {
  isOpen: false,
  portalClassName: 'ReactModalPortal',
  ariaHideApp: true,
  closeTimeoutMS: 0,
  shouldCloseOnOverlayClick: true,
  parentSelector: function parentSelector() {
    return document.body;
  }
};
Modal.defaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
};
exports.default = Modal;