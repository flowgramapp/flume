'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

function canUseDOM$1() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}

/**
 * React currently throws a warning when using useLayoutEffect on the server. To
 * get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect in the browser. We occasionally need useLayoutEffect to
 * ensure we don't get a render flash for certain operations, but we may also
 * need affected components to render on the server. One example is when setting
 * a component's descendants to retrieve their index values.
 *
 * Important to note that using this hook as an escape hatch will break the
 * eslint dependency warnings unless you rename the import to `useLayoutEffect`.
 * Use sparingly only when the effect won't effect the rendered HTML to avoid
 * any server/client mismatch.
 *
 * If a useLayoutEffect is needed and the result would create a mismatch, it's
 * likely that the component in question shouldn't be rendered on the server at
 * all, so a better approach would be to lazily render those in a parent
 * component after client-side hydration.
 *
 * https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * https://github.com/reduxjs/react-redux/blob/master/src/utils/useIsomorphicLayoutEffect.js
 *
 * @param effect
 * @param deps
 */

var useIsomorphicLayoutEffect = /*#__PURE__*/canUseDOM$1() ? React.useLayoutEffect : React.useEffect;

/*
 * Welcome to @reach/auto-id!

 * Let's see if we can make sense of why this hook exists and its
 * implementation.
 *
 * Some background:
 *   1. Accessibility APIs rely heavily on element IDs
 *   2. Requiring developers to put IDs on every element in Reach UI is both
 *      cumbersome and error-prone
 *   3. With a component model, we can generate IDs for them!
 *
 * Solution 1: Generate random IDs.
 *
 * This works great as long as you don't server render your app. When React (in
 * the client) tries to reuse the markup from the server, the IDs won't match
 * and React will then recreate the entire DOM tree.
 *
 * Solution 2: Increment an integer
 *
 * This sounds great. Since we're rendering the exact same tree on the server
 * and client, we can increment a counter and get a deterministic result between
 * client and server. Also, JS integers can go up to nine-quadrillion. I'm
 * pretty sure the tab will be closed before an app never needs
 * 10 quadrillion IDs!
 *
 * Problem solved, right?
 *
 * Ah, but there's a catch! React's concurrent rendering makes this approach
 * non-deterministic. While the client and server will end up with the same
 * elements in the end, depending on suspense boundaries (and possibly some user
 * input during the initial render) the incrementing integers won't always match
 * up.
 *
 * Solution 3: Don't use IDs at all on the server; patch after first render.
 *
 * What we've done here is solution 2 with some tricks. With this approach, the
 * ID returned is an empty string on the first render. This way the server and
 * client have the same markup no matter how wild the concurrent rendering may
 * have gotten.
 *
 * After the render, we patch up the components with an incremented ID. This
 * causes a double render on any components with `useId`. Shouldn't be a problem
 * since the components using this hook should be small, and we're only updating
 * the ID attribute on the DOM, nothing big is happening.
 *
 * It doesn't have to be an incremented number, though--we could do generate
 * random strings instead, but incrementing a number is probably the cheapest
 * thing we can do.
 *
 * Additionally, we only do this patchup on the very first client render ever.
 * Any calls to `useId` that happen dynamically in the client will be
 * populated immediately with a value. So, we only get the double render after
 * server hydration and never again, SO BACK OFF ALRIGHT?
 */
var serverHandoffComplete = false;
var id = 0;

var genId = function genId() {
  return ++id;
};
/**
 * useId
 *
 * Autogenerate IDs to facilitate WAI-ARIA and server rendering.
 *
 * Note: The returned ID will initially be `null` and will update after a
 * component mounts. Users may need to supply their own ID if they need
 * consistent values for SSR.
 *
 * @see Docs https://reach.tech/auto-id
 */


function useId(idFromProps) {
  /*
   * If this instance isn't part of the initial render, we don't have to do the
   * double render/patch-up dance. We can just generate the ID and return it.
   */
  var initialId = idFromProps || (serverHandoffComplete ? genId() : null);

  var _React$useState = React.useState(initialId),
      id = _React$useState[0],
      setId = _React$useState[1];

  useIsomorphicLayoutEffect(function () {
    if (id === null) {
      /*
       * Patch the ID after render. We do this in `useLayoutEffect` to avoid any
       * rendering flicker, though it'll make the first render slower (unlikely
       * to matter, but you're welcome to measure your app and let us know if
       * it's a problem).
       */
      setId(genId());
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  React.useEffect(function () {
    if (serverHandoffComplete === false) {
      /*
       * Flag all future uses of `useId` to skip the update dance. This is in
       * `useEffect` because it goes after `useLayoutEffect`, ensuring we don't
       * accidentally bail out of the patch-up dance prematurely.
       */
      serverHandoffComplete = true;
    }
  }, []);
  return id != null ? String(id) : undefined;
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Portal$3 = function (_React$Component) {
  _inherits$1(Portal, _React$Component);

  function Portal() {
    _classCallCheck$1(this, Portal);

    return _possibleConstructorReturn$1(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).apply(this, arguments));
  }

  _createClass$1(Portal, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.defaultNode) {
        document.body.removeChild(this.defaultNode);
      }
      this.defaultNode = null;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!canUseDOM) {
        return null;
      }
      if (!this.props.node && !this.defaultNode) {
        this.defaultNode = document.createElement('div');
        document.body.appendChild(this.defaultNode);
      }
      return ReactDOM__default["default"].createPortal(this.props.children, this.props.node || this.defaultNode);
    }
  }]);

  return Portal;
}(React__default["default"].Component);

Portal$3.propTypes = {
  children: PropTypes__default["default"].node.isRequired,
  node: PropTypes__default["default"].any
};

var Portalv4 = Portal$3;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Portal$2 = function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    _classCallCheck(this, Portal);

    return _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).apply(this, arguments));
  }

  _createClass(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderPortal();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props) {
      this.renderPortal();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      ReactDOM__default["default"].unmountComponentAtNode(this.defaultNode || this.props.node);
      if (this.defaultNode) {
        document.body.removeChild(this.defaultNode);
      }
      this.defaultNode = null;
      this.portal = null;
    }
  }, {
    key: 'renderPortal',
    value: function renderPortal(props) {
      if (!this.props.node && !this.defaultNode) {
        this.defaultNode = document.createElement('div');
        document.body.appendChild(this.defaultNode);
      }

      var children = this.props.children;
      // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
      if (typeof this.props.children.type === 'function') {
        children = React__default["default"].cloneElement(this.props.children);
      }

      this.portal = ReactDOM__default["default"].unstable_renderSubtreeIntoContainer(this, children, this.props.node || this.defaultNode);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Portal;
}(React__default["default"].Component);

var LegacyPortal = Portal$2;


Portal$2.propTypes = {
  children: PropTypes__default["default"].node.isRequired,
  node: PropTypes__default["default"].any
};

var Portal = void 0;

if (ReactDOM__default["default"].createPortal) {
  Portal = Portalv4;
} else {
  Portal = LegacyPortal;
}

var Portal$1 = Portal;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * The base implementation of `_.clamp` which doesn't coerce arguments.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 */

function baseClamp$1(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

var _baseClamp = baseClamp$1;

/** Used to match a single whitespace character. */

var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex$1(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

var _trimmedEndIndex = trimmedEndIndex$1;

var trimmedEndIndex = _trimmedEndIndex;

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim$1(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

var _baseTrim = baseTrim$1;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$5(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$5;

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$8 = freeGlobal || freeSelf || Function('return this')();

var _root = root$8;

var root$7 = _root;

/** Built-in value references. */
var Symbol$5 = root$7.Symbol;

var _Symbol = Symbol$5;

var Symbol$4 = _Symbol;

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$b.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$b.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$4 ? Symbol$4.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$8.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto$a = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$a.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var Symbol$3 = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$3 ? Symbol$3.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$5(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$5;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$5(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$5;

var baseGetTag$4 = _baseGetTag,
    isObjectLike$4 = isObjectLike_1;

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$5(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$4(value) && baseGetTag$4(value) == symbolTag$1);
}

var isSymbol_1 = isSymbol$5;

var baseTrim = _baseTrim,
    isObject$4 = isObject_1,
    isSymbol$4 = isSymbol_1;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$1(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol$4(value)) {
    return NAN;
  }
  if (isObject$4(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$4(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber$1;

var baseClamp = _baseClamp,
    toNumber = toNumber_1;

/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Number
 * @param {number} number The number to clamp.
 * @param {number} [lower] The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 * @example
 *
 * _.clamp(-10, -5, 5);
 * // => -5
 *
 * _.clamp(10, -5, 5);
 * // => 5
 */
function clamp(number, lower, upper) {
  if (upper === undefined) {
    upper = lower;
    lower = undefined;
  }
  if (upper !== undefined) {
    upper = toNumber(upper);
    upper = upper === upper ? upper : 0;
  }
  if (lower !== undefined) {
    lower = toNumber(lower);
    lower = lower === lower ? lower : 0;
  }
  return baseClamp(toNumber(number), lower, upper);
}

var clamp_1 = clamp;

let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
let nanoid = (size = 21) => {
  let id = '';
  let i = size;
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id
};

var styles$d = {"menuWrapper":"ContextMenu-module_menuWrapper__ITBWh","menuHeader":"ContextMenu-module_menuHeader__sx1wC","menuLabel":"ContextMenu-module_menuLabel__xoQOZ","optionsWrapper":"ContextMenu-module_optionsWrapper__uQ15A","menuFilter":"ContextMenu-module_menuFilter__jGnDB","option":"ContextMenu-module_option__Qa-Ww","emptyText":"ContextMenu-module_emptyText__Ia1jr"};

var ContextMenu = function (_a) {
    var x = _a.x, y = _a.y, _b = _a.options, options = _b === void 0 ? [] : _b, onRequestClose = _a.onRequestClose, onOptionSelected = _a.onOptionSelected, label = _a.label, hideHeader = _a.hideHeader, hideFilter = _a.hideFilter, emptyText = _a.emptyText;
    var menuWrapper = React__default["default"].useRef();
    var menuOptionsWrapper = React__default["default"].useRef();
    var filterInput = React__default["default"].useRef();
    var _c = React__default["default"].useState(""), filter = _c[0], setFilter = _c[1];
    var _d = React__default["default"].useState(0), menuWidth = _d[0], setMenuWidth = _d[1];
    var _e = React__default["default"].useState(0), selectedIndex = _e[0], setSelectedIndex = _e[1];
    var menuId = React__default["default"].useRef(nanoid(10));
    var handleOptionSelected = function (option) {
        onOptionSelected(option);
        onRequestClose();
    };
    var testClickOutside = React__default["default"].useCallback(function (e) {
        if (menuWrapper.current && !menuWrapper.current.contains(e.target)) {
            onRequestClose();
            document.removeEventListener("click", testClickOutside, { capture: true });
            document.removeEventListener("contextmenu", testClickOutside, { capture: true });
        }
    }, [menuWrapper, onRequestClose]);
    var testEscape = React__default["default"].useCallback(function (e) {
        if (e.keyCode === 27) {
            onRequestClose();
            document.removeEventListener("keydown", testEscape, { capture: true });
        }
    }, [onRequestClose]);
    React__default["default"].useEffect(function () {
        if (filterInput.current) {
            filterInput.current.focus();
        }
        setMenuWidth(menuWrapper.current.getBoundingClientRect().width);
        document.addEventListener("keydown", testEscape, { capture: true });
        document.addEventListener("click", testClickOutside, { capture: true });
        document.addEventListener("contextmenu", testClickOutside, { capture: true });
        return function () {
            document.removeEventListener("click", testClickOutside, { capture: true });
            document.removeEventListener("contextmenu", testClickOutside, { capture: true });
            document.removeEventListener("keydown", testEscape, { capture: true });
        };
    }, [testClickOutside, testEscape]);
    var filteredOptions = React__default["default"].useMemo(function () {
        if (!filter)
            return options;
        var lowerFilter = filter.toLowerCase();
        return options.filter(function (opt) { return opt.label.toLowerCase().includes(lowerFilter); });
    }, [filter, options]);
    var handleFilterChange = function (e) {
        var value = e.target.value;
        setFilter(value);
        setSelectedIndex(0);
    };
    var handleKeyDown = function (e) {
        // Up pressed
        if (e.which === 38) {
            e.preventDefault();
            if (selectedIndex === null) {
                setSelectedIndex(0);
            }
            else if (selectedIndex > 0) {
                setSelectedIndex(function (i) { return i - 1; });
            }
        }
        // Down pressed
        if (e.which === 40) {
            e.preventDefault();
            if (selectedIndex === null) {
                setSelectedIndex(0);
            }
            else if (selectedIndex < filteredOptions.length - 1) {
                setSelectedIndex(function (i) { return i + 1; });
            }
        }
        // Enter pressed
        if (e.which === 13 && selectedIndex !== null) {
            var option = filteredOptions[selectedIndex];
            if (option) {
                handleOptionSelected(option);
            }
        }
    };
    React__default["default"].useEffect(function () {
        if (hideFilter || hideHeader) {
            menuWrapper.current.focus();
        }
    }, [hideFilter, hideHeader]);
    React__default["default"].useEffect(function () {
        var menuOption = document.getElementById("".concat(menuId.current, "-").concat(selectedIndex));
        if (menuOption) {
            var menuRect = menuOptionsWrapper.current.getBoundingClientRect();
            var optionRect = menuOption.getBoundingClientRect();
            if (optionRect.y + optionRect.height > menuRect.y + menuRect.height ||
                optionRect.y < menuRect.y) {
                menuOption.scrollIntoView({ block: "nearest" });
            }
        }
    }, [selectedIndex]);
    return (React__default["default"].createElement("div", { className: styles$d.menuWrapper, onMouseDown: function (e) { return e.stopPropagation(); }, onKeyDown: handleKeyDown, style: {
            left: x,
            top: y,
            width: filter ? menuWidth : "auto"
        }, ref: menuWrapper, tabIndex: 0, role: "menu", "aria-activedescendant": "".concat(menuId.current, "-").concat(selectedIndex) },
        !hideHeader && (label ? true : !!options.length) ? (React__default["default"].createElement("div", { className: styles$d.menuHeader },
            React__default["default"].createElement("label", { className: styles$d.menuLabel }, label),
            !hideFilter && options.length ? (React__default["default"].createElement("input", { type: "text", placeholder: "Filter options", value: filter, onChange: handleFilterChange, className: styles$d.menuFilter, autoFocus: true, ref: filterInput })) : null)) : null,
        React__default["default"].createElement("div", { className: styles$d.optionsWrapper, role: "menu", ref: menuOptionsWrapper, style: { maxHeight: clamp_1(window.innerHeight - y - 70, 10, 300) } },
            filteredOptions.map(function (option, i) { return (React__default["default"].createElement(ContextOption, { menuId: menuId.current, selected: selectedIndex === i, onClick: function () { return handleOptionSelected(option); }, onMouseEnter: function () { return setSelectedIndex(null); }, index: i, key: option.value + i },
                React__default["default"].createElement("label", null, option.label),
                option.description ? React__default["default"].createElement("p", null, option.description) : null)); }),
            !options.length ? (React__default["default"].createElement("span", { className: styles$d.emptyText }, emptyText)) : null)));
};
var ContextOption = function (_a) {
    var menuId = _a.menuId, index = _a.index, children = _a.children, onClick = _a.onClick, selected = _a.selected, onMouseEnter = _a.onMouseEnter;
    return (React__default["default"].createElement("div", { className: styles$d.option, role: "menuitem", onClick: onClick, onMouseEnter: onMouseEnter, "data-selected": selected, id: "".concat(menuId, "-").concat(index) }, children));
};

var NodeTypesContext = React__default["default"].createContext();
var PortTypesContext = React__default["default"].createContext();
var NodeDispatchContext = React__default["default"].createContext();
var ConnectionRecalculateContext = React__default["default"].createContext();
var ContextContext = React__default["default"].createContext();
var StageContext = React__default["default"].createContext();
var CacheContext = React__default["default"].createContext();
var RecalculateStageRectContext = React__default["default"].createContext();
var EditorIdContext = React__default["default"].createContext();

var __assign$c = (undefined && undefined.__assign) || function () {
    __assign$c = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$c.apply(this, arguments);
};
var __rest$4 = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var Draggable = (function (_a) {
    var children = _a.children, stageState = _a.stageState, stageRect = _a.stageRect, onDragDelayStart = _a.onDragDelayStart, onDragStart = _a.onDragStart, onDrag = _a.onDrag, onDragEnd = _a.onDragEnd, onMouseDown = _a.onMouseDown, onTouchStart = _a.onTouchStart, disabled = _a.disabled, _b = _a.delay, delay = _b === void 0 ? 6 : _b, innerRef = _a.innerRef, rest = __rest$4(_a, ["children", "stageState", "stageRect", "onDragDelayStart", "onDragStart", "onDrag", "onDragEnd", "onMouseDown", "onTouchStart", "disabled", "delay", "innerRef"]);
    var startCoordinates = React__default["default"].useRef(null);
    var offset = React__default["default"].useRef();
    var wrapper = React__default["default"].useRef();
    var byScale = function (value) { return (1 / stageState.scale) * value; };
    var getScaledCoordinates = function (e) {
        var x = byScale(e.clientX -
            (stageRect ? stageRect.current.left : 0) -
            offset.current.x -
            (stageRect ? stageRect.current.width : 0) / 2) + byScale(stageState.translate.x);
        var y = byScale(e.clientY -
            (stageRect ? stageRect.current.top : 0) -
            offset.current.y -
            (stageRect ? stageRect.current.height : 0) / 2) + byScale(stageState.translate.y);
        return { x: x, y: y };
    };
    var updateCoordinates = function (e) {
        var coordinates = getScaledCoordinates(e);
        if (onDrag) {
            onDrag(coordinates, e);
        }
    };
    var stopDrag = function (e) {
        var coordinates = getScaledCoordinates(e);
        if (onDragEnd) {
            onDragEnd(e, coordinates);
        }
        window.removeEventListener("mouseup", stopDrag);
        window.removeEventListener("mousemove", updateCoordinates);
    };
    var startDrag = function (e) {
        if (onDragStart) {
            onDragStart(e);
        }
        var nodeRect = wrapper.current.getBoundingClientRect();
        offset.current = {
            x: startCoordinates.current.x - nodeRect.left,
            y: startCoordinates.current.y - nodeRect.top
        };
        window.addEventListener("mouseup", stopDrag);
        window.addEventListener("mousemove", updateCoordinates);
    };
    var checkDragDelay = function (e) {
        var x;
        var y;
        if ("ontouchstart" in window && e.touches) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        }
        else {
            e.preventDefault();
            x = e.clientX;
            y = e.clientY;
        }
        var a = Math.abs(startCoordinates.current.x - x);
        var b = Math.abs(startCoordinates.current.y - y);
        var distance = Math.round(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));
        var dragDistance = delay;
        if (distance >= dragDistance) {
            startDrag(e);
            endDragDelay();
        }
    };
    var endDragDelay = function () {
        document.removeEventListener("mouseup", endDragDelay);
        document.removeEventListener("mousemove", checkDragDelay);
        startCoordinates.current = null;
    };
    var startDragDelay = function (e) {
        if (onDragDelayStart) {
            onDragDelayStart(e);
        }
        e.stopPropagation();
        var x;
        var y;
        if ("ontouchstart" in window && e.touches) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        }
        else {
            e.preventDefault();
            x = e.clientX;
            y = e.clientY;
        }
        startCoordinates.current = { x: x, y: y };
        document.addEventListener("mouseup", endDragDelay);
        document.addEventListener("mousemove", checkDragDelay);
    };
    return (React__default["default"].createElement("div", __assign$c({ onMouseDown: function (e) {
            if (!disabled) {
                startDragDelay(e);
            }
            if (onMouseDown) {
                onMouseDown(e);
            }
        }, onTouchStart: function (e) {
            if (!disabled) {
                startDragDelay(e);
            }
            if (onTouchStart) {
                onTouchStart(e);
            }
        }, onDragStart: function (e) {
            e.preventDefault();
            e.stopPropagation();
        }, ref: function (ref) {
            wrapper.current = ref;
            if (innerRef) {
                innerRef.current = ref;
            }
        } }, rest), children));
});

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */

function arrayPush$2(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush$2;

var baseGetTag$3 = _baseGetTag,
    isObjectLike$3 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments$1(value) {
  return isObjectLike$3(value) && baseGetTag$3(value) == argsTag$2;
}

var _baseIsArguments = baseIsArguments$1;

var baseIsArguments = _baseIsArguments,
    isObjectLike$2 = isObjectLike_1;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments$3 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike$2(value) && hasOwnProperty$7.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

var isArguments_1 = isArguments$3;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray$a = Array.isArray;

var isArray_1 = isArray$a;

var Symbol$2 = _Symbol,
    isArguments$2 = isArguments_1,
    isArray$9 = isArray_1;

/** Built-in value references. */
var spreadableSymbol = Symbol$2 ? Symbol$2.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable$1(value) {
  return isArray$9(value) || isArguments$2(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

var _isFlattenable = isFlattenable$1;

var arrayPush$1 = _arrayPush,
    isFlattenable = _isFlattenable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten$1(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten$1(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush$1(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

var _baseFlatten = baseFlatten$1;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */

function arrayMap$2(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap$2;

var isArray$8 = isArray_1,
    isSymbol$3 = isSymbol_1;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey$3(value, object) {
  if (isArray$8(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol$3(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey$3;

var baseGetTag$2 = _baseGetTag,
    isObject$3 = isObject_1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$1 = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$2(value) {
  if (!isObject$3(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag$2(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction$2;

var root$6 = _root;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$6['__core-js_shared__'];

var _coreJsData = coreJsData$1;

var coreJsData = _coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked$1;

/** Used for built-in method references. */

var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource$2;

var isFunction$1 = isFunction_1,
    isMasked = _isMasked,
    isObject$2 = isObject_1,
    toSource$1 = _toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$8 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$6).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject$2(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}

var _baseIsNative = baseIsNative$1;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue$1;

var baseIsNative = _baseIsNative,
    getValue = _getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$7(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var _getNative = getNative$7;

var getNative$6 = _getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate$4 = getNative$6(Object, 'create');

var _nativeCreate = nativeCreate$4;

var nativeCreate$3 = _nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}

var _hashClear = hashClear$1;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete$1;

var nativeCreate$2 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }
  return hasOwnProperty$5.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet$1;

var nativeCreate$1 = _nativeCreate;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$4.call(data, key);
}

var _hashHas = hashHas$1;

var nativeCreate = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet$1;

var hashClear = _hashClear,
    hashDelete = _hashDelete,
    hashGet = _hashGet,
    hashHas = _hashHas,
    hashSet = _hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear;
Hash$1.prototype['delete'] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;

var _Hash = Hash$1;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */

function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear$1;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */

function eq$3(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq$3;

var eq$2 = eq_1;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$2(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf$4;

var assocIndexOf$3 = _assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
      index = assocIndexOf$3(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete$1;

var assocIndexOf$2 = _assocIndexOf;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
      index = assocIndexOf$2(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet$1;

var assocIndexOf$1 = _assocIndexOf;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas$1;

var assocIndexOf = _assocIndexOf;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet$1;

var listCacheClear = _listCacheClear,
    listCacheDelete = _listCacheDelete,
    listCacheGet = _listCacheGet,
    listCacheHas = _listCacheHas,
    listCacheSet = _listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$4(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype['delete'] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;

var _ListCache = ListCache$4;

var getNative$5 = _getNative,
    root$5 = _root;

/* Built-in method references that are verified to be native. */
var Map$3 = getNative$5(root$5, 'Map');

var _Map = Map$3;

var Hash = _Hash,
    ListCache$3 = _ListCache,
    Map$2 = _Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$2 || ListCache$3),
    'string': new Hash
  };
}

var _mapCacheClear = mapCacheClear$1;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */

function isKeyable$1(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable$1;

var isKeyable = _isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData$4;

var getMapData$3 = _getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete$1;

var getMapData$2 = _getMapData;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}

var _mapCacheGet = mapCacheGet$1;

var getMapData$1 = _getMapData;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}

var _mapCacheHas = mapCacheHas$1;

var getMapData = _getMapData;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet$1;

var mapCacheClear = _mapCacheClear,
    mapCacheDelete = _mapCacheDelete,
    mapCacheGet = _mapCacheGet,
    mapCacheHas = _mapCacheHas,
    mapCacheSet = _mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$3(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache$3.prototype.clear = mapCacheClear;
MapCache$3.prototype['delete'] = mapCacheDelete;
MapCache$3.prototype.get = mapCacheGet;
MapCache$3.prototype.has = mapCacheHas;
MapCache$3.prototype.set = mapCacheSet;

var _MapCache = MapCache$3;

var MapCache$2 = _MapCache;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize$1(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache$2);
  return memoized;
}

// Expose `MapCache`.
memoize$1.Cache = MapCache$2;

var memoize_1 = memoize$1;

var memoize = memoize_1;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped$1(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped$1;

var memoizeCapped = _memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath$1 = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath$1;

var Symbol$1 = _Symbol,
    arrayMap$1 = _arrayMap,
    isArray$7 = isArray_1,
    isSymbol$2 = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString$1(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$7(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap$1(value, baseToString$1) + '';
  }
  if (isSymbol$2(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _baseToString = baseToString$1;

var baseToString = _baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$1(value) {
  return value == null ? '' : baseToString(value);
}

var toString_1 = toString$1;

var isArray$6 = isArray_1,
    isKey$2 = _isKey,
    stringToPath = _stringToPath,
    toString = toString_1;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath$2(value, object) {
  if (isArray$6(value)) {
    return value;
  }
  return isKey$2(value, object) ? [value] : stringToPath(toString(value));
}

var _castPath = castPath$2;

var isSymbol$1 = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey$4(value) {
  if (typeof value == 'string' || isSymbol$1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _toKey = toKey$4;

var castPath$1 = _castPath,
    toKey$3 = _toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet$3(object, path) {
  path = castPath$1(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey$3(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet$3;

var ListCache$2 = _ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear$1() {
  this.__data__ = new ListCache$2;
  this.size = 0;
}

var _stackClear = stackClear$1;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function stackDelete$1(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete$1;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function stackGet$1(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet$1;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function stackHas$1(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas$1;

var ListCache$1 = _ListCache,
    Map$1 = _Map,
    MapCache$1 = _MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$1(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet$1;

var ListCache = _ListCache,
    stackClear = _stackClear,
    stackDelete = _stackDelete,
    stackGet = _stackGet,
    stackHas = _stackHas,
    stackSet = _stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack$2(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack$2.prototype.clear = stackClear;
Stack$2.prototype['delete'] = stackDelete;
Stack$2.prototype.get = stackGet;
Stack$2.prototype.has = stackHas;
Stack$2.prototype.set = stackSet;

var _Stack = Stack$2;

/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd$1(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

var _setCacheAdd = setCacheAdd$1;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */

function setCacheHas$1(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas$1;

var MapCache = _MapCache,
    setCacheAdd = _setCacheAdd,
    setCacheHas = _setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache$1(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache$1.prototype.add = SetCache$1.prototype.push = setCacheAdd;
SetCache$1.prototype.has = setCacheHas;

var _SetCache = SetCache$1;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */

function arraySome$1(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome$1;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function cacheHas$1(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas$1;

var SetCache = _SetCache,
    arraySome = _arraySome,
    cacheHas = _cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays$2(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG$3) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays$2;

var root$4 = _root;

/** Built-in value references. */
var Uint8Array$1 = root$4.Uint8Array;

var _Uint8Array = Uint8Array$1;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */

function mapToArray$1(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray$1;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */

function setToArray$1(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray$1;

var Symbol = _Symbol,
    Uint8Array = _Uint8Array,
    eq$1 = eq_1,
    equalArrays$1 = _equalArrays,
    mapToArray = _mapToArray,
    setToArray = _setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag$1(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$2:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag$1:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag$1:
    case dateTag$1:
    case numberTag$1:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq$1(+object, +other);

    case errorTag$1:
      return object.name == other.name && object.message == other.message;

    case regexpTag$1:
    case stringTag$1:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag$2:
      var convert = mapToArray;

    case setTag$2:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays$1(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag$1;

var arrayPush = _arrayPush,
    isArray$5 = isArray_1;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys$1(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$5(object) ? result : arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys$1;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */

function arrayFilter$1(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter$1;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */

function stubArray$1() {
  return [];
}

var stubArray_1 = stubArray$1;

var arrayFilter = _arrayFilter,
    stubArray = stubArray_1;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols$1 = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

var _getSymbols = getSymbols$1;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */

function baseTimes$1(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes$1;

var isBuffer$2 = {exports: {}};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */

function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

(function (module, exports) {
var root = _root,
    stubFalse = stubFalse_1;

/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;
}(isBuffer$2, isBuffer$2.exports));

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex$3(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex$3;

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength$3(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength$3;

var baseGetTag$1 = _baseGetTag,
    isLength$2 = isLength_1,
    isObjectLike$1 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag$1 = '[object Map]',
    numberTag = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag = '[object String]',
    weakMapTag$1 = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag$1] = typedArrayTags[numberTag] =
typedArrayTags[objectTag$2] = typedArrayTags[regexpTag] =
typedArrayTags[setTag$1] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag$1] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray$1(value) {
  return isObjectLike$1(value) &&
    isLength$2(value.length) && !!typedArrayTags[baseGetTag$1(value)];
}

var _baseIsTypedArray = baseIsTypedArray$1;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */

function baseUnary$2(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary$2;

var _nodeUtil = {exports: {}};

(function (module, exports) {
var freeGlobal = _freeGlobal;

/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
}(_nodeUtil, _nodeUtil.exports));

var baseIsTypedArray = _baseIsTypedArray,
    baseUnary$1 = _baseUnary,
    nodeUtil = _nodeUtil.exports;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray$2 = nodeIsTypedArray ? baseUnary$1(nodeIsTypedArray) : baseIsTypedArray;

var isTypedArray_1 = isTypedArray$2;

var baseTimes = _baseTimes,
    isArguments$1 = isArguments_1,
    isArray$4 = isArray_1,
    isBuffer$1 = isBuffer$2.exports,
    isIndex$2 = _isIndex,
    isTypedArray$1 = isTypedArray_1;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys$1(value, inherited) {
  var isArr = isArray$4(value),
      isArg = !isArr && isArguments$1(value),
      isBuff = !isArr && !isArg && isBuffer$1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$3.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex$2(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys$1;

/** Used for built-in method references. */

var objectProto$3 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype$1(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$3;

  return value === proto;
}

var _isPrototype = isPrototype$1;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */

function overArg$1(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg$1;

var overArg = _overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys$1 = overArg(Object.keys, Object);

var _nativeKeys = nativeKeys$1;

var isPrototype = _isPrototype,
    nativeKeys = _nativeKeys;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys$1(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$2.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys$1;

var isFunction = isFunction_1,
    isLength$1 = isLength_1;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike$4(value) {
  return value != null && isLength$1(value.length) && !isFunction(value);
}

var isArrayLike_1 = isArrayLike$4;

var arrayLikeKeys = _arrayLikeKeys,
    baseKeys = _baseKeys,
    isArrayLike$3 = isArrayLike_1;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys$3(object) {
  return isArrayLike$3(object) ? arrayLikeKeys(object) : baseKeys(object);
}

var keys_1 = keys$3;

var baseGetAllKeys = _baseGetAllKeys,
    getSymbols = _getSymbols,
    keys$2 = keys_1;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys$1(object) {
  return baseGetAllKeys(object, keys$2, getSymbols);
}

var _getAllKeys = getAllKeys$1;

var getAllKeys = _getAllKeys;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects$1(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects$1;

var getNative$4 = _getNative,
    root$3 = _root;

/* Built-in method references that are verified to be native. */
var DataView$1 = getNative$4(root$3, 'DataView');

var _DataView = DataView$1;

var getNative$3 = _getNative,
    root$2 = _root;

/* Built-in method references that are verified to be native. */
var Promise$2 = getNative$3(root$2, 'Promise');

var _Promise = Promise$2;

var getNative$2 = _getNative,
    root$1 = _root;

/* Built-in method references that are verified to be native. */
var Set$1 = getNative$2(root$1, 'Set');

var _Set = Set$1;

var getNative$1 = _getNative,
    root = _root;

/* Built-in method references that are verified to be native. */
var WeakMap$1 = getNative$1(root, 'WeakMap');

var _WeakMap = WeakMap$1;

var DataView = _DataView,
    Map = _Map,
    Promise$1 = _Promise,
    Set = _Set,
    WeakMap = _WeakMap,
    baseGetTag = _baseGetTag,
    toSource = _toSource;

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag$1 = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag$1(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag$1(new Map) != mapTag) ||
    (Promise$1 && getTag$1(Promise$1.resolve()) != promiseTag) ||
    (Set && getTag$1(new Set) != setTag) ||
    (WeakMap && getTag$1(new WeakMap) != weakMapTag)) {
  getTag$1 = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

var _getTag = getTag$1;

var Stack$1 = _Stack,
    equalArrays = _equalArrays,
    equalByTag = _equalByTag,
    equalObjects = _equalObjects,
    getTag = _getTag,
    isArray$3 = isArray_1,
    isBuffer = isBuffer$2.exports,
    isTypedArray = isTypedArray_1;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep$1(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray$3(object),
      othIsArr = isArray$3(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack$1);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack$1);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack$1);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep$1;

var baseIsEqualDeep = _baseIsEqualDeep,
    isObjectLike = isObjectLike_1;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual$2(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual$2, stack);
}

var _baseIsEqual = baseIsEqual$2;

var Stack = _Stack,
    baseIsEqual$1 = _baseIsEqual;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch$1(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual$1(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

var _baseIsMatch = baseIsMatch$1;

var isObject$1 = isObject_1;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable$2(value) {
  return value === value && !isObject$1(value);
}

var _isStrictComparable = isStrictComparable$2;

var isStrictComparable$1 = _isStrictComparable,
    keys$1 = keys_1;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData$1(object) {
  var result = keys$1(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable$1(value)];
  }
  return result;
}

var _getMatchData = getMatchData$1;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */

function matchesStrictComparable$2(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

var _matchesStrictComparable = matchesStrictComparable$2;

var baseIsMatch = _baseIsMatch,
    getMatchData = _getMatchData,
    matchesStrictComparable$1 = _matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches$1(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable$1(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches$1;

var baseGet$2 = _baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get$1(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet$2(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get$1;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */

function baseHasIn$1(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn$1;

var castPath = _castPath,
    isArguments = isArguments_1,
    isArray$2 = isArray_1,
    isIndex$1 = _isIndex,
    isLength = isLength_1,
    toKey$2 = _toKey;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath$1(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey$2(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex$1(key, length) &&
    (isArray$2(object) || isArguments(object));
}

var _hasPath = hasPath$1;

var baseHasIn = _baseHasIn,
    hasPath = _hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn$1(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

var hasIn_1 = hasIn$1;

var baseIsEqual = _baseIsEqual,
    get = get_1,
    hasIn = hasIn_1,
    isKey$1 = _isKey,
    isStrictComparable = _isStrictComparable,
    matchesStrictComparable = _matchesStrictComparable,
    toKey$1 = _toKey;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty$1(path, srcValue) {
  if (isKey$1(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey$1(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

var _baseMatchesProperty = baseMatchesProperty$1;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */

function identity$4(value) {
  return value;
}

var identity_1 = identity$4;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */

function baseProperty$1(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty$1;

var baseGet$1 = _baseGet;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep$1(path) {
  return function(object) {
    return baseGet$1(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep$1;

var baseProperty = _baseProperty,
    basePropertyDeep = _basePropertyDeep,
    isKey = _isKey,
    toKey = _toKey;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property$1(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

var property_1 = property$1;

var baseMatches = _baseMatches,
    baseMatchesProperty = _baseMatchesProperty,
    identity$3 = identity_1,
    isArray$1 = isArray_1,
    property = property_1;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee$1(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity$3;
  }
  if (typeof value == 'object') {
    return isArray$1(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

var _baseIteratee = baseIteratee$1;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */

function createBaseFor$1(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

var _createBaseFor = createBaseFor$1;

var createBaseFor = _createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor$1 = createBaseFor();

var _baseFor = baseFor$1;

var baseFor = _baseFor,
    keys = keys_1;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn$1(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

var _baseForOwn = baseForOwn$1;

var isArrayLike$2 = isArrayLike_1;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach$1(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike$2(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

var _createBaseEach = createBaseEach$1;

var baseForOwn = _baseForOwn,
    createBaseEach = _createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach$1 = createBaseEach(baseForOwn);

var _baseEach = baseEach$1;

var baseEach = _baseEach,
    isArrayLike$1 = isArrayLike_1;

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap$1(collection, iteratee) {
  var index = -1,
      result = isArrayLike$1(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

var _baseMap = baseMap$1;

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */

function baseSortBy$1(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

var _baseSortBy = baseSortBy$1;

var isSymbol = isSymbol_1;

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending$1(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

var _compareAscending = compareAscending$1;

var compareAscending = _compareAscending;

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple$1(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

var _compareMultiple = compareMultiple$1;

var arrayMap = _arrayMap,
    baseGet = _baseGet,
    baseIteratee = _baseIteratee,
    baseMap = _baseMap,
    baseSortBy = _baseSortBy,
    baseUnary = _baseUnary,
    compareMultiple = _compareMultiple,
    identity$2 = identity_1,
    isArray = isArray_1;

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy$1(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap(iteratees, function(iteratee) {
      if (isArray(iteratee)) {
        return function(value) {
          return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        }
      }
      return iteratee;
    });
  } else {
    iteratees = [identity$2];
  }

  var index = -1;
  iteratees = arrayMap(iteratees, baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

var _baseOrderBy = baseOrderBy$1;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */

function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply$1;

var apply = _apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest$1(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

var _overRest = overRest$1;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */

function constant$2(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant$2;

var getNative = _getNative;

var defineProperty$1 = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty$1;

var constant$1 = constant_1,
    defineProperty = _defineProperty,
    identity$1 = identity_1;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString$1 = !defineProperty ? identity$1 : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant$1(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString$1;

/** Used to detect hot functions by number of calls within a span of milliseconds. */

var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut$1(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut$1;

var baseSetToString = _baseSetToString,
    shortOut = _shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString$1 = shortOut(baseSetToString);

var _setToString = setToString$1;

var identity = identity_1,
    overRest = _overRest,
    setToString = _setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest$1(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

var _baseRest = baseRest$1;

var eq = eq_1,
    isArrayLike = isArrayLike_1,
    isIndex = _isIndex,
    isObject = isObject_1;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall$1(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall$1;

var baseFlatten = _baseFlatten,
    baseOrderBy = _baseOrderBy,
    baseRest = _baseRest,
    isIterateeCall = _isIterateeCall;

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 30 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
 */
var sortBy = baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});

var sortBy_1 = sortBy;

var STAGE_ID = '__node_editor_stage__';
var DRAG_CONNECTION_ID = '__node_editor_drag_connection__';
var CONNECTIONS_ID = '__node_editor_connections__';

var styles$c = {"wrapper":"Stage-module_wrapper__4mnnp","transformWrapper":"Stage-module_transformWrapper__sSHnC","scaleWrapper":"Stage-module_scaleWrapper__PEsM4"};

var Stage = function (_a) {
    var scale = _a.scale, translate = _a.translate, editorId = _a.editorId, dispatchStageState = _a.dispatchStageState, children = _a.children, outerStageChildren = _a.outerStageChildren, numNodes = _a.numNodes, stageRef = _a.stageRef, spaceToPan = _a.spaceToPan, dispatchComments = _a.dispatchComments, disableComments = _a.disableComments, disablePan = _a.disablePan, disableZoom = _a.disableZoom;
    var nodeTypes = React__default["default"].useContext(NodeTypesContext);
    var dispatchNodes = React__default["default"].useContext(NodeDispatchContext);
    var wrapper = React__default["default"].useRef();
    var translateWrapper = React__default["default"].useRef();
    var _b = React__default["default"].useState(false), menuOpen = _b[0], setMenuOpen = _b[1];
    var _c = React__default["default"].useState({ x: 0, y: 0 }), menuCoordinates = _c[0], setMenuCoordinates = _c[1];
    var dragData = React__default["default"].useRef({ x: 0, y: 0 });
    var _d = React__default["default"].useState(false), spaceIsPressed = _d[0], setSpaceIsPressed = _d[1];
    var setStageRect = React__default["default"].useCallback(function () {
        stageRef.current = wrapper.current.getBoundingClientRect();
    }, []);
    React__default["default"].useEffect(function () {
        stageRef.current = wrapper.current.getBoundingClientRect();
        window.addEventListener("resize", setStageRect);
        return function () {
            window.removeEventListener("resize", setStageRect);
        };
    }, [stageRef, setStageRect]);
    var handleWheel = React__default["default"].useCallback(function (e) {
        if (e.target.nodeName === "TEXTAREA" || e.target.dataset.comment) {
            if (e.target.clientHeight < e.target.scrollHeight)
                return;
        }
        e.preventDefault();
        if (numNodes > 0) {
            var delta_1 = e.deltaY;
            dispatchStageState(function (_a) {
                var scale = _a.scale;
                return ({
                    type: "SET_SCALE",
                    scale: clamp_1(scale - clamp_1(delta_1, -10, 10) * 0.005, 0.1, 7)
                });
            });
        }
    }, [dispatchStageState, numNodes]);
    var handleDragDelayStart = function (e) {
        wrapper.current.focus();
    };
    var handleDragStart = function (e) {
        e.preventDefault();
        dragData.current = {
            x: e.clientX,
            y: e.clientY
        };
    };
    var handleMouseDrag = function (coords, e) {
        var xDistance = dragData.current.x - e.clientX;
        var yDistance = dragData.current.y - e.clientY;
        translateWrapper.current.style.transform = "translate(".concat(-(translate.x + xDistance), "px, ").concat(-(translate.y + yDistance), "px)");
    };
    var handleDragEnd = function (e) {
        var xDistance = dragData.current.x - e.clientX;
        var yDistance = dragData.current.y - e.clientY;
        dragData.current.x = e.clientX;
        dragData.current.y = e.clientY;
        dispatchStageState(function (_a) {
            var tran = _a.translate;
            return ({
                type: "SET_TRANSLATE",
                translate: {
                    x: tran.x + xDistance,
                    y: tran.y + yDistance
                }
            });
        });
    };
    var handleContextMenu = function (e) {
        e.preventDefault();
        setMenuCoordinates({ x: e.clientX, y: e.clientY });
        setMenuOpen(true);
        return false;
    };
    var closeContextMenu = function () {
        setMenuOpen(false);
    };
    var byScale = function (value) { return (1 / scale) * value; };
    var addNode = function (_a) {
        var node = _a.node, internalType = _a.internalType;
        var wrapperRect = wrapper.current.getBoundingClientRect();
        var x = byScale(menuCoordinates.x - wrapperRect.x - wrapperRect.width / 2) +
            byScale(translate.x);
        var y = byScale(menuCoordinates.y - wrapperRect.y - wrapperRect.height / 2) +
            byScale(translate.y);
        if (internalType === "comment") {
            dispatchComments({
                type: "ADD_COMMENT",
                x: x,
                y: y
            });
        }
        else {
            dispatchNodes({
                type: "ADD_NODE",
                x: x,
                y: y,
                nodeType: node.type
            });
        }
    };
    var handleDocumentKeyUp = function (e) {
        if (e.which === 32) {
            setSpaceIsPressed(false);
            document.removeEventListener("keyup", handleDocumentKeyUp);
        }
    };
    var handleKeyDown = function (e) {
        if (e.which === 32 && document.activeElement === wrapper.current) {
            e.preventDefault();
            e.stopPropagation();
            setSpaceIsPressed(true);
            document.addEventListener("keyup", handleDocumentKeyUp);
        }
    };
    var handleMouseEnter = function () {
        if (!wrapper.current.contains(document.activeElement)) {
            wrapper.current.focus();
        }
    };
    React__default["default"].useEffect(function () {
        if (!disableZoom) {
            var stageWrapper_1 = wrapper.current;
            stageWrapper_1.addEventListener("wheel", handleWheel);
            return function () {
                stageWrapper_1.removeEventListener("wheel", handleWheel);
            };
        }
    }, [handleWheel, disableZoom]);
    var menuOptions = React__default["default"].useMemo(function () {
        var options = sortBy_1(Object.values(nodeTypes)
            .filter(function (node) { return node.addable !== false; })
            .map(function (node) { return ({
            value: node.type,
            label: node.label,
            description: node.description,
            sortIndex: node.sortIndex,
            node: node
        }); }), ["sortIndex", "label"]);
        if (!disableComments) {
            options.push({ value: "comment", label: "Comment", description: "A comment for documenting nodes", internalType: "comment" });
        }
        return options;
    }, [nodeTypes, disableComments]);
    return (React__default["default"].createElement(Draggable, { id: "".concat(STAGE_ID).concat(editorId), className: styles$c.wrapper, innerRef: wrapper, onContextMenu: handleContextMenu, onMouseEnter: handleMouseEnter, onDragDelayStart: handleDragDelayStart, onDragStart: handleDragStart, onDrag: handleMouseDrag, onDragEnd: handleDragEnd, onKeyDown: handleKeyDown, tabIndex: -1, stageState: { scale: scale, translate: translate }, style: { cursor: spaceIsPressed && spaceToPan ? "grab" : "" }, disabled: disablePan || (spaceToPan && !spaceIsPressed), "data-flume-stage": true },
        menuOpen ? (React__default["default"].createElement(Portal$1, null,
            React__default["default"].createElement(ContextMenu, { x: menuCoordinates.x, y: menuCoordinates.y, options: menuOptions, onRequestClose: closeContextMenu, onOptionSelected: addNode, label: "Add Node" }))) : null,
        React__default["default"].createElement("div", { ref: translateWrapper, className: styles$c.transformWrapper, style: { transform: "translate(".concat(-translate.x, "px, ").concat(-translate.y, "px)") } },
            React__default["default"].createElement("div", { className: styles$c.scaleWrapper, style: { transform: "scale(".concat(scale, ")") } }, children)),
        outerStageChildren));
};

var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

function constant(x) {
  return function constant() {
    return x;
  };
}

function array(x) {
  return typeof x === "object" && "length" in x
    ? x // Array, TypedArray, NodeList, array-like
    : Array.from(x); // Map, Set, iterable, string, or anything else
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // falls through
      default: this._context.lineTo(x, y); break;
    }
  }
};

function curveLinear(context) {
  return new Linear(context);
}

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

function line(x$1, y$1) {
  var defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  x$1 = typeof x$1 === "function" ? x$1 : (x$1 === undefined) ? x : constant(x$1);
  y$1 = typeof y$1 === "function" ? y$1 : (y$1 === undefined) ? y : constant(y$1);

  function line(data) {
    var i,
        n = (data = array(data)).length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), line) : x$1;
  };

  line.y = function(_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), line) : y$1;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

function point(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point(this, this._x1, this._y1); // falls through
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // falls through
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function curveBasis(context) {
  return new Basis(context);
}

var styles$b = {"svg":"Connection-module_svg__as47u"};

var getPort = function (nodeId, portName, transputType) {
    if (transputType === void 0) { transputType = "input"; }
    return document
        .querySelector("[data-node-id=\"".concat(nodeId, "\"] [data-port-name=\"").concat(portName, "\"][data-port-transput-type=\"").concat(transputType, "\"]"));
};
var getPortRect = function (nodeId, portName, transputType, cache) {
    if (transputType === void 0) { transputType = "input"; }
    if (cache) {
        var portCacheName = nodeId + portName + transputType;
        var cachedPort = cache.current.ports[portCacheName];
        if (cachedPort) {
            return cachedPort.getBoundingClientRect();
        }
        else {
            var port = getPort(nodeId, portName, transputType);
            cache.current.ports[portCacheName] = port;
            return port && port.getBoundingClientRect();
        }
    }
    else {
        var port = getPort(nodeId, portName, transputType);
        return port && port.getBoundingClientRect();
    }
};
var calculateCurve = function (from, to) {
    var length = to.x - from.x;
    var thirdLength = length / 3;
    var curve = line().curve(curveBasis)([
        [from.x, from.y],
        [from.x + thirdLength, from.y],
        [from.x + thirdLength * 2, to.y],
        [to.x, to.y]
    ]);
    return curve;
};
var deleteConnection = function (_a) {
    var id = _a.id;
    var line = document.querySelector("[data-connection-id=\"".concat(id, "\"]"));
    if (line)
        line.parentNode.remove();
};
var deleteConnectionsByNodeId = function (nodeId) {
    var lines = document.querySelectorAll("[data-output-node-id=\"".concat(nodeId, "\"], [data-input-node-id=\"").concat(nodeId, "\"]"));
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line_1 = lines_1[_i];
        line_1.parentNode.remove();
    }
};
var updateConnection = function (_a) {
    var line = _a.line, from = _a.from, to = _a.to;
    line.setAttribute("d", calculateCurve(from, to));
};
var createSVG = function (_a) {
    var from = _a.from, to = _a.to, stage = _a.stage, id = _a.id, outputNodeId = _a.outputNodeId, outputPortName = _a.outputPortName, inputNodeId = _a.inputNodeId, inputPortName = _a.inputPortName, stroke = _a.stroke;
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", styles$b.svg);
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var curve = calculateCurve(from, to);
    path.setAttribute("d", curve);
    path.setAttribute("stroke", stroke);
    path.setAttribute("stroke-width", "3");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("fill", "none");
    path.setAttribute("data-connection-id", id);
    path.setAttribute("data-output-node-id", outputNodeId);
    path.setAttribute("data-output-port-name", outputPortName);
    path.setAttribute("data-input-node-id", inputNodeId);
    path.setAttribute("data-input-port-name", inputPortName);
    svg.appendChild(path);
    stage.appendChild(svg);
    return svg;
};
var getStageRef = function (editorId) {
    return document.getElementById("".concat(CONNECTIONS_ID).concat(editorId));
};
var createConnections = function (nodes, _a, editorId, portTypes) {
    var scale = _a.scale; _a.stageId;
    var stageRef = getStageRef(editorId);
    if (stageRef) {
        var stage_1 = stageRef.getBoundingClientRect();
        var stageHalfWidth_1 = stage_1.width / 2;
        var stageHalfHeight_1 = stage_1.height / 2;
        var byScale_1 = function (value) { return (1 / scale) * value; };
        Object.values(nodes).forEach(function (node) {
            if (node.connections && node.connections.inputs) {
                Object.entries(node.connections.inputs).forEach(function (_a, k) {
                    var inputName = _a[0], outputs = _a[1];
                    outputs.forEach(function (output) {
                        var fromPort = getPortRect(output.nodeId, output.portName, "output");
                        var toPort = getPortRect(node.id, inputName, "input");
                        var portHalf = fromPort ? fromPort.width / 2 : 0;
                        if (fromPort && toPort) {
                            var id = output.nodeId + output.portName + node.id + inputName;
                            var existingLine = document.querySelector("[data-connection-id=\"".concat(id, "\"]"));
                            if (existingLine) {
                                updateConnection({
                                    line: existingLine,
                                    from: {
                                        x: byScale_1(fromPort.x - stage_1.x + portHalf - stageHalfWidth_1),
                                        y: byScale_1(fromPort.y - stage_1.y + portHalf - stageHalfHeight_1)
                                    },
                                    to: {
                                        x: byScale_1(toPort.x - stage_1.x + portHalf - stageHalfWidth_1),
                                        y: byScale_1(toPort.y - stage_1.y + portHalf - stageHalfHeight_1)
                                    }
                                });
                            }
                            else {
                                // const x = document.querySelector(
                                //   `[data-input-node-id="${output.nodeId}"]`
                                // );
                                // console.log(x ? x.dataset : null, output);
                                // const stroke = portTypes[inputName].color;
                                createSVG({
                                    id: id,
                                    outputNodeId: output.nodeId,
                                    outputPortName: output.portName,
                                    inputNodeId: node.id,
                                    inputPortName: inputName,
                                    stroke: 'rgba(200, 200, 200, 0.9)',
                                    from: {
                                        x: byScale_1(fromPort.x - stage_1.x + portHalf - stageHalfWidth_1),
                                        y: byScale_1(fromPort.y - stage_1.y + portHalf - stageHalfHeight_1)
                                    },
                                    to: {
                                        x: byScale_1(toPort.x - stage_1.x + portHalf - stageHalfWidth_1),
                                        y: byScale_1(toPort.y - stage_1.y + portHalf - stageHalfHeight_1)
                                    },
                                    stage: stageRef
                                });
                            }
                        }
                    });
                });
            }
        });
    }
};

var styles$a = {"wrapper":"Checkbox-module_wrapper__PqN7h","checkbox":"Checkbox-module_checkbox__Sr-um","label":"Checkbox-module_label__lvTV-"};

var Checkbox = function (_a) {
    var label = _a.label, data = _a.data, onChange = _a.onChange;
    var id = React__default["default"].useRef(nanoid(10));
    return (React__default["default"].createElement("div", { className: styles$a.wrapper },
        React__default["default"].createElement("input", { className: styles$a.checkbox, type: "checkbox", id: id, value: data, checked: data, onChange: function (e) { return onChange(e.target.checked); } }),
        React__default["default"].createElement("label", { className: styles$a.label, htmlFor: id }, label)));
};

var styles$9 = {"wrapper":"TextInput-module_wrapper__z4wcl","input":"TextInput-module_input__UOLLa"};

var TextInput = function (_a) {
    var placeholder = _a.placeholder, updateNodeConnections = _a.updateNodeConnections, onChange = _a.onChange, data = _a.data, step = _a.step, type = _a.type;
    var numberInput = React__default["default"].useRef();
    var recalculateStageRect = React__default["default"].useContext(RecalculateStageRectContext);
    var handleDragEnd = function () {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleDragEnd);
    };
    var handleMouseMove = function (e) {
        e.stopPropagation();
        updateNodeConnections();
    };
    var handlePossibleResize = function (e) {
        e.stopPropagation();
        recalculateStageRect();
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleDragEnd);
    };
    return (React__default["default"].createElement("div", { className: styles$9.wrapper }, type === "number" ? (React__default["default"].createElement("input", { onKeyDown: function (e) {
            if (e.keyCode === 69) {
                e.preventDefault();
                return false;
            }
        }, onChange: function (e) {
            var inputValue = e.target.value.replace(/[^0-9.]+/g, '');
            if (!!inputValue) {
                var value = parseFloat(inputValue, 10);
                if (Number.isNaN(value)) {
                    onChange(0);
                }
                else {
                    onChange(value);
                    numberInput.current.value = value;
                }
            }
        }, onBlur: function (e) {
            if (!e.target.value) {
                onChange(0);
                numberInput.current.value = 0;
            }
        }, step: step || "1", onMouseDown: handlePossibleResize, type: type || "text", placeholder: placeholder, className: styles$9.input, defaultValue: data, onDragStart: function (e) { return e.stopPropagation(); }, ref: numberInput })) : (React__default["default"].createElement("textarea", { onChange: function (e) { return onChange(e.target.value); }, onMouseDown: handlePossibleResize, type: "text", placeholder: placeholder, className: styles$9.input, value: data, onDragStart: function (e) { return e.stopPropagation(); } }))));
};

var styles$8 = {"wrapper":"Select-module_wrapper__WC4Xv","chipWrapper":"Select-module_chipWrapper__9cKYa","deleteButton":"Select-module_deleteButton__pZU6Q","chipsWrapper":"Select-module_chipsWrapper__hUO6Y","selectedWrapper":"Select-module_selectedWrapper__6286l"};

var __assign$b = (undefined && undefined.__assign) || function () {
    __assign$b = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$b.apply(this, arguments);
};
var __spreadArray$3 = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var MAX_LABEL_LENGTH = 50;
var Select = function (_a) {
    var _b = _a.options, options = _b === void 0 ? [] : _b, _c = _a.placeholder, placeholder = _c === void 0 ? "[Select an option]" : _c, onChange = _a.onChange, data = _a.data, allowMultiple = _a.allowMultiple;
    var _d = React__default["default"].useState(false), drawerOpen = _d[0], setDrawerOpen = _d[1];
    var _e = React__default["default"].useState({
        x: 0,
        y: 0
    }), drawerCoordinates = _e[0], setDrawerCoordinates = _e[1];
    var wrapper = React__default["default"].useRef();
    var closeDrawer = function () {
        setDrawerOpen(false);
    };
    var openDrawer = function () {
        if (!drawerOpen) {
            var wrapperRect = wrapper.current.getBoundingClientRect();
            setDrawerCoordinates({
                x: wrapperRect.x,
                y: wrapperRect.y + wrapperRect.height
            });
            setDrawerOpen(true);
        }
    };
    var handleOptionSelected = function (option) {
        if (allowMultiple) {
            onChange(__spreadArray$3(__spreadArray$3([], data, true), [option.value], false));
        }
        else {
            onChange(option.value);
        }
    };
    var handleOptionDeleted = function (optionIndex) {
        onChange(__spreadArray$3(__spreadArray$3([], data.slice(0, optionIndex), true), data.slice(optionIndex + 1), true));
    };
    var getFilteredOptions = function () { return (allowMultiple ?
        options.filter(function (opt) { return !data.includes(opt.value); })
        : options); };
    var selectedOption = React__default["default"].useMemo(function () {
        var option = options.find(function (o) { return o.value === data; });
        if (option) {
            return __assign$b(__assign$b({}, option), { label: option.label.length > MAX_LABEL_LENGTH
                    ? option.label.slice(0, MAX_LABEL_LENGTH) + "..."
                    : option.label });
        }
    }, [options, data]);
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        allowMultiple ? (data.length ? (React__default["default"].createElement("div", { className: styles$8.chipsWrapper }, data.map(function (val, i) {
            var optLabel = (options.find(function (opt) { return opt.value === val; }) || {}).label || "";
            return (React__default["default"].createElement(OptionChip, { onRequestDelete: function () { return handleOptionDeleted(i); }, key: val }, optLabel));
        }))) : null) : data ? (React__default["default"].createElement(SelectedOption, { wrapperRef: wrapper, option: selectedOption, onClick: openDrawer })) : null,
        (allowMultiple || !data) &&
            React__default["default"].createElement("div", { className: styles$8.wrapper, ref: wrapper, onClick: openDrawer }, placeholder),
        drawerOpen && (React__default["default"].createElement(Portal$1, null,
            React__default["default"].createElement(ContextMenu, { x: drawerCoordinates.x, y: drawerCoordinates.y, emptyText: "There are no options", options: getFilteredOptions(), onOptionSelected: handleOptionSelected, onRequestClose: closeDrawer })))));
};
var SelectedOption = function (_a) {
    var _b = _a.option, _c = _b === void 0 ? {} : _b, label = _c.label, description = _c.description, wrapperRef = _a.wrapperRef, onClick = _a.onClick;
    return (React__default["default"].createElement("div", { className: styles$8.selectedWrapper, onClick: onClick, ref: wrapperRef },
        React__default["default"].createElement("label", null, label),
        description ? React__default["default"].createElement("p", null, description) : null));
};
var OptionChip = function (_a) {
    var children = _a.children, onRequestDelete = _a.onRequestDelete;
    return (React__default["default"].createElement("div", { className: styles$8.chipWrapper },
        children,
        React__default["default"].createElement("button", { className: styles$8.deleteButton, onMouseDown: function (e) {
                e.stopPropagation();
            }, onClick: onRequestDelete }, "\u2715")));
};

var styles$7 = {"wrapper":"Control-module_wrapper__WhTVh","label":"Control-module_label__-ky3l","controlLabel":"Control-module_controlLabel__AW3xe"};

var __assign$a = (undefined && undefined.__assign) || function () {
    __assign$a = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$a.apply(this, arguments);
};
var Control = function (_a) {
    var type = _a.type, name = _a.name, nodeId = _a.nodeId, portName = _a.portName, label = _a.label, inputLabel = _a.inputLabel, data = _a.data, allData = _a.allData, render = _a.render, step = _a.step, _b = _a.options, options = _b === void 0 ? [] : _b, placeholder = _a.placeholder, inputData = _a.inputData, triggerRecalculation = _a.triggerRecalculation, updateNodeConnections = _a.updateNodeConnections, getOptions = _a.getOptions, setValue = _a.setValue, defaultValue = _a.defaultValue, isMonoControl = _a.isMonoControl;
    var nodesDispatch = React__default["default"].useContext(NodeDispatchContext);
    var executionContext = React__default["default"].useContext(ContextContext);
    var calculatedLabel = isMonoControl ? inputLabel : label;
    var onChange = function (data) {
        nodesDispatch({
            type: "SET_PORT_DATA",
            data: data,
            nodeId: nodeId,
            portName: portName,
            controlName: name,
            setValue: setValue
        });
        triggerRecalculation();
    };
    var getControlByType = function (type) {
        var commonProps = {
            triggerRecalculation: triggerRecalculation,
            updateNodeConnections: updateNodeConnections,
            onChange: onChange,
            data: data
        };
        switch (type) {
            case "select":
                return (React__default["default"].createElement(Select, __assign$a({}, commonProps, { options: getOptions ? getOptions(inputData, executionContext) : options, placeholder: placeholder })));
            case "text":
                return React__default["default"].createElement(TextInput, __assign$a({}, commonProps, { placeholder: placeholder }));
            case "number":
                return (React__default["default"].createElement(TextInput, __assign$a({}, commonProps, { step: step, type: "number", placeholder: placeholder })));
            case "checkbox":
                return React__default["default"].createElement(Checkbox, __assign$a({}, commonProps, { label: calculatedLabel }));
            case "multiselect":
                return (React__default["default"].createElement(Select, __assign$a({ allowMultiple: true }, commonProps, { options: getOptions ? getOptions(inputData, executionContext) : options, placeholder: placeholder, label: label })));
            case "custom":
                return render(data, onChange, executionContext, triggerRecalculation, {
                    label: label,
                    name: name,
                    portName: portName,
                    inputLabel: inputLabel,
                    defaultValue: defaultValue
                }, allData);
            default:
                return React__default["default"].createElement("div", null, "Control");
        }
    };
    return (React__default["default"].createElement("div", { className: styles$7.wrapper },
        calculatedLabel && type !== "checkbox" && type !== "custom" && (React__default["default"].createElement("label", { className: styles$7.controlLabel }, calculatedLabel)),
        getControlByType(type)));
};

var Connection = function (_a) {
    var from = _a.from, to = _a.to, id = _a.id, lineRef = _a.lineRef, outputNodeId = _a.outputNodeId, outputPortName = _a.outputPortName, inputNodeId = _a.inputNodeId, inputPortName = _a.inputPortName, stroke = _a.stroke;
    var curve = calculateCurve(from, to);
    return (React__default["default"].createElement("svg", { className: styles$b.svg },
        React__default["default"].createElement("path", { "data-connection-id": id, "data-output-node-id": outputNodeId, "data-output-port-name": outputPortName, "data-input-node-id": inputNodeId, "data-input-port-name": inputPortName, stroke: stroke, fill: "none", strokeWidth: 3, strokeLinecap: "round", d: curve, ref: lineRef })));
};

var usePrevious = function (value) {
    var ref = React__default["default"].useRef();
    React__default["default"].useEffect(function () {
        ref.current = value;
    });
    return ref.current;
};

var styles$6 = {"wrapper":"IoPorts-module_wrapper__Qn-hL","inputs":"IoPorts-module_inputs__8eu0c","transput":"IoPorts-module_transput__AVDTt","portLabel":"IoPorts-module_portLabel__wcQF5","port":"IoPorts-module_port__uhUMU","outputs":"IoPorts-module_outputs__J3jf5","controls":"IoPorts-module_controls__gdFEh"};

var __assign$9 = (undefined && undefined.__assign) || function () {
    __assign$9 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$9.apply(this, arguments);
};
function useTransputs(transputsFn, transputType, nodeId, inputData, connections) {
    var nodesDispatch = React__default["default"].useContext(NodeDispatchContext);
    var executionContext = React__default["default"].useContext(ContextContext);
    var transputs = React__default["default"].useMemo(function () {
        if (Array.isArray(transputsFn))
            return transputsFn;
        return transputsFn(inputData, connections, executionContext);
    }, [transputsFn, inputData, connections, executionContext]);
    var prevTransputs = usePrevious(transputs);
    React__default["default"].useEffect(function () {
        if (!prevTransputs || Array.isArray(transputsFn))
            return;
        var _loop_1 = function (transput) {
            var current = transputs.find(function (_a) {
                var name = _a.name;
                return transput.name === name;
            });
            if (!current) {
                nodesDispatch({
                    type: 'DESTROY_TRANSPUT',
                    transputType: transputType,
                    transput: { nodeId: nodeId, portName: '' + transput.name }
                });
            }
        };
        for (var _i = 0, prevTransputs_1 = prevTransputs; _i < prevTransputs_1.length; _i++) {
            var transput = prevTransputs_1[_i];
            _loop_1(transput);
        }
    }, [transputsFn, transputs, prevTransputs, nodesDispatch, nodeId, transputType]);
    return transputs;
}
var IoPorts = function (_a) {
    var nodeId = _a.nodeId, _b = _a.inputs, inputs = _b === void 0 ? [] : _b, _c = _a.outputs, outputs = _c === void 0 ? [] : _c, connections = _a.connections, inputData = _a.inputData, updateNodeConnections = _a.updateNodeConnections;
    var inputTypes = React__default["default"].useContext(PortTypesContext);
    var triggerRecalculation = React__default["default"].useContext(ConnectionRecalculateContext);
    var resolvedInputs = useTransputs(inputs, 'input', nodeId, inputData, connections);
    var resolvedOutputs = useTransputs(outputs, 'output', nodeId, inputData, connections);
    return (React__default["default"].createElement("div", { className: styles$6.wrapper },
        resolvedInputs.length ? (React__default["default"].createElement("div", { className: styles$6.inputs }, resolvedInputs.map(function (input) { return (React__default["default"].createElement(Input, __assign$9({}, input, { data: inputData[input.name] || {}, isConnected: !!connections.inputs[input.name], triggerRecalculation: triggerRecalculation, updateNodeConnections: updateNodeConnections, inputTypes: inputTypes, nodeId: nodeId, inputData: inputData, key: input.name }))); }))) : null,
        !!resolvedOutputs.length && (React__default["default"].createElement("div", { className: styles$6.outputs }, resolvedOutputs.map(function (output) { return (React__default["default"].createElement(Output, __assign$9({}, output, { triggerRecalculation: triggerRecalculation, inputTypes: inputTypes, nodeId: nodeId, inputData: inputData, portOnRight: true, key: output.name }))); })))));
};
var Input = function (_a) {
    var type = _a.type, label = _a.label, name = _a.name, nodeId = _a.nodeId, data = _a.data, localControls = _a.controls, inputTypes = _a.inputTypes, noControls = _a.noControls, triggerRecalculation = _a.triggerRecalculation, updateNodeConnections = _a.updateNodeConnections, isConnected = _a.isConnected, inputData = _a.inputData, hidePort = _a.hidePort;
    var _b = inputTypes[type] || {}, defaultLabel = _b.label, color = _b.color, _c = _b.controls, defaultControls = _c === void 0 ? [] : _c;
    var prevConnected = usePrevious(isConnected);
    var controls = localControls || defaultControls;
    React__default["default"].useEffect(function () {
        if (isConnected !== prevConnected) {
            triggerRecalculation();
        }
    }, [isConnected, prevConnected, triggerRecalculation]);
    return (React__default["default"].createElement("div", { className: styles$6.transput, "data-controlless": isConnected || noControls || !controls.length, onDragStart: function (e) {
            e.preventDefault();
            e.stopPropagation();
        } },
        !hidePort ? (React__default["default"].createElement(Port, { type: type, color: color, name: name, nodeId: nodeId, isInput: true, triggerRecalculation: triggerRecalculation })) : null,
        (!controls.length || noControls || isConnected) && (React__default["default"].createElement("label", { className: styles$6.portLabel }, label || defaultLabel)),
        !noControls && !isConnected
            ? (React__default["default"].createElement("div", { className: styles$6.controls }, controls.map(function (control) { return (React__default["default"].createElement(Control, __assign$9({}, control, { nodeId: nodeId, portName: name, triggerRecalculation: triggerRecalculation, updateNodeConnections: updateNodeConnections, inputLabel: label, data: data[control.name], allData: data, key: control.name, inputData: inputData, isMonoControl: controls.length === 1 }))); })))
            : null));
};
var Output = function (_a) {
    var label = _a.label, name = _a.name, nodeId = _a.nodeId, type = _a.type, inputTypes = _a.inputTypes, triggerRecalculation = _a.triggerRecalculation;
    var _b = inputTypes[type] || {}, defaultLabel = _b.label, color = _b.color;
    return (React__default["default"].createElement("div", { className: styles$6.transput, "data-controlless": true, onDragStart: function (e) {
            e.preventDefault();
            e.stopPropagation();
        } },
        React__default["default"].createElement("label", { className: styles$6.portLabel }, label || defaultLabel),
        React__default["default"].createElement(Port, { type: type, name: name, color: color, nodeId: nodeId, triggerRecalculation: triggerRecalculation })));
};
var Port = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "grey" : _b, _c = _a.name, name = _c === void 0 ? "" : _c, type = _a.type, isInput = _a.isInput, nodeId = _a.nodeId, triggerRecalculation = _a.triggerRecalculation;
    var nodesDispatch = React__default["default"].useContext(NodeDispatchContext);
    var stageState = React__default["default"].useContext(StageContext);
    var editorId = React__default["default"].useContext(EditorIdContext);
    var stageId = "".concat(STAGE_ID).concat(editorId);
    var inputTypes = React__default["default"].useContext(PortTypesContext);
    var _d = React__default["default"].useState(false), isDragging = _d[0], setIsDragging = _d[1];
    var _e = React__default["default"].useState({
        x: 0,
        y: 0
    }), dragStartCoordinates = _e[0], setDragStartCoordinates = _e[1];
    var dragStartCoordinatesCache = React__default["default"].useRef(dragStartCoordinates);
    var port = React__default["default"].useRef();
    var line = React__default["default"].useRef();
    var lineInToPort = React__default["default"].useRef();
    var byScale = function (value) { return (1 / stageState.scale) * value; };
    var handleDrag = function (e) {
        var stage = document
            .getElementById(stageId)
            .getBoundingClientRect();
        if (isInput) {
            var to = {
                x: byScale(e.clientX - stage.x - stage.width / 2) +
                    byScale(stageState.translate.x),
                y: byScale(e.clientY - stage.y - stage.height / 2) +
                    byScale(stageState.translate.y)
            };
            lineInToPort.current.setAttribute("d", calculateCurve(dragStartCoordinatesCache.current, to));
        }
        else {
            var to = {
                x: byScale(e.clientX - stage.x - stage.width / 2) +
                    byScale(stageState.translate.x),
                y: byScale(e.clientY - stage.y - stage.height / 2) +
                    byScale(stageState.translate.y)
            };
            line.current.setAttribute("d", calculateCurve(dragStartCoordinatesCache.current, to));
        }
    };
    var handleDragEnd = function (e) {
        var droppedOnPort = !!e.target.dataset.portName;
        if (isInput) {
            var _a = lineInToPort.current.dataset, inputNodeId = _a.inputNodeId, inputPortName = _a.inputPortName, outputNodeId = _a.outputNodeId, outputPortName = _a.outputPortName;
            nodesDispatch({
                type: "REMOVE_CONNECTION",
                input: { nodeId: inputNodeId, portName: inputPortName },
                output: { nodeId: outputNodeId, portName: outputPortName }
            });
            if (droppedOnPort) {
                var _b = e.target.dataset, connectToPortName = _b.portName, connectToNodeId = _b.nodeId, connectToPortType = _b.portType, connectToTransputType = _b.portTransputType;
                var isNotSameNode = outputNodeId !== connectToNodeId;
                if (isNotSameNode && connectToTransputType !== "output") {
                    var inputWillAcceptConnection = inputTypes[connectToPortType].acceptTypes.includes(type);
                    if (inputWillAcceptConnection) {
                        nodesDispatch({
                            type: "ADD_CONNECTION",
                            input: { nodeId: connectToNodeId, portName: connectToPortName },
                            output: { nodeId: outputNodeId, portName: outputPortName }
                        });
                    }
                }
            }
        }
        else {
            if (droppedOnPort) {
                var _c = e.target.dataset, inputPortName = _c.portName, inputNodeId = _c.nodeId, inputNodeType = _c.portType, inputTransputType = _c.portTransputType;
                var isNotSameNode = inputNodeId !== nodeId;
                if (isNotSameNode && inputTransputType !== "output") {
                    var inputWillAcceptConnection = inputTypes[inputNodeType].acceptTypes.includes(type);
                    if (inputWillAcceptConnection) {
                        nodesDispatch({
                            type: "ADD_CONNECTION",
                            output: { nodeId: nodeId, portName: name },
                            input: { nodeId: inputNodeId, portName: inputPortName }
                        });
                        triggerRecalculation();
                    }
                }
            }
        }
        setIsDragging(false);
        document.removeEventListener("mouseup", handleDragEnd);
        document.removeEventListener("mousemove", handleDrag);
    };
    var handleDragStart = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var startPort = port.current.getBoundingClientRect();
        var stage = document
            .getElementById(stageId)
            .getBoundingClientRect();
        if (isInput) {
            lineInToPort.current = document.querySelector("[data-input-node-id=\"".concat(nodeId, "\"][data-input-port-name=\"").concat(name, "\"]"));
            var portIsConnected = !!lineInToPort.current;
            if (portIsConnected) {
                lineInToPort.current.parentNode.style.zIndex = 9999;
                var outputPort = getPortRect(lineInToPort.current.dataset.outputNodeId, lineInToPort.current.dataset.outputPortName, "output");
                var coordinates = {
                    x: byScale(outputPort.x - stage.x + outputPort.width / 2 - stage.width / 2) + byScale(stageState.translate.x),
                    y: byScale(outputPort.y - stage.y + outputPort.width / 2 - stage.height / 2) + byScale(stageState.translate.y)
                };
                setDragStartCoordinates(coordinates);
                dragStartCoordinatesCache.current = coordinates;
                setIsDragging(true);
                document.addEventListener("mouseup", handleDragEnd);
                document.addEventListener("mousemove", handleDrag);
            }
        }
        else {
            var outputPort = inputTypes[port.current.dataset.portType];
            var nodes = document.querySelectorAll("[data-output-node-id=\"".concat(nodeId, "\"][data-output-port-name=\"").concat(name, "\"]"));
            var canConnect = nodes.length < outputPort.maxOutputs;
            if (canConnect) {
                var coordinates = {
                    x: byScale(startPort.x - stage.x + startPort.width / 2 - stage.width / 2) + byScale(stageState.translate.x),
                    y: byScale(startPort.y - stage.y + startPort.width / 2 - stage.height / 2) + byScale(stageState.translate.y)
                };
                setDragStartCoordinates(coordinates);
                dragStartCoordinatesCache.current = coordinates;
                setIsDragging(true);
                document.addEventListener("mouseup", handleDragEnd);
                document.addEventListener("mousemove", handleDrag);
            }
        }
    };
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement("div", { style: { zIndex: 999 }, onMouseDown: handleDragStart, className: styles$6.port, "data-port-color": color, "data-port-name": name, "data-port-type": type, "data-port-transput-type": isInput ? "input" : "output", "data-node-id": nodeId, onDragStart: function (e) {
                e.preventDefault();
                e.stopPropagation();
            }, ref: port }),
        isDragging && !isInput ? (React__default["default"].createElement(Portal$1, { node: document.getElementById("".concat(DRAG_CONNECTION_ID).concat(editorId)) },
            React__default["default"].createElement(Connection, { from: dragStartCoordinates, to: dragStartCoordinates, lineRef: line, stroke: color }))) : null));
};

var styles$5 = {"wrapper":"Node-module_wrapper__hQhwu","label":"Node-module_label__v7hU3"};

var __assign$8 = (undefined && undefined.__assign) || function () {
    __assign$8 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$8.apply(this, arguments);
};
var __rest$3 = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray$2 = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Node = function (_a) {
    var id = _a.id, width = _a.width, x = _a.x, y = _a.y, stageRect = _a.stageRect, connections = _a.connections, type = _a.type, inputData = _a.inputData, onDragStart = _a.onDragStart, renderNodeHeader = _a.renderNodeHeader;
    var cache = React__default["default"].useContext(CacheContext);
    var nodeTypes = React__default["default"].useContext(NodeTypesContext);
    var nodesDispatch = React__default["default"].useContext(NodeDispatchContext);
    var stageState = React__default["default"].useContext(StageContext);
    var currentNodeType = nodeTypes[type];
    var label = currentNodeType.label, deletable = currentNodeType.deletable, _b = currentNodeType.inputs, inputs = _b === void 0 ? [] : _b, _c = currentNodeType.outputs, outputs = _c === void 0 ? [] : _c;
    var nodeWrapper = React__default["default"].useRef();
    var _d = React__default["default"].useState(false), menuOpen = _d[0], setMenuOpen = _d[1];
    var _e = React__default["default"].useState({ x: 0, y: 0 }), menuCoordinates = _e[0], setMenuCoordinates = _e[1];
    var byScale = function (value) { return (1 / stageState.scale) * value; };
    var updateConnectionsByTransput = function (transput, isOutput) {
        if (transput === void 0) { transput = {}; }
        Object.entries(transput).forEach(function (_a) {
            var portName = _a[0], outputs = _a[1];
            outputs.forEach(function (output) {
                var toRect = getPortRect(id, portName, isOutput ? "output" : "input", cache);
                var fromRect = getPortRect(output.nodeId, output.portName, isOutput ? "input" : "output", cache);
                var portHalf = fromRect.width / 2;
                var combined;
                if (isOutput) {
                    combined = id + portName + output.nodeId + output.portName;
                }
                else {
                    combined = output.nodeId + output.portName + id + portName;
                }
                var cnx;
                var cachedConnection = cache.current.connections[combined];
                if (cachedConnection) {
                    cnx = cachedConnection;
                }
                else {
                    cnx = document.querySelector("[data-connection-id=\"".concat(combined, "\"]"));
                    cache.current.connections[combined] = cnx;
                }
                var from = {
                    x: byScale(toRect.x -
                        stageRect.current.x +
                        portHalf -
                        stageRect.current.width / 2) + byScale(stageState.translate.x),
                    y: byScale(toRect.y -
                        stageRect.current.y +
                        portHalf -
                        stageRect.current.height / 2) + byScale(stageState.translate.y)
                };
                var to = {
                    x: byScale(fromRect.x -
                        stageRect.current.x +
                        portHalf -
                        stageRect.current.width / 2) + byScale(stageState.translate.x),
                    y: byScale(fromRect.y -
                        stageRect.current.y +
                        portHalf -
                        stageRect.current.height / 2) + byScale(stageState.translate.y)
                };
                cnx.setAttribute("d", calculateCurve(from, to));
            });
        });
    };
    var updateNodeConnections = function () {
        if (connections) {
            updateConnectionsByTransput(connections.inputs);
            updateConnectionsByTransput(connections.outputs, true);
        }
    };
    var stopDrag = function (e, coordinates) {
        nodesDispatch(__assign$8(__assign$8({ type: "SET_NODE_COORDINATES" }, coordinates), { nodeId: id }));
    };
    var handleDrag = function (_a) {
        var x = _a.x, y = _a.y;
        nodeWrapper.current.style.transform = "translate(".concat(x, "px,").concat(y, "px)");
        updateNodeConnections();
    };
    var startDrag = function (e) {
        onDragStart();
    };
    var handleContextMenu = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setMenuCoordinates({ x: e.clientX, y: e.clientY });
        setMenuOpen(true);
        return false;
    };
    var closeContextMenu = function () {
        setMenuOpen(false);
    };
    var deleteNode = function () {
        nodesDispatch({
            type: "REMOVE_NODE",
            nodeId: id
        });
    };
    var handleMenuOption = function (_a) {
        var value = _a.value;
        switch (value) {
            case "deleteNode":
                deleteNode();
                break;
            default:
                return;
        }
    };
    return (React__default["default"].createElement(Draggable, { className: styles$5.wrapper, style: {
            width: width,
            transform: "translate(".concat(x, "px, ").concat(y, "px)")
        }, onDragStart: startDrag, onDrag: handleDrag, onDragEnd: stopDrag, innerRef: nodeWrapper, "data-node-id": id, onContextMenu: handleContextMenu, stageState: stageState, stageRect: stageRect },
        renderNodeHeader ? (renderNodeHeader(NodeHeader, currentNodeType, {
            openMenu: handleContextMenu,
            closeMenu: closeContextMenu,
            deleteNode: deleteNode
        })) : (React__default["default"].createElement(NodeHeader, null, label)),
        React__default["default"].createElement(IoPorts, { nodeId: id, inputs: inputs, outputs: outputs, connections: connections, updateNodeConnections: updateNodeConnections, inputData: inputData }),
        menuOpen ? (React__default["default"].createElement(Portal$1, null,
            React__default["default"].createElement(ContextMenu, { x: menuCoordinates.x, y: menuCoordinates.y, options: __spreadArray$2([], (deletable !== false
                    ? [
                        {
                            label: "Delete Node",
                            value: "deleteNode",
                            description: "Deletes a node and all of its connections."
                        }
                    ]
                    : []), true), onRequestClose: closeContextMenu, onOptionSelected: handleMenuOption, hideFilter: true, label: "Node Options", emptyText: "This node has no options." }))) : null));
};
var NodeHeader = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b, props = __rest$3(_a, ["children", "className"]);
    return (React__default["default"].createElement("h2", __assign$8({}, props, { className: styles$5.label + (className ? " ".concat(className) : "") }), children));
};

var __assign$7 = (undefined && undefined.__assign) || function () {
    __assign$7 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$7.apply(this, arguments);
};
var __rest$2 = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var define = function (value, defaultValue) {
    return value !== undefined ? value : defaultValue;
};
var buildControlType = function (defaultConfig, validate, setup) {
    if (validate === void 0) { validate = function () { }; }
    if (setup === void 0) { setup = function () { return ({}); }; }
    return function (config) {
        validate(config);
        return __assign$7({ type: defaultConfig.type, label: define(config.label, defaultConfig.label || ""), name: define(config.name, defaultConfig.name || ""), defaultValue: define(config.defaultValue, defaultConfig.defaultValue), setValue: define(config.setValue, undefined) }, setup(config));
    };
};
var Controls = {
    text: buildControlType({
        type: "text",
        name: "text",
        defaultValue: ""
    }),
    select: buildControlType({
        type: "select",
        name: "select",
        options: [],
        defaultValue: ""
    }, function () { }, function (config) { return ({
        options: define(config.options, []),
        getOptions: define(config.getOptions, undefined),
        placeholder: define(config.placeholder, undefined)
    }); }),
    number: buildControlType({
        type: "number",
        name: "number",
        defaultValue: 0
    }, function () { }, function (config) { return ({
        step: define(config.step, undefined)
    }); }),
    checkbox: buildControlType({
        type: "checkbox",
        name: "checkbox",
        defaultValue: false
    }),
    multiselect: buildControlType({
        type: "multiselect",
        name: "multiselect",
        options: [],
        defaultValue: []
    }, function () { }, function (config) { return ({
        options: define(config.options, []),
        getOptions: define(config.getOptions, undefined),
        placeholder: define(config.placeholder, undefined)
    }); }),
    custom: buildControlType({
        type: "custom",
        name: "custom",
        render: function () { },
        defaultValue: undefined
    }, function () { }, function (config) { return ({
        render: define(config.render, function () { })
    }); })
};
var Colors = {
    yellow: "yellow",
    orange: "orange",
    red: "red",
    pink: "pink",
    purple: "purple",
    blue: "blue",
    green: "green",
    grey: "grey"
};
var getPortBuilders = function (ports) {
    return Object.values(ports).reduce(function (obj, port) {
        obj[port.type] = function (config) {
            if (config === void 0) { config = {}; }
            return {
                type: port.type,
                name: config.name || port.name,
                label: config.label || port.label,
                noControls: define(config.noControls, false),
                color: config.color || port.color,
                hidePort: define(config.hidePort, port.hidePort),
                controls: define(config.controls, port.controls)
            };
        };
        return obj;
    }, {});
};
var FlumeConfig = /** @class */ (function () {
    function FlumeConfig(config) {
        if (config) {
            this.nodeTypes = __assign$7({}, config.nodeTypes);
            this.portTypes = __assign$7({}, config.portTypes);
        }
        else {
            this.nodeTypes = {};
            this.portTypes = {};
        }
    }
    FlumeConfig.prototype.addRootNodeType = function (config) {
        this.addNodeType(__assign$7(__assign$7({}, config), { root: true, addable: false, deletable: false }));
        return this;
    };
    FlumeConfig.prototype.addNodeType = function (config) {
        if (typeof config !== "object" && config !== null) {
            throw new Error("You must provide a configuration object when calling addNodeType.");
        }
        if (typeof config.type !== "string") {
            throw new Error("Required key, \"type\" must be a string when calling addNodeType.");
        }
        if (typeof config.initialWidth !== "undefined" &&
            typeof config.initialWidth !== "number") {
            throw new Error("Optional key, \"initialWidth\" must be a number when calling addNodeType.");
        }
        if (this.nodeTypes[config.type] !== undefined) {
            throw new Error("A node with type \"".concat(config.type, "\" has already been declared."));
        }
        var node = {
            type: config.type,
            label: define(config.label, ""),
            description: define(config.description, ""),
            addable: define(config.addable, true),
            deletable: define(config.deletable, true)
        };
        if (config.initialWidth) {
            node.initialWidth = config.initialWidth;
        }
        if (config.sortIndex !== undefined) {
            node.sortIndex = config.sortIndex;
        }
        if (typeof config.inputs === "function") {
            var inputs = config.inputs(getPortBuilders(this.portTypes));
            if (!Array.isArray(inputs) && typeof config.inputs !== 'function') {
                throw new Error("When providing a function to the \"inputs\" key, you must return either an array or a function.");
            }
            node.inputs = inputs;
        }
        else if (config.inputs === undefined) {
            node.inputs = [];
        }
        else if (!Array.isArray(config.inputs)) {
            throw new Error("Optional key, \"inputs\" must be an array.");
        }
        else {
            node.inputs = config.inputs;
        }
        if (typeof config.outputs === "function") {
            var outputs = config.outputs(getPortBuilders(this.portTypes));
            if (!Array.isArray(outputs) && typeof config.outputs !== 'function') {
                throw new Error("When providing a function to the \"outputs\" key, you must return either an array or a function.");
            }
            node.outputs = outputs;
        }
        else if (config.outputs === undefined) {
            node.outputs = [];
        }
        else if (config.outputs !== undefined && !Array.isArray(config.outputs)) {
            throw new Error("Optional key, \"outputs\" must be an array.");
        }
        else {
            node.outputs = config.outputs;
        }
        if (config.root !== undefined) {
            if (typeof config.root !== "boolean") {
                throw new Error("Optional key, \"root\" must be a boolean.");
            }
            else {
                node.root = config.root;
            }
        }
        this.nodeTypes[config.type] = node;
        return this;
    };
    FlumeConfig.prototype.removeNodeType = function (type) {
        if (!this.nodeTypes[type]) {
            console.error("Non-existent node type \"".concat(type, "\" cannot be removed."));
        }
        else {
            var _a = this.nodeTypes, _b = type; _a[_b]; var nodeTypes = __rest$2(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            this.nodeTypes = nodeTypes;
        }
        return this;
    };
    FlumeConfig.prototype.addPortType = function (config) {
        if (typeof config !== "object" && config !== null) {
            throw new Error("You must provide a configuration object when calling addPortType");
        }
        if (typeof config.type !== "string") {
            throw new Error("Required key, \"type\" must be a string when calling addPortType.");
        }
        if (this.portTypes[config.type] !== undefined) {
            throw new Error("A port with type \"".concat(config.type, "\" has already been declared."));
        }
        if (typeof config.name !== "string") {
            throw new Error("Required key, \"name\" must be a string when calling addPortType.");
        }
        var port = {
            type: config.type,
            name: config.name,
            label: define(config.label, ""),
            color: define(config.color, Colors.grey),
            hidePort: define(config.hidePort, false)
        };
        if (config.acceptTypes === undefined) {
            port.acceptTypes = [config.type];
        }
        else if (!Array.isArray(config.acceptTypes)) {
            throw new Error("Optional key, \"acceptTypes\" must be an array.");
        }
        else {
            port.acceptTypes = config.acceptTypes;
        }
        if (typeof config.maxOutputs !== "undefined" &&
            typeof config.maxOutputs !== "number") {
            throw new Error("Optional key, \"maxOutputs\" must be a number when calling addPortType.");
        }
        else if (config.maxOutputs === undefined) {
            port.maxOutputs = Infinity;
        }
        else {
            port.maxOutputs = config.maxOutputs;
        }
        if (config.controls === undefined) {
            port.controls = [];
        }
        else if (!Array.isArray(config.controls)) {
            throw new Error("Optional key, \"controls\" must be an array.");
        }
        else {
            port.controls = config.controls;
        }
        this.portTypes[config.type] = port;
        return this;
    };
    FlumeConfig.prototype.removePortType = function (type, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.skipDynamicNodesCheck, skipDynamicNodesCheck = _c === void 0 ? false : _c;
        if (!this.portTypes[type]) {
            console.error("Non-existent port type \"".concat(type, "\" cannot be removed."));
        }
        else {
            if (!skipDynamicNodesCheck) {
                var dynamicNodes = Object.values(this.nodeTypes).filter(function (node) {
                    return typeof node.inputs === 'function' ||
                        typeof node.outputs === 'function';
                });
                if (dynamicNodes.length) {
                    console.warn("We've detected that one or more of your nodes is using dynamic inputs/outputs. This is a potentially dangerous operation as we are unable to detect if this portType is being used in one of those nodes. You can quiet this message by passing { skipDynamicNodesCheck: true } in as the second argument.");
                }
            }
            var affectedNodes = Object.values(this.nodeTypes).filter(function (node) {
                return (Array.isArray(node.inputs) &&
                    node.inputs.find(function (p) { return p.type === type; })) ||
                    (Array.isArray(node.outputs) &&
                        node.outputs.find(function (p) { return p.type === type; }));
            });
            if (affectedNodes.length) {
                throw new Error("Cannot delete port type \"".concat(type, "\" without first deleting all node types using these ports: [").concat(affectedNodes
                    .map(function (n) { return "".concat(n.type); })
                    .join(", "), "]"));
            }
            else {
                var _d = this.portTypes, _e = type; _d[_e]; var portTypes = __rest$2(_d, [typeof _e === "symbol" ? _e : _e + ""]);
                this.portTypes = portTypes;
            }
        }
        return this;
    };
    return FlumeConfig;
}());

var styles$4 = {"wrapper":"ColorPicker-module_wrapper__vJjVx","colorButtonWrapper":"ColorPicker-module_colorButtonWrapper__wurMz","colorButton":"ColorPicker-module_colorButton__LzfqW"};

var ColorPicker = (function (_a) {
    var x = _a.x, y = _a.y, onColorPicked = _a.onColorPicked, onRequestClose = _a.onRequestClose;
    var wrapper = React__default["default"].useRef();
    var testClickOutside = React__default["default"].useCallback(function (e) {
        if (wrapper.current && !wrapper.current.contains(e.target)) {
            onRequestClose();
            document.removeEventListener("click", testClickOutside);
            document.removeEventListener("contextmenu", testClickOutside);
        }
    }, [wrapper, onRequestClose]);
    var testEscape = React__default["default"].useCallback(function (e) {
        if (e.keyCode === 27) {
            onRequestClose();
            document.removeEventListener("keydown", testEscape);
        }
    }, [onRequestClose]);
    React__default["default"].useEffect(function () {
        document.addEventListener("keydown", testEscape);
        document.addEventListener("click", testClickOutside);
        document.addEventListener("contextmenu", testClickOutside);
        return function () {
            document.removeEventListener("click", testClickOutside);
            document.removeEventListener("contextmenu", testClickOutside);
            document.removeEventListener("keydown", testEscape);
        };
    }, [testClickOutside, testEscape]);
    return (React__default["default"].createElement("div", { ref: wrapper, className: styles$4.wrapper, style: {
            left: x,
            top: y
        } }, Object.values(Colors).map(function (color) { return (React__default["default"].createElement(ColorButton, { onSelected: function () {
            onColorPicked(color);
            onRequestClose();
        }, color: color, key: color })); })));
});
var ColorButton = function (_a) {
    var color = _a.color, onSelected = _a.onSelected;
    return (React__default["default"].createElement("div", { className: styles$4.colorButtonWrapper },
        React__default["default"].createElement("button", { className: styles$4.colorButton, onClick: onSelected, "data-color": color, "aria-label": color })));
};

var styles$3 = {"wrapper":"Comment-module_wrapper__4-iQL","text":"Comment-module_text__wBPGw","resizeThumb":"Comment-module_resizeThumb__cp55C","textarea":"Comment-module_textarea__9Jwsf"};

var Comment = (function (_a) {
    var dispatch = _a.dispatch, id = _a.id, x = _a.x, y = _a.y, width = _a.width, height = _a.height, color = _a.color, text = _a.text, stageRect = _a.stageRect, onDragStart = _a.onDragStart, isNew = _a.isNew;
    var stageState = React__default["default"].useContext(StageContext);
    var wrapper = React__default["default"].useRef();
    var textarea = React__default["default"].useRef();
    var _b = React__default["default"].useState(false), isEditing = _b[0], setIsEditing = _b[1];
    var _c = React__default["default"].useState(false), isPickingColor = _c[0], setIsPickingColor = _c[1];
    var _d = React__default["default"].useState(false), menuOpen = _d[0], setMenuOpen = _d[1];
    var _e = React__default["default"].useState({ x: 0, y: 0 }), menuCoordinates = _e[0], setMenuCoordinates = _e[1];
    var _f = React__default["default"].useState({
        x: 0,
        y: 0
    }), colorPickerCoordinates = _f[0], setColorPickerCoordinates = _f[1];
    var handleContextMenu = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setMenuCoordinates({ x: e.clientX, y: e.clientY });
        setMenuOpen(true);
        return false;
    };
    var closeContextMenu = function () { return setMenuOpen(false); };
    var startDrag = function (e) {
        onDragStart();
    };
    var handleDrag = function (_a) {
        var x = _a.x, y = _a.y;
        wrapper.current.style.transform = "translate(".concat(x, "px,").concat(y, "px)");
    };
    var handleDragEnd = function (_, _a) {
        var x = _a.x, y = _a.y;
        dispatch({
            type: "SET_COMMENT_COORDINATES",
            id: id,
            x: x,
            y: y
        });
    };
    var handleResize = function (coordinates) {
        var width = clamp_1(coordinates.x - x + 10, 80, 10000);
        var height = clamp_1(coordinates.y - y + 10, 30, 10000);
        wrapper.current.style.width = "".concat(width, "px");
        wrapper.current.style.height = "".concat(height, "px");
    };
    var handleResizeEnd = function (_, coordinates) {
        var width = clamp_1(coordinates.x - x + 10, 80, 10000);
        var height = clamp_1(coordinates.y - y + 10, 30, 10000);
        dispatch({
            type: "SET_COMMENT_DIMENSIONS",
            id: id,
            width: width,
            height: height
        });
    };
    var handleMenuOption = function (option, e) {
        switch (option.value) {
            case "edit":
                startTextEdit();
                break;
            case "color":
                setColorPickerCoordinates(menuCoordinates);
                setIsPickingColor(true);
                break;
            case "delete":
                dispatch({
                    type: "DELETE_COMMENT",
                    id: id
                });
                break;
        }
    };
    var startTextEdit = function () {
        setIsEditing(true);
    };
    var endTextEdit = function () {
        setIsEditing(false);
    };
    var handleTextChange = function (e) {
        dispatch({
            type: "SET_COMMENT_TEXT",
            id: id,
            text: e.target.value
        });
    };
    var handleColorPicked = function (color) {
        dispatch({
            type: "SET_COMMENT_COLOR",
            id: id,
            color: color
        });
    };
    React__default["default"].useEffect(function () {
        if (isNew) {
            setIsEditing(true);
            dispatch({
                type: "REMOVE_COMMENT_NEW",
                id: id
            });
        }
    }, [isNew, dispatch, id]);
    return (React__default["default"].createElement(Draggable, { innerRef: wrapper, className: styles$3.wrapper, style: {
            transform: "translate(".concat(x, "px,").concat(y, "px)"),
            width: width,
            height: height,
            zIndex: isEditing ? 999 : ""
        }, stageState: stageState, stageRect: stageRect, onDragStart: startDrag, onDrag: handleDrag, onDragEnd: handleDragEnd, onContextMenu: handleContextMenu, onDoubleClick: startTextEdit, onWheel: function (e) { return e.stopPropagation(); }, "data-color": color },
        isEditing ? (React__default["default"].createElement("textarea", { className: styles$3.textarea, onChange: handleTextChange, onMouseDown: function (e) { return e.stopPropagation(); }, onBlur: endTextEdit, placeholder: "Text of the comment...", autoFocus: true, value: text, ref: textarea })) : (React__default["default"].createElement("div", { "data-comment": true, className: styles$3.text }, text)),
        React__default["default"].createElement(Draggable, { className: styles$3.resizeThumb, stageState: stageState, stageRect: stageRect, onDrag: handleResize, onDragEnd: handleResizeEnd }),
        menuOpen ? (React__default["default"].createElement(Portal$1, null,
            React__default["default"].createElement(ContextMenu, { hideFilter: true, label: "Comment Options", x: menuCoordinates.x, y: menuCoordinates.y, options: [
                    {
                        value: "edit",
                        label: "Edit Comment",
                        description: "Edit the text of the comment"
                    },
                    {
                        value: "color",
                        label: "Change Color",
                        description: "Change the color of the comment"
                    },
                    {
                        value: "delete",
                        label: "Delete Comment",
                        description: "Delete the comment"
                    }
                ], onRequestClose: closeContextMenu, onOptionSelected: handleMenuOption }))) : null,
        isPickingColor ? (React__default["default"].createElement(Portal$1, null,
            React__default["default"].createElement(ColorPicker, { x: colorPickerCoordinates.x, y: colorPickerCoordinates.y, onRequestClose: function () { return setIsPickingColor(false); }, onColorPicked: handleColorPicked }))) : null));
});

var styles$2 = {"toaster":"Toaster-module_toaster__6SfVH","toast":"Toaster-module_toast__zR0nj","fade-in":"Toaster-module_fade-in__omr82","fade-out":"Toaster-module_fade-out__XemDj","title":"Toaster-module_title__Co7gk","timer":"Toaster-module_timer__30kN1","exitButton":"Toaster-module_exitButton__paB3P"};

var __assign$6 = (undefined && undefined.__assign) || function () {
    __assign$6 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$6.apply(this, arguments);
};
var Toaster = (function (_a) {
    var _b = _a.toasts, toasts = _b === void 0 ? [] : _b, dispatchToasts = _a.dispatchToasts;
    var setHeight = React__default["default"].useCallback(function (id, height) {
        dispatchToasts({
            type: "SET_HEIGHT",
            id: id,
            height: height
        });
    }, [dispatchToasts]);
    var startExit = React__default["default"].useCallback(function (id) {
        dispatchToasts({
            type: "SET_EXITING",
            id: id
        });
    }, [dispatchToasts]);
    var removeToast = React__default["default"].useCallback(function (id) {
        dispatchToasts({
            type: "REMOVE_TOAST",
            id: id
        });
    }, [dispatchToasts]);
    return (React__default["default"].createElement("div", { className: styles$2.toaster }, toasts.map(function (toast, i) {
        return (React__default["default"].createElement(Toast, __assign$6({}, toast, { onHeightReceived: setHeight, onExitRequested: startExit, onRemoveRequested: removeToast, y: toasts.slice(0, i + 1).reduce(function (y, t) { return t.height + y + 5; }, 0), key: toast.id })));
    })));
});
var Toast = function (_a) {
    var id = _a.id, title = _a.title, message = _a.message, duration = _a.duration, type = _a.type, exiting = _a.exiting, y = _a.y, onHeightReceived = _a.onHeightReceived, onExitRequested = _a.onExitRequested, onRemoveRequested = _a.onRemoveRequested;
    var _b = React__default["default"].useState(false), paused = _b[0], setPaused = _b[1];
    var wrapper = React__default["default"].useRef();
    var timer = React__default["default"].useRef();
    var stopTimer = React__default["default"].useCallback(function () {
        setPaused(true);
        clearTimeout(timer.current);
    }, []);
    var resumeTimer = React__default["default"].useCallback(function () {
        setPaused(false);
        timer.current = setTimeout(function () { return onExitRequested(id); }, duration);
    }, [id, duration, onExitRequested]);
    React__default["default"].useLayoutEffect(function () {
        var height = wrapper.current.getBoundingClientRect().height;
        onHeightReceived(id, height);
    }, [onHeightReceived, id]);
    React__default["default"].useEffect(function () {
        resumeTimer();
        return stopTimer;
    }, [resumeTimer, stopTimer]);
    var handleAnimationEnd = function () {
        if (exiting) {
            onRemoveRequested(id);
        }
    };
    return (React__default["default"].createElement("div", { ref: wrapper, className: styles$2.toast, "data-type": type, style: { transform: "translateY(-".concat(y, "px)") }, "data-exiting": exiting, onAnimationEnd: handleAnimationEnd, onMouseEnter: stopTimer, onMouseLeave: resumeTimer, role: "alert" },
        title ? React__default["default"].createElement("span", { className: styles$2.title }, title) : null,
        React__default["default"].createElement("p", null, message),
        !paused && (React__default["default"].createElement("div", { className: styles$2.timer, style: { animationDuration: "".concat(duration, "ms") }, onAnimationEnd: function (e) { return e.stopPropagation(); } })),
        React__default["default"].createElement("button", { className: styles$2.exitButton, onClick: function () {
                stopTimer();
                onExitRequested(id);
            } }, "\u2715")));
};

var styles$1 = {"svgWrapper":"Connections-module_svgWrapper__UpHhQ"};

var Connections = function (_a) {
    _a.nodes; var editorId = _a.editorId;
    return (React__default["default"].createElement("div", { className: styles$1.svgWrapper, id: "".concat(CONNECTIONS_ID).concat(editorId) }));
};

var checkForCircularNodes = function (nodes, startNodeId) {
    var isCircular = false;
    var walk = function (nodeId) {
        var outputs = Object.values(nodes[nodeId].connections.outputs);
        for (var i = 0; i < outputs.length; i++) {
            if (isCircular) {
                break;
            }
            var outputConnections = outputs[i];
            for (var k = 0; k < outputConnections.length; k++) {
                var connectedTo = outputConnections[k];
                if (connectedTo.nodeId === startNodeId) {
                    isCircular = true;
                    break;
                }
                else {
                    walk(connectedTo.nodeId);
                }
            }
        }
    };
    walk(startNodeId);
    return isCircular;
};

var __assign$5 = (undefined && undefined.__assign) || function () {
    __assign$5 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$5.apply(this, arguments);
};
var __rest$1 = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray$1 = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var addConnection = function (nodes, input, output, portTypes) {
    var _a, _b, _c;
    var newNodes = __assign$5(__assign$5({}, nodes), (_a = {}, _a[input.nodeId] = __assign$5(__assign$5({}, nodes[input.nodeId]), { connections: __assign$5(__assign$5({}, nodes[input.nodeId].connections), { inputs: __assign$5(__assign$5({}, nodes[input.nodeId].connections.inputs), (_b = {}, _b[input.portName] = __spreadArray$1(__spreadArray$1([], (nodes[input.nodeId].connections.inputs[input.portName] || []), true), [
                {
                    nodeId: output.nodeId,
                    portName: output.portName
                }
            ], false), _b)) }) }), _a[output.nodeId] = __assign$5(__assign$5({}, nodes[output.nodeId]), { connections: __assign$5(__assign$5({}, nodes[output.nodeId].connections), { outputs: __assign$5(__assign$5({}, nodes[output.nodeId].connections.outputs), (_c = {}, _c[output.portName] = __spreadArray$1(__spreadArray$1([], (nodes[output.nodeId].connections.outputs[output.portName] ||
                []), true), [
                {
                    nodeId: input.nodeId,
                    portName: input.portName
                }
            ], false), _c)) }) }), _a));
    return newNodes;
};
var removeConnection = function (nodes, input, output) {
    var _a, _b;
    var inputNode = nodes[input.nodeId];
    var _c = inputNode.connections.inputs, _d = input.portName; _c[_d]; var newInputNodeConnectionsInputs = __rest$1(_c, [typeof _d === "symbol" ? _d : _d + ""]);
    var newInputNode = __assign$5(__assign$5({}, inputNode), { connections: __assign$5(__assign$5({}, inputNode.connections), { inputs: newInputNodeConnectionsInputs }) });
    var outputNode = nodes[output.nodeId];
    var filteredOutputNodes = outputNode.connections.outputs[output.portName].filter(function (cnx) {
        return cnx.nodeId === input.nodeId ? cnx.portName !== input.portName : true;
    });
    var newOutputNode = __assign$5(__assign$5({}, outputNode), { connections: __assign$5(__assign$5({}, outputNode.connections), { outputs: __assign$5(__assign$5({}, outputNode.connections.outputs), (_a = {}, _a[output.portName] = filteredOutputNodes, _a)) }) });
    return __assign$5(__assign$5({}, nodes), (_b = {}, _b[input.nodeId] = newInputNode, _b[output.nodeId] = newOutputNode, _b));
};
var getFilteredTransputs = function (transputs, nodeId) {
    return Object.entries(transputs).reduce(function (obj, _a) {
        var portName = _a[0], transput = _a[1];
        var newTransputs = transput.filter(function (t) { return t.nodeId !== nodeId; });
        if (newTransputs.length) {
            obj[portName] = newTransputs;
        }
        return obj;
    }, {});
};
var removeConnections = function (connections, nodeId) { return ({
    inputs: getFilteredTransputs(connections.inputs, nodeId),
    outputs: getFilteredTransputs(connections.outputs, nodeId)
}); };
var removeNode = function (startNodes, nodeId) {
    var _a = startNodes, _b = nodeId; _a[_b]; var nodes = __rest$1(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    nodes = Object.values(nodes).reduce(function (obj, node) {
        obj[node.id] = __assign$5(__assign$5({}, node), { connections: removeConnections(node.connections, nodeId) });
        return obj;
    }, {});
    deleteConnectionsByNodeId(nodeId);
    return nodes;
};
var reconcileNodes = function (initialNodes, nodeTypes, portTypes, context) {
    var nodes = __assign$5({}, initialNodes);
    // Delete extraneous nodes
    var nodesToDelete = Object.values(nodes)
        .map(function (node) { return (!nodeTypes[node.type] ? node.id : undefined); })
        .filter(function (x) { return x; });
    nodesToDelete.forEach(function (nodeId) {
        nodes = nodesReducer(nodes, {
            type: "REMOVE_NODE",
            nodeId: nodeId
        }, { nodeTypes: nodeTypes, portTypes: portTypes, context: context });
    });
    // Reconcile input data for each node
    var reconciledNodes = Object.values(nodes).reduce(function (nodesObj, node) {
        var nodeType = nodeTypes[node.type];
        var defaultInputData = getDefaultData({ node: node, nodeType: nodeType, portTypes: portTypes, context: context });
        var currentInputData = Object.entries(node.inputData).reduce(function (dataObj, _a) {
            var key = _a[0], data = _a[1];
            if (defaultInputData[key] !== undefined) {
                dataObj[key] = data;
            }
            return dataObj;
        }, {});
        var newInputData = __assign$5(__assign$5({}, defaultInputData), currentInputData);
        nodesObj[node.id] = __assign$5(__assign$5({}, node), { inputData: newInputData });
        return nodesObj;
    }, {});
    // Reconcile node attributes for each node
    reconciledNodes = Object.values(reconciledNodes).reduce(function (nodesObj, node) {
        var newNode = __assign$5({}, node);
        var nodeType = nodeTypes[node.type];
        if (nodeType.root !== node.root) {
            if (nodeType.root && !node.root) {
                newNode.root = nodeType.root;
            }
            else if (!nodeType.root && node.root) {
                delete newNode.root;
            }
        }
        nodesObj[node.id] = newNode;
        return nodesObj;
    }, {});
    return reconciledNodes;
};
var getInitialNodes = function (initialNodes, defaultNodes, nodeTypes, portTypes, context) {
    if (initialNodes === void 0) { initialNodes = {}; }
    if (defaultNodes === void 0) { defaultNodes = []; }
    var reconciledNodes = reconcileNodes(initialNodes, nodeTypes, portTypes, context);
    return __assign$5(__assign$5({}, reconciledNodes), defaultNodes.reduce(function (nodes, dNode, i) {
        var nodeNotAdded = !Object.values(initialNodes).find(function (n) { return n.type === dNode.type; });
        if (nodeNotAdded) {
            nodes = nodesReducer(nodes, {
                type: "ADD_NODE",
                id: "default-".concat(i),
                defaultNode: true,
                x: dNode.x || 0,
                y: dNode.y || 0,
                nodeType: dNode.type
            }, { nodeTypes: nodeTypes, portTypes: portTypes, context: context });
        }
        return nodes;
    }, {}));
};
var getDefaultData = function (_a) {
    var node = _a.node, nodeType = _a.nodeType, portTypes = _a.portTypes, context = _a.context;
    var inputs = Array.isArray(nodeType.inputs)
        ? nodeType.inputs
        : nodeType.inputs(node.inputData, node.connections, context);
    return inputs.reduce(function (obj, input) {
        var inputType = portTypes[input.type];
        obj[input.name || inputType.name] = (input.controls ||
            inputType.controls ||
            []).reduce(function (obj2, control) {
            obj2[control.name] = control.defaultValue;
            return obj2;
        }, {});
        return obj;
    }, {});
};
var nodesReducer = function (nodes, action, _a, dispatchToasts) {
    var _b, _c, _d, _e, _f;
    if (action === void 0) { action = {}; }
    var nodeTypes = _a.nodeTypes, portTypes = _a.portTypes, cache = _a.cache, circularBehavior = _a.circularBehavior, context = _a.context;
    switch (action.type) {
        case "ADD_CONNECTION": {
            var input = action.input, output = action.output;
            var inputIsNotConnected = !nodes[input.nodeId].connections.inputs[input.portName];
            if (inputIsNotConnected) {
                var allowCircular = circularBehavior === "warn" || circularBehavior === "allow";
                var newNodes = addConnection(nodes, input, output);
                var isCircular = checkForCircularNodes(newNodes, output.nodeId);
                if (isCircular && !allowCircular) {
                    dispatchToasts({
                        type: "ADD_TOAST",
                        title: "Unable to connect",
                        message: "Connecting these nodes would result in an infinite loop.",
                        toastType: "warning",
                        duration: 5000
                    });
                    return nodes;
                }
                else {
                    if (isCircular && circularBehavior === "warn") {
                        dispatchToasts({
                            type: "ADD_TOAST",
                            title: "Circular Connection Detected",
                            message: "Connecting these nodes has created an infinite loop.",
                            toastType: "warning",
                            duration: 5000
                        });
                    }
                    return newNodes;
                }
            }
            else
                return nodes;
        }
        case "REMOVE_CONNECTION": {
            var input = action.input, output = action.output;
            var id = output.nodeId + output.portName + input.nodeId + input.portName;
            delete cache.current.connections[id];
            deleteConnection({ id: id });
            return removeConnection(nodes, input, output);
        }
        case "DESTROY_TRANSPUT": {
            var transput_1 = action.transput, transputType_1 = action.transputType;
            var portId = transput_1.nodeId + transput_1.portName + transputType_1;
            delete cache.current.ports[portId];
            var cnxType = transputType_1 === 'input' ? 'inputs' : 'outputs';
            var connections = nodes[transput_1.nodeId].connections[cnxType][transput_1.portName];
            if (!connections || !connections.length)
                return nodes;
            return connections.reduce(function (nodes, cnx) {
                var _a = transputType_1 === 'input' ? [transput_1, cnx] : [cnx, transput_1], input = _a[0], output = _a[1];
                var id = output.nodeId + output.portName + input.nodeId + input.portName;
                delete cache.current.connections[id];
                deleteConnection({ id: id });
                return removeConnection(nodes, input, output);
            }, nodes);
        }
        case "ADD_NODE": {
            var x = action.x, y = action.y, nodeType = action.nodeType, id = action.id, defaultNode = action.defaultNode;
            var newNodeId = id || nanoid(10);
            var newNode = {
                id: newNodeId,
                x: x,
                y: y,
                type: nodeType,
                width: nodeTypes[nodeType].initialWidth || 200,
                connections: {
                    inputs: {},
                    outputs: {}
                },
                inputData: {}
            };
            newNode.inputData = getDefaultData({
                node: newNode,
                nodeType: nodeTypes[nodeType],
                portTypes: portTypes,
                context: context
            });
            if (defaultNode) {
                newNode.defaultNode = true;
            }
            if (nodeTypes[nodeType].root) {
                newNode.root = true;
            }
            return __assign$5(__assign$5({}, nodes), (_b = {}, _b[newNodeId] = newNode, _b));
        }
        case "REMOVE_NODE": {
            var nodeId = action.nodeId;
            return removeNode(nodes, nodeId);
        }
        case "HYDRATE_DEFAULT_NODES": {
            var newNodes = __assign$5({}, nodes);
            for (var key in newNodes) {
                if (newNodes[key].defaultNode) {
                    var newNodeId = nanoid(10);
                    var _g = newNodes[key], id = _g.id, defaultNode = _g.defaultNode, node = __rest$1(_g, ["id", "defaultNode"]);
                    newNodes[newNodeId] = __assign$5(__assign$5({}, node), { id: newNodeId });
                    delete newNodes[key];
                }
            }
            return newNodes;
        }
        case "SET_PORT_DATA": {
            var nodeId = action.nodeId, portName = action.portName, controlName = action.controlName, data = action.data, setValue = action.setValue;
            var newData = __assign$5(__assign$5({}, nodes[nodeId].inputData), (_c = {}, _c[portName] = __assign$5(__assign$5({}, nodes[nodeId].inputData[portName]), (_d = {}, _d[controlName] = data, _d)), _c));
            if (setValue) {
                newData = setValue(newData, nodes[nodeId].inputData);
            }
            return __assign$5(__assign$5({}, nodes), (_e = {}, _e[nodeId] = __assign$5(__assign$5({}, nodes[nodeId]), { inputData: newData }), _e));
        }
        case "SET_NODE_COORDINATES": {
            var x = action.x, y = action.y, nodeId = action.nodeId;
            return __assign$5(__assign$5({}, nodes), (_f = {}, _f[nodeId] = __assign$5(__assign$5({}, nodes[nodeId]), { x: x, y: y }), _f));
        }
        default:
            return nodes;
    }
};
var connectNodesReducer = function (reducer, environment, dispatchToasts) { return function (state, action) { return reducer(state, action, environment, dispatchToasts); }; };

var __assign$4 = (undefined && undefined.__assign) || function () {
    __assign$4 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$4.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var setComment = function (comments, id, merge) {
    var _a;
    return (__assign$4(__assign$4({}, comments), (_a = {}, _a[id] = __assign$4(__assign$4({}, comments[id]), merge), _a)));
};
var commentsReducer = (function (comments, action) {
    var _a, _b;
    if (comments === void 0) { comments = {}; }
    switch (action.type) {
        case "ADD_COMMENT": {
            var comment_1 = {
                id: nanoid(10),
                text: "",
                x: action.x,
                y: action.y,
                width: 200,
                height: 30,
                color: "blue",
                isNew: true
            };
            return __assign$4(__assign$4({}, comments), (_a = {}, _a[comment_1.id] = comment_1, _a));
        }
        case "REMOVE_COMMENT_NEW":
            var _c = comments[action.id]; _c.isNew; var comment = __rest(_c, ["isNew"]);
            return __assign$4(__assign$4({}, comments), (_b = {}, _b[action.id] = comment, _b));
        case "SET_COMMENT_COORDINATES": {
            return setComment(comments, action.id, { x: action.x, y: action.y });
        }
        case "SET_COMMENT_DIMENSIONS": {
            return setComment(comments, action.id, {
                width: action.width,
                height: action.height
            });
        }
        case "SET_COMMENT_TEXT": {
            return setComment(comments, action.id, { text: action.text });
        }
        case "SET_COMMENT_COLOR": {
            return setComment(comments, action.id, { color: action.color });
        }
        case "DELETE_COMMENT": {
            var _d = comments, _e = action.id; _d[_e]; var newComments = __rest(_d, [typeof _e === "symbol" ? _e : _e + ""]);
            return newComments;
        }
        default:
            return comments;
    }
});

var __assign$3 = (undefined && undefined.__assign) || function () {
    __assign$3 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$3.apply(this, arguments);
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var toastsReducer = (function (toasts, action) {
    if (toasts === void 0) { toasts = []; }
    switch (action.type) {
        case "ADD_TOAST":
            return __spreadArray([
                {
                    id: nanoid(5),
                    title: action.title,
                    message: action.message,
                    type: action.toastType || 'info',
                    duration: action.duration || 10000,
                    height: 0,
                    exiting: false
                }
            ], toasts, true);
        case "SET_HEIGHT": {
            var index = toasts.findIndex(function (t) { return t.id === action.id; });
            return __spreadArray(__spreadArray(__spreadArray([], toasts.slice(0, index), true), [
                __assign$3(__assign$3({}, toasts[index]), { height: action.height })
            ], false), toasts.slice(index + 1), true);
        }
        case "SET_EXITING": {
            var index = toasts.findIndex(function (t) { return t.id === action.id; });
            return __spreadArray(__spreadArray(__spreadArray([], toasts.slice(0, index), true), [
                __assign$3(__assign$3({}, toasts[index]), { exiting: true })
            ], false), toasts.slice(index + 1), true);
        }
        case "REMOVE_TOAST": {
            var index = toasts.findIndex(function (t) { return t.id === action.id; });
            return __spreadArray(__spreadArray([], toasts.slice(0, index), true), toasts.slice(index + 1), true);
        }
        default:
            return toasts;
    }
});

var __assign$2 = (undefined && undefined.__assign) || function () {
    __assign$2 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$2.apply(this, arguments);
};
var stageReducer = (function (state, incomingAction) {
    var action = typeof incomingAction === 'function' ? incomingAction(state) : incomingAction;
    switch (action.type) {
        case 'SET_SCALE':
            return __assign$2(__assign$2({}, state), { scale: action.scale });
        case 'SET_TRANSLATE':
            return __assign$2(__assign$2({}, state), { translate: action.translate });
        default:
            return state;
    }
});

var Cache = /** @class */ (function () {
    function Cache() {
        this.ports = {};
        this.connections = {};
    }
    return Cache;
}());

var styles = {"dragWrapper":"styles-module_dragWrapper__ZzTkF","debugWrapper":"styles-module_debugWrapper__PvhQN"};

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign$1 = (undefined && undefined.__assign) || function () {
    __assign$1 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};
var LoopError = /** @class */ (function (_super) {
    __extends(LoopError, _super);
    function LoopError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        return _this;
    }
    LoopError.maxLoopsExceeded = 1;
    return LoopError;
}(Error));
var RootEngine = /** @class */ (function () {
    function RootEngine(config, resolveInputControls, fireNodeFunction) {
        var _this = this;
        this.resetLoops = function (maxLoops) {
            _this.maxLoops = maxLoops !== undefined ? maxLoops : 1000;
            _this.loops = 0;
        };
        this.checkLoops = function () {
            if (_this.maxLoops >= 0 && _this.loops > _this.maxLoops) {
                throw new LoopError("Max loop count exceeded.", LoopError.maxLoopsExceeded);
            }
            else {
                _this.loops++;
            }
        };
        this.getRootNode = function (nodes) {
            var roots = Object.values(nodes).filter(function (n) { return n.root; });
            if (roots.length > 1) {
                throw new Error("The root engine must not be called with more than one root node.");
            }
            return roots[0];
        };
        this.reduceRootInputs = function (inputs, callback) {
            return Object.entries(inputs).reduce(function (obj, _a) {
                var inputName = _a[0], connection = _a[1];
                var input = callback(inputName, connection);
                obj[input.name] = input.value;
                return obj;
            }, {});
        };
        this.resolveInputValues = function (node, nodeType, nodes, context) {
            var inputs = nodeType.inputs;
            if (typeof inputs === 'function') {
                inputs = inputs(node.inputData, node.connections, context);
            }
            return inputs.reduce(function (obj, input) {
                var inputConnections = node.connections.inputs[input.name] || [];
                if (inputConnections.length > 0) {
                    obj[input.name] = _this.getValueOfConnection(inputConnections[0], nodes, context);
                }
                else {
                    obj[input.name] = _this.resolveInputControls(input.type, node.inputData[input.name] || {}, context);
                }
                return obj;
            }, {});
        };
        this.getValueOfConnection = function (connection, nodes, context) {
            _this.checkLoops();
            var outputNode = nodes[connection.nodeId];
            var outputNodeType = _this.config.nodeTypes[outputNode.type];
            var inputValues = _this.resolveInputValues(outputNode, outputNodeType, nodes, context);
            var outputResult = _this.fireNodeFunction(outputNode, inputValues, outputNodeType, context)[connection.portName];
            return outputResult;
        };
        this.config = config;
        this.fireNodeFunction = fireNodeFunction;
        this.resolveInputControls = resolveInputControls;
        this.loops = 0;
        this.maxLoops = 1000;
    }
    RootEngine.prototype.resolveRootNode = function (nodes, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var rootNode = options.rootNodeId
            ? nodes[options.rootNodeId]
            : this.getRootNode(nodes);
        if (rootNode) {
            var inputs = this.config.nodeTypes[rootNode.type].inputs;
            if (typeof inputs === 'function') {
                inputs = inputs(rootNode.inputData, rootNode.connections, options.context);
            }
            var controlValues = inputs.reduce(function (obj, input) {
                obj[input.name] = _this.resolveInputControls(input.type, rootNode.inputData[input.name] || {}, options.context);
                return obj;
            }, {});
            var inputValues = this.reduceRootInputs(rootNode.connections.inputs, function (inputName, connection) {
                _this.resetLoops(options.maxLoops);
                var value;
                try {
                    value = _this.getValueOfConnection(connection[0], nodes, options.context);
                }
                catch (e) {
                    if (e.code === LoopError.maxLoopsExceeded) {
                        console.error("".concat(e.message, " Circular nodes detected in ").concat(inputName, " port."));
                    }
                    else {
                        console.error(e);
                    }
                }
                finally {
                    return {
                        name: inputName,
                        value: value
                    };
                }
            });
            if (options.onlyResolveConnected) {
                return inputValues;
            }
            else {
                return __assign$1(__assign$1({}, controlValues), inputValues);
            }
        }
        else {
            console.error("A root node was not found. The Root Engine requires that exactly one node be marked as the root node.");
            return {};
        }
    };
    return RootEngine;
}());

var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var defaultContext = {};
var NodeEditor = function (_a, ref) {
    var initialComments = _a.comments, initialNodes = _a.nodes, _b = _a.nodeTypes, nodeTypes = _b === void 0 ? {} : _b, _c = _a.portTypes, portTypes = _c === void 0 ? {} : _c, _d = _a.defaultNodes, defaultNodes = _d === void 0 ? [] : _d, _e = _a.context, context = _e === void 0 ? defaultContext : _e, onChange = _a.onChange, onCommentsChange = _a.onCommentsChange, initialScale = _a.initialScale, _f = _a.spaceToPan, spaceToPan = _f === void 0 ? false : _f, _g = _a.hideComments, hideComments = _g === void 0 ? false : _g, _h = _a.disableComments, disableComments = _h === void 0 ? false : _h, _j = _a.disableZoom, disableZoom = _j === void 0 ? false : _j, _k = _a.disablePan, disablePan = _k === void 0 ? false : _k, circularBehavior = _a.circularBehavior, renderNodeHeader = _a.renderNodeHeader, debug = _a.debug;
    var editorId = useId();
    var cache = React__default["default"].useRef(new Cache());
    var stage = React__default["default"].useRef();
    var _l = React__default["default"].useState(), sideEffectToasts = _l[0], setSideEffectToasts = _l[1];
    var _m = React__default["default"].useReducer(toastsReducer, []), toasts = _m[0], dispatchToasts = _m[1];
    var _o = React__default["default"].useReducer(connectNodesReducer(nodesReducer, { nodeTypes: nodeTypes, portTypes: portTypes, cache: cache, circularBehavior: circularBehavior, context: context }, setSideEffectToasts), {}, function () { return getInitialNodes(initialNodes, defaultNodes, nodeTypes, portTypes, context); }), nodes = _o[0], dispatchNodes = _o[1];
    var _p = React__default["default"].useReducer(commentsReducer, initialComments || {}), comments = _p[0], dispatchComments = _p[1];
    React__default["default"].useEffect(function () {
        dispatchNodes({ type: "HYDRATE_DEFAULT_NODES" });
    }, []);
    var _q = React__default["default"].useState(true), shouldRecalculateConnections = _q[0], setShouldRecalculateConnections = _q[1];
    var _r = React__default["default"].useReducer(stageReducer, {
        scale: typeof initialScale === "number" ? clamp_1(initialScale, 0.1, 7) : 1,
        translate: { x: 0, y: 0 }
    }), stageState = _r[0], dispatchStageState = _r[1];
    var recalculateConnections = React__default["default"].useCallback(function () {
        createConnections(nodes, stageState, editorId);
    }, [nodes, editorId, stageState, portTypes]);
    var recalculateStageRect = function () {
        stage.current = document
            .getElementById("".concat(STAGE_ID).concat(editorId))
            .getBoundingClientRect();
    };
    React__default["default"].useLayoutEffect(function () {
        if (shouldRecalculateConnections) {
            recalculateConnections();
            setShouldRecalculateConnections(false);
        }
    }, [shouldRecalculateConnections, recalculateConnections]);
    var triggerRecalculation = function () {
        setShouldRecalculateConnections(true);
    };
    React__default["default"].useImperativeHandle(ref, function () { return ({
        getNodes: function () {
            return nodes;
        },
        getComments: function () {
            return comments;
        }
    }); });
    var previousNodes = usePrevious(nodes);
    React__default["default"].useEffect(function () {
        if (previousNodes && onChange && nodes !== previousNodes) {
            onChange(nodes);
        }
    }, [nodes, previousNodes, onChange]);
    var previousComments = usePrevious(comments);
    React__default["default"].useEffect(function () {
        if (previousComments && onCommentsChange && comments !== previousComments) {
            onCommentsChange(comments);
        }
    }, [comments, previousComments, onCommentsChange]);
    React__default["default"].useEffect(function () {
        if (sideEffectToasts) {
            dispatchToasts(sideEffectToasts);
            setSideEffectToasts(null);
        }
    }, [sideEffectToasts]);
    return (React__default["default"].createElement(PortTypesContext.Provider, { value: portTypes },
        React__default["default"].createElement(NodeTypesContext.Provider, { value: nodeTypes },
            React__default["default"].createElement(NodeDispatchContext.Provider, { value: dispatchNodes },
                React__default["default"].createElement(ConnectionRecalculateContext.Provider, { value: triggerRecalculation },
                    React__default["default"].createElement(ContextContext.Provider, { value: context },
                        React__default["default"].createElement(StageContext.Provider, { value: stageState },
                            React__default["default"].createElement(CacheContext.Provider, { value: cache },
                                React__default["default"].createElement(EditorIdContext.Provider, { value: editorId },
                                    React__default["default"].createElement(RecalculateStageRectContext.Provider, { value: recalculateStageRect },
                                        React__default["default"].createElement(Stage, { editorId: editorId, scale: stageState.scale, translate: stageState.translate, spaceToPan: spaceToPan, disablePan: disablePan, disableZoom: disableZoom, dispatchStageState: dispatchStageState, dispatchComments: dispatchComments, disableComments: disableComments || hideComments, stageRef: stage, numNodes: Object.keys(nodes).length, outerStageChildren: React__default["default"].createElement(React__default["default"].Fragment, null,
                                                debug && (React__default["default"].createElement("div", { className: styles.debugWrapper },
                                                    React__default["default"].createElement("button", { className: styles.debugButton, onClick: function () { return console.log(nodes); } }, "Log Nodes"),
                                                    React__default["default"].createElement("button", { className: styles.debugButton, onClick: function () {
                                                            return console.log(JSON.stringify(nodes));
                                                        } }, "Export Nodes"),
                                                    React__default["default"].createElement("button", { className: styles.debugButton, onClick: function () { return console.log(comments); } }, "Log Comments"))),
                                                React__default["default"].createElement(Toaster, { toasts: toasts, dispatchToasts: dispatchToasts })) },
                                            !hideComments &&
                                                Object.values(comments).map(function (comment) { return (React__default["default"].createElement(Comment, __assign({}, comment, { stageRect: stage, dispatch: dispatchComments, onDragStart: recalculateStageRect, key: comment.id }))); }),
                                            Object.values(nodes).map(function (node) { return (React__default["default"].createElement(Node, __assign({}, node, { stageRect: stage, onDragEnd: triggerRecalculation, onDragStart: recalculateStageRect, renderNodeHeader: renderNodeHeader, key: node.id }))); }),
                                            React__default["default"].createElement(Connections, { nodes: nodes, editorId: editorId }),
                                            React__default["default"].createElement("div", { className: styles.dragWrapper, id: "".concat(DRAG_CONNECTION_ID).concat(editorId) }))))))))))));
};
var index = React__default["default"].forwardRef(NodeEditor);
var useRootEngine = function (nodes, engine, context) {
    return Object.keys(nodes).length ? engine.resolveRootNode(nodes, { context: context }) : {};
};

exports.Colors = Colors;
exports.Controls = Controls;
exports.FlumeConfig = FlumeConfig;
exports.RootEngine = RootEngine;
exports["default"] = index;
exports.useRootEngine = useRootEngine;
//# sourceMappingURL=index.js.map
