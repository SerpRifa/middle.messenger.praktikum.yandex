// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/normalize.css/normalize.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/handlebars/dist/handlebars.runtime.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/**!

 @license
 handlebars v4.7.7

Copyright (C) 2011-2019 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if (typeof exports === 'object') exports["Handlebars"] = factory();else root["Handlebars"] = factory();
})(this, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId])
          /******/
          return installedModules[moduleId].exports;
        /******/
        // Create a new module (and put it into the cache)

        /******/

        var module = installedModules[moduleId] = {
          /******/
          exports: {},

          /******/
          id: moduleId,

          /******/
          loaded: false
          /******/

        };
        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        // Flag the module as loaded

        /******/

        module.loaded = true;
        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/
      // __webpack_public_path__

      /******/

      __webpack_require__.p = "";
      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(0);
      /******/
    }
    /************************************************************************/

    /******/
    ([
    /* 0 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireWildcard = __webpack_require__(1)['default'];

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;

      var _handlebarsBase = __webpack_require__(3);

      var base = _interopRequireWildcard(_handlebarsBase); // Each of these augment the Handlebars object. No need to setup here.
      // (This is done to easily share code between commonjs and browse envs)


      var _handlebarsSafeString = __webpack_require__(36);

      var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

      var _handlebarsException = __webpack_require__(5);

      var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

      var _handlebarsUtils = __webpack_require__(4);

      var Utils = _interopRequireWildcard(_handlebarsUtils);

      var _handlebarsRuntime = __webpack_require__(37);

      var runtime = _interopRequireWildcard(_handlebarsRuntime);

      var _handlebarsNoConflict = __webpack_require__(43);

      var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict); // For compatibility and usage outside of module systems, make the Handlebars object a namespace


      function create() {
        var hb = new base.HandlebarsEnvironment();
        Utils.extend(hb, base);
        hb.SafeString = _handlebarsSafeString2['default'];
        hb.Exception = _handlebarsException2['default'];
        hb.Utils = Utils;
        hb.escapeExpression = Utils.escapeExpression;
        hb.VM = runtime;

        hb.template = function (spec) {
          return runtime.template(spec, hb);
        };

        return hb;
      }

      var inst = create();
      inst.create = create;

      _handlebarsNoConflict2['default'](inst);

      inst['default'] = inst;
      exports['default'] = inst;
      module.exports = exports['default'];
      /***/
    },
    /* 1 */

    /***/
    function (module, exports) {
      "use strict";

      exports["default"] = function (obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};

          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
          }

          newObj["default"] = obj;
          return newObj;
        }
      };

      exports.__esModule = true;
      /***/
    },
    /* 2 */

    /***/
    function (module, exports) {
      "use strict";

      exports["default"] = function (obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      };

      exports.__esModule = true;
      /***/
    },
    /* 3 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;
      exports.HandlebarsEnvironment = HandlebarsEnvironment;

      var _utils = __webpack_require__(4);

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      var _helpers = __webpack_require__(9);

      var _decorators = __webpack_require__(29);

      var _logger = __webpack_require__(31);

      var _logger2 = _interopRequireDefault(_logger);

      var _internalProtoAccess = __webpack_require__(32);

      var VERSION = '4.7.7';
      exports.VERSION = VERSION;
      var COMPILER_REVISION = 8;
      exports.COMPILER_REVISION = COMPILER_REVISION;
      var LAST_COMPATIBLE_COMPILER_REVISION = 7;
      exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
      var REVISION_CHANGES = {
        1: '<= 1.0.rc.2',
        // 1.0.rc.2 is actually rev2 but doesn't report it
        2: '== 1.0.0-rc.3',
        3: '== 1.0.0-rc.4',
        4: '== 1.x.x',
        5: '== 2.0.0-alpha.x',
        6: '>= 2.0.0-beta.1',
        7: '>= 4.0.0 <4.3.0',
        8: '>= 4.3.0'
      };
      exports.REVISION_CHANGES = REVISION_CHANGES;
      var objectType = '[object Object]';

      function HandlebarsEnvironment(helpers, partials, decorators) {
        this.helpers = helpers || {};
        this.partials = partials || {};
        this.decorators = decorators || {};

        _helpers.registerDefaultHelpers(this);

        _decorators.registerDefaultDecorators(this);
      }

      HandlebarsEnvironment.prototype = {
        constructor: HandlebarsEnvironment,
        logger: _logger2['default'],
        log: _logger2['default'].log,
        registerHelper: function registerHelper(name, fn) {
          if (_utils.toString.call(name) === objectType) {
            if (fn) {
              throw new _exception2['default']('Arg not supported with multiple helpers');
            }

            _utils.extend(this.helpers, name);
          } else {
            this.helpers[name] = fn;
          }
        },
        unregisterHelper: function unregisterHelper(name) {
          delete this.helpers[name];
        },
        registerPartial: function registerPartial(name, partial) {
          if (_utils.toString.call(name) === objectType) {
            _utils.extend(this.partials, name);
          } else {
            if (typeof partial === 'undefined') {
              throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
            }

            this.partials[name] = partial;
          }
        },
        unregisterPartial: function unregisterPartial(name) {
          delete this.partials[name];
        },
        registerDecorator: function registerDecorator(name, fn) {
          if (_utils.toString.call(name) === objectType) {
            if (fn) {
              throw new _exception2['default']('Arg not supported with multiple decorators');
            }

            _utils.extend(this.decorators, name);
          } else {
            this.decorators[name] = fn;
          }
        },
        unregisterDecorator: function unregisterDecorator(name) {
          delete this.decorators[name];
        },

        /**
         * Reset the memory of illegal property accesses that have already been logged.
         * @deprecated should only be used in handlebars test-cases
         */
        resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
          _internalProtoAccess.resetLoggedProperties();
        }
      };
      var log = _logger2['default'].log;
      exports.log = log;
      exports.createFrame = _utils.createFrame;
      exports.logger = _logger2['default'];
      /***/
    },
    /* 4 */

    /***/
    function (module, exports) {
      'use strict';

      exports.__esModule = true;
      exports.extend = extend;
      exports.indexOf = indexOf;
      exports.escapeExpression = escapeExpression;
      exports.isEmpty = isEmpty;
      exports.createFrame = createFrame;
      exports.blockParams = blockParams;
      exports.appendContextPath = appendContextPath;
      var escape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;',
        '=': '&#x3D;'
      };
      var badChars = /[&<>"'`=]/g,
          possible = /[&<>"'`=]/;

      function escapeChar(chr) {
        return escape[chr];
      }

      function extend(obj
      /* , ...source */
      ) {
        for (var i = 1; i < arguments.length; i++) {
          for (var key in arguments[i]) {
            if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
              obj[key] = arguments[i][key];
            }
          }
        }

        return obj;
      }

      var toString = Object.prototype.toString;
      exports.toString = toString; // Sourced from lodash
      // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt

      /* eslint-disable func-style */

      var isFunction = function isFunction(value) {
        return typeof value === 'function';
      }; // fallback for older versions of Chrome and Safari

      /* istanbul ignore next */


      if (isFunction(/x/)) {
        exports.isFunction = isFunction = function (value) {
          return typeof value === 'function' && toString.call(value) === '[object Function]';
        };
      }

      exports.isFunction = isFunction;
      /* eslint-enable func-style */

      /* istanbul ignore next */

      var isArray = Array.isArray || function (value) {
        return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
      };

      exports.isArray = isArray; // Older IE versions do not directly support indexOf so we must implement our own, sadly.

      function indexOf(array, value) {
        for (var i = 0, len = array.length; i < len; i++) {
          if (array[i] === value) {
            return i;
          }
        }

        return -1;
      }

      function escapeExpression(string) {
        if (typeof string !== 'string') {
          // don't escape SafeStrings, since they're already safe
          if (string && string.toHTML) {
            return string.toHTML();
          } else if (string == null) {
            return '';
          } else if (!string) {
            return string + '';
          } // Force a string conversion as this will be done by the append regardless and
          // the regex test will do this transparently behind the scenes, causing issues if
          // an object's to string has escaped characters in it.


          string = '' + string;
        }

        if (!possible.test(string)) {
          return string;
        }

        return string.replace(badChars, escapeChar);
      }

      function isEmpty(value) {
        if (!value && value !== 0) {
          return true;
        } else if (isArray(value) && value.length === 0) {
          return true;
        } else {
          return false;
        }
      }

      function createFrame(object) {
        var frame = extend({}, object);
        frame._parent = object;
        return frame;
      }

      function blockParams(params, ids) {
        params.path = ids;
        return params;
      }

      function appendContextPath(contextPath, id) {
        return (contextPath ? contextPath + '.' : '') + id;
      }
      /***/

    },
    /* 5 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$defineProperty = __webpack_require__(6)['default'];

      exports.__esModule = true;
      var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

      function Exception(message, node) {
        var loc = node && node.loc,
            line = undefined,
            endLineNumber = undefined,
            column = undefined,
            endColumn = undefined;

        if (loc) {
          line = loc.start.line;
          endLineNumber = loc.end.line;
          column = loc.start.column;
          endColumn = loc.end.column;
          message += ' - ' + line + ':' + column;
        }

        var tmp = Error.prototype.constructor.call(this, message); // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.

        for (var idx = 0; idx < errorProps.length; idx++) {
          this[errorProps[idx]] = tmp[errorProps[idx]];
        }
        /* istanbul ignore else */


        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, Exception);
        }

        try {
          if (loc) {
            this.lineNumber = line;
            this.endLineNumber = endLineNumber; // Work around issue under safari where we can't directly set the column value

            /* istanbul ignore next */

            if (_Object$defineProperty) {
              Object.defineProperty(this, 'column', {
                value: column,
                enumerable: true
              });
              Object.defineProperty(this, 'endColumn', {
                value: endColumn,
                enumerable: true
              });
            } else {
              this.column = column;
              this.endColumn = endColumn;
            }
          }
        } catch (nop) {
          /* Ignore if the browser is very particular */
        }
      }

      Exception.prototype = new Error();
      exports['default'] = Exception;
      module.exports = exports['default'];
      /***/
    },
    /* 6 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(7),
        __esModule: true
      };
      /***/
    },
    /* 7 */

    /***/
    function (module, exports, __webpack_require__) {
      var $ = __webpack_require__(8);

      module.exports = function defineProperty(it, key, desc) {
        return $.setDesc(it, key, desc);
      };
      /***/

    },
    /* 8 */

    /***/
    function (module, exports) {
      var $Object = Object;
      module.exports = {
        create: $Object.create,
        getProto: $Object.getPrototypeOf,
        isEnum: {}.propertyIsEnumerable,
        getDesc: $Object.getOwnPropertyDescriptor,
        setDesc: $Object.defineProperty,
        setDescs: $Object.defineProperties,
        getKeys: $Object.keys,
        getNames: $Object.getOwnPropertyNames,
        getSymbols: $Object.getOwnPropertySymbols,
        each: [].forEach
      };
      /***/
    },
    /* 9 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;
      exports.registerDefaultHelpers = registerDefaultHelpers;
      exports.moveHelperToHooks = moveHelperToHooks;

      var _helpersBlockHelperMissing = __webpack_require__(10);

      var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

      var _helpersEach = __webpack_require__(11);

      var _helpersEach2 = _interopRequireDefault(_helpersEach);

      var _helpersHelperMissing = __webpack_require__(24);

      var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

      var _helpersIf = __webpack_require__(25);

      var _helpersIf2 = _interopRequireDefault(_helpersIf);

      var _helpersLog = __webpack_require__(26);

      var _helpersLog2 = _interopRequireDefault(_helpersLog);

      var _helpersLookup = __webpack_require__(27);

      var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

      var _helpersWith = __webpack_require__(28);

      var _helpersWith2 = _interopRequireDefault(_helpersWith);

      function registerDefaultHelpers(instance) {
        _helpersBlockHelperMissing2['default'](instance);

        _helpersEach2['default'](instance);

        _helpersHelperMissing2['default'](instance);

        _helpersIf2['default'](instance);

        _helpersLog2['default'](instance);

        _helpersLookup2['default'](instance);

        _helpersWith2['default'](instance);
      }

      function moveHelperToHooks(instance, helperName, keepHelper) {
        if (instance.helpers[helperName]) {
          instance.hooks[helperName] = instance.helpers[helperName];

          if (!keepHelper) {
            delete instance.helpers[helperName];
          }
        }
      }
      /***/

    },
    /* 10 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      exports['default'] = function (instance) {
        instance.registerHelper('blockHelperMissing', function (context, options) {
          var inverse = options.inverse,
              fn = options.fn;

          if (context === true) {
            return fn(this);
          } else if (context === false || context == null) {
            return inverse(this);
          } else if (_utils.isArray(context)) {
            if (context.length > 0) {
              if (options.ids) {
                options.ids = [options.name];
              }

              return instance.helpers.each(context, options);
            } else {
              return inverse(this);
            }
          } else {
            if (options.data && options.ids) {
              var data = _utils.createFrame(options.data);

              data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
              options = {
                data: data
              };
            }

            return fn(context, options);
          }
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 11 */

    /***/
    function (module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */
      (function (global) {
        'use strict';

        var _Object$keys = __webpack_require__(12)['default'];

        var _interopRequireDefault = __webpack_require__(2)['default'];

        exports.__esModule = true;

        var _utils = __webpack_require__(4);

        var _exception = __webpack_require__(5);

        var _exception2 = _interopRequireDefault(_exception);

        exports['default'] = function (instance) {
          instance.registerHelper('each', function (context, options) {
            if (!options) {
              throw new _exception2['default']('Must pass iterator to #each');
            }

            var fn = options.fn,
                inverse = options.inverse,
                i = 0,
                ret = '',
                data = undefined,
                contextPath = undefined;

            if (options.data && options.ids) {
              contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
            }

            if (_utils.isFunction(context)) {
              context = context.call(this);
            }

            if (options.data) {
              data = _utils.createFrame(options.data);
            }

            function execIteration(field, index, last) {
              if (data) {
                data.key = field;
                data.index = index;
                data.first = index === 0;
                data.last = !!last;

                if (contextPath) {
                  data.contextPath = contextPath + field;
                }
              }

              ret = ret + fn(context[field], {
                data: data,
                blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
              });
            }

            if (context && typeof context === 'object') {
              if (_utils.isArray(context)) {
                for (var j = context.length; i < j; i++) {
                  if (i in context) {
                    execIteration(i, i, i === context.length - 1);
                  }
                }
              } else if (global.Symbol && context[global.Symbol.iterator]) {
                var newContext = [];
                var iterator = context[global.Symbol.iterator]();

                for (var it = iterator.next(); !it.done; it = iterator.next()) {
                  newContext.push(it.value);
                }

                context = newContext;

                for (var j = context.length; i < j; i++) {
                  execIteration(i, i, i === context.length - 1);
                }
              } else {
                (function () {
                  var priorKey = undefined;

                  _Object$keys(context).forEach(function (key) {
                    // We're running the iterations one step out of sync so we can detect
                    // the last iteration without have to scan the object twice and create
                    // an itermediate keys array.
                    if (priorKey !== undefined) {
                      execIteration(priorKey, i - 1);
                    }

                    priorKey = key;
                    i++;
                  });

                  if (priorKey !== undefined) {
                    execIteration(priorKey, i - 1, true);
                  }
                })();
              }
            }

            if (i === 0) {
              ret = inverse(this);
            }

            return ret;
          });
        };

        module.exports = exports['default'];
        /* WEBPACK VAR INJECTION */
      }).call(exports, function () {
        return this;
      }());
      /***/
    },
    /* 12 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(13),
        __esModule: true
      };
      /***/
    },
    /* 13 */

    /***/
    function (module, exports, __webpack_require__) {
      __webpack_require__(14);

      module.exports = __webpack_require__(20).Object.keys;
      /***/
    },
    /* 14 */

    /***/
    function (module, exports, __webpack_require__) {
      // 19.1.2.14 Object.keys(O)
      var toObject = __webpack_require__(15);

      __webpack_require__(17)('keys', function ($keys) {
        return function keys(it) {
          return $keys(toObject(it));
        };
      });
      /***/

    },
    /* 15 */

    /***/
    function (module, exports, __webpack_require__) {
      // 7.1.13 ToObject(argument)
      var defined = __webpack_require__(16);

      module.exports = function (it) {
        return Object(defined(it));
      };
      /***/

    },
    /* 16 */

    /***/
    function (module, exports) {
      // 7.2.1 RequireObjectCoercible(argument)
      module.exports = function (it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
      };
      /***/

    },
    /* 17 */

    /***/
    function (module, exports, __webpack_require__) {
      // most Object methods by ES6 should accept primitives
      var $export = __webpack_require__(18),
          core = __webpack_require__(20),
          fails = __webpack_require__(23);

      module.exports = function (KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY],
            exp = {};
        exp[KEY] = exec(fn);
        $export($export.S + $export.F * fails(function () {
          fn(1);
        }), 'Object', exp);
      };
      /***/

    },
    /* 18 */

    /***/
    function (module, exports, __webpack_require__) {
      var global = __webpack_require__(19),
          core = __webpack_require__(20),
          ctx = __webpack_require__(21),
          PROTOTYPE = 'prototype';

      var $export = function (type, name, source) {
        var IS_FORCED = type & $export.F,
            IS_GLOBAL = type & $export.G,
            IS_STATIC = type & $export.S,
            IS_PROTO = type & $export.P,
            IS_BIND = type & $export.B,
            IS_WRAP = type & $export.W,
            exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
            target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
            key,
            own,
            out;
        if (IS_GLOBAL) source = name;

        for (key in source) {
          // contains in native
          own = !IS_FORCED && target && key in target;
          if (own && key in exports) continue; // export native or passed

          out = own ? target[key] : source[key]; // prevent global pollution for namespaces

          exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] // bind timers to global for call from export context
          : IS_BIND && own ? ctx(out, global) // wrap global constructors for prevent change them in library
          : IS_WRAP && target[key] == out ? function (C) {
            var F = function (param) {
              return this instanceof C ? new C(param) : C(param);
            };

            F[PROTOTYPE] = C[PROTOTYPE];
            return F; // make static versions for prototype methods
          }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
          if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
        }
      }; // type bitmap


      $export.F = 1; // forced

      $export.G = 2; // global

      $export.S = 4; // static

      $export.P = 8; // proto

      $export.B = 16; // bind

      $export.W = 32; // wrap

      module.exports = $export;
      /***/
    },
    /* 19 */

    /***/
    function (module, exports) {
      // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
      var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
      if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

      /***/
    },
    /* 20 */

    /***/
    function (module, exports) {
      var core = module.exports = {
        version: '1.2.6'
      };
      if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

      /***/
    },
    /* 21 */

    /***/
    function (module, exports, __webpack_require__) {
      // optional / simple context binding
      var aFunction = __webpack_require__(22);

      module.exports = function (fn, that, length) {
        aFunction(fn);
        if (that === undefined) return fn;

        switch (length) {
          case 1:
            return function (a) {
              return fn.call(that, a);
            };

          case 2:
            return function (a, b) {
              return fn.call(that, a, b);
            };

          case 3:
            return function (a, b, c) {
              return fn.call(that, a, b, c);
            };
        }

        return function
          /* ...args */
        () {
          return fn.apply(that, arguments);
        };
      };
      /***/

    },
    /* 22 */

    /***/
    function (module, exports) {
      module.exports = function (it) {
        if (typeof it != 'function') throw TypeError(it + ' is not a function!');
        return it;
      };
      /***/

    },
    /* 23 */

    /***/
    function (module, exports) {
      module.exports = function (exec) {
        try {
          return !!exec();
        } catch (e) {
          return true;
        }
      };
      /***/

    },
    /* 24 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      exports['default'] = function (instance) {
        instance.registerHelper('helperMissing', function ()
        /* [args, ]options */
        {
          if (arguments.length === 1) {
            // A missing field in a {{foo}} construct.
            return undefined;
          } else {
            // Someone is actually trying to call something, blow up.
            throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
          }
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 25 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      exports['default'] = function (instance) {
        instance.registerHelper('if', function (conditional, options) {
          if (arguments.length != 2) {
            throw new _exception2['default']('#if requires exactly one argument');
          }

          if (_utils.isFunction(conditional)) {
            conditional = conditional.call(this);
          } // Default behavior is to render the positive path if the value is truthy and not empty.
          // The `includeZero` option may be set to treat the condtional as purely not empty based on the
          // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.


          if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
            return options.inverse(this);
          } else {
            return options.fn(this);
          }
        });
        instance.registerHelper('unless', function (conditional, options) {
          if (arguments.length != 2) {
            throw new _exception2['default']('#unless requires exactly one argument');
          }

          return instance.helpers['if'].call(this, conditional, {
            fn: options.inverse,
            inverse: options.fn,
            hash: options.hash
          });
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 26 */

    /***/
    function (module, exports) {
      'use strict';

      exports.__esModule = true;

      exports['default'] = function (instance) {
        instance.registerHelper('log', function ()
        /* message, options */
        {
          var args = [undefined],
              options = arguments[arguments.length - 1];

          for (var i = 0; i < arguments.length - 1; i++) {
            args.push(arguments[i]);
          }

          var level = 1;

          if (options.hash.level != null) {
            level = options.hash.level;
          } else if (options.data && options.data.level != null) {
            level = options.data.level;
          }

          args[0] = level;
          instance.log.apply(instance, args);
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 27 */

    /***/
    function (module, exports) {
      'use strict';

      exports.__esModule = true;

      exports['default'] = function (instance) {
        instance.registerHelper('lookup', function (obj, field, options) {
          if (!obj) {
            // Note for 5.0: Change to "obj == null" in 5.0
            return obj;
          }

          return options.lookupProperty(obj, field);
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 28 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      exports['default'] = function (instance) {
        instance.registerHelper('with', function (context, options) {
          if (arguments.length != 2) {
            throw new _exception2['default']('#with requires exactly one argument');
          }

          if (_utils.isFunction(context)) {
            context = context.call(this);
          }

          var fn = options.fn;

          if (!_utils.isEmpty(context)) {
            var data = options.data;

            if (options.data && options.ids) {
              data = _utils.createFrame(options.data);
              data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
            }

            return fn(context, {
              data: data,
              blockParams: _utils.blockParams([context], [data && data.contextPath])
            });
          } else {
            return options.inverse(this);
          }
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 29 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;
      exports.registerDefaultDecorators = registerDefaultDecorators;

      var _decoratorsInline = __webpack_require__(30);

      var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

      function registerDefaultDecorators(instance) {
        _decoratorsInline2['default'](instance);
      }
      /***/

    },
    /* 30 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      exports['default'] = function (instance) {
        instance.registerDecorator('inline', function (fn, props, container, options) {
          var ret = fn;

          if (!props.partials) {
            props.partials = {};

            ret = function (context, options) {
              // Create a new partials stack frame prior to exec.
              var original = container.partials;
              container.partials = _utils.extend({}, original, props.partials);
              var ret = fn(context, options);
              container.partials = original;
              return ret;
            };
          }

          props.partials[options.args[0]] = options.fn;
          return ret;
        });
      };

      module.exports = exports['default'];
      /***/
    },
    /* 31 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      exports.__esModule = true;

      var _utils = __webpack_require__(4);

      var logger = {
        methodMap: ['debug', 'info', 'warn', 'error'],
        level: 'info',
        // Maps a given level value to the `methodMap` indexes above.
        lookupLevel: function lookupLevel(level) {
          if (typeof level === 'string') {
            var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());

            if (levelMap >= 0) {
              level = levelMap;
            } else {
              level = parseInt(level, 10);
            }
          }

          return level;
        },
        // Can be overridden in the host environment
        log: function log(level) {
          level = logger.lookupLevel(level);

          if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
            var method = logger.methodMap[level]; // eslint-disable-next-line no-console

            if (!console[method]) {
              method = 'log';
            }

            for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              message[_key - 1] = arguments[_key];
            }

            console[method].apply(console, message); // eslint-disable-line no-console
          }
        }
      };
      exports['default'] = logger;
      module.exports = exports['default'];
      /***/
    },
    /* 32 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$create = __webpack_require__(33)['default'];

      var _Object$keys = __webpack_require__(12)['default'];

      var _interopRequireWildcard = __webpack_require__(1)['default'];

      exports.__esModule = true;
      exports.createProtoAccessControl = createProtoAccessControl;
      exports.resultIsAllowed = resultIsAllowed;
      exports.resetLoggedProperties = resetLoggedProperties;

      var _createNewLookupObject = __webpack_require__(35);

      var _logger = __webpack_require__(31);

      var logger = _interopRequireWildcard(_logger);

      var loggedProperties = _Object$create(null);

      function createProtoAccessControl(runtimeOptions) {
        var defaultMethodWhiteList = _Object$create(null);

        defaultMethodWhiteList['constructor'] = false;
        defaultMethodWhiteList['__defineGetter__'] = false;
        defaultMethodWhiteList['__defineSetter__'] = false;
        defaultMethodWhiteList['__lookupGetter__'] = false;

        var defaultPropertyWhiteList = _Object$create(null); // eslint-disable-next-line no-proto


        defaultPropertyWhiteList['__proto__'] = false;
        return {
          properties: {
            whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
            defaultValue: runtimeOptions.allowProtoPropertiesByDefault
          },
          methods: {
            whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
            defaultValue: runtimeOptions.allowProtoMethodsByDefault
          }
        };
      }

      function resultIsAllowed(result, protoAccessControl, propertyName) {
        if (typeof result === 'function') {
          return checkWhiteList(protoAccessControl.methods, propertyName);
        } else {
          return checkWhiteList(protoAccessControl.properties, propertyName);
        }
      }

      function checkWhiteList(protoAccessControlForType, propertyName) {
        if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
          return protoAccessControlForType.whitelist[propertyName] === true;
        }

        if (protoAccessControlForType.defaultValue !== undefined) {
          return protoAccessControlForType.defaultValue;
        }

        logUnexpecedPropertyAccessOnce(propertyName);
        return false;
      }

      function logUnexpecedPropertyAccessOnce(propertyName) {
        if (loggedProperties[propertyName] !== true) {
          loggedProperties[propertyName] = true;
          logger.log('error', 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
        }
      }

      function resetLoggedProperties() {
        _Object$keys(loggedProperties).forEach(function (propertyName) {
          delete loggedProperties[propertyName];
        });
      }
      /***/

    },
    /* 33 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(34),
        __esModule: true
      };
      /***/
    },
    /* 34 */

    /***/
    function (module, exports, __webpack_require__) {
      var $ = __webpack_require__(8);

      module.exports = function create(P, D) {
        return $.create(P, D);
      };
      /***/

    },
    /* 35 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$create = __webpack_require__(33)['default'];

      exports.__esModule = true;
      exports.createNewLookupObject = createNewLookupObject;

      var _utils = __webpack_require__(4);
      /**
       * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
       * The resulting object can be used with "object[property]" to check if a property exists
       * @param {...object} sources a varargs parameter of source objects that will be merged
       * @returns {object}
       */


      function createNewLookupObject() {
        for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
          sources[_key] = arguments[_key];
        }

        return _utils.extend.apply(undefined, [_Object$create(null)].concat(sources));
      }
      /***/

    },
    /* 36 */

    /***/
    function (module, exports) {
      // Build out our basic SafeString type
      'use strict';

      exports.__esModule = true;

      function SafeString(string) {
        this.string = string;
      }

      SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
        return '' + this.string;
      };

      exports['default'] = SafeString;
      module.exports = exports['default'];
      /***/
    },
    /* 37 */

    /***/
    function (module, exports, __webpack_require__) {
      'use strict';

      var _Object$seal = __webpack_require__(38)['default'];

      var _Object$keys = __webpack_require__(12)['default'];

      var _interopRequireWildcard = __webpack_require__(1)['default'];

      var _interopRequireDefault = __webpack_require__(2)['default'];

      exports.__esModule = true;
      exports.checkRevision = checkRevision;
      exports.template = template;
      exports.wrapProgram = wrapProgram;
      exports.resolvePartial = resolvePartial;
      exports.invokePartial = invokePartial;
      exports.noop = noop;

      var _utils = __webpack_require__(4);

      var Utils = _interopRequireWildcard(_utils);

      var _exception = __webpack_require__(5);

      var _exception2 = _interopRequireDefault(_exception);

      var _base = __webpack_require__(3);

      var _helpers = __webpack_require__(9);

      var _internalWrapHelper = __webpack_require__(42);

      var _internalProtoAccess = __webpack_require__(32);

      function checkRevision(compilerInfo) {
        var compilerRevision = compilerInfo && compilerInfo[0] || 1,
            currentRevision = _base.COMPILER_REVISION;

        if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
          return;
        }

        if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
          var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
              compilerVersions = _base.REVISION_CHANGES[compilerRevision];
          throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
        } else {
          // Use the embedded version info since the runtime doesn't know about this revision yet
          throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
        }
      }

      function template(templateSpec, env) {
        /* istanbul ignore next */
        if (!env) {
          throw new _exception2['default']('No environment passed to template');
        }

        if (!templateSpec || !templateSpec.main) {
          throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
        }

        templateSpec.main.decorator = templateSpec.main_d; // Note: Using env.VM references rather than local var references throughout this section to allow
        // for external users to override these as pseudo-supported APIs.

        env.VM.checkRevision(templateSpec.compiler); // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)

        var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

        function invokePartialWrapper(partial, context, options) {
          if (options.hash) {
            context = Utils.extend({}, context, options.hash);

            if (options.ids) {
              options.ids[0] = true;
            }
          }

          partial = env.VM.resolvePartial.call(this, partial, context, options);
          var extendedOptions = Utils.extend({}, options, {
            hooks: this.hooks,
            protoAccessControl: this.protoAccessControl
          });
          var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);

          if (result == null && env.compile) {
            options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
            result = options.partials[options.name](context, extendedOptions);
          }

          if (result != null) {
            if (options.indent) {
              var lines = result.split('\n');

              for (var i = 0, l = lines.length; i < l; i++) {
                if (!lines[i] && i + 1 === l) {
                  break;
                }

                lines[i] = options.indent + lines[i];
              }

              result = lines.join('\n');
            }

            return result;
          } else {
            throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
          }
        } // Just add water


        var container = {
          strict: function strict(obj, name, loc) {
            if (!obj || !(name in obj)) {
              throw new _exception2['default']('"' + name + '" not defined in ' + obj, {
                loc: loc
              });
            }

            return container.lookupProperty(obj, name);
          },
          lookupProperty: function lookupProperty(parent, propertyName) {
            var result = parent[propertyName];

            if (result == null) {
              return result;
            }

            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return result;
            }

            if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
              return result;
            }

            return undefined;
          },
          lookup: function lookup(depths, name) {
            var len = depths.length;

            for (var i = 0; i < len; i++) {
              var result = depths[i] && container.lookupProperty(depths[i], name);

              if (result != null) {
                return depths[i][name];
              }
            }
          },
          lambda: function lambda(current, context) {
            return typeof current === 'function' ? current.call(context) : current;
          },
          escapeExpression: Utils.escapeExpression,
          invokePartial: invokePartialWrapper,
          fn: function fn(i) {
            var ret = templateSpec[i];
            ret.decorator = templateSpec[i + '_d'];
            return ret;
          },
          programs: [],
          program: function program(i, data, declaredBlockParams, blockParams, depths) {
            var programWrapper = this.programs[i],
                fn = this.fn(i);

            if (data || depths || blockParams || declaredBlockParams) {
              programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
            } else if (!programWrapper) {
              programWrapper = this.programs[i] = wrapProgram(this, i, fn);
            }

            return programWrapper;
          },
          data: function data(value, depth) {
            while (value && depth--) {
              value = value._parent;
            }

            return value;
          },
          mergeIfNeeded: function mergeIfNeeded(param, common) {
            var obj = param || common;

            if (param && common && param !== common) {
              obj = Utils.extend({}, common, param);
            }

            return obj;
          },
          // An empty object to use as replacement for null-contexts
          nullContext: _Object$seal({}),
          noop: env.VM.noop,
          compilerInfo: templateSpec.compiler
        };

        function ret(context) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          var data = options.data;

          ret._setup(options);

          if (!options.partial && templateSpec.useData) {
            data = initData(context, data);
          }

          var depths = undefined,
              blockParams = templateSpec.useBlockParams ? [] : undefined;

          if (templateSpec.useDepths) {
            if (options.depths) {
              depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
            } else {
              depths = [context];
            }
          }

          function main(context
          /*, options*/
          ) {
            return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
          }

          main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
          return main(context, options);
        }

        ret.isTop = true;

        ret._setup = function (options) {
          if (!options.partial) {
            var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
            wrapHelpersToPassLookupProperty(mergedHelpers, container);
            container.helpers = mergedHelpers;

            if (templateSpec.usePartial) {
              // Use mergeIfNeeded here to prevent compiling global partials multiple times
              container.partials = container.mergeIfNeeded(options.partials, env.partials);
            }

            if (templateSpec.usePartial || templateSpec.useDecorators) {
              container.decorators = Utils.extend({}, env.decorators, options.decorators);
            }

            container.hooks = {};
            container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
            var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;

            _helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);

            _helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
          } else {
            container.protoAccessControl = options.protoAccessControl; // internal option

            container.helpers = options.helpers;
            container.partials = options.partials;
            container.decorators = options.decorators;
            container.hooks = options.hooks;
          }
        };

        ret._child = function (i, data, blockParams, depths) {
          if (templateSpec.useBlockParams && !blockParams) {
            throw new _exception2['default']('must pass block params');
          }

          if (templateSpec.useDepths && !depths) {
            throw new _exception2['default']('must pass parent depths');
          }

          return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
        };

        return ret;
      }

      function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
        function prog(context) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          var currentDepths = depths;

          if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
            currentDepths = [context].concat(depths);
          }

          return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
        }

        prog = executeDecorators(fn, prog, container, depths, data, blockParams);
        prog.program = i;
        prog.depth = depths ? depths.length : 0;
        prog.blockParams = declaredBlockParams || 0;
        return prog;
      }
      /**
       * This is currently part of the official API, therefore implementation details should not be changed.
       */


      function resolvePartial(partial, context, options) {
        if (!partial) {
          if (options.name === '@partial-block') {
            partial = options.data['partial-block'];
          } else {
            partial = options.partials[options.name];
          }
        } else if (!partial.call && !options.name) {
          // This is a dynamic partial that returned a string
          options.name = partial;
          partial = options.partials[partial];
        }

        return partial;
      }

      function invokePartial(partial, context, options) {
        // Use the current closure context to save the partial-block if this partial
        var currentPartialBlock = options.data && options.data['partial-block'];
        options.partial = true;

        if (options.ids) {
          options.data.contextPath = options.ids[0] || options.data.contextPath;
        }

        var partialBlock = undefined;

        if (options.fn && options.fn !== noop) {
          (function () {
            options.data = _base.createFrame(options.data); // Wrapper function to get access to currentPartialBlock from the closure

            var fn = options.fn;

            partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
              var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1]; // Restore the partial-block from the closure for the execution of the block
              // i.e. the part inside the block of the partial call.

              options.data = _base.createFrame(options.data);
              options.data['partial-block'] = currentPartialBlock;
              return fn(context, options);
            };

            if (fn.partials) {
              options.partials = Utils.extend({}, options.partials, fn.partials);
            }
          })();
        }

        if (partial === undefined && partialBlock) {
          partial = partialBlock;
        }

        if (partial === undefined) {
          throw new _exception2['default']('The partial ' + options.name + ' could not be found');
        } else if (partial instanceof Function) {
          return partial(context, options);
        }
      }

      function noop() {
        return '';
      }

      function initData(context, data) {
        if (!data || !('root' in data)) {
          data = data ? _base.createFrame(data) : {};
          data.root = context;
        }

        return data;
      }

      function executeDecorators(fn, prog, container, depths, data, blockParams) {
        if (fn.decorator) {
          var props = {};
          prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
          Utils.extend(prog, props);
        }

        return prog;
      }

      function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
        _Object$keys(mergedHelpers).forEach(function (helperName) {
          var helper = mergedHelpers[helperName];
          mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
        });
      }

      function passLookupPropertyOption(helper, container) {
        var lookupProperty = container.lookupProperty;
        return _internalWrapHelper.wrapHelper(helper, function (options) {
          return Utils.extend({
            lookupProperty: lookupProperty
          }, options);
        });
      }
      /***/

    },
    /* 38 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(39),
        __esModule: true
      };
      /***/
    },
    /* 39 */

    /***/
    function (module, exports, __webpack_require__) {
      __webpack_require__(40);

      module.exports = __webpack_require__(20).Object.seal;
      /***/
    },
    /* 40 */

    /***/
    function (module, exports, __webpack_require__) {
      // 19.1.2.17 Object.seal(O)
      var isObject = __webpack_require__(41);

      __webpack_require__(17)('seal', function ($seal) {
        return function seal(it) {
          return $seal && isObject(it) ? $seal(it) : it;
        };
      });
      /***/

    },
    /* 41 */

    /***/
    function (module, exports) {
      module.exports = function (it) {
        return typeof it === 'object' ? it !== null : typeof it === 'function';
      };
      /***/

    },
    /* 42 */

    /***/
    function (module, exports) {
      'use strict';

      exports.__esModule = true;
      exports.wrapHelper = wrapHelper;

      function wrapHelper(helper, transformOptionsFn) {
        if (typeof helper !== 'function') {
          // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
          // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
          return helper;
        }

        var wrapper = function wrapper()
        /* dynamic arguments */
        {
          var options = arguments[arguments.length - 1];
          arguments[arguments.length - 1] = transformOptionsFn(options);
          return helper.apply(this, arguments);
        };

        return wrapper;
      }
      /***/

    },
    /* 43 */

    /***/
    function (module, exports) {
      /* WEBPACK VAR INJECTION */
      (function (global) {
        'use strict';

        exports.__esModule = true;

        exports['default'] = function (Handlebars) {
          /* istanbul ignore next */
          var root = typeof global !== 'undefined' ? global : window,
              $Handlebars = root.Handlebars;
          /* istanbul ignore next */

          Handlebars.noConflict = function () {
            if (root.Handlebars === Handlebars) {
              root.Handlebars = $Handlebars;
            }

            return Handlebars;
          };
        };

        module.exports = exports['default'];
        /* WEBPACK VAR INJECTION */
      }).call(exports, function () {
        return this;
      }());
      /***/
    }
    /******/
    ])
  );
});

;
},{}],"../src/pages/Login/Login.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        helper,
        alias1 = container.lambda,
        alias2 = container.escapeExpression,
        alias3 = depth0 != null ? depth0 : container.nullContext || {},
        alias4 = container.hooks.helperMissing,
        alias5 = "function",
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "main") : stack1, depth0)) + ">\r\n    <div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "conteiner") : stack1, depth0)) + ">\r\n        <section class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "info") : stack1, depth0)) + ">\r\n            <h1>Sign in to</h1>\r\n            <h2>Satan not anonymous messenger</h2>\r\n            <p class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "description") : stack1, depth0)) + ">\r\n                If you don’t have an account register\r\n                You can <a href=\"/register\">Register</a> !\r\n            </p>\r\n        </section>\r\n        <form class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "form") : stack1, depth0)) + ">\r\n            <h2>Sign in</h2>\r\n            " + ((stack1 = (helper = (helper = lookupProperty(helpers, "EmailField") || (depth0 != null ? lookupProperty(depth0, "EmailField") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "EmailField",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 13,
          "column": 12
        },
        "end": {
          "line": 13,
          "column": 28
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n            " + ((stack1 = (helper = (helper = lookupProperty(helpers, "PasswordField") || (depth0 != null ? lookupProperty(depth0, "PasswordField") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "PasswordField",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 14,
          "column": 12
        },
        "end": {
          "line": 14,
          "column": 31
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n            " + ((stack1 = (helper = (helper = lookupProperty(helpers, "Button") || (depth0 != null ? lookupProperty(depth0, "Button") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "Button",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 15,
          "column": 12
        },
        "end": {
          "line": 15,
          "column": 24
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n        </form>\r\n    </div>\r\n</div>\r\n";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/pages/Login/Login.module.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "main": "src-pages-Login-__Login-module__main__aFwfW",
  "info": "src-pages-Login-__Login-module__info__1IWzI",
  "conteiner": "src-pages-Login-__Login-module__conteiner__1pFiq",
  "description": "src-pages-Login-__Login-module__description__2DmT6",
  "form": "src-pages-Login-__Login-module__form__mEHCT",
  "text-field": "src-pages-Login-__Login-module__text-field__2ABQg"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/uuid/dist/esm-browser/rng.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);

function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
},{}],"../node_modules/uuid/dist/esm-browser/regex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports.default = _default;
},{}],"../node_modules/uuid/dist/esm-browser/validate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regex = _interopRequireDefault(require("./regex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports.default = _default;
},{"./regex.js":"../node_modules/uuid/dist/esm-browser/regex.js"}],"../node_modules/uuid/dist/esm-browser/stringify.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports.default = _default;
},{"./validate.js":"../node_modules/uuid/dist/esm-browser/validate.js"}],"../node_modules/uuid/dist/esm-browser/v1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports.default = _default;
},{"./rng.js":"../node_modules/uuid/dist/esm-browser/rng.js","./stringify.js":"../node_modules/uuid/dist/esm-browser/stringify.js"}],"../node_modules/uuid/dist/esm-browser/parse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports.default = _default;
},{"./validate.js":"../node_modules/uuid/dist/esm-browser/validate.js"}],"../node_modules/uuid/dist/esm-browser/v35.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URL = exports.DNS = void 0;
exports.default = _default;

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
},{"./stringify.js":"../node_modules/uuid/dist/esm-browser/stringify.js","./parse.js":"../node_modules/uuid/dist/esm-browser/parse.js"}],"../node_modules/uuid/dist/esm-browser/md5.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports.default = _default;
},{}],"../node_modules/uuid/dist/esm-browser/v3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _md = _interopRequireDefault(require("./md5.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports.default = _default;
},{"./v35.js":"../node_modules/uuid/dist/esm-browser/v35.js","./md5.js":"../node_modules/uuid/dist/esm-browser/md5.js"}],"../node_modules/uuid/dist/esm-browser/v4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  var rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports.default = _default;
},{"./rng.js":"../node_modules/uuid/dist/esm-browser/rng.js","./stringify.js":"../node_modules/uuid/dist/esm-browser/stringify.js"}],"../node_modules/uuid/dist/esm-browser/sha1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports.default = _default;
},{}],"../node_modules/uuid/dist/esm-browser/v5.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _sha = _interopRequireDefault(require("./sha1.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports.default = _default;
},{"./v35.js":"../node_modules/uuid/dist/esm-browser/v35.js","./sha1.js":"../node_modules/uuid/dist/esm-browser/sha1.js"}],"../node_modules/uuid/dist/esm-browser/nil.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports.default = _default;
},{}],"../node_modules/uuid/dist/esm-browser/version.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports.default = _default;
},{"./validate.js":"../node_modules/uuid/dist/esm-browser/validate.js"}],"../node_modules/uuid/dist/esm-browser/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NIL", {
  enumerable: true,
  get: function () {
    return _nil.default;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _parse.default;
  }
});
Object.defineProperty(exports, "stringify", {
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
});
Object.defineProperty(exports, "v1", {
  enumerable: true,
  get: function () {
    return _v.default;
  }
});
Object.defineProperty(exports, "v3", {
  enumerable: true,
  get: function () {
    return _v2.default;
  }
});
Object.defineProperty(exports, "v4", {
  enumerable: true,
  get: function () {
    return _v3.default;
  }
});
Object.defineProperty(exports, "v5", {
  enumerable: true,
  get: function () {
    return _v4.default;
  }
});
Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function () {
    return _validate.default;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _version.default;
  }
});

var _v = _interopRequireDefault(require("./v1.js"));

var _v2 = _interopRequireDefault(require("./v3.js"));

var _v3 = _interopRequireDefault(require("./v4.js"));

var _v4 = _interopRequireDefault(require("./v5.js"));

var _nil = _interopRequireDefault(require("./nil.js"));

var _version = _interopRequireDefault(require("./version.js"));

var _validate = _interopRequireDefault(require("./validate.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./v1.js":"../node_modules/uuid/dist/esm-browser/v1.js","./v3.js":"../node_modules/uuid/dist/esm-browser/v3.js","./v4.js":"../node_modules/uuid/dist/esm-browser/v4.js","./v5.js":"../node_modules/uuid/dist/esm-browser/v5.js","./nil.js":"../node_modules/uuid/dist/esm-browser/nil.js","./version.js":"../node_modules/uuid/dist/esm-browser/version.js","./validate.js":"../node_modules/uuid/dist/esm-browser/validate.js","./stringify.js":"../node_modules/uuid/dist/esm-browser/stringify.js","./parse.js":"../node_modules/uuid/dist/esm-browser/parse.js"}],"../src/utils/event-bus.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventBus = void 0;

var EventBus = /*#__PURE__*/function () {
  function EventBus() {
    _classCallCheck(this, EventBus);

    this.listeners = {};
  }

  _createClass(EventBus, [{
    key: "on",
    value: function on(event, callback) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }

      this.listeners[event].push(callback);
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      if (!this.listeners[event]) {
        throw new Error("\u041D\u0435\u0442 \u0441\u043E\u0431\u044B\u0442\u0438\u044F: ".concat(event));
      }

      this.listeners[event] = this.listeners[event].filter(function (listener) {
        return listener !== callback;
      });
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!this.listeners[event]) {
        throw new Error("\u041D\u0435\u0442 \u0441\u043E\u0431\u044B\u0442\u0438\u044F: ".concat(event));
      }

      this.listeners[event].forEach(function (listener) {
        listener.apply(void 0, args);
      });
    }
  }]);

  return EventBus;
}();

exports.EventBus = EventBus;
},{}],"../src/utils/base-block.ts":[function(require,module,exports) {
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseBlock = void 0;

var uuid_1 = require("uuid");

var event_bus_1 = require("./event-bus");

var BaseBlock = /*#__PURE__*/function () {
  function BaseBlock(props) {
    var _this = this;

    var tagName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';

    _classCallCheck(this, BaseBlock);

    this._element = null;
    this._meta = null;
    this._events = {};
    this.eventBus = null;
    this.id = '';

    this.setProps = function (nextProps) {
      if (!nextProps) {
        return;
      }

      _this.props = Object.assign(_this.props, nextProps);

      _this._makePropsProxy(_this.props);

      _this._render();

      _this.eventBus().emit(BaseBlock.EVENTS.FLOW_CDU);
    };

    var eventBus = new event_bus_1.EventBus();
    this._meta = {
      tagName: tagName,
      props: props
    };
    this.props = this._makePropsProxy(props);
    this.id = (0, uuid_1.v4)();

    this.eventBus = function () {
      return eventBus;
    };

    this._element = this._createDocumentElement(tagName);

    this._registerEvents(eventBus);

    eventBus.emit(BaseBlock.EVENTS.INIT);
  }

  _createClass(BaseBlock, [{
    key: "_registerEvents",
    value: function _registerEvents(eventBus) {
      eventBus.on(BaseBlock.EVENTS.INIT, this.init.bind(this));
      eventBus.on(BaseBlock.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(BaseBlock.EVENTS.FLOW_RENDER, this._render.bind(this));
      eventBus.on(BaseBlock.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(BaseBlock.EVENTS.FLOW_CAR, this._componentAfterRender.bind(this));
    }
  }, {
    key: "_componentAfterRender",
    value: function _componentAfterRender() {
      this.componentAfterRender();
    }
  }, {
    key: "componentAfterRender",
    value: function componentAfterRender() {}
  }, {
    key: "_createResources",
    value: function _createResources() {
      var tagName = this._meta.tagName;
      this._element = this._createDocumentElement(tagName);
    }
  }, {
    key: "init",
    value: function init() {
      this._createResources();

      this.eventBus().emit(BaseBlock.EVENTS.FLOW_RENDER);
    }
  }, {
    key: "_componentDidMount",
    value: function _componentDidMount() {
      this.componentDidMount();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "dispatchComponentDidMount",
    value: function dispatchComponentDidMount() {
      this.eventBus().emit(BaseBlock.EVENTS.FLOW_CDM);
    }
  }, {
    key: "_componentDidUpdate",
    value: function _componentDidUpdate(oldProps, newProps) {
      var response = this.componentDidUpdate(oldProps, newProps);
      return response;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps, newProps) {}
  }, {
    key: "_addEvents",
    value: function _addEvents() {
      var _this$props$events = this.props.events,
          events = _this$props$events === void 0 ? {} : _this$props$events;
      this._events = events;
      var element = this._element;
      Object.entries(events).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            callback = _ref2[1];

        if (name == 'click') {
          window.selectedEement = element;
        }

        element === null || element === void 0 ? void 0 : element.addEventListener(name, callback);
      });
    }
  }, {
    key: "_removeEvents",
    value: function _removeEvents() {
      var _this2 = this;

      if (this._events) {
        Object.keys(this._events).forEach(function (eventName) {
          var _a;

          (_a = _this2._element) === null || _a === void 0 ? void 0 : _a.removeEventListener(eventName, _this2._events[eventName]);
        });
        this._events = {};
      }
    }
  }, {
    key: "compile",
    value: function compile(template, props) {
      var _a = props,
          _a$components = _a.components,
          components = _a$components === void 0 ? {} : _a$components,
          restProps = __rest(_a, ["components"]);

      var propsWithCompile = Object.assign({}, restProps);
      Object.entries(components).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            componentName = _ref4[0],
            component = _ref4[1];

        var _a, _b;

        if (Array.isArray(component)) {
          propsWithCompile[componentName] = [];
          component.forEach(function (item) {
            var _a;

            propsWithCompile[componentName].push((_a = item === null || item === void 0 ? void 0 : item.element) === null || _a === void 0 ? void 0 : _a.outerHTML);
          });
        } else {
          (_a = component.element) === null || _a === void 0 ? void 0 : _a.setAttribute('data-id', component.id);
          propsWithCompile[componentName] = (_b = component === null || component === void 0 ? void 0 : component.element) === null || _b === void 0 ? void 0 : _b.outerHTML;
        }
      });

      var fragment = this._createDocumentElement('template');

      fragment.innerHTML = template(Object.assign(Object.assign({}, this.props), propsWithCompile));
      Object.entries(components).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            componentName = _ref6[0],
            component = _ref6[1];

        if (Array.isArray(component)) {
          component.forEach(function (item) {
            var _a;

            propsWithCompile[componentName].push((_a = item === null || item === void 0 ? void 0 : item.element) === null || _a === void 0 ? void 0 : _a.outerHTML);
          });
        } else {
          var target = fragment.content.querySelector("[data-id=\"".concat(component.id, "\"]"));
          target === null || target === void 0 ? void 0 : target.replaceWith(component.getContent());
          component.dispatchComponentDidMount();
        }
      });
      return fragment.content;
    }
  }, {
    key: "element",
    get: function get() {
      return this._element;
    }
  }, {
    key: "_render",
    value: function _render() {
      var block = this.render();
      var newElement = block.firstChild;

      this._removeEvents();

      if (this._element) {
        this._element.innerHTML = '';

        this._element.replaceWith(newElement);

        this._element = newElement;

        this._addEvents();
      }

      this.eventBus().emit(BaseBlock.EVENTS.FLOW_CAR);
    }
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "getContent",
    value: function getContent() {
      return this.element;
    }
  }, {
    key: "_makePropsProxy",
    value: function _makePropsProxy(props) {
      var _this3 = this;

      props = new Proxy(props, {
        set: function set(target, propName, value) {
          if (target[propName] !== value) {
            target[propName] = value;

            _this3.eventBus().emit(BaseBlock.EVENTS.FLOW_CDU);
          }

          return true;
        }
      });
      return props;
    }
  }, {
    key: "_createDocumentElement",
    value: function _createDocumentElement(tagName) {
      return document.createElement(tagName);
    }
  }, {
    key: "show",
    value: function show() {
      this.getContent().style.display = 'block';
    }
  }, {
    key: "hide",
    value: function hide() {
      this.getContent().style.display = 'none';
    }
  }]);

  return BaseBlock;
}();

exports.BaseBlock = BaseBlock;
BaseBlock.EVENTS = {
  INIT: 'init',
  FLOW_CDM: 'flow:component-did-mount',
  FLOW_CDU: 'flow:component-did-update',
  FLOW_RENDER: 'flow:render',
  FLOW_CAR: 'flow: component-after-render'
};
},{"uuid":"../node_modules/uuid/dist/esm-browser/index.js","./event-bus":"../src/utils/event-bus.ts"}],"img/no_avatar.jpg":[function(require,module,exports) {
module.exports = "/no_avatar.2d9919a2.jpg";
},{}],"../src/componets/Avatar/Avatar.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=" + alias4((helper = (helper = lookupProperty(helpers, "className") || (depth0 != null ? lookupProperty(depth0, "className") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "className",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 11
        },
        "end": {
          "line": 1,
          "column": 24
        }
      }
    }) : helper)) + ">\r\n    <img alt=\"avatar\" src=\"" + alias4((helper = (helper = lookupProperty(helpers, "avatar") || (depth0 != null ? lookupProperty(depth0, "avatar") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "avatar",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 2,
          "column": 27
        },
        "end": {
          "line": 2,
          "column": 37
        }
      }
    }) : helper)) + "\" class=" + alias4((helper = (helper = lookupProperty(helpers, "className") || (depth0 != null ? lookupProperty(depth0, "className") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "className",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 2,
          "column": 45
        },
        "end": {
          "line": 2,
          "column": 58
        }
      }
    }) : helper)) + " />\r\n</div>\r\n";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/componets/Avatar/Avatar.module.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "avatar": "src-componets-Avatar-__Avatar-module__avatar__3ztDY"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/utils/classnames.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }

  return rest.join(' ');
};
},{}],"../src/utils/fetch.ts":[function(require,module,exports) {
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.Fetch = exports.HTTPMethods = void 0;
var HTTPMethods;

(function (HTTPMethods) {
  HTTPMethods["GET"] = "GET";
  HTTPMethods["PUT"] = "PUT";
  HTTPMethods["POST"] = "POST";
  HTTPMethods["DELETE"] = "DELETE";
})(HTTPMethods = exports.HTTPMethods || (exports.HTTPMethods = {}));

var Fetch = /*#__PURE__*/function () {
  function Fetch() {
    _classCallCheck(this, Fetch);

    this.resourceUrl = "http://ya-praktikum.tech/api/v2/resources";
    this.baseUrl = "https://ya-praktikum.tech/api/v2";
  }

  _createClass(Fetch, [{
    key: "get",
    value: function get() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.baseUrl;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var queryString = this.getQueryString(options.data);
      return this.sendRequest("".concat(this.baseUrl).concat(url).concat(queryString), {
        method: HTTPMethods.GET
      });
    }
  }, {
    key: "post",
    value: function post(path, options) {
      return this.sendRequest("".concat(this.baseUrl).concat(path), {
        method: HTTPMethods.POST,
        data: options.data
      });
    }
  }, {
    key: "put",
    value: function put() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.baseUrl;
      var options = arguments.length > 1 ? arguments[1] : undefined;
      return this.sendRequest("".concat(this.baseUrl).concat(path), Object.assign({
        method: HTTPMethods.PUT
      }, options));
    }
  }, {
    key: "delete",
    value: function _delete() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.baseUrl;
      var options = arguments.length > 1 ? arguments[1] : undefined;
      return this.sendRequest("".concat(this.baseUrl).concat(path), {
        method: HTTPMethods.DELETE,
        data: options.data
      });
    }
  }, {
    key: "sendRequest",
    value: function sendRequest(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        method: HTTPMethods.GET
      };
      var method = options.method,
          data = options.data,
          headers = options.headers,
          file = options.file,
          _options$withCredenti = options.withCredentials,
          withCredentials = _options$withCredenti === void 0 ? true : _options$withCredenti;
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.onload = function () {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        };

        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;

        if (!file) {
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        }

        if (headers) {
          Object.entries(headers).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            return xhr.setRequestHeader(key, value);
          });
        }

        xhr.withCredentials = withCredentials;
        xhr.responseType = 'json';

        if (method === HTTPMethods.GET || !data) {
          xhr.send();
        } else {
          console.log('data', data);
          xhr.send(Boolean(file) ? data : JSON.stringify(data));
        }
      });
    }
  }, {
    key: "getQueryString",
    value: function getQueryString() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var result = Object.keys(options).reduce(function (total, key) {
        return total !== '' ? "".concat(total, "&").concat(options[key]) : options[key];
      }, '');
      console.log('result', result ? "?".concat(result) : '');
      return result ? "?".concat(result) : '';
    }
  }]);

  return Fetch;
}();

exports.Fetch = Fetch;
exports.fetch = new Fetch();
},{}],"../src/componets/Avatar/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = void 0;

var no_avatar_jpg_1 = __importDefault(require("../../../static/img/no_avatar.jpg"));

var Avatar_hbs_1 = __importDefault(require("./Avatar.hbs"));

var styles = __importStar(require("./Avatar.module.css"));

var classnames_1 = __importDefault(require("../../utils/classnames"));

var base_block_1 = require("../../utils/base-block");

var fetch_1 = require("../../utils/fetch");

var Avatar = /*#__PURE__*/function (_base_block_1$BaseBlo) {
  _inherits(Avatar, _base_block_1$BaseBlo);

  var _super = _createSuper(Avatar);

  function Avatar() {
    _classCallCheck(this, Avatar);

    return _super.apply(this, arguments);
  }

  _createClass(Avatar, [{
    key: "render",
    value: function render() {
      var _a;

      var className = (0, classnames_1.default)(styles.avatar, (_a = this.props) === null || _a === void 0 ? void 0 : _a.className);
      var avatar = this.props.avatar ? fetch_1.fetch.resourceUrl + this.props.avatar : no_avatar_jpg_1.default;
      return this.compile(Avatar_hbs_1.default, Object.assign(Object.assign({}, this.props), {
        className: className,
        avatar: avatar
      }));
    }
  }]);

  return Avatar;
}(base_block_1.BaseBlock);

exports.Avatar = Avatar;
},{"../../../static/img/no_avatar.jpg":"img/no_avatar.jpg","./Avatar.hbs":"../src/componets/Avatar/Avatar.hbs","./Avatar.module.css":"../src/componets/Avatar/Avatar.module.css","../../utils/classnames":"../src/utils/classnames.ts","../../utils/base-block":"../src/utils/base-block.ts","../../utils/fetch":"../src/utils/fetch.ts"}],"../src/componets/Button/Button.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<button class=" + alias4((helper = (helper = lookupProperty(helpers, "className") || (depth0 != null ? lookupProperty(depth0, "className") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "className",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 14
        },
        "end": {
          "line": 1,
          "column": 27
        }
      }
    }) : helper)) + " type=\"submit\">" + alias4((helper = (helper = lookupProperty(helpers, "title") || (depth0 != null ? lookupProperty(depth0, "title") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "title",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 42
        },
        "end": {
          "line": 1,
          "column": 51
        }
      }
    }) : helper)) + "</button>\r\n";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/styles/main.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/componets/Button/Button.module.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "button": "src-componets-Button-__Button-module__button__2N7tr"
};
},{"../../styles/main.css":"../src/styles/main.css","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/componets/Button/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var Button_hbs_1 = __importDefault(require("./Button.hbs"));

var styles = __importStar(require("./Button.module.css"));

var classnames_1 = __importDefault(require("../../utils/classnames"));

var base_block_1 = require("../../utils/base-block");

var Button = /*#__PURE__*/function (_base_block_1$BaseBlo) {
  _inherits(Button, _base_block_1$BaseBlo);

  var _super = _createSuper(Button);

  function Button() {
    _classCallCheck(this, Button);

    return _super.apply(this, arguments);
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      var _a;

      var className = (0, classnames_1.default)(styles.button, (_a = this.props) === null || _a === void 0 ? void 0 : _a.className);
      return this.compile(Button_hbs_1.default, Object.assign(Object.assign({
        title: ''
      }, this.props), {
        className: className
      }));
    }
  }]);

  return Button;
}(base_block_1.BaseBlock);

exports.Button = Button;
},{"./Button.hbs":"../src/componets/Button/Button.hbs","./Button.module.css":"../src/componets/Button/Button.module.css","../../utils/classnames":"../src/utils/classnames.ts","../../utils/base-block":"../src/utils/base-block.ts"}],"../src/componets/Input/Input.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<input\r\n    class=\"" + alias4((helper = (helper = lookupProperty(helpers, "className") || (depth0 != null ? lookupProperty(depth0, "className") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "className",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 2,
          "column": 11
        },
        "end": {
          "line": 2,
          "column": 24
        }
      }
    }) : helper)) + "\"\r\n    placeholder=\"" + alias4((helper = (helper = lookupProperty(helpers, "placeholder") || (depth0 != null ? lookupProperty(depth0, "placeholder") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "placeholder",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 3,
          "column": 17
        },
        "end": {
          "line": 3,
          "column": 32
        }
      }
    }) : helper)) + "\"\r\n    type=" + alias4((helper = (helper = lookupProperty(helpers, "type") || (depth0 != null ? lookupProperty(depth0, "type") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "type",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 4,
          "column": 9
        },
        "end": {
          "line": 4,
          "column": 17
        }
      }
    }) : helper)) + "\r\n    name=" + alias4((helper = (helper = lookupProperty(helpers, "name") || (depth0 != null ? lookupProperty(depth0, "name") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "name",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 5,
          "column": 9
        },
        "end": {
          "line": 5,
          "column": 17
        }
      }
    }) : helper)) + "\r\n    value=" + alias4((helper = (helper = lookupProperty(helpers, "value") || (depth0 != null ? lookupProperty(depth0, "value") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "value",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 6,
          "column": 10
        },
        "end": {
          "line": 6,
          "column": 19
        }
      }
    }) : helper)) + "\r\n>\r\n";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/componets/Input/Input.module.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "input": "src-componets-Input-__Input-module__input__3Vocx"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/utils/validators.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageValidator = exports.phoneValidator = exports.passwordValidator = exports.emailValidator = exports.loginValidator = exports.nameValidator = exports.createError = void 0;
var errorLabelClass = 'error-label';

var createError = function createError(target, validMessage) {
  if (validMessage) {
    target.classList.add('invalid');

    if (target.nextElementSibling === null || target.nextElementSibling.className !== errorLabelClass) {
      var element = createErrorElement(validMessage);
      target.after(element);
    }
  }

  if (target.nextElementSibling !== null && target.nextElementSibling.className === errorLabelClass && !validMessage) {
    target.classList.remove('invalid');
    target.nextElementSibling.remove();
  }
};

exports.createError = createError;

var createErrorElement = function createErrorElement(message) {
  var errorElement = document.createElement('div');
  errorElement.classList.add(errorLabelClass);
  errorElement.textContent = message;
  return errorElement;
};

var nameValidator = function nameValidator(str) {
  var regex = /^[A-ZА-Я][A-Za-zА-Яа-я\\-]+$/;
  return regex.test(str) ? null : 'Некорректное имя';
};

exports.nameValidator = nameValidator;

var loginValidator = function loginValidator(str) {
  var regex = /^(?=[\S]+)(?=.*[^0-9 ].*)[a-zA-Z0-9_-]{3,20}$/;
  return regex.test(str) ? null : 'Некорректный логин';
};

exports.loginValidator = loginValidator;

var emailValidator = function emailValidator(str) {
  var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(str) ? null : 'Некорректный адрес электронной почты';
};

exports.emailValidator = emailValidator;

var passwordValidator = function passwordValidator(str) {
  var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}$/;
  return regex.test(str) ? null : 'Введеный пароль не удовлетворяет требованиям';
};

exports.passwordValidator = passwordValidator;

var phoneValidator = function phoneValidator(str) {
  var regex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{2})[-. ]*(\d{2})(?: *x(\d+))?\s*$/;
  return regex.test(str) ? null : 'Некорректный номер телефона';
};

exports.phoneValidator = phoneValidator;

var messageValidator = function messageValidator(str) {
  return str.length > 0 ? null : 'Некорректный текст';
};

exports.messageValidator = messageValidator;
},{}],"../src/componets/Input/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailField = exports.PasswordField = exports.TextField = exports.Input = void 0;

var Input_hbs_1 = __importDefault(require("./Input.hbs"));

var styles = __importStar(require("./Input.module.css"));

var classnames_1 = __importDefault(require("../../utils/classnames"));

var base_block_1 = require("../../utils/base-block");

var validators_1 = require("../../utils/validators");

var Input = /*#__PURE__*/function (_base_block_1$BaseBlo) {
  _inherits(Input, _base_block_1$BaseBlo);

  var _super = _createSuper(Input);

  function Input(props) {
    var _this;

    var validators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Input);

    _this = _super.call(this, props);
    _this.validators = [];
    _this.validators = validators;
    return _this;
  }

  _createClass(Input, [{
    key: "render",
    value: function render() {
      var _a;

      var className = (0, classnames_1.default)(styles.input, (_a = this.props) === null || _a === void 0 ? void 0 : _a.className);
      return this.compile(Input_hbs_1.default, Object.assign(Object.assign({
        placeholder: '',
        value: '',
        type: 'text'
      }, this.props), {
        className: className
      }));
    }
  }, {
    key: "componentAfterRender",
    value: function componentAfterRender() {
      var _this2 = this;

      var _a, _b;

      (_a = this.element) === null || _a === void 0 ? void 0 : _a.addEventListener('focus', function () {
        return _this2.validateInput();
      });
      (_b = this.element) === null || _b === void 0 ? void 0 : _b.addEventListener('blur', function () {
        return _this2.validateInput();
      });
    }
  }, {
    key: "validateInput",
    value: function validateInput() {
      var _this3 = this;

      var value = this.element.value;
      this.validators.forEach(function (callback) {
        var error = callback(value);
        (0, validators_1.createError)(_this3.element, error);
      });
    }
  }]);

  return Input;
}(base_block_1.BaseBlock);

exports.Input = Input;

var TextField = /*#__PURE__*/function (_Input) {
  _inherits(TextField, _Input);

  var _super2 = _createSuper(TextField);

  function TextField() {
    _classCallCheck(this, TextField);

    return _super2.apply(this, arguments);
  }

  _createClass(TextField, [{
    key: "render",
    value: function render() {
      var _a;

      var className = (0, classnames_1.default)(styles.input, (_a = this.props) === null || _a === void 0 ? void 0 : _a.className);
      return this.compile(Input_hbs_1.default, Object.assign(Object.assign({
        placeholder: '',
        value: ''
      }, this.props), {
        type: 'text',
        className: className
      }));
    }
  }]);

  return TextField;
}(Input);

exports.TextField = TextField;

var PasswordField = /*#__PURE__*/function (_TextField) {
  _inherits(PasswordField, _TextField);

  var _super3 = _createSuper(PasswordField);

  function PasswordField() {
    _classCallCheck(this, PasswordField);

    return _super3.apply(this, arguments);
  }

  _createClass(PasswordField, [{
    key: "render",
    value: function render() {
      var _a;

      var className = (0, classnames_1.default)(styles.input, (_a = this.props) === null || _a === void 0 ? void 0 : _a.className);
      return this.compile(Input_hbs_1.default, Object.assign(Object.assign({
        placeholder: '',
        value: ''
      }, this.props), {
        type: 'password',
        className: className
      }));
    }
  }]);

  return PasswordField;
}(TextField);

exports.PasswordField = PasswordField;

var EmailField = /*#__PURE__*/function (_TextField2) {
  _inherits(EmailField, _TextField2);

  var _super4 = _createSuper(EmailField);

  function EmailField() {
    _classCallCheck(this, EmailField);

    return _super4.apply(this, arguments);
  }

  _createClass(EmailField, [{
    key: "render",
    value: function render() {
      var _a;

      var className = (0, classnames_1.default)(styles.input, (_a = this.props) === null || _a === void 0 ? void 0 : _a.className);
      return this.compile(Input_hbs_1.default, Object.assign(Object.assign({
        placeholder: '',
        value: ''
      }, this.props), {
        type: 'text',
        className: className
      }));
    }
  }]);

  return EmailField;
}(TextField);

exports.EmailField = EmailField;
},{"./Input.hbs":"../src/componets/Input/Input.hbs","./Input.module.css":"../src/componets/Input/Input.module.css","../../utils/classnames":"../src/utils/classnames.ts","../../utils/base-block":"../src/utils/base-block.ts","../../utils/validators":"../src/utils/validators.ts"}],"../src/componets/Contact/Contact.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "1": function _(container, depth0, helpers, partials, data) {
    var stack1,
        helper,
        alias1 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "        <div class=" + alias1(container.lambda((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "unread") : stack1, depth0)) + ">\r\n            <span>" + alias1((helper = (helper = lookupProperty(helpers, "unreadMessages") || (depth0 != null ? lookupProperty(depth0, "unreadMessages") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
      "name": "unreadMessages",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 11,
          "column": 18
        },
        "end": {
          "line": 11,
          "column": 36
        }
      }
    }) : helper)) + "</span>\r\n        </div>\r\n";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        alias5 = container.lambda,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=\"" + alias4((helper = (helper = lookupProperty(helpers, "className") || (depth0 != null ? lookupProperty(depth0, "className") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "className",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 12
        },
        "end": {
          "line": 1,
          "column": 25
        }
      }
    }) : helper)) + " contact\" data-id=\"" + alias4((helper = (helper = lookupProperty(helpers, "id") || (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "id",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 44
        },
        "end": {
          "line": 1,
          "column": 50
        }
      }
    }) : helper)) + "\">\r\n    <div class=" + alias4(alias5((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "conteiner") : stack1, depth0)) + ">\r\n        " + ((stack1 = (helper = (helper = lookupProperty(helpers, "avatar") || (depth0 != null ? lookupProperty(depth0, "avatar") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "avatar",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 3,
          "column": 8
        },
        "end": {
          "line": 3,
          "column": 20
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n        <div class=" + alias4(alias5((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "center") : stack1, depth0)) + ">\r\n            <span class=" + alias4(alias5((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "user") : stack1, depth0)) + ">" + alias4((helper = (helper = lookupProperty(helpers, "firstName") || (depth0 != null ? lookupProperty(depth0, "firstName") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "firstName",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 5,
          "column": 40
        },
        "end": {
          "line": 5,
          "column": 53
        }
      }
    }) : helper)) + " " + alias4((helper = (helper = lookupProperty(helpers, "lastName") || (depth0 != null ? lookupProperty(depth0, "lastName") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "lastName",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 5,
          "column": 54
        },
        "end": {
          "line": 5,
          "column": 66
        }
      }
    }) : helper)) + "</span>\r\n            <span class=" + alias4(alias5((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "message") : stack1, depth0)) + ">" + alias4((helper = (helper = lookupProperty(helpers, "message") || (depth0 != null ? lookupProperty(depth0, "message") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "message",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 6,
          "column": 43
        },
        "end": {
          "line": 6,
          "column": 54
        }
      }
    }) : helper)) + "</span>\r\n        </div>\r\n    </div>\r\n" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "unreadMessages") : depth0, {
      "name": "if",
      "hash": {},
      "fn": container.program(1, data, 0),
      "inverse": container.noop,
      "data": data,
      "loc": {
        "start": {
          "line": 9,
          "column": 4
        },
        "end": {
          "line": 13,
          "column": 11
        }
      }
    })) != null ? stack1 : "") + "</div>\r\n";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/componets/Contact/Contact.module.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "contact": "src-componets-Contact-__Contact-module__contact__2F4Xo",
  "center": "src-componets-Contact-__Contact-module__center__3zS9L",
  "user": "src-componets-Contact-__Contact-module__user__sW2Tm",
  "message": "src-componets-Contact-__Contact-module__message__2oAmm",
  "conteiner": "src-componets-Contact-__Contact-module__conteiner__2LqIs",
  "end": "src-componets-Contact-__Contact-module__end__EY3ey",
  "unread": "src-componets-Contact-__Contact-module__unread__1ms01"
};
},{"../../styles/main.css":"../src/styles/main.css","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/componets/Contact/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contact = void 0;

var Contact_hbs_1 = __importDefault(require("./Contact.hbs"));

var styles = __importStar(require("./Contact.module.css"));

var classnames_1 = __importDefault(require("../../utils/classnames"));

var base_block_1 = require("../../utils/base-block");

var Avatar_1 = require("../Avatar");

var Contact = /*#__PURE__*/function (_base_block_1$BaseBlo) {
  _inherits(Contact, _base_block_1$BaseBlo);

  var _super = _createSuper(Contact);

  function Contact() {
    _classCallCheck(this, Contact);

    return _super.apply(this, arguments);
  }

  _createClass(Contact, [{
    key: "render",
    value: function render() {
      var _a;

      var className = (0, classnames_1.default)(styles.contact, (_a = this.props) === null || _a === void 0 ? void 0 : _a.className);
      var components = {
        avatar: new Avatar_1.Avatar({
          avatar: this.props.avatar
        })
      };
      return this.compile(Contact_hbs_1.default, Object.assign(Object.assign({}, this.props), {
        className: className,
        components: components,
        styles: styles
      }));
    }
  }, {
    key: "componentAfterRender",
    value: function componentAfterRender() {
      console.log(this.element);
    }
  }]);

  return Contact;
}(base_block_1.BaseBlock);

exports.Contact = Contact;
},{"./Contact.hbs":"../src/componets/Contact/Contact.hbs","./Contact.module.css":"../src/componets/Contact/Contact.module.css","../../utils/classnames":"../src/utils/classnames.ts","../../utils/base-block":"../src/utils/base-block.ts","../Avatar":"../src/componets/Avatar/index.ts"}],"../src/componets/Message/Message.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        alias5 = container.lambda,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=" + alias4((helper = (helper = lookupProperty(helpers, "className") || (depth0 != null ? lookupProperty(depth0, "className") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "className",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 1,
          "column": 11
        },
        "end": {
          "line": 1,
          "column": 24
        }
      }
    }) : helper)) + ">\r\n    " + ((stack1 = (helper = (helper = lookupProperty(helpers, "avatar") || (depth0 != null ? lookupProperty(depth0, "avatar") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "avatar",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 2,
          "column": 4
        },
        "end": {
          "line": 2,
          "column": 16
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n    <div class=" + alias4(alias5((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "message") : stack1, depth0)) + ">\r\n        <span class=" + alias4(alias5((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "user") : stack1, depth0)) + ">" + alias4((helper = (helper = lookupProperty(helpers, "firstName") || (depth0 != null ? lookupProperty(depth0, "firstName") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "firstName",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 4,
          "column": 36
        },
        "end": {
          "line": 4,
          "column": 49
        }
      }
    }) : helper)) + " " + alias4((helper = (helper = lookupProperty(helpers, "lastName") || (depth0 != null ? lookupProperty(depth0, "lastName") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "lastName",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 4,
          "column": 50
        },
        "end": {
          "line": 4,
          "column": 62
        }
      }
    }) : helper)) + "</span>\r\n        <span class=" + alias4((helper = (helper = lookupProperty(helpers, "messageClass") || (depth0 != null ? lookupProperty(depth0, "messageClass") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "messageClass",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 5,
          "column": 20
        },
        "end": {
          "line": 5,
          "column": 36
        }
      }
    }) : helper)) + ">" + alias4((helper = (helper = lookupProperty(helpers, "content") || (depth0 != null ? lookupProperty(depth0, "content") : depth0)) != null ? helper : alias2, _typeof(helper) === alias3 ? helper.call(alias1, {
      "name": "content",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 5,
          "column": 37
        },
        "end": {
          "line": 5,
          "column": 48
        }
      }
    }) : helper)) + "</span>\r\n    </div>\r\n</div>\r\n";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/componets/Message/Message.module.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "conteiner": "src-componets-Message-__Message-module__conteiner__1fBSm",
  "avatar": "src-componets-Message-__Message-module__avatar__3Dtwc",
  "message": "src-componets-Message-__Message-module__message__aev7S",
  "user": "src-componets-Message-__Message-module__user__1v4M6",
  "text": "src-componets-Message-__Message-module__text__2meEk"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/componets/Message/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = void 0;

var Message_hbs_1 = __importDefault(require("./Message.hbs"));

var styles = __importStar(require("./Message.module.css"));

var classnames_1 = __importDefault(require("../../utils/classnames"));

var base_block_1 = require("../../utils/base-block");

var Avatar_1 = require("../Avatar");

var Message = /*#__PURE__*/function (_base_block_1$BaseBlo) {
  _inherits(Message, _base_block_1$BaseBlo);

  var _super = _createSuper(Message);

  function Message() {
    _classCallCheck(this, Message);

    return _super.apply(this, arguments);
  }

  _createClass(Message, [{
    key: "render",
    value: function render() {
      var _a;

      var className = (0, classnames_1.default)(styles.conteiner, (_a = this.props) === null || _a === void 0 ? void 0 : _a.className);
      var components = {
        avatar: new Avatar_1.Avatar({
          avatar: this.props.avatar
        })
      };
      return this.compile(Message_hbs_1.default, Object.assign(Object.assign({
        title: ''
      }, this.props), {
        components: components,
        styles: styles,
        className: className
      }));
    }
  }]);

  return Message;
}(base_block_1.BaseBlock);

exports.Message = Message;
},{"./Message.hbs":"../src/componets/Message/Message.hbs","./Message.module.css":"../src/componets/Message/Message.module.css","../../utils/classnames":"../src/utils/classnames.ts","../../utils/base-block":"../src/utils/base-block.ts","../Avatar":"../src/componets/Avatar/index.ts"}],"../src/componets/ChangeAvatar/ChangeAvatar.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    return "<form id=\"avatarForm\">\r\n    <input id=\"avatar\" type=\"file\" name=\"avatar\" accept=\"image/*\">\r\n    <input type=\"submit\">\r\n</form>\r\n";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/componets/ChangeAvatar/ChangeAvatar.module.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "input": "src-componets-ChangeAvatar-__ChangeAvatar-module__input__2fenS"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/componets/ChangeAvatar/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeAvatar = void 0;

var ChangeAvatar_hbs_1 = __importDefault(require("./ChangeAvatar.hbs"));

var styles = __importStar(require("./ChangeAvatar.module.css"));

var classnames_1 = __importDefault(require("../../utils/classnames"));

var base_block_1 = require("../../utils/base-block");

var ChangeAvatar = /*#__PURE__*/function (_base_block_1$BaseBlo) {
  _inherits(ChangeAvatar, _base_block_1$BaseBlo);

  var _super = _createSuper(ChangeAvatar);

  function ChangeAvatar(props) {
    _classCallCheck(this, ChangeAvatar);

    return _super.call(this, props);
  }

  _createClass(ChangeAvatar, [{
    key: "render",
    value: function render() {
      var _a;

      var className = (0, classnames_1.default)(styles.input, (_a = this.props) === null || _a === void 0 ? void 0 : _a.className);
      return this.compile(ChangeAvatar_hbs_1.default, {
        className: className
      });
    }
  }, {
    key: "componentAfterRender",
    value: function componentAfterRender() {}
  }]);

  return ChangeAvatar;
}(base_block_1.BaseBlock);

exports.ChangeAvatar = ChangeAvatar;
},{"./ChangeAvatar.hbs":"../src/componets/ChangeAvatar/ChangeAvatar.hbs","./ChangeAvatar.module.css":"../src/componets/ChangeAvatar/ChangeAvatar.module.css","../../utils/classnames":"../src/utils/classnames.ts","../../utils/base-block":"../src/utils/base-block.ts"}],"../src/componets/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./Avatar"), exports);

__exportStar(require("./Button"), exports);

__exportStar(require("./Input"), exports);

__exportStar(require("./Contact"), exports);

__exportStar(require("./Message"), exports);

__exportStar(require("./ChangeAvatar"), exports);
},{"./Avatar":"../src/componets/Avatar/index.ts","./Button":"../src/componets/Button/index.ts","./Input":"../src/componets/Input/index.ts","./Contact":"../src/componets/Contact/index.ts","./Message":"../src/componets/Message/index.ts","./ChangeAvatar":"../src/componets/ChangeAvatar/index.ts"}],"../src/utils/render.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = void 0;

var render = function render(rootSelector, component) {
  var root = document.querySelector(rootSelector);

  if (root != null) {
    root.appendChild(component.getContent());
    component.dispatchComponentDidMount();
  }

  return root;
};

exports.render = render;
},{}],"../src/utils/Route.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var render_1 = require("./render");

var Route = /*#__PURE__*/function () {
  function Route(pathname, view, props, componentProps) {
    _classCallCheck(this, Route);

    this.pathname = pathname;
    this._blockClass = view;
    this._props = props;
    this._componentProps = componentProps;
  }

  _createClass(Route, [{
    key: "navigate",
    value: function navigate(pathname) {
      if (pathname === this.pathname) {
        this.pathname = pathname;
        this.render();
      }
    }
  }, {
    key: "leave",
    value: function leave() {
      this._block.hide();
    }
  }, {
    key: "render",
    value: function render() {
      if (!this._block) {
        this._block = new this._blockClass(Object.assign({}, this._componentProps));
        (0, render_1.render)(this._props.rootQuery, this._block);
        return;
      }

      this._block.show();
    }
  }, {
    key: "match",
    value: function match(pathname) {
      return pathname == this.pathname;
    }
  }]);

  return Route;
}();

exports.default = Route;
},{"./render":"../src/utils/render.ts"}],"../src/utils/router.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withRouter = exports.Router = void 0;

var Route_1 = __importDefault(require("./Route"));

var Router = /*#__PURE__*/function () {
  function Router() {
    _classCallCheck(this, Router);

    this.routes = [];
    this.history = window.history;
    this.currentRoute = undefined;

    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  _createClass(Router, [{
    key: "use",
    value: function use(pathname, block, props) {
      var route = new Route_1.default(pathname, block, {
        rootQuery: '#root'
      }, props);
      this.routes.push(route);
      return this;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      window.onpopstate = function () {
        _this._onRoute(window.location.pathname);
      };

      this._onRoute(window.location.pathname);
    }
  }, {
    key: "_onRoute",
    value: function _onRoute(pathname) {
      var route = this.getRoute(pathname);

      if (!route) {
        route = this.getRoute('/404');
      }

      if (this.currentRoute) {
        this.currentRoute.leave();
      }

      this.currentRoute = route;
      route === null || route === void 0 ? void 0 : route.render();
    }
  }, {
    key: "go",
    value: function go(pathname) {
      this.history.pushState({}, '', pathname);

      this._onRoute(pathname);
    }
  }, {
    key: "getRoute",
    value: function getRoute(pathname) {
      return this.routes.find(function (route) {
        return route.match(pathname);
      });
    }
  }, {
    key: "back",
    value: function back() {
      this.history.back();
    }
  }, {
    key: "forward",
    value: function forward() {
      this.history.forward();
    }
  }]);

  return Router;
}();

exports.Router = Router;

function withRouter(Component) {
  return /*#__PURE__*/function (_Component) {
    _inherits(WithRouter, _Component);

    var _super = _createSuper(WithRouter);

    function WithRouter(props) {
      _classCallCheck(this, WithRouter);

      var router = new Router();
      return _super.call(this, Object.assign(Object.assign({}, props), {
        router: router
      }));
    }

    return _createClass(WithRouter);
  }(Component);
}

exports.withRouter = withRouter;
},{"./Route":"../src/utils/Route.ts"}],"../src/pages/Login/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginProps = exports.Login = void 0;

var Login_hbs_1 = __importDefault(require("./Login.hbs"));

var styles = __importStar(require("./Login.module.css"));

var base_block_1 = require("../../utils/base-block");

var componets_1 = require("../../componets");

var validators_1 = require("../../utils/validators");

var router_1 = require("../../utils/router");

var fetch_1 = require("../../utils/fetch");

var emailField = new componets_1.EmailField({
  placeholder: 'Enter email or user name',
  name: 'login'
}, [validators_1.emailValidator]);
var passwordField = new componets_1.PasswordField({
  placeholder: 'Password',
  name: 'password',
  className: styles['text-field']
}, [validators_1.passwordValidator]);
var button = new componets_1.Button({
  title: 'Sign in'
});

var Login = /*#__PURE__*/function (_base_block_1$BaseBlo) {
  _inherits(Login, _base_block_1$BaseBlo);

  var _super = _createSuper(Login);

  function Login() {
    _classCallCheck(this, Login);

    return _super.apply(this, arguments);
  }

  _createClass(Login, [{
    key: "render",
    value: function render() {
      return this.compile(Login_hbs_1.default, this.props);
    }
  }]);

  return Login;
}(base_block_1.BaseBlock);

exports.Login = Login;
exports.loginProps = {
  components: {
    EmailField: emailField,
    PasswordField: passwordField,
    Button: button
  },
  styles: styles,
  events: {
    submit: function submit(e) {
      e.preventDefault();
      emailField.validateInput();
      passwordField.validateInput();
      var data = {};
      var inputFields = document.querySelectorAll('input');
      inputFields.forEach(function (input) {
        data[input.name] = input.value;
      });
      console.log(data);
      var fetch = new fetch_1.Fetch();
      fetch.post('/auth/signin', {
        data: data
      }).then(function (response) {
        console.log('response', response);
        var router = new router_1.Router();
        router.go('/main');
      }).catch(function (e) {
        return console.error(e);
      });
    }
  }
}; // @ts-ignore

exports.default = (0, router_1.withRouter)(Login);
},{"./Login.hbs":"../src/pages/Login/Login.hbs","./Login.module.css":"../src/pages/Login/Login.module.css","../../utils/base-block":"../src/utils/base-block.ts","../../componets":"../src/componets/index.ts","../../utils/validators":"../src/utils/validators.ts","../../utils/router":"../src/utils/router.ts","../../utils/fetch":"../src/utils/fetch.ts"}],"../src/pages/Register/Register.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        helper,
        alias1 = container.lambda,
        alias2 = container.escapeExpression,
        alias3 = depth0 != null ? depth0 : container.nullContext || {},
        alias4 = container.hooks.helperMissing,
        alias5 = "function",
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "main") : stack1, depth0)) + ">\r\n    <div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "conteiner") : stack1, depth0)) + ">\r\n        <section class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "info") : stack1, depth0)) + ">\r\n            <h1>Sign Up to </h1>\r\n            <h2>Satan not anonymous messenger</h2>\r\n            <p class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "description") : stack1, depth0)) + ">\r\n                If you already have an account\r\n                You can <a href=\"/login\">Login here</a> !\r\n            </p>\r\n        </section>\r\n        <form class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "form") : stack1, depth0)) + ">\r\n            <h2>Sign Up</h2>\r\n            " + ((stack1 = (helper = (helper = lookupProperty(helpers, "firstName") || (depth0 != null ? lookupProperty(depth0, "firstName") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "firstName",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 13,
          "column": 12
        },
        "end": {
          "line": 13,
          "column": 27
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n            " + ((stack1 = (helper = (helper = lookupProperty(helpers, "secondName") || (depth0 != null ? lookupProperty(depth0, "secondName") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "secondName",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 14,
          "column": 12
        },
        "end": {
          "line": 14,
          "column": 28
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n            " + ((stack1 = (helper = (helper = lookupProperty(helpers, "login") || (depth0 != null ? lookupProperty(depth0, "login") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "login",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 15,
          "column": 12
        },
        "end": {
          "line": 15,
          "column": 23
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n            " + ((stack1 = (helper = (helper = lookupProperty(helpers, "email") || (depth0 != null ? lookupProperty(depth0, "email") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "email",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 16,
          "column": 12
        },
        "end": {
          "line": 16,
          "column": 23
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n            " + ((stack1 = (helper = (helper = lookupProperty(helpers, "password") || (depth0 != null ? lookupProperty(depth0, "password") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "password",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 17,
          "column": 12
        },
        "end": {
          "line": 17,
          "column": 26
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n            " + ((stack1 = (helper = (helper = lookupProperty(helpers, "phone") || (depth0 != null ? lookupProperty(depth0, "phone") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "phone",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 18,
          "column": 12
        },
        "end": {
          "line": 18,
          "column": 23
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n            " + ((stack1 = (helper = (helper = lookupProperty(helpers, "contacts") || (depth0 != null ? lookupProperty(depth0, "contacts") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "contacts",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 19,
          "column": 12
        },
        "end": {
          "line": 19,
          "column": 26
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n            " + ((stack1 = (helper = (helper = lookupProperty(helpers, "button") || (depth0 != null ? lookupProperty(depth0, "button") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "button",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 20,
          "column": 12
        },
        "end": {
          "line": 20,
          "column": 24
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n        </form>\r\n    </div>\r\n</div>\r\n";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/utils/url.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServerUrl = void 0;
var BASE_URL = 'https://ya-praktikum.tech/api/v2';

var getServerUrl = function getServerUrl(uri) {
  return "".concat(BASE_URL).concat(uri);
};

exports.getServerUrl = getServerUrl;
},{}],"../src/pages/Register/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerProp = exports.Register = void 0;

var Register_hbs_1 = __importDefault(require("./Register.hbs"));

var styles = __importStar(require("../Login/Login.module.css"));

var base_block_1 = require("../../utils/base-block");

var componets_1 = require("../../componets");

var validators_1 = require("../../utils/validators");

var url_1 = require("../../utils/url");

var router_1 = require("../../utils/router");

var fetch_1 = require("../../utils/fetch");

var firstName = new componets_1.Input({
  placeholder: 'First Name',
  name: 'first_name',
  className: styles['text-field']
}, [validators_1.nameValidator]);
var secondName = new componets_1.TextField({
  placeholder: 'Second Name',
  name: 'second_name',
  className: styles['text-field']
}, [validators_1.nameValidator]);
var login = new componets_1.TextField({
  placeholder: 'Create User name',
  name: 'login',
  className: styles['text-field']
}, [validators_1.loginValidator]);
var email = new componets_1.EmailField({
  placeholder: 'Enter Emai',
  name: 'email',
  className: styles['text-field']
}, [validators_1.emailValidator]);
var password = new componets_1.PasswordField({
  placeholder: 'Password',
  name: 'password',
  className: styles['text-field']
}, [validators_1.passwordValidator]);
var phone = new componets_1.PasswordField({
  placeholder: 'Phone',
  name: 'phone',
  className: styles['text-field']
}, [validators_1.phoneValidator]);
var button = new componets_1.Button({
  title: 'Register'
});

var Register = /*#__PURE__*/function (_base_block_1$BaseBlo) {
  _inherits(Register, _base_block_1$BaseBlo);

  var _super = _createSuper(Register);

  function Register() {
    _classCallCheck(this, Register);

    return _super.apply(this, arguments);
  }

  _createClass(Register, [{
    key: "render",
    value: function render() {
      return this.compile(Register_hbs_1.default, this.props);
    }
  }]);

  return Register;
}(base_block_1.BaseBlock);

exports.Register = Register;
exports.registerProp = {
  components: {
    firstName: firstName,
    secondName: secondName,
    login: login,
    email: email,
    password: password,
    phone: phone,
    button: button
  },
  styles: styles,
  events: {
    submit: function submit(e) {
      e.preventDefault();
      firstName.validateInput();
      secondName.validateInput();
      login.validateInput();
      email.validateInput();
      password.validateInput();
      phone.validateInput();
      var data = {};
      var inputFields = document.querySelectorAll('input');
      inputFields.forEach(function (input) {
        data[input.name] = input.value;
      });
      console.log(data);
      var fetch = new fetch_1.Fetch();
      var url = (0, url_1.getServerUrl)('/auth/signup');
      fetch.post(url, {
        data: data
      }).then(function (response) {
        console.log(response);
        var router = new router_1.Router();
        router.go('/main');
      }).catch(function (e) {
        return console.error(e);
      });
    }
  }
}; // @ts-ignore

exports.default = (0, router_1.withRouter)(Register);
},{"./Register.hbs":"../src/pages/Register/Register.hbs","../Login/Login.module.css":"../src/pages/Login/Login.module.css","../../utils/base-block":"../src/utils/base-block.ts","../../componets":"../src/componets/index.ts","../../utils/validators":"../src/utils/validators.ts","../../utils/url":"../src/utils/url.ts","../../utils/router":"../src/utils/router.ts","../../utils/fetch":"../src/utils/fetch.ts"}],"../src/pages/Main/Main.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "1": function _(container, depth0, helpers, partials, data) {
    var stack1;
    return "                <li>\r\n                    " + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "") + "\r\n                </li>\r\n";
  },
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        helper,
        alias1 = container.lambda,
        alias2 = container.escapeExpression,
        alias3 = depth0 != null ? depth0 : container.nullContext || {},
        alias4 = container.hooks.helperMissing,
        alias5 = "function",
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "wrapper") : stack1, depth0)) + ">\r\n<div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "tool-bar") : stack1, depth0)) + " >\r\n    <div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "logout") : stack1, depth0)) + ">" + ((stack1 = (helper = (helper = lookupProperty(helpers, "logout") || (depth0 != null ? lookupProperty(depth0, "logout") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "logout",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 3,
          "column": 33
        },
        "end": {
          "line": 3,
          "column": 45
        }
      }
    }) : helper)) != null ? stack1 : "") + "</div>\r\n</div>\r\n<div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "conteiner") : stack1, depth0)) + ">\r\n    <section class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "panel-left") : stack1, depth0)) + ">\r\n        <div>\r\n            " + ((stack1 = (helper = (helper = lookupProperty(helpers, "addChatInput") || (depth0 != null ? lookupProperty(depth0, "addChatInput") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "addChatInput",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 8,
          "column": 12
        },
        "end": {
          "line": 8,
          "column": 30
        }
      }
    }) : helper)) != null ? stack1 : "") + " " + ((stack1 = (helper = (helper = lookupProperty(helpers, "addChatButton") || (depth0 != null ? lookupProperty(depth0, "addChatButton") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "addChatButton",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 8,
          "column": 31
        },
        "end": {
          "line": 8,
          "column": 50
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n        </div>\r\n        <ul class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "chat-list") : stack1, depth0)) + ">\r\n" + ((stack1 = lookupProperty(helpers, "each").call(alias3, depth0 != null ? lookupProperty(depth0, "contacts") : depth0, {
      "name": "each",
      "hash": {},
      "fn": container.program(1, data, 0),
      "inverse": container.noop,
      "data": data,
      "loc": {
        "start": {
          "line": 11,
          "column": 12
        },
        "end": {
          "line": 15,
          "column": 21
        }
      }
    })) != null ? stack1 : "") + "        </ul>\r\n    </section>\r\n    <section class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "chat") : stack1, depth0)) + ">\r\n        <ul class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "chat-list") : stack1, depth0)) + ">\r\n" + ((stack1 = lookupProperty(helpers, "each").call(alias3, depth0 != null ? lookupProperty(depth0, "messages") : depth0, {
      "name": "each",
      "hash": {},
      "fn": container.program(1, data, 0),
      "inverse": container.noop,
      "data": data,
      "loc": {
        "start": {
          "line": 20,
          "column": 12
        },
        "end": {
          "line": 24,
          "column": 21
        }
      }
    })) != null ? stack1 : "") + "        </ul>\r\n        " + ((stack1 = (helper = (helper = lookupProperty(helpers, "message") || (depth0 != null ? lookupProperty(depth0, "message") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "message",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 26,
          "column": 8
        },
        "end": {
          "line": 26,
          "column": 21
        }
      }
    }) : helper)) != null ? stack1 : "") + "\r\n    </section>\r\n</div>\r\n</div>\r\n";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/pages/Main/Main.module.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "conteiner": "src-pages-Main-__Main-module__conteiner__2Cc_I",
  "panel-left": "src-pages-Main-__Main-module__panel-left__3U_Jh",
  "chat": "src-pages-Main-__Main-module__chat__tvVJg",
  "search-input": "src-pages-Main-__Main-module__search-input__S_OxY",
  "chat-list": "src-pages-Main-__Main-module__chat-list__3D7aH",
  "tool-bar": "src-pages-Main-__Main-module__tool-bar__1ZvGo",
  "wrapper": "src-pages-Main-__Main-module__wrapper__1TCy1",
  "logout": "src-pages-Main-__Main-module__logout__32RR3"
};
},{"./..\\..\\..\\static\\img\\ashvsevildead.jpg":[["ashvsevildead.dcdc5c03.jpg","img/ashvsevildead.jpg"],"img/ashvsevildead.jpg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/utils/merge.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = void 0;

function merge(lhs, rhs) {
  for (var p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p], rhs[p]);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

exports.merge = merge;
},{}],"../src/utils/set.ts":[function(require,module,exports) {
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = void 0;

var merge_1 = require("./merge");

function set(obj, path, value) {
  var result = path.split('.').reduceRight(function (acc, key) {
    return _defineProperty({}, key, acc);
  }, value);
  return (0, merge_1.merge)(obj, result);
}

exports.set = set;
},{"./merge":"../src/utils/merge.ts"}],"../src/store/shitstore.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.StoreEvents = void 0;

var event_bus_1 = require("../utils/event-bus");

var set_1 = require("../utils/set");

var StoreEvents;

(function (StoreEvents) {
  StoreEvents["Updated"] = "updated";
})(StoreEvents = exports.StoreEvents || (exports.StoreEvents = {}));

var defaultState = {
  profile: {
    avatar: null,
    display_name: "",
    email: "",
    first_name: "",
    id: 0,
    login: "",
    phone: "",
    second_name: ""
  },
  chat: {
    chats: [],
    messages: []
  }
};

var Store = /*#__PURE__*/function (_event_bus_1$EventBus) {
  _inherits(Store, _event_bus_1$EventBus);

  var _super = _createSuper(Store);

  function Store(defaultState) {
    var _this;

    _classCallCheck(this, Store);

    _this = _super.call(this);
    _this.state = defaultState;
    return _this;
  }

  _createClass(Store, [{
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }, {
    key: "set",
    value: function set(prop, value) {
      // @ts-ignore
      this.state = (0, set_1.set)(this.state, prop, value);
      this.emit(StoreEvents.Updated);
    }
  }, {
    key: "addMassage",
    value: function addMassage(addMessages) {
      // @ts-ignore
      this.state.chat.messages = [].concat(_toConsumableArray(this.state.chat.messages), _toConsumableArray(addMessages));
      this.emit(StoreEvents.Updated);
    }
  }]);

  return Store;
}(event_bus_1.EventBus);

exports.store = new Store(defaultState);
},{"../utils/event-bus":"../src/utils/event-bus.ts","../utils/set":"../src/utils/set.ts"}],"../src/utils/is-object-like.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObjectLike = void 0;

function isObjectLike(value) {
  return _typeof(value) === "object" && value !== null;
}

exports.isObjectLike = isObjectLike;
},{}],"../src/utils/is-equal.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqual = void 0;

var is_object_like_1 = require("./is-object-like");

function isEqual(a, b) {
  if (!(0, is_object_like_1.isObjectLike)(a)) {
    return (0, is_object_like_1.isObjectLike)(b) ? false : a === b;
  }

  if (!(0, is_object_like_1.isObjectLike)(b)) {
    return (0, is_object_like_1.isObjectLike)(a) ? false : a === b;
  }

  var aKeys = Object.keys(a);

  if (aKeys.length !== Object.keys(b).length) {
    return false;
  }

  for (var _i = 0, _aKeys = aKeys; _i < _aKeys.length; _i++) {
    var key = _aKeys[_i];

    if ((0, is_object_like_1.isObjectLike)(a[key]) && (0, is_object_like_1.isObjectLike)(b[key])) {
      if (isEqual(a[key], b[key])) {
        continue;
      }

      return false;
    } else if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}

exports.isEqual = isEqual;
},{"./is-object-like":"../src/utils/is-object-like.ts"}],"../src/store/connect.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;

var shitstore_1 = require("./shitstore");

var is_equal_1 = require("../utils/is-equal");

function connect(Component, mapStateToProps) {
  return /*#__PURE__*/function (_Component) {
    _inherits(_class, _Component);

    var _super = _createSuper(_class);

    function _class(props) {
      var _this;

      _classCallCheck(this, _class);

      var state = mapStateToProps(shitstore_1.store.getState()); // @ts-ignore

      _this = _super.call(this, Object.assign(Object.assign({}, props), state));
      shitstore_1.store.on(shitstore_1.StoreEvents.Updated, function () {
        var newState = mapStateToProps(shitstore_1.store.getState());

        if (!(0, is_equal_1.isEqual)(state, newState)) {
          console.log('newState', newState);

          _this.setProps(Object.assign({}, mapStateToProps(shitstore_1.store.getState())));

          state = newState;
        }
      });
      return _this;
    }

    return _createClass(_class);
  }(Component);
}

exports.connect = connect;
},{"./shitstore":"../src/store/shitstore.ts","../utils/is-equal":"../src/utils/is-equal.ts"}],"../src/api/chat.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chatApi = exports.ChatApi = void 0;

var fetch_1 = require("../utils/fetch");

var ChatApi = /*#__PURE__*/function () {
  function ChatApi() {
    _classCallCheck(this, ChatApi);
  }

  _createClass(ChatApi, [{
    key: "loadChats",
    value: function loadChats() {
      return fetch_1.fetch.get("/chats");
    }
  }, {
    key: "createChat",
    value: function createChat(data) {
      return fetch_1.fetch.post("/chats", {
        data: data
      });
    }
  }, {
    key: "addUsersToChat",
    value: function addUsersToChat(users, chatId) {
      return fetch_1.fetch.put("/chats/users", {
        data: {
          users: users,
          chatId: chatId
        }
      });
    }
  }, {
    key: "getChatUsers",
    value: function getChatUsers(id) {
      return fetch_1.fetch.get("/chats/".concat(id, "/users"));
    }
  }, {
    key: "deleteUserFromChat",
    value: function deleteUserFromChat(users, chatId) {
      return fetch_1.fetch.delete("/chats/users", {
        data: {
          users: users,
          chatId: chatId
        }
      });
    }
  }, {
    key: "getChatToken",
    value: function getChatToken(chatId) {
      return fetch_1.fetch.post("/chats/token/".concat(chatId), {});
    }
  }]);

  return ChatApi;
}();

exports.ChatApi = ChatApi;
exports.chatApi = new ChatApi();
},{"../utils/fetch":"../src/utils/fetch.ts"}],"../src/api/profile.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profileApi = exports.ProfileApi = void 0;

var fetch_1 = require("../utils/fetch");

var ProfileApi = /*#__PURE__*/function () {
  function ProfileApi() {
    _classCallCheck(this, ProfileApi);
  }

  _createClass(ProfileApi, [{
    key: "loadProfile",
    value: function loadProfile() {
      return fetch_1.fetch.get("/auth/user");
    }
  }, {
    key: "changeProfile",
    value: function changeProfile(data) {
      return fetch_1.fetch.put("/user/profile", {
        data: data
      });
    }
  }, {
    key: "changeProfileAvatar",
    value: function changeProfileAvatar(data) {
      return fetch_1.fetch.put("/user/profile/avatar", {
        data: data,
        file: true
      });
    }
  }]);

  return ProfileApi;
}();

exports.ProfileApi = ProfileApi;
exports.profileApi = new ProfileApi();
},{"../utils/fetch":"../src/utils/fetch.ts"}],"../src/pages/Main/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Main = exports.mainProps = exports.MainBase = void 0;

var Main_hbs_1 = __importDefault(require("./Main.hbs"));

var styles = __importStar(require("./Main.module.css"));

var base_block_1 = require("../../utils/base-block");

var componets_1 = require("../../componets");

var router_1 = require("../../utils/router");

var fetch_1 = require("../../utils/fetch");

var url_1 = require("../../utils/url");

var connect_1 = require("../../store/connect");

var chat_1 = require("../../api/chat");

var shitstore_1 = require("../../store/shitstore");

var profile_1 = require("../../api/profile");

var addChatInput = new componets_1.TextField({
  placeholder: "Добавить чат...",
  name: "newChat",
  className: styles["search-input"]
});
var addChatButton = new componets_1.Button({
  title: "+",
  name: "addChatButton",
  events: {
    click: function click(e) {
      e.preventDefault();
      var newChat = document.querySelector("[name=\"newChat\"]");

      if (newChat === null || newChat === void 0 ? void 0 : newChat.value) {
        chat_1.chatApi.createChat({
          title: newChat === null || newChat === void 0 ? void 0 : newChat.value
        }).then(function () {
          return chat_1.chatApi.loadChats();
        }).then(function (responce) {
          return shitstore_1.store.set("chat.chats", responce);
        });
      }
    }
  }
});
var message = new componets_1.TextField({
  placeholder: "Type text...",
  name: "message"
});
var logout = new componets_1.Button({
  title: "Log out",
  name: "button",
  className: styles["logout"],
  events: {
    click: function click(e) {
      e.preventDefault();
      var fetch = new fetch_1.Fetch();
      var url = (0, url_1.getServerUrl)("/auth/logout");
      fetch.post(url, {}).then(function (response) {
        console.log(response);
        var router = new router_1.Router();
        router.go("/login");
      }).catch(function (e) {
        return console.error(e);
      });
    }
  }
});

var MainBase = /*#__PURE__*/function (_base_block_1$BaseBlo) {
  _inherits(MainBase, _base_block_1$BaseBlo);

  var _super = _createSuper(MainBase);

  function MainBase() {
    _classCallCheck(this, MainBase);

    return _super.apply(this, arguments);
  }

  _createClass(MainBase, [{
    key: "getContact",
    value: function getContact(chat) {
      var _a, _b, _c, _d, _e;

      return new componets_1.Contact({
        firstName: chat.title,
        lastName: (_c = (_b = (_a = chat === null || chat === void 0 ? void 0 : chat.last_message) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.second_name) !== null && _c !== void 0 ? _c : "",
        message: (_e = (_d = chat === null || chat === void 0 ? void 0 : chat.last_message) === null || _d === void 0 ? void 0 : _d.content) !== null && _e !== void 0 ? _e : "",
        avatar: chat.avatar,
        unreadMessages: chat.unread_count,
        id: chat.id
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var messages = this.props.messages.map(function (message) {
        return new componets_1.Message(Object.assign({}, message));
      });
      var contacts = this.props.contacts.map(function (contact) {
        return _this.getContact(contact);
      });
      var components = Object.assign(Object.assign({}, this.props.components), {
        messages: messages,
        contacts: contacts
      });
      return this.compile(Main_hbs_1.default, Object.assign(Object.assign({}, this.props), {
        components: components
      }));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      chat_1.chatApi.loadChats().then(function (responce) {
        shitstore_1.store.set("chat.chats", responce);
      }).then(function () {
        return profile_1.profileApi.loadProfile();
      }).then(function (profile) {
        return shitstore_1.store.set("profile", profile);
      }).then(function () {
        return console.log("store", shitstore_1.store);
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var contacts = document.querySelectorAll(".contact");
      console.log('componentDidUpdate');
      contacts.forEach(function (contact) {
        contact.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          var id = event.currentTarget.getAttribute("data-id");
          var currentUser = shitstore_1.store.getState().profile;
          console.log("currentUser", currentUser);
          chat_1.chatApi.getChatToken(id).then(function (data) {
            _this2.openSocket(currentUser.id, id, data.token);
          });
        });
      });
    }
  }, {
    key: "openSocket",
    value: function openSocket(userId, chatId, token) {
      var _this3 = this;

      console.log("wss://ya-praktikum.tech/ws/chats/".concat(userId, "/").concat(chatId, "/").concat(token));
      this.activeSocket = new WebSocket("wss://ya-praktikum.tech/ws/chats/".concat(userId, "/").concat(chatId, "/").concat(token));
      this.activeSocket.addEventListener("open", function () {
        console.log("Соединение установлено");

        _this3.activeSocket.send(JSON.stringify({
          content: '0',
          type: 'get old'
        }));
      });
      this.activeSocket.addEventListener("message", function (event) {
        var response = JSON.parse(event.data);

        if (response.type === "user connected") {
          console.log("User connected: ", response.content);
        } else {
          var _shitstore_1$store$ge = shitstore_1.store.getState(),
              profile = _shitstore_1$store$ge.profile;

          var addmessages = Array.isArray(response) ? response.map(function (item) {
            return _this3.getCustomMessage(item, profile);
          }).reverse() : [_this3.getCustomMessage(response, profile)];
          shitstore_1.store.addMassage(addmessages);
          console.log(shitstore_1.store);
        }
      });
      this.activeSocket.addEventListener("close", function () {
        console.log("Соединение закрыто");
      });
    }
  }, {
    key: "getCustomMessage",
    value: function getCustomMessage(message, user) {
      return Object.assign(Object.assign({}, message), {
        isCurrentUserMessage: user.id === message.user_id
      });
    }
  }]);

  return MainBase;
}(base_block_1.BaseBlock);

exports.MainBase = MainBase;
exports.mainProps = {
  components: {
    addChatInput: addChatInput,
    addChatButton: addChatButton,
    message: message,
    logout: logout
  },
  styles: styles
};

function mapUserToProps(state) {
  return {
    contacts: state.chat.chats,
    messages: state.chat.messages
  };
} // @ts-ignore


exports.Main = (0, router_1.withRouter)((0, connect_1.connect)(MainBase, mapUserToProps));
},{"./Main.hbs":"../src/pages/Main/Main.hbs","./Main.module.css":"../src/pages/Main/Main.module.css","../../utils/base-block":"../src/utils/base-block.ts","../../componets":"../src/componets/index.ts","../../utils/router":"../src/utils/router.ts","../../utils/fetch":"../src/utils/fetch.ts","../../utils/url":"../src/utils/url.ts","../../store/connect":"../src/store/connect.ts","../../api/chat":"../src/api/chat.ts","../../store/shitstore":"../src/store/shitstore.ts","../../api/profile":"../src/api/profile.ts"}],"../src/pages/Profile/Profile.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        helper,
        alias1 = container.lambda,
        alias2 = container.escapeExpression,
        alias3 = depth0 != null ? depth0 : container.nullContext || {},
        alias4 = container.hooks.helperMissing,
        alias5 = "function",
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "main") : stack1, depth0)) + ">\n  <div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "field-conteiner") : stack1, depth0)) + ">\n    <div title=\"Изменить аватар\" class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "avatar") : stack1, depth0)) + ">\n      " + ((stack1 = (helper = (helper = lookupProperty(helpers, "avatar") || (depth0 != null ? lookupProperty(depth0, "avatar") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "avatar",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 4,
          "column": 6
        },
        "end": {
          "line": 4,
          "column": 18
        }
      }
    }) : helper)) != null ? stack1 : "") + "\n      " + ((stack1 = (helper = (helper = lookupProperty(helpers, "changeAvatar") || (depth0 != null ? lookupProperty(depth0, "changeAvatar") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "changeAvatar",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 5,
          "column": 6
        },
        "end": {
          "line": 5,
          "column": 24
        }
      }
    }) : helper)) != null ? stack1 : "") + "\n    </div>\n    <form class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "field-conteiner") : stack1, depth0)) + ">\n      " + ((stack1 = (helper = (helper = lookupProperty(helpers, "firstName") || (depth0 != null ? lookupProperty(depth0, "firstName") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "firstName",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 8,
          "column": 6
        },
        "end": {
          "line": 8,
          "column": 21
        }
      }
    }) : helper)) != null ? stack1 : "") + "\n      " + ((stack1 = (helper = (helper = lookupProperty(helpers, "secondName") || (depth0 != null ? lookupProperty(depth0, "secondName") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "secondName",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 9,
          "column": 6
        },
        "end": {
          "line": 9,
          "column": 22
        }
      }
    }) : helper)) != null ? stack1 : "") + "\n      " + ((stack1 = (helper = (helper = lookupProperty(helpers, "displayName") || (depth0 != null ? lookupProperty(depth0, "displayName") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "displayName",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 10,
          "column": 6
        },
        "end": {
          "line": 10,
          "column": 23
        }
      }
    }) : helper)) != null ? stack1 : "") + "\n      " + ((stack1 = (helper = (helper = lookupProperty(helpers, "login") || (depth0 != null ? lookupProperty(depth0, "login") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "login",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 11,
          "column": 6
        },
        "end": {
          "line": 11,
          "column": 17
        }
      }
    }) : helper)) != null ? stack1 : "") + "\n      " + ((stack1 = (helper = (helper = lookupProperty(helpers, "email") || (depth0 != null ? lookupProperty(depth0, "email") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "email",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 12,
          "column": 6
        },
        "end": {
          "line": 12,
          "column": 17
        }
      }
    }) : helper)) != null ? stack1 : "") + "\n      " + ((stack1 = (helper = (helper = lookupProperty(helpers, "phone") || (depth0 != null ? lookupProperty(depth0, "phone") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "phone",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 13,
          "column": 6
        },
        "end": {
          "line": 13,
          "column": 17
        }
      }
    }) : helper)) != null ? stack1 : "") + "\n      " + ((stack1 = (helper = (helper = lookupProperty(helpers, "oldPassword") || (depth0 != null ? lookupProperty(depth0, "oldPassword") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "oldPassword",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 14,
          "column": 6
        },
        "end": {
          "line": 14,
          "column": 23
        }
      }
    }) : helper)) != null ? stack1 : "") + "\n      " + ((stack1 = (helper = (helper = lookupProperty(helpers, "newPassword") || (depth0 != null ? lookupProperty(depth0, "newPassword") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "newPassword",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 15,
          "column": 6
        },
        "end": {
          "line": 15,
          "column": 23
        }
      }
    }) : helper)) != null ? stack1 : "") + "\n\n      " + ((stack1 = (helper = (helper = lookupProperty(helpers, "save") || (depth0 != null ? lookupProperty(depth0, "save") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "save",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 17,
          "column": 6
        },
        "end": {
          "line": 17,
          "column": 16
        }
      }
    }) : helper)) != null ? stack1 : "") + "\n      " + ((stack1 = (helper = (helper = lookupProperty(helpers, "cancel") || (depth0 != null ? lookupProperty(depth0, "cancel") : depth0)) != null ? helper : alias4, _typeof(helper) === alias5 ? helper.call(alias3, {
      "name": "cancel",
      "hash": {},
      "data": data,
      "loc": {
        "start": {
          "line": 18,
          "column": 6
        },
        "end": {
          "line": 18,
          "column": 18
        }
      }
    }) : helper)) != null ? stack1 : "") + "\n    </form>\n  </div>\n</div>\n";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/pages/Profile/Profile.module.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "main": "src-pages-Profile-__Profile-module__main__10OUw",
  "field-conteiner": "src-pages-Profile-__Profile-module__field-conteiner__1cf0p",
  "text-field": "src-pages-Profile-__Profile-module__text-field__230FV",
  "avatar": "src-pages-Profile-__Profile-module__avatar__HS1w1"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/Profile/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Profile = exports.propsProfile = void 0;

var Profile_hbs_1 = __importDefault(require("./Profile.hbs"));

var styles = __importStar(require("./Profile.module.css"));

var base_block_1 = require("../../utils/base-block");

var componets_1 = require("../../componets");

var validators_1 = require("../../utils/validators");

var router_1 = require("../../utils/router");

var profile_1 = require("../../api/profile");

var shitstore_1 = require("../../store/shitstore");

var connect_1 = require("../../store/connect");

var avatar = new componets_1.Avatar({
  name: "avatar",
  title: "Изменить аватар"
});
var changeAvatar = new componets_1.ChangeAvatar({
  events: {
    submit: function submit(event) {
      event.preventDefault();
      event.stopPropagation();
      console.log("event.currentTarget", event.currentTarget);
      var form = new FormData(event.currentTarget);
      console.log("form", form);
      profile_1.profileApi.changeProfileAvatar(form);
    }
  }
});
var firstName = new componets_1.Input({
  placeholder: "First Name",
  name: "first_name",
  className: styles["text-field"]
}, [validators_1.nameValidator]);
var secondName = new componets_1.TextField({
  placeholder: "Second Name",
  name: "second_name",
  className: styles["text-field"]
}, [validators_1.nameValidator]);
var displayName = new componets_1.TextField({
  placeholder: "Display name",
  name: "display_name",
  className: styles["text-field"]
});
var login = new componets_1.TextField({
  placeholder: "Create User name",
  name: "login",
  className: styles["text-field"]
}, [validators_1.loginValidator]);
var email = new componets_1.EmailField({
  placeholder: "Enter Emai",
  name: "email",
  className: styles["text-field"]
}, [validators_1.emailValidator]);
var oldPassword = new componets_1.PasswordField({
  placeholder: "Password",
  name: "oldPassword",
  className: styles["text-field"]
}, [validators_1.passwordValidator]);
var newPassword = new componets_1.PasswordField({
  placeholder: "New Password",
  name: "newPassword",
  className: styles["text-field"]
}, [validators_1.passwordValidator]);
var phone = new componets_1.TextField({
  placeholder: "Phone",
  name: "phone",
  className: styles["text-field"]
}, [validators_1.phoneValidator]);
var save = new componets_1.Button({
  title: "Save"
});
var cancel = new componets_1.Button({
  title: "Cancel"
});

var ProfileBase = /*#__PURE__*/function (_base_block_1$BaseBlo) {
  _inherits(ProfileBase, _base_block_1$BaseBlo);

  var _super = _createSuper(ProfileBase);

  function ProfileBase(props) {
    var _this;

    _classCallCheck(this, ProfileBase);

    _this = _super.call(this, props);
    console.log("props", props);
    return _this;
  }

  _createClass(ProfileBase, [{
    key: "render",
    value: function render() {
      return this.compile(Profile_hbs_1.default, this.props);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      profile_1.profileApi.loadProfile().then(function (responce) {
        shitstore_1.store.set("profile", responce);
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      console.log('componentDidUpdate');
      this.setComponents(this.props.profile);
    }
  }, {
    key: "setComponents",
    value: function setComponents(data) {
      var _this$props$component = this.props.components,
          avatar = _this$props$component.avatar,
          firstName = _this$props$component.firstName,
          secondName = _this$props$component.secondName,
          displayName = _this$props$component.displayName,
          login = _this$props$component.login,
          email = _this$props$component.email,
          phone = _this$props$component.phone;
      avatar.setProps({
        avatar: data.avatar
      });
      firstName.setProps({
        value: data.first_name
      });
      firstName.setProps({
        value: data.first_name
      });
      secondName.setProps({
        value: data.second_name
      });
      displayName.setProps({
        value: data.display_name
      });
      login.setProps({
        value: data.login
      });
      email.setProps({
        value: data.email
      });
      phone.setProps({
        value: data.phone
      });
    }
  }]);

  return ProfileBase;
}(base_block_1.BaseBlock);

exports.propsProfile = {
  components: {
    avatar: avatar,
    changeAvatar: changeAvatar,
    firstName: firstName,
    secondName: secondName,
    displayName: displayName,
    login: login,
    email: email,
    oldPassword: oldPassword,
    newPassword: newPassword,
    phone: phone,
    save: save,
    cancel: cancel
  },
  styles: styles,
  events: {
    submit: function submit(e) {
      e.preventDefault();
      firstName.validateInput();
      secondName.validateInput();
      login.validateInput();
      email.validateInput();
      oldPassword.validateInput();
      newPassword.validateInput();
      phone.validateInput();
      var data = {};
      var inputFields = document.querySelectorAll("input");
      inputFields.forEach(function (input) {
        data[input.name] = input.value;
      });
      console.log(data);
      profile_1.profileApi.changeProfile(data).then(function (responce) {
        console.log("responce", responce);
      });
    }
  }
};

function mapUserToProps(state) {
  return {
    profile: Object.assign({}, state.profile)
  };
} // @ts-ignore


exports.Profile = (0, router_1.withRouter)((0, connect_1.connect)(ProfileBase, mapUserToProps));
},{"./Profile.hbs":"../src/pages/Profile/Profile.hbs","./Profile.module.css":"../src/pages/Profile/Profile.module.css","../../utils/base-block":"../src/utils/base-block.ts","../../componets":"../src/componets/index.ts","../../utils/validators":"../src/utils/validators.ts","../../utils/router":"../src/utils/router.ts","../../api/profile":"../src/api/profile.ts","../../store/shitstore":"../src/store/shitstore.ts","../../store/connect":"../src/store/connect.ts"}],"../src/pages/404/404.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        alias1 = container.lambda,
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "wrapper") : stack1, depth0)) + ">\r\n    <div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "main") : stack1, depth0)) + ">\r\n        <div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "conteiner") : stack1, depth0)) + ">\r\n            <div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "picture") : stack1, depth0)) + "></div>\r\n            <h1 class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "title") : stack1, depth0)) + ">Page not found</h1>\r\n            <a class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "home") : stack1, depth0)) + " href=\"/\">GO HOME</a>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/pages/404/404.module.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "wrapper": "src-pages-404-__404-module__wrapper__2Bnn-",
  "main": "src-pages-404-__404-module__main__-gvAX",
  "conteiner": "src-pages-404-__404-module__conteiner__4qTKZ",
  "picture": "src-pages-404-__404-module__picture__3yKN1",
  "title": "src-pages-404-__404-module__title__30KpN",
  "home": "src-pages-404-__404-module__home__15I0E"
};
},{"./..\\..\\..\\static\\img\\404\\stars.png":[["stars.9b65da37.png","img/404/stars.png"],"img/404/stars.png"],"./..\\..\\..\\static\\img\\404\\satan.png":[["satan.084eb1ab.png","img/404/satan.png"],"img/404/satan.png"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/404/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propsPage404 = exports.Page404 = void 0;

var _404_hbs_1 = __importDefault(require("./404.hbs"));

var styles = __importStar(require("./404.module.css"));

var base_block_1 = require("../../utils/base-block");

var router_1 = require("../../utils/router");

var Page404 = /*#__PURE__*/function (_base_block_1$BaseBlo) {
  _inherits(Page404, _base_block_1$BaseBlo);

  var _super = _createSuper(Page404);

  function Page404() {
    _classCallCheck(this, Page404);

    return _super.apply(this, arguments);
  }

  _createClass(Page404, [{
    key: "render",
    value: function render() {
      return this.compile(_404_hbs_1.default, this.props);
    }
  }]);

  return Page404;
}(base_block_1.BaseBlock);

exports.Page404 = Page404;
exports.propsPage404 = {
  styles: styles
}; // @ts-ignore

exports.default = (0, router_1.withRouter)(Page404);
},{"./404.hbs":"../src/pages/404/404.hbs","./404.module.css":"../src/pages/404/404.module.css","../../utils/base-block":"../src/utils/base-block.ts","../../utils/router":"../src/utils/router.ts"}],"../src/pages/500/500.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        alias1 = container.lambda,
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "wrapper") : stack1, depth0)) + ">\r\n    <div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "main") : stack1, depth0)) + ">\r\n        <div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "conteiner") : stack1, depth0)) + ">\r\n            <div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "picture") : stack1, depth0)) + "></div>\r\n            <h1 class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "title") : stack1, depth0)) + ">Server fail</h1>\r\n            <a class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "home") : stack1, depth0)) + " href=\"/\">GO HOME</a>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/pages/500/500.module.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "wrapper": "src-pages-500-__500-module__wrapper__3YBMd",
  "main": "src-pages-500-__500-module__main__3gjYb",
  "conteiner": "src-pages-500-__500-module__conteiner__2ht6b",
  "picture": "src-pages-500-__500-module__picture__10vEV",
  "title": "src-pages-500-__500-module__title__1m0Ox",
  "home": "src-pages-500-__500-module__home__3X5_N"
};
},{"./..\\..\\..\\static\\img\\404\\stars.png":[["stars.9b65da37.png","img/404/stars.png"],"img/404/stars.png"],"./..\\..\\..\\static\\img\\404\\satan.png":[["satan.084eb1ab.png","img/404/satan.png"],"img/404/satan.png"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/500/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propsPage500 = exports.Page500 = void 0;

var _500_hbs_1 = __importDefault(require("./500.hbs"));

var styles = __importStar(require("./500.module.css"));

var base_block_1 = require("../../utils/base-block");

var router_1 = require("../../utils/router");

var Page500 = /*#__PURE__*/function (_base_block_1$BaseBlo) {
  _inherits(Page500, _base_block_1$BaseBlo);

  var _super = _createSuper(Page500);

  function Page500() {
    _classCallCheck(this, Page500);

    return _super.apply(this, arguments);
  }

  _createClass(Page500, [{
    key: "render",
    value: function render() {
      return this.compile(_500_hbs_1.default, this.props);
    }
  }]);

  return Page500;
}(base_block_1.BaseBlock);

exports.Page500 = Page500;
exports.propsPage500 = {
  styles: styles
}; // @ts-ignore

exports.default = (0, router_1.withRouter)(Page500);
},{"./500.hbs":"../src/pages/500/500.hbs","./500.module.css":"../src/pages/500/500.module.css","../../utils/base-block":"../src/utils/base-block.ts","../../utils/router":"../src/utils/router.ts"}],"../src/pages/Intro/Intro.hbs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars/dist/handlebars.runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templateFunction = _handlebars.default.template({
  "compiler": [8, ">= 4.3.0"],
  "main": function main(container, depth0, helpers, partials, data) {
    var stack1,
        alias1 = container.lambda,
        alias2 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }

      return undefined;
    };

    return "<div class=\"" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "wrapper") : stack1, depth0)) + "\">\r\n    <div class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "sun") : stack1, depth0)) + ">\r\n    </div>\r\n\r\n    <nav class=" + alias2(alias1((stack1 = depth0 != null ? lookupProperty(depth0, "styles") : depth0) != null ? lookupProperty(stack1, "pages") : stack1, depth0)) + ">\r\n        <a href=\"/login\">Login</a>\r\n        <a href=\"/register\">Register</a>\r\n        <a href=\"/profile\">Profile</a>\r\n        <a href=\"/main\">Main</a>\r\n        <a href=\"/404\">404</a>\r\n        <a href=\"/500\">5*</a>\r\n    </nav>\r\n\r\n</div>\r\n";
  },
  "useData": true
});

var _default = templateFunction;
exports.default = _default;
},{"handlebars/dist/handlebars.runtime":"../node_modules/handlebars/dist/handlebars.runtime.js"}],"../src/pages/Intro/Intro.module.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "wrapper": "src-pages-Intro-__Intro-module__wrapper__2W3pg",
  "sun": "src-pages-Intro-__Intro-module__sun__2GlM7",
  "pages": "src-pages-Intro-__Intro-module__pages__2MkE2"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../src/pages/Intro/index.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propsIntro = exports.Intro = void 0;

var Intro_hbs_1 = __importDefault(require("./Intro.hbs"));

var styles = __importStar(require("./Intro.module.css"));

var base_block_1 = require("../../utils/base-block");

var router_1 = require("../../utils/router");

var Intro = /*#__PURE__*/function (_base_block_1$BaseBlo) {
  _inherits(Intro, _base_block_1$BaseBlo);

  var _super = _createSuper(Intro);

  function Intro() {
    _classCallCheck(this, Intro);

    return _super.apply(this, arguments);
  }

  _createClass(Intro, [{
    key: "render",
    value: function render() {
      return this.compile(Intro_hbs_1.default, this.props);
    }
  }]);

  return Intro;
}(base_block_1.BaseBlock);

exports.Intro = Intro;
exports.propsIntro = {
  styles: styles
}; // @ts-ignore

exports.default = (0, router_1.withRouter)(Intro);
},{"./Intro.hbs":"../src/pages/Intro/Intro.hbs","./Intro.module.css":"../src/pages/Intro/Intro.module.css","../../utils/base-block":"../src/utils/base-block.ts","../../utils/router":"../src/utils/router.ts"}],"../src/pages/index.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(require("./Login"), exports);

__exportStar(require("./Register"), exports);

__exportStar(require("./Main"), exports);

__exportStar(require("./Profile"), exports);

__exportStar(require("./404"), exports);

__exportStar(require("./500"), exports);

__exportStar(require("./Intro"), exports);
},{"./Login":"../src/pages/Login/index.ts","./Register":"../src/pages/Register/index.ts","./Main":"../src/pages/Main/index.ts","./Profile":"../src/pages/Profile/index.ts","./404":"../src/pages/404/index.ts","./500":"../src/pages/500/index.ts","./Intro":"../src/pages/Intro/index.ts"}],"../src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // @ts-nocheck

require("normalize.css");

var pages_1 = require("./pages");

var router_1 = require("./utils/router");

var router = new router_1.Router();
router.use('/login', pages_1.Login, pages_1.loginProps).use('/', pages_1.Intro, pages_1.propsIntro).use('/main', pages_1.Main, pages_1.mainProps).use('/profile', pages_1.Profile, pages_1.propsProfile).use('/register', pages_1.Register, pages_1.registerProp).use('/500', pages_1.Page500, pages_1.propsPage500).use('/404', pages_1.Page404, pages_1.propsPage404).start();
},{"normalize.css":"../node_modules/normalize.css/normalize.css","./pages":"../src/pages/index.ts","./utils/router":"../src/utils/router.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54641" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/index.ts"], null)
//# sourceMappingURL=/src.9caef6c7.js.map