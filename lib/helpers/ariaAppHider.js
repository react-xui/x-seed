'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggle = toggle;
exports.hide = hide;
exports.show = show;
function validateElement(appElement) {
  if (!appElement) {
    throw new Error('react-modal: Setting an getAppElement function is required');
  }
}

function toggle(appElement, value) {
  validateElement(appElement);
  if (Array.isArray(appElement)) {
    appElement.forEach(function (ae) {
      ae.setAttribute('aria-hidden', value);
    });
  } else {
    appElement.setAttribute('aria-hidden', value);
  }
}

function hide(appElement) {
  toggle(appElement, true);
}

function show(appElement) {
  toggle(appElement, false);
}