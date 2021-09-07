(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./src/components/Vote/ExcludeModal.js":
/*!*********************************************!*\
  !*** ./src/components/Vote/ExcludeModal.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ \"./node_modules/react-bootstrap/esm/index.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n // import { Link } from \"react-router-dom\";\n\n\n\nvar ExcludeModal = /*#__PURE__*/function (_React$Component) {\n  _inherits(ExcludeModal, _React$Component);\n\n  var _super = _createSuper(ExcludeModal);\n\n  function ExcludeModal(props) {\n    var _this;\n\n    _classCallCheck(this, ExcludeModal);\n\n    _this = _super.call(this, props);\n    _this.state = {\n      show: true\n    };\n    return _this;\n  }\n\n  _createClass(ExcludeModal, [{\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var date = new Date();\n      var start = new Date(this.props.start);\n      var end = new Date(this.props.end);\n      var _this$props = this.props,\n          setExcluded = _this$props.setExcluded,\n          contestId = _this$props.contestId,\n          entries = _this$props.entries;\n      entries.sort(function (a, b) {\n        if (a.contestant.toLowerCase() > b.contestant.toLowerCase()) return 1;\n        return -1;\n      });\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Modal\"], {\n        show: this.state.show && date >= start && date <= end,\n        backdrop: \"static\",\n        keyboard: false\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Modal\"].Header, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Modal\"].Title, null, \"Who Are You\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Modal\"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"Did you submit a mix for this month's contest?\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"If so, please select your username below:\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"DropdownButton\"], {\n        id: \"dropdown-basic-button\",\n        title: \"Who Are You?\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Dropdown\"].Item, {\n        onSelect: function onSelect() {\n          var localE = JSON.stringify({\n            mixnum: null,\n            contestId: contestId\n          });\n          localStorage.setItem('excluded', localE);\n          setExcluded(null);\n\n          _this2.setState({\n            show: false\n          });\n        }\n      }, ' ', \"I didn't mix this month\"), entries.map(function (entry) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Dropdown\"].Item, {\n          key: entry._id,\n          onSelect: function onSelect() {\n            var localE = JSON.stringify({\n              mixnum: entry.mixnum,\n              contestId: contestId\n            });\n            localStorage.setItem('excluded', localE);\n            setExcluded(entry.mixnum);\n\n            _this2.setState({\n              show: false\n            });\n          }\n        }, entry.contestant);\n      }))));\n    }\n  }]);\n\n  return ExcludeModal;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ExcludeModal);\n\n//# sourceURL=webpack:///./src/components/Vote/ExcludeModal.js?");

/***/ })

}]);