(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ComonUI"] = factory();
	else
		root["ComonUI"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(8)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = __webpack_require__(5);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.install = function (Vue) {
  Vue.component(_main2.default.name, _main2.default);
};

exports.default = _main2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MasterPage = __webpack_require__(3)['default'];
var Page404 = __webpack_require__(3)['default'];

var components = [MasterPage, Page404];

var install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (install.installed) return;
  components.map(function (component) {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  version: '1.0.0',
  install: install,
  MasterPage: MasterPage,
  Page404: Page404
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(6)
  __webpack_require__(9)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(11),
  /* template */
  __webpack_require__(27),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-58c7da32",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Stone/repo/drsoft/comon-ui/src/components/master-page/src/main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-58c7da32", Component.options)
  } else {
    hotAPI.reload("data-v-58c7da32", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("231b8f8f", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/.0.28.4@css-loader/index.js!../../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-58c7da32\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/.6.0.6@sass-loader/lib/loader.js!../../../../node_modules/.12.2.1@vue-loader/lib/selector.js?type=styles&index=0!./main.vue", function() {
     var newContent = require("!!../../../../node_modules/.0.28.4@css-loader/index.js!../../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-58c7da32\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../node_modules/.6.0.6@sass-loader/lib/loader.js!../../../../node_modules/.12.2.1@vue-loader/lib/selector.js?type=styles&index=0!./main.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.header[data-v-58c7da32] {\n  position: fixed;\n  top: 0;\n  z-index: 100;\n  width: 100%;\n  overflow: visible;\n  height: 40px;\n  line-height: 40px;\n  min-height: 40px;\n  background-color: #324157;\n}\n.header .logo[data-v-58c7da32] {\n    width: 160px;\n    text-align: center;\n}\n.header .logo a[data-v-58c7da32] {\n      letter-spacing: 1px;\n      color: #FFF;\n      font-size: 16px;\n}\n.my-content[data-v-58c7da32] {\n  margin-top: 40px;\n  padding: 10px 10px 10px 170px;\n}\n.my-content.no-menu[data-v-58c7da32] {\n    margin-top: 0 !important;\n    padding-left: 0 !important;\n}\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("1515bf5a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/.0.28.4@css-loader/index.js!../../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-58c7da32\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/.6.0.6@sass-loader/lib/loader.js!../../../../node_modules/.12.2.1@vue-loader/lib/selector.js?type=styles&index=1!./main.vue", function() {
     var newContent = require("!!../../../../node_modules/.0.28.4@css-loader/index.js!../../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-58c7da32\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/.6.0.6@sass-loader/lib/loader.js!../../../../node_modules/.12.2.1@vue-loader/lib/selector.js?type=styles&index=1!./main.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n/* 使用 MasterPage, 则必须使用全局样式 */\n* {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0px;\n  padding: 0px;\n}\nbody {\n  font-size: 14px;\n  font-family: \"Helvetica Neue\",Helvetica,\"PingFang SC\",\"Hiragino Sans GB\",\"Microsoft YaHei\",\"\\5FAE\\8F6F\\96C5\\9ED1\",Arial,sans-serif;\n}\nul, li {\n  list-style: none;\n}\na {\n  text-decoration: none;\n  color: #20a0ff;\n}\na:hover {\n    color: #20a0ff;\n}\n.center {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n[draggable] {\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n      user-select: none;\n  -webkit-user-drag: element;\n}\n.clearfix:after {\n  display: block;\n  content: '';\n  clear: both;\n  overflow: hidden;\n}\n.left {\n  float: left !important;\n}\n.right {\n  float: right !important;\n}\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TopMenu = __webpack_require__(12);

var _TopMenu2 = _interopRequireDefault(_TopMenu);

var _LeftMenu = __webpack_require__(17);

var _LeftMenu2 = _interopRequireDefault(_LeftMenu);

var _ShortcutMenu = __webpack_require__(22);

var _ShortcutMenu2 = _interopRequireDefault(_ShortcutMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: 'CUMasterPage',
	props: {
		config: {
			type: Object
		}
	},
	data: function data() {
		var subMenu = this.config.menu[0]['children'];
		return {
			transitionName: '',
			isShowMenu: true,
			subMenu: subMenu
		};
	},

	computed: {
		menu: function menu() {
			return this.config ? this.config.menu : {};
		},
		userInfo: function userInfo() {
			return {
				user_name: this.config.user_name,
				user_role: this.config.role_name,
				city_name: this.config.city_name
			};
		},
		cityInfo: function cityInfo() {
			var city_ids = this.config['city_ids'];
			var city_names = this.config['city_names'];
			return {
				ids: city_ids ? city_ids.split(',') : '',
				names: city_names ? city_names.split(',') : ''
			};
		}
	},
	created: function created() {
		this.isShowMenu = window.top === window.self;
	},

	methods: {
		selectTopMenu: function selectTopMenu(menuItem, index) {
			var _this = this;

			this.subMenu = this.menu[index]['children'] || [];
			if (this.subMenu.length) {
				var path = this.subMenu[0]['url'];
				this.$nextTick(function () {
					_this.selectLeftMenu(path);
				});
			}
		},
		selectLeftMenu: function selectLeftMenu(path) {
			window.location.hash = path;
		}
	},
	components: {
		TopMenu: _TopMenu2.default, ShortcutMenu: _ShortcutMenu2.default, LeftMenu: _LeftMenu2.default
	}
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(13)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(16),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2dd86d32",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Stone/repo/drsoft/comon-ui/src/components/master-page/src/menu/TopMenu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TopMenu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2dd86d32", Component.options)
  } else {
    hotAPI.reload("data-v-2dd86d32", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("4825a18e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/.0.28.4@css-loader/index.js!../../../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2dd86d32\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.6@sass-loader/lib/loader.js!../../../../../node_modules/.12.2.1@vue-loader/lib/selector.js?type=styles&index=0!./TopMenu.vue", function() {
     var newContent = require("!!../../../../../node_modules/.0.28.4@css-loader/index.js!../../../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2dd86d32\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.6@sass-loader/lib/loader.js!../../../../../node_modules/.12.2.1@vue-loader/lib/selector.js?type=styles&index=0!./TopMenu.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.cmpSkeleton > li[data-v-2dd86d32] {\n  float: left;\n  position: relative;\n  min-width: 90px;\n  text-align: center;\n  padding: 0px 10px;\n  cursor: pointer;\n}\n.cmpSkeleton > li > a[data-v-2dd86d32] {\n    color: #bfcbd9;\n}\n.cmpSkeleton > li:hover > a[data-v-2dd86d32], .cmpSkeleton > li.current > a[data-v-2dd86d32] {\n    color: #FFFFFF;\n}\n.cmpSkeleton > li[data-v-2dd86d32]:hover {\n    background-color: rgba(28, 38, 55, 0.55);\n}\n.cmpSkeleton > li.current[data-v-2dd86d32] {\n    background-color: #1c2637;\n}\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	props: {
		menu: {
			type: Array
		}
	},
	data: function data() {
		return {
			currentIndex: 0
		};
	},

	methods: {
		selectMenu: function selectMenu(menuItem, index) {
			if (this.currentIndex != index) {
				this.currentIndex = parseInt(index);
				this.$emit('select', menuItem, this.currentIndex);
			}
		}
	}
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "cmpSkeleton left"
  }, _vm._l((_vm.menu), function(menuItem, index) {
    return _c('li', {
      class: _vm.currentIndex == index ? 'current' : '',
      on: {
        "click": function($event) {
          _vm.selectMenu(menuItem, index)
        }
      }
    }, [_c('a', [_vm._v(_vm._s(menuItem['name']))])])
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2dd86d32", module.exports)
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(18)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(21),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2e2dabd0",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Stone/repo/drsoft/comon-ui/src/components/master-page/src/menu/LeftMenu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] LeftMenu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2e2dabd0", Component.options)
  } else {
    hotAPI.reload("data-v-2e2dabd0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("b693dbe6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/.0.28.4@css-loader/index.js!../../../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2e2dabd0\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.6@sass-loader/lib/loader.js!../../../../../node_modules/.12.2.1@vue-loader/lib/selector.js?type=styles&index=0!./LeftMenu.vue", function() {
     var newContent = require("!!../../../../../node_modules/.0.28.4@css-loader/index.js!../../../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2e2dabd0\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.6@sass-loader/lib/loader.js!../../../../../node_modules/.12.2.1@vue-loader/lib/selector.js?type=styles&index=0!./LeftMenu.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.cmpSkeleton[data-v-2e2dabd0] {\n  width: 160px;\n  background: #324157;\n  position: fixed;\n  left: 0;\n  top: 40px;\n  bottom: 0;\n  z-index: 999;\n}\n", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	props: {
		menu: {
			type: Array
		}
	},
	data: function data() {
		return {
			lastPath: ''
		};
	},

	methods: {
		selectSubMenu: function selectSubMenu(path) {
			this.$emit('select', path);
		}
	}
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "cmpSkeleton"
  }, [_c('el-menu', {
    attrs: {
      "theme": "dark"
    },
    on: {
      "select": _vm.selectSubMenu
    }
  }, [_vm._l((_vm.menu), function(menuItem) {
    return [(!menuItem.children) ? [_c('el-menu-item', {
      key: menuItem['url'] + '_left',
      class: menuItem['url'] == _vm.lastPath ? 'current is-active' : '',
      attrs: {
        "index": menuItem['url']
      }
    }, [_c('i', {
      class: 'fa fa-' + menuItem['icon'],
      attrs: {
        "aria-hidden": "true"
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "menu-text"
    }, [_vm._v(_vm._s(menuItem['name']))])])] : [_c('el-submenu', {
      attrs: {
        "index": ""
      }
    }, [_c('template', {
      slot: "title"
    }, [_c('i', {
      class: 'fa fa-' + menuItem['icon'],
      attrs: {
        "aria-hidden": "true"
      }
    }), _vm._v("\n\t\t\t\t\t\t" + _vm._s(menuItem.name) + "\n\t\t\t\t\t")]), _vm._v(" "), _vm._l((menuItem.children), function(subMenuItem) {
      return _c('el-menu-item', {
        key: subMenuItem['url'] + '_submenu',
        attrs: {
          "index": subMenuItem['url']
        }
      }, [_c('span', {
        staticClass: "menu-text"
      }, [_vm._v(_vm._s(subMenuItem['name']))])])
    })], 2)]]
  })], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2e2dabd0", module.exports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(23)
}
var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(26),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0bf0ea57",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/Users/Stone/repo/drsoft/comon-ui/src/components/master-page/src/menu/ShortcutMenu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ShortcutMenu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0bf0ea57", Component.options)
  } else {
    hotAPI.reload("data-v-0bf0ea57", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("8769e2f4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/.0.28.4@css-loader/index.js!../../../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0bf0ea57\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.6@sass-loader/lib/loader.js!../../../../../node_modules/.12.2.1@vue-loader/lib/selector.js?type=styles&index=0!./ShortcutMenu.vue", function() {
     var newContent = require("!!../../../../../node_modules/.0.28.4@css-loader/index.js!../../../../../node_modules/.12.2.1@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0bf0ea57\",\"scoped\":true,\"hasInlineConfig\":false}!../../../../../node_modules/.6.0.6@sass-loader/lib/loader.js!../../../../../node_modules/.12.2.1@vue-loader/lib/selector.js?type=styles&index=0!./ShortcutMenu.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.cmpSkeleton > li[data-v-0bf0ea57] {\n  float: left;\n  position: relative;\n  text-align: center;\n  padding: 0px 10px;\n  cursor: pointer;\n}\n.cmpSkeleton > li > a[data-v-0bf0ea57] {\n    color: #bfcbd9;\n}\n.cmpSkeleton > li[data-v-0bf0ea57]:hover {\n    background-color: rgba(28, 38, 55, 0.55);\n}\n.cmpSkeleton > li:hover > a[data-v-0bf0ea57] {\n      color: #FFFFFF;\n}\n.cmpSkeleton > li:hover .dd-menu[data-v-0bf0ea57] {\n      display: block;\n}\n.cmpSkeleton .dd-menu[data-v-0bf0ea57] {\n  position: absolute;\n  display: none;\n  top: 38px;\n  right: 0;\n  z-index: 2000;\n  float: left;\n  min-width: 130px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  text-align: left;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0px 0px 4px 4px;\n  max-height: 500px !important;\n  overflow: auto !important;\n}\n.cmpSkeleton .dd-menu li a[data-v-0bf0ea57] {\n    display: block;\n    padding: 3px 20px;\n    clear: both;\n    font-weight: 400;\n    white-space: nowrap;\n    font-size: 14px;\n    line-height: 34px;\n    cursor: pointer;\n    color: #1c2637;\n}\n.cmpSkeleton .dd-menu li a[data-v-0bf0ea57]:hover {\n      background-color: #263245;\n      color: #FFFFFF;\n}\n.cmpSkeleton .caret[data-v-0bf0ea57] {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 2px;\n  vertical-align: middle;\n  border-top: 4px solid;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n}\n", ""]);

// exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: {
    otherplt: {
      type: Array
    },
    user: {
      type: Object
    },
    city: {
      type: Object
    }
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "cmpSkeleton right"
  }, [(_vm.otherplt && _vm.otherplt.length) ? _c('li', [_c('a', [_vm._v("其他系统")]), _vm._v(" "), _c('ul', {
    staticClass: "dd-menu"
  }, _vm._l((_vm.otherplt), function(menuItem, index) {
    return _c('li', [_c('a', {
      attrs: {
        "href": menuItem['url']
      }
    }, [_vm._v(_vm._s(menuItem['description']))])])
  }))]) : _vm._e(), _vm._v(" "), (_vm.user.user_name && _vm.user.user_role) ? _c('li', [_c('a', {
    attrs: {
      "href": "javascript:void(0)"
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.user.user_name) + " (" + _vm._s(_vm.user.user_role) + ")"), _c('b', {
    staticClass: "caret"
  })]), _vm._v(" "), _vm._m(0)]) : _vm._e(), _vm._v(" "), (_vm.city.ids && _vm.city.ids.length) ? _c('li', [_c('a', [_vm._v(_vm._s(_vm.user.city_name))]), _vm._v(" "), _c('ul', {
    staticClass: "dd-menu"
  }, _vm._l((_vm.city.ids), function(id, index) {
    return _c('li', [_c('a', {
      attrs: {
        "href": '/site/switch-city?city_id=' + id
      }
    }, [_vm._v(_vm._s(_vm.city.names[index]))])])
  }))]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', {
    staticClass: "dd-menu"
  }, [_c('li', [_c('a', {
    attrs: {
      "href": "/site/logout"
    }
  }, [_vm._v("退出")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0bf0ea57", module.exports)
  }
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "master-page cmpSkeleton"
  }, [(_vm.isShowMenu) ? _c('div', {
    staticClass: "header"
  }, [_c('div', {
    staticClass: "logo left"
  }, [_c('a', {
    attrs: {
      "href": "/",
      "title": _vm.config.title || ''
    }
  }, [_vm._v(_vm._s(_vm.config.title || ''))])]), _vm._v(" "), _c('TopMenu', {
    attrs: {
      "menu": _vm.menu
    },
    on: {
      "select": _vm.selectTopMenu
    }
  }), _vm._v(" "), _c('ShortcutMenu', {
    attrs: {
      "otherplt": _vm.config.otherPlt,
      "user": _vm.userInfo,
      "city": _vm.cityInfo
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.isShowMenu) ? _c('LeftMenu', {
    attrs: {
      "menu": _vm.subMenu
    },
    on: {
      "select": _vm.selectLeftMenu
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "my-content",
    class: {
      'no-menu': !_vm.isShowMenu
    }
  }, [_vm._t("default")], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-58c7da32", module.exports)
  }
}

/***/ })
/******/ ]);
});