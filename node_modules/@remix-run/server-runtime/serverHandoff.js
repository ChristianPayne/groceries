/**
 * @remix-run/server-runtime v1.5.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsesc = require('jsesc');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var jsesc__default = /*#__PURE__*/_interopDefaultLegacy(jsesc);

function createServerHandoffString(serverHandoff) {
  // Use jsesc to escape data returned from the loaders. This string is
  // inserted directly into the HTML in the `<Scripts>` element.
  return jsesc__default["default"](serverHandoff, {
    isScriptContext: true
  });
}

exports.createServerHandoffString = createServerHandoffString;
