(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/navBar.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/navBar.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".stickyheader{\\n  position: sticky;\\n  top: 0;\\n  width: 100%;\\n  z-index: 50;\\n}\\n\\n@media only screen and (min-width: 1000px) {\\n  .stickyheader{\\n    max-height: 4rem;\\n  }\\n}\\n\\n.rem2 {\\n  font-size: 2rem;\\n}\\n\\n.rem4 {\\n  font-size: 4rem;\\n}\\n\\n.cuprum {\\n  font-family: 'Cuprum', sans-serif;\\n}\\n\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/css/navBar.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/react-router-bootstrap/lib/IndexLinkContainer.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-router-bootstrap/lib/IndexLinkContainer.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.IndexLinkContainer = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n\nvar _LinkContainer = __webpack_require__(/*! ./LinkContainer */ \"./node_modules/react-router-bootstrap/lib/LinkContainer.js\");\n\nvar _LinkContainer2 = _interopRequireDefault(_LinkContainer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// Don't use a stateless function, to allow users to set a ref.\n/* eslint-disable react/prefer-stateless-function */\nvar IndexLinkContainer = exports.IndexLinkContainer = function (_React$Component) {\n  _inherits(IndexLinkContainer, _React$Component);\n\n  function IndexLinkContainer() {\n    _classCallCheck(this, IndexLinkContainer);\n\n    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));\n  }\n\n  IndexLinkContainer.prototype.render = function render() {\n    return _react2.default.createElement(_LinkContainer2.default, _extends({}, this.props, { exact: true }));\n  };\n\n  return IndexLinkContainer;\n}(_react2.default.Component);\n/* eslint-enable react/prefer-stateless-function */\n\nexports.default = (0, _reactRouterDom.withRouter)(IndexLinkContainer);\n\n//# sourceURL=webpack:///./node_modules/react-router-bootstrap/lib/IndexLinkContainer.js?");

/***/ }),

/***/ "./node_modules/react-router-bootstrap/lib/LinkContainer.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-router-bootstrap/lib/LinkContainer.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.LinkContainer = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar isModifiedEvent = function isModifiedEvent(event) {\n  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);\n};\n\nvar LinkContainer = exports.LinkContainer = function (_Component) {\n  _inherits(LinkContainer, _Component);\n\n  function LinkContainer() {\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, LinkContainer);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleClick = function (event) {\n      var _this$props = _this.props,\n          children = _this$props.children,\n          onClick = _this$props.onClick;\n\n\n      if (children.props.onClick) {\n        children.props.onClick(event);\n      }\n\n      if (onClick) {\n        onClick(event);\n      }\n\n      if (!event.defaultPrevented && // onClick prevented default\n      event.button === 0 && // ignore right clicks\n      !isModifiedEvent(event) // ignore clicks with modifier keys\n      ) {\n          event.preventDefault();\n\n          var _this$props2 = _this.props,\n              replace = _this$props2.replace,\n              to = _this$props2.to,\n              history = _this$props2.history;\n\n\n          if (replace) {\n            history.replace(to);\n          } else {\n            history.push(to);\n          }\n        }\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  LinkContainer.prototype.render = function render() {\n    var _this2 = this;\n\n    var _props = this.props,\n        history = _props.history,\n        _location = _props.location,\n        _match = _props.match,\n        _staticContext = _props.staticContext,\n        children = _props.children,\n        replace = _props.replace,\n        to = _props.to,\n        exact = _props.exact,\n        strict = _props.strict,\n        activeClassName = _props.activeClassName,\n        className = _props.className,\n        activeStyle = _props.activeStyle,\n        style = _props.style,\n        getIsActive = _props.isActive,\n        props = _objectWithoutProperties(_props, ['history', 'location', 'match', 'staticContext', 'children', 'replace', 'to', 'exact', 'strict', 'activeClassName', 'className', 'activeStyle', 'style', 'isActive']);\n\n    var href = history.createHref(typeof to === 'string' ? { pathname: to } : to);\n\n    var child = _react2.default.Children.only(children);\n\n    return _react2.default.createElement(_reactRouterDom.Route, {\n      path: (typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' ? to.pathname : to,\n      exact: exact,\n      strict: strict,\n      children: function children(_ref) {\n        var location = _ref.location,\n            match = _ref.match;\n\n        var isActive = !!(getIsActive ? getIsActive(match, location) : match);\n\n        return _react2.default.cloneElement(child, _extends({}, props, {\n          className: [className, child.props.className, isActive ? activeClassName : null].join(' ').trim(),\n          style: isActive ? _extends({}, style, activeStyle) : style,\n          href: href,\n          onClick: _this2.handleClick\n        }));\n      }\n    });\n  };\n\n  return LinkContainer;\n}(_react.Component);\n\nLinkContainer.propTypes = {\n  history: _propTypes2.default.shape({\n    push: _propTypes2.default.func.isRequired,\n    replace: _propTypes2.default.func.isRequired,\n    createHref: _propTypes2.default.func.isRequired\n  }).isRequired,\n  location: _propTypes2.default.object,\n  match: _propTypes2.default.object,\n  staticContext: _propTypes2.default.object,\n  children: _propTypes2.default.element.isRequired,\n  onClick: _propTypes2.default.func,\n  replace: _propTypes2.default.bool,\n  to: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,\n  exact: _propTypes2.default.bool,\n  strict: _propTypes2.default.bool,\n  className: _propTypes2.default.string,\n  activeClassName: _propTypes2.default.string,\n  style: _propTypes2.default.object,\n  activeStyle: _propTypes2.default.object,\n  isActive: _propTypes2.default.func\n};\nLinkContainer.defaultProps = {\n  replace: false,\n  exact: false,\n  strict: false,\n  activeClassName: 'active'\n};\nexports.default = (0, _reactRouterDom.withRouter)(LinkContainer);\n\n//# sourceURL=webpack:///./node_modules/react-router-bootstrap/lib/LinkContainer.js?");

/***/ }),

/***/ "./node_modules/react-router-bootstrap/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-router-bootstrap/lib/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.LinkContainer = exports.IndexLinkContainer = undefined;\n\nvar _IndexLinkContainer2 = __webpack_require__(/*! ./IndexLinkContainer */ \"./node_modules/react-router-bootstrap/lib/IndexLinkContainer.js\");\n\nvar _IndexLinkContainer3 = _interopRequireDefault(_IndexLinkContainer2);\n\nvar _LinkContainer2 = __webpack_require__(/*! ./LinkContainer */ \"./node_modules/react-router-bootstrap/lib/LinkContainer.js\");\n\nvar _LinkContainer3 = _interopRequireDefault(_LinkContainer2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.IndexLinkContainer = _IndexLinkContainer3.default;\nexports.LinkContainer = _LinkContainer3.default;\n\n//# sourceURL=webpack:///./node_modules/react-router-bootstrap/lib/index.js?");

/***/ }),

/***/ "./src/components/NavBar.js":
/*!**********************************!*\
  !*** ./src/components/NavBar.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var react_router_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-bootstrap */ \"./node_modules/react-router-bootstrap/lib/index.js\");\n/* harmony import */ var react_router_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ \"./node_modules/react-bootstrap/esm/index.js\");\n/* harmony import */ var _css_navBar_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../css/navBar.css */ \"./src/css/navBar.css\");\n/* harmony import */ var _css_navBar_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_css_navBar_css__WEBPACK_IMPORTED_MODULE_4__);\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\nvar NavBar = function NavBar() {\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false),\n      _React$useState2 = _slicedToArray(_React$useState, 2),\n      expanded = _React$useState2[0],\n      setExpanded = _React$useState2[1];\n\n  var location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"useLocation\"])();\n  react__WEBPACK_IMPORTED_MODULE_0___default.a.useEffect(function () {\n    window.gtag('config', 'G-7JCK4EJFYD', {\n      page_location: document.location.href,\n      page_path: location.pathname\n    });\n  }, [location.pathname]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Navbar\"], {\n    bg: \"dark\",\n    variant: \"dark\",\n    expand: \"lg\",\n    expanded: expanded,\n    onToggle: function onToggle() {\n      return setExpanded(!expanded);\n    },\n    className: \"stickyheader cuprum rem2\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Navbar\"].Brand, {\n    href: \"/\",\n    className: \"cabin rem4\"\n  }, ' ', \"reaMIXed\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Navbar\"].Toggle, {\n    \"aria-controls\": \"basic-navbar-nav\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Navbar\"].Collapse, {\n    id: \"basic-navbar-nav\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Nav\"], {\n    className: \"ml-auto\",\n    onSelect: function onSelect() {\n      return setExpanded(false);\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"LinkContainer\"], {\n    className: \"ml-auto\",\n    to: \"/\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Nav\"].Link, null, \"Home\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"LinkContainer\"], {\n    className: \"ml-auto\",\n    to: \"/getstarted\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Nav\"].Link, null, \"Get Started\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"LinkContainer\"], {\n    className: \"ml-auto\",\n    to: \"/submit\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Nav\"].Link, null, \"Submit Your Mix\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"LinkContainer\"], {\n    className: \"ml-auto\",\n    to: \"/vote\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Nav\"].Link, null, \"Vote\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"LinkContainer\"], {\n    className: \"ml-auto\",\n    to: \"/results\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Nav\"].Link, null, \"Results\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"LinkContainer\"], {\n    className: \"ml-auto\",\n    to: \"/archive\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Nav\"].Link, null, \"Archive\")))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (NavBar);\n\n//# sourceURL=webpack:///./src/components/NavBar.js?");

/***/ }),

/***/ "./src/css/navBar.css":
/*!****************************!*\
  !*** ./src/css/navBar.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./navBar.css */ \"./node_modules/css-loader/dist/cjs.js!./src/css/navBar.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./src/css/navBar.css?");

/***/ })

}]);