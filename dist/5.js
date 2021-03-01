(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./src/components/common/Loader.js":
/*!*****************************************!*\
  !*** ./src/components/common/Loader.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _redux_contestDetails_contestDetailActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../redux/contestDetails/contestDetailActions */ \"./src/redux/contestDetails/contestDetailActions.js\");\n/* harmony import */ var _redux_entries_entriesActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../redux/entries/entriesActions */ \"./src/redux/entries/entriesActions.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\nvar Loader = /*#__PURE__*/function (_React$Component) {\n  _inherits(Loader, _React$Component);\n\n  var _super = _createSuper(Loader);\n\n  function Loader(props) {\n    _classCallCheck(this, Loader);\n\n    return _super.call(this, props);\n  }\n\n  _createClass(Loader, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.props.fetchContestDetails();\n      this.props.fetchEntriesDetails();\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return null;\n    }\n  }]);\n\n  return Loader;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    details: state.contestDetailReducer,\n    entries: state.entriesDetailReducer\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    fetchContestDetails: function fetchContestDetails() {\n      return dispatch(Object(_redux_contestDetails_contestDetailActions__WEBPACK_IMPORTED_MODULE_2__[\"fetchContestDetails\"])());\n    },\n    fetchEntriesDetails: function fetchEntriesDetails() {\n      return dispatch(Object(_redux_entries_entriesActions__WEBPACK_IMPORTED_MODULE_3__[\"fetchEntriesDetails\"])());\n    }\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps)(Loader));\n\n//# sourceURL=webpack:///./src/components/common/Loader.js?");

/***/ }),

/***/ "./src/redux/contestDetails/contestDetailActions.js":
/*!**********************************************************!*\
  !*** ./src/redux/contestDetails/contestDetailActions.js ***!
  \**********************************************************/
/*! exports provided: updateContestDetails, fetchContestDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateContestDetails\", function() { return updateContestDetails; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchContestDetails\", function() { return fetchContestDetails; });\n/* harmony import */ var _contestDetailTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contestDetailTypes */ \"./src/redux/contestDetails/contestDetailTypes.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar updateContestDetails = function updateContestDetails(data) {\n  return {\n    type: _contestDetailTypes__WEBPACK_IMPORTED_MODULE_0__[\"UPDATE_DETAILS\"],\n    payload: data\n  };\n};\nfunction fetchContestDetails() {\n  return function (dispatch) {\n    var d = new Date();\n    var month = d.getMonth() + 1;\n    var year = d.getYear() + 1900;\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(\"/api/contests/\".concat(month, \"/\").concat(year)).then(function (_ref) {\n      var data = _ref.data;\n      dispatch(updateContestDetails(data));\n    });\n  };\n}\n\n//# sourceURL=webpack:///./src/redux/contestDetails/contestDetailActions.js?");

/***/ }),

/***/ "./src/redux/contestDetails/contestDetailTypes.js":
/*!********************************************************!*\
  !*** ./src/redux/contestDetails/contestDetailTypes.js ***!
  \********************************************************/
/*! exports provided: UPDATE_DETAILS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_DETAILS\", function() { return UPDATE_DETAILS; });\nvar UPDATE_DETAILS = 'UPDATE_DETAILS';\n\n//# sourceURL=webpack:///./src/redux/contestDetails/contestDetailTypes.js?");

/***/ }),

/***/ "./src/redux/entries/entriesActions.js":
/*!*********************************************!*\
  !*** ./src/redux/entries/entriesActions.js ***!
  \*********************************************/
/*! exports provided: updateEntriesDetails, fetchEntriesDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateEntriesDetails\", function() { return updateEntriesDetails; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchEntriesDetails\", function() { return fetchEntriesDetails; });\n/* harmony import */ var _entriesTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entriesTypes */ \"./src/redux/entries/entriesTypes.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar updateEntriesDetails = function updateEntriesDetails(data) {\n  return {\n    type: _entriesTypes__WEBPACK_IMPORTED_MODULE_0__[\"UPDATE_ENTRIES\"],\n    payload: data\n  };\n};\nfunction fetchEntriesDetails() {\n  return function (dispatch) {\n    var d = new Date();\n    var month = '0' + (d.getMonth() + 1);\n    month = month.substring(month.length - 2);\n    var year = d.getFullYear();\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(\"/api/entries/\".concat(year).concat(month)).then(function (_ref) {\n      var data = _ref.data;\n      dispatch(updateEntriesDetails(data));\n    })[\"catch\"](function (err) {\n      return console.log(err);\n    });\n  };\n}\n\n//# sourceURL=webpack:///./src/redux/entries/entriesActions.js?");

/***/ }),

/***/ "./src/redux/entries/entriesTypes.js":
/*!*******************************************!*\
  !*** ./src/redux/entries/entriesTypes.js ***!
  \*******************************************/
/*! exports provided: UPDATE_ENTRIES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_ENTRIES\", function() { return UPDATE_ENTRIES; });\nvar UPDATE_ENTRIES = 'UPDATE_ENTRIES';\n\n//# sourceURL=webpack:///./src/redux/entries/entriesTypes.js?");

/***/ })

}]);