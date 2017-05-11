'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _scopeTab = require('../helpers/scopeTab');

var _scopeTab2 = _interopRequireDefault(_scopeTab);

var _focusManager = require('../helpers/focusManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// so that our CSS is statically analyzable
var CLASS_NAMES = {
  overlay: {
    base: 'ReactModal__Overlay',
    afterOpen: 'ReactModal__Overlay--after-open',
    beforeClose: 'ReactModal__Overlay--before-close'
  },
  content: {
    base: 'ReactModal__Content',
    afterOpen: 'ReactModal__Content--after-open',
    beforeClose: 'ReactModal__Content--before-close'
  }
};

var ModalPortal = function (_Component) {
  _inherits(ModalPortal, _Component);

  function ModalPortal() {
    _classCallCheck(this, ModalPortal);

    var _this = _possibleConstructorReturn(this, (ModalPortal.__proto__ || Object.getPrototypeOf(ModalPortal)).call(this));

    _this.afterClose = function () {
      (0, _focusManager.returnFocus)();
      (0, _focusManager.teardownScopedFocus)();
    };

    _this.closeWithoutTimeout = function () {
      _this.setState({
        beforeClose: false,
        isOpen: false,
        afterOpen: false,
        closesAt: null
      }, _this.afterClose);
    };

    _this.handleKeyDown = function (event) {
      if (event.keyCode === 9 /* tab*/) (0, _scopeTab2.default)(_this.content, event);
      if (event.keyCode === 27 /* esc*/) {
          event.preventDefault();
          _this.requestClose(event);
        }
    };

    _this.handleOverlayOnClick = function (event) {
      if (_this.shouldClose === null) {
        _this.shouldClose = true;
      }
      if (_this.shouldClose && _this.props.shouldCloseOnOverlayClick) {
        if (_this.ownerHandlesClose()) {
          _this.requestClose(event);
        } else {
          _this.focusContent();
        }
      }
      _this.shouldClose = null;
    };

    _this.handleContentOnClick = function () {
      _this.shouldClose = false;
    };

    _this.state = {
      afterOpen: false,
      beforeClose: false
    };
    _this.shouldClose = null;
    return _this;
  }

  _createClass(ModalPortal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Focus needs to be set when mounting and already open
      if (this.props.isOpen) {
        this.setFocusAfterRender(true);
        this.open();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      // Focus only needs to be set once when the modal is being opened
      if (!this.props.isOpen && newProps.isOpen) {
        this.setFocusAfterRender(true);
        this.open();
      } else if (this.props.isOpen && !newProps.isOpen) {
        this.close();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.focusAfterRender) {
        this.focusContent();
        this.setFocusAfterRender(false);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.closeTimer);
    }
  }, {
    key: 'setFocusAfterRender',
    value: function setFocusAfterRender(focus) {
      this.focusAfterRender = focus;
    }
  }, {
    key: 'open',
    value: function open() {
      var _this2 = this;

      if (this.state.afterOpen && this.state.beforeClose) {
        clearTimeout(this.closeTimer);
        this.setState({ beforeClose: false });
      } else {
        (0, _focusManager.setupScopedFocus)(this.node);
        (0, _focusManager.markForFocusLater)();
        this.setState({ isOpen: true }, function () {
          _this2.setState({ afterOpen: true });

          if (_this2.props.isOpen && _this2.props.onAfterOpen) {
            _this2.props.onAfterOpen();
          }
        });
      }
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.props.closeTimeoutMS > 0) {
        this.closeWithTimeout();
      } else {
        this.closeWithoutTimeout();
      }
    }
  }, {
    key: 'focusContent',
    value: function focusContent() {
      // Don't steal focus from inner elements
      if (!this.contentHasFocus()) {
        this.content.focus();
      }
    }
  }, {
    key: 'closeWithTimeout',
    value: function closeWithTimeout() {
      var _this3 = this;

      var closesAt = Date.now() + this.props.closeTimeoutMS;
      this.setState({ beforeClose: true, closesAt: closesAt }, function () {
        _this3.closeTimer = setTimeout(_this3.closeWithoutTimeout, _this3.state.closesAt - Date.now());
      });
    }
  }, {
    key: 'requestClose',
    value: function requestClose(event) {
      if (this.ownerHandlesClose()) {
        this.props.onRequestClose(event);
      }
    }
  }, {
    key: 'ownerHandlesClose',
    value: function ownerHandlesClose() {
      return this.props.onRequestClose;
    }
  }, {
    key: 'shouldBeClosed',
    value: function shouldBeClosed() {
      return !this.state.isOpen && !this.state.beforeClose;
    }
  }, {
    key: 'contentHasFocus',
    value: function contentHasFocus() {
      return document.activeElement === this.content || this.content.contains(document.activeElement);
    }
  }, {
    key: 'buildClassName',
    value: function buildClassName(which, additional) {
      var className = CLASS_NAMES[which].base;
      if (this.state.afterOpen) {
        className += ' ' + CLASS_NAMES[which].afterOpen;
      }
      if (this.state.beforeClose) {
        className += ' ' + CLASS_NAMES[which].beforeClose;
      }
      return additional ? className + ' ' + additional : className;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var contentStyles = this.props.className ? {} : this.props.defaultStyles.content;
      var overlayStyles = this.props.overlayClassName ? {} : this.props.defaultStyles.overlay;

      // Disabling this rule is okay, since we know what is going on here, that being said
      // longterm we should probably do this better.
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      return this.shouldBeClosed() ? _react2.default.createElement('div', null) : _react2.default.createElement(
        'div',
        {
          ref: function ref(c) {
            _this4.overlay = c;
          },
          className: this.buildClassName('overlay', this.props.overlayClassName),
          style: _extends({}, overlayStyles, this.props.style.overlay || {}),
          onClick: this.handleOverlayOnClick
        },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(c) {
              _this4.content = c;
            },
            style: _extends({}, contentStyles, this.props.style.content || {}),
            className: this.buildClassName('content', this.props.className),
            tabIndex: -1,
            onKeyDown: this.handleKeyDown,
            onClick: this.handleContentOnClick,
            role: this.props.role,
            'aria-label': this.props.contentLabel
          },
          this.props.children
        )
      );
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
  }]);

  return ModalPortal;
}(_react.Component);

ModalPortal.propTypes = {
  isOpen: _react.PropTypes.bool.isRequired,
  onAfterOpen: _react.PropTypes.func,
  closeTimeoutMS: _react.PropTypes.number,
  shouldCloseOnOverlayClick: _react.PropTypes.bool,
  onRequestClose: _react.PropTypes.func,
  className: _react.PropTypes.string,
  overlayClassName: _react.PropTypes.string,
  defaultStyles: _react.PropTypes.shape({
    content: _react.PropTypes.object,
    overlay: _react.PropTypes.object
  }),
  style: _react.PropTypes.shape({
    content: _react.PropTypes.object,
    overlay: _react.PropTypes.object
  }),
  role: _react.PropTypes.string,
  children: _react.PropTypes.node,
  contentLabel: _react.PropTypes.string
};
ModalPortal.defaultProps = {
  style: {
    overlay: {},
    content: {}
  }
};
exports.default = ModalPortal;