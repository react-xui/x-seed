'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

function hidden(el) {
  return el.offsetWidth <= 0 && el.offsetHeight <= 0 || el.style.display === 'none';
}

function visible(element) {
  var ourElement = element;
  while (ourElement) {
    if (ourElement === document.body) break;
    if (hidden(ourElement)) return false;
    ourElement = ourElement.parentNode;
  }
  return true;
}

function focusable(element, isTabIndexNotNaN) {
  var nodeName = element.nodeName.toLowerCase();
  var isFocusableLink = nodeName === 'a' ? element.href || isTabIndexNotNaN : isTabIndexNotNaN;
  return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : isFocusableLink) && visible(element);
}

function tabbable(element) {
  var tabIndex = element.getAttribute('tabindex');
  if (tabIndex === null) tabIndex = undefined;
  var isTabIndexNaN = isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}

function findTabbableDescendants(element) {
  return [].slice.call(element.querySelectorAll('*'), 0).filter(function (el) {
    return tabbable(el);
  });
}

exports.default = findTabbableDescendants;