import React, { useLayoutEffect, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inherits$2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn$2(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn$2(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

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

var useIsomorphicLayoutEffect = /*#__PURE__*/canUseDOM$1() ? useLayoutEffect : useEffect;

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

  var _React$useState = useState(initialId),
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
  useEffect(function () {
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

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$d = ".Stage_wrapper__1-MnH {\n  width: 100%;\n  height: 100%;\n  min-height: 100px;\n  background-color: rgb(26, 28, 29);\n  background-image: linear-gradient(\n      0deg,\n      transparent 24%,\n      rgba(255, 255, 255, 0.04) 25%,\n      rgba(255, 255, 255, 0.04) 26%,\n      transparent 27%,\n      transparent 74%,\n      rgba(255, 255, 255, 0.04) 75%,\n      rgba(255, 255, 255, 0.04) 76%,\n      transparent 77%,\n      transparent\n    ),\n    linear-gradient(\n      90deg,\n      transparent 24%,\n      rgba(255, 255, 255, 0.04) 25%,\n      rgba(255, 255, 255, 0.04) 26%,\n      transparent 27%,\n      transparent 74%,\n      rgba(255, 255, 255, 0.04) 75%,\n      rgba(255, 255, 255, 0.04) 76%,\n      transparent 77%,\n      transparent\n    );\n  color: #000;\n  background-size: 30px 30px;\n  position: relative;\n  overflow: hidden;\n  -webkit-overflow-scrolling: touch;\n  font-family: Helvetica, sans-serif;\n  text-align: left;\n  line-height: 1;\n  outline: none !important;\n}\n.Stage_wrapper__1-MnH * {\n  box-sizing: border-box;\n}\n.Stage_wrapper__1-MnH input,\ntextarea,\nselect {\n  font-family: Helvetica, sans-serif;\n}\n.Stage_transformWrapper__15k8U {\n  transform-origin: center center;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 0px;\n  height: 0px;\n}\n.Stage_scaleWrapper__Svldl {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  width: 0px;\n  height: 0px;\n}\n";
var styles$d = {"wrapper":"Stage_wrapper__1-MnH","transformWrapper":"Stage_transformWrapper__15k8U","scaleWrapper":"Stage_scaleWrapper__Svldl"};
styleInject(css_248z$d);

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
      return ReactDOM.createPortal(this.props.children, this.props.node || this.defaultNode);
    }
  }]);

  return Portal;
}(React.Component);

Portal$3.propTypes = {
  children: PropTypes.node.isRequired,
  node: PropTypes.any
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
      ReactDOM.unmountComponentAtNode(this.defaultNode || this.props.node);
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
        children = React.cloneElement(this.props.children);
      }

      this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(this, children, this.props.node || this.defaultNode);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Portal;
}(React.Component);

var LegacyPortal = Portal$2;


Portal$2.propTypes = {
  children: PropTypes.node.isRequired,
  node: PropTypes.any
};

var Portal = void 0;

if (ReactDOM.createPortal) {
  Portal = Portalv4;
} else {
  Portal = LegacyPortal;
}

var Portal$1 = Portal;

var css_248z$c = ".ContextMenu_menuWrapper__Z9z6u{\n  position: fixed;\n  z-index: 9999;\n  background: rgba(29, 32, 34, 0.95);\n  border-radius: 5px;\n  box-shadow: 0px 6px 7px rgba(0,0,0,.3);\n  border: 1px solid rgba(0,0,0,.4);\n  font-size: 14px;\n  max-width: 300px;\n  min-width: 150px;\n  font-family: Helvetica, sans-serif;\n  line-height: 1.15;\n  outline: none;\n}\n@supports (backdrop-filter: blur(6px)){\n  .ContextMenu_menuWrapper__Z9z6u{\n    backdrop-filter: blur(6px);\n    background: rgba(29, 32, 34, 0.8);\n  }\n}\n.ContextMenu_menuHeader__YueK-{\n  padding: 5px;\n  border-bottom: 1px solid rgba(255,255,255,.1);\n  display: flex;\n  flex-direction: column;\n}\n.ContextMenu_menuLabel__s8v-E{\n  margin: 0px;\n  color: #fff;\n  font-size: 16px;\n  font-weight: 600;\n}\n.ContextMenu_optionsWrapper__KHbqz{\n  max-height: 300px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n}\n.ContextMenu_menuFilter__mcwO6{\n  border: none;\n  background: none;\n  height: 24px;\n  flex: 1 1 auto;\n  width: 100%;\n  outline: none;\n  color: #fff;\n}\n.ContextMenu_menuFilter__mcwO6::placeholder{\n    font-style: italic;\n  }\n.ContextMenu_option__vWtA9{\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  padding: 5px;\n  border-bottom: 1px solid rgba(255,255,255,.1);\n  color: #ffffff;\n}\n.ContextMenu_option__vWtA9:last-child{\n    border-bottom: none;\n  }\n.ContextMenu_option__vWtA9:hover{\n    background: rgba(255,255,255,.05);\n  }\n.ContextMenu_option__vWtA9 label{\n    margin-bottom: 5px;\n    user-select: none;\n  }\n.ContextMenu_option__vWtA9 label:last-child{\n      margin-bottom: 0px;\n    }\n.ContextMenu_option__vWtA9 p{\n    margin: 0px;\n    font-style: italic;\n    font-size: 12px;\n    color: rgb(182, 186, 194);\n    user-select: none;\n  }\n.ContextMenu_option__vWtA9[data-selected=true]{\n    background: rgba(255,255,255,.05);\n  }\n.ContextMenu_emptyText__lDw6a{\n  color: #fff;\n  padding: 5px;\n}\n";
var styles$c = {"menuWrapper":"ContextMenu_menuWrapper__Z9z6u","menuHeader":"ContextMenu_menuHeader__YueK-","menuLabel":"ContextMenu_menuLabel__s8v-E","optionsWrapper":"ContextMenu_optionsWrapper__KHbqz","menuFilter":"ContextMenu_menuFilter__mcwO6","option":"ContextMenu_option__vWtA9","emptyText":"ContextMenu_emptyText__lDw6a"};
styleInject(css_248z$c);

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

function isObject$4(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$4;

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
    isObject$3 = isObject_1,
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
  if (isObject$3(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$3(other) ? (other + '') : other;
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

// This alphabet uses a-z A-Z 0-9 _- symbols.
// Symbols are generated for smaller size.
// -_zyxwvutsrqponmlkjihgfedcba9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA
var url = '-_';
// Loop from 36 to 0 (from z to a and 9 to 0 in Base36).
var i = 36;
while (i--) {
  // 36 is radix. Number.prototype.toString(36) returns number
  // in Base36 representation. Base36 is like hex, but it uses 0–9 and a-z.
  url += i.toString(36);
}
// Loop from 36 to 10 (from Z to A in Base36).
i = 36;
while (i-- - 10) {
  url += i.toString(36).toUpperCase();
}

/**
 * Generate URL-friendly unique ID. This method use non-secure predictable
 * random generator with bigger collision probability.
 *
 * @param {number} [size=21] The number of symbols in ID.
 *
 * @return {string} Random string.
 *
 * @example
 * const nanoid = require('nanoid/non-secure')
 * model.id = nanoid() //=> "Uakgb_J5m9g-0JDMbcJqL"
 *
 * @name nonSecure
 * @function
 */
var nonSecure = function (size) {
  var id = '';
  i = size || 21;
  // Compact alternative for `for (var i = 0; i < size; i++)`
  while (i--) {
    // `| 0` is compact and faster alternative for `Math.floor()`
    id += url[Math.random() * 64 | 0];
  }
  return id
};

var nanoid = nonSecure;

var ContextMenu = function ContextMenu(_ref) {
  var x = _ref.x,
      y = _ref.y,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options,
      onRequestClose = _ref.onRequestClose,
      onOptionSelected = _ref.onOptionSelected,
      label = _ref.label,
      hideHeader = _ref.hideHeader,
      hideFilter = _ref.hideFilter,
      emptyText = _ref.emptyText;
  var menuWrapper = React.useRef();
  var menuOptionsWrapper = React.useRef();
  var filterInput = React.useRef();

  var _React$useState = React.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      filter = _React$useState2[0],
      setFilter = _React$useState2[1];

  var _React$useState3 = React.useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      menuWidth = _React$useState4[0],
      setMenuWidth = _React$useState4[1];

  var _React$useState5 = React.useState(0),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      selectedIndex = _React$useState6[0],
      setSelectedIndex = _React$useState6[1];

  var menuId = React.useRef(nanoid(10));

  var handleOptionSelected = function handleOptionSelected(option) {
    onOptionSelected(option);
    onRequestClose();
  };

  var testClickOutside = React.useCallback(function (e) {
    if (menuWrapper.current && !menuWrapper.current.contains(e.target)) {
      onRequestClose();
      document.removeEventListener("click", testClickOutside, {
        capture: true
      });
      document.removeEventListener("contextmenu", testClickOutside, {
        capture: true
      });
    }
  }, [menuWrapper, onRequestClose]);
  var testEscape = React.useCallback(function (e) {
    if (e.keyCode === 27) {
      onRequestClose();
      document.removeEventListener("keydown", testEscape, {
        capture: true
      });
    }
  }, [onRequestClose]);
  React.useEffect(function () {
    if (filterInput.current) {
      filterInput.current.focus();
    }

    setMenuWidth(menuWrapper.current.getBoundingClientRect().width);
    document.addEventListener("keydown", testEscape, {
      capture: true
    });
    document.addEventListener("click", testClickOutside, {
      capture: true
    });
    document.addEventListener("contextmenu", testClickOutside, {
      capture: true
    });
    return function () {
      document.removeEventListener("click", testClickOutside, {
        capture: true
      });
      document.removeEventListener("contextmenu", testClickOutside, {
        capture: true
      });
      document.removeEventListener("keydown", testEscape, {
        capture: true
      });
    };
  }, [testClickOutside, testEscape]);
  var filteredOptions = React.useMemo(function () {
    if (!filter) return options;
    var lowerFilter = filter.toLowerCase();
    return options.filter(function (opt) {
      return opt.label.toLowerCase().includes(lowerFilter);
    });
  }, [filter, options]);

  var handleFilterChange = function handleFilterChange(e) {
    var value = e.target.value;
    setFilter(value);
    setSelectedIndex(0);
  };

  var handleKeyDown = function handleKeyDown(e) {
    // Up pressed
    if (e.which === 38) {
      e.preventDefault();

      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else if (selectedIndex > 0) {
        setSelectedIndex(function (i) {
          return i - 1;
        });
      }
    } // Down pressed


    if (e.which === 40) {
      e.preventDefault();

      if (selectedIndex === null) {
        setSelectedIndex(0);
      } else if (selectedIndex < filteredOptions.length - 1) {
        setSelectedIndex(function (i) {
          return i + 1;
        });
      }
    } // Enter pressed


    if (e.which === 13 && selectedIndex !== null) {
      var option = filteredOptions[selectedIndex];

      if (option) {
        handleOptionSelected(option);
      }
    }
  };

  React.useEffect(function () {
    if (hideFilter || hideHeader) {
      menuWrapper.current.focus();
    }
  }, [hideFilter, hideHeader]);
  React.useEffect(function () {
    var menuOption = document.getElementById("".concat(menuId.current, "-").concat(selectedIndex));

    if (menuOption) {
      var menuRect = menuOptionsWrapper.current.getBoundingClientRect();
      var optionRect = menuOption.getBoundingClientRect();

      if (optionRect.y + optionRect.height > menuRect.y + menuRect.height || optionRect.y < menuRect.y) {
        menuOption.scrollIntoView({
          block: "nearest"
        });
      }
    }
  }, [selectedIndex]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles$c.menuWrapper,
    onMouseDown: function onMouseDown(e) {
      return e.stopPropagation();
    },
    onKeyDown: handleKeyDown,
    style: {
      left: x,
      top: y,
      width: filter ? menuWidth : "auto"
    },
    ref: menuWrapper,
    tabIndex: 0,
    role: "menu",
    "aria-activedescendant": "".concat(menuId.current, "-").concat(selectedIndex)
  }, !hideHeader && (label ? true : !!options.length) ? /*#__PURE__*/React.createElement("div", {
    className: styles$c.menuHeader
  }, /*#__PURE__*/React.createElement("label", {
    className: styles$c.menuLabel
  }, label), !hideFilter && options.length ? /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Filter options",
    value: filter,
    onChange: handleFilterChange,
    className: styles$c.menuFilter,
    autoFocus: true,
    ref: filterInput
  }) : null) : null, /*#__PURE__*/React.createElement("div", {
    className: styles$c.optionsWrapper,
    role: "menu",
    ref: menuOptionsWrapper,
    style: {
      maxHeight: clamp_1(window.innerHeight - y - 70, 10, 300)
    }
  }, filteredOptions.map(function (option, i) {
    return /*#__PURE__*/React.createElement(ContextOption, {
      menuId: menuId.current,
      selected: selectedIndex === i,
      onClick: function onClick() {
        return handleOptionSelected(option);
      },
      onMouseEnter: function onMouseEnter() {
        return setSelectedIndex(null);
      },
      index: i,
      key: option.value + i
    }, /*#__PURE__*/React.createElement("label", null, option.label), option.description ? /*#__PURE__*/React.createElement("p", null, option.description) : null);
  }), !options.length ? /*#__PURE__*/React.createElement("span", {
    className: styles$c.emptyText
  }, emptyText) : null));
};

var ContextOption = function ContextOption(_ref2) {
  var menuId = _ref2.menuId,
      index = _ref2.index,
      children = _ref2.children,
      onClick = _ref2.onClick,
      selected = _ref2.selected,
      onMouseEnter = _ref2.onMouseEnter;
  return /*#__PURE__*/React.createElement("div", {
    className: styles$c.option,
    role: "menuitem",
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    "data-selected": selected,
    id: "".concat(menuId, "-").concat(index)
  }, children);
};

var NodeTypesContext = /*#__PURE__*/React.createContext();
var PortTypesContext = /*#__PURE__*/React.createContext();
var NodeDispatchContext = /*#__PURE__*/React.createContext();
var ConnectionRecalculateContext = /*#__PURE__*/React.createContext();
var ContextContext = /*#__PURE__*/React.createContext();
var StageContext = /*#__PURE__*/React.createContext();
var CacheContext = /*#__PURE__*/React.createContext();
var RecalculateStageRectContext = /*#__PURE__*/React.createContext();
var EditorIdContext = /*#__PURE__*/React.createContext();

var _excluded$3 = ["children", "stageState", "stageRect", "onDragDelayStart", "onDragStart", "onDrag", "onDragEnd", "onMouseDown", "onTouchStart", "disabled", "delay", "innerRef"];
var Draggable = (function (_ref) {
  var children = _ref.children,
      stageState = _ref.stageState,
      stageRect = _ref.stageRect,
      onDragDelayStart = _ref.onDragDelayStart,
      onDragStart = _ref.onDragStart,
      onDrag = _ref.onDrag,
      onDragEnd = _ref.onDragEnd,
      _onMouseDown = _ref.onMouseDown,
      _onTouchStart = _ref.onTouchStart,
      disabled = _ref.disabled,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? 6 : _ref$delay,
      innerRef = _ref.innerRef,
      rest = _objectWithoutProperties(_ref, _excluded$3);

  var startCoordinates = React.useRef(null);
  var offset = React.useRef();
  var wrapper = React.useRef();

  var byScale = function byScale(value) {
    return 1 / stageState.scale * value;
  };

  var getScaledCoordinates = function getScaledCoordinates(e) {
    var x = byScale(e.clientX - (stageRect ? stageRect.current.left : 0) - offset.current.x - (stageRect ? stageRect.current.width : 0) / 2) + byScale(stageState.translate.x);
    var y = byScale(e.clientY - (stageRect ? stageRect.current.top : 0) - offset.current.y - (stageRect ? stageRect.current.height : 0) / 2) + byScale(stageState.translate.y);
    return {
      x: x,
      y: y
    };
  };

  var updateCoordinates = function updateCoordinates(e) {
    var coordinates = getScaledCoordinates(e);

    if (onDrag) {
      onDrag(coordinates, e);
    }
  };

  var stopDrag = function stopDrag(e) {
    var coordinates = getScaledCoordinates(e);

    if (onDragEnd) {
      onDragEnd(e, coordinates);
    }

    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("mousemove", updateCoordinates);
  };

  var startDrag = function startDrag(e) {
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

  var checkDragDelay = function checkDragDelay(e) {
    var x;
    var y;

    if ("ontouchstart" in window && e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
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

  var endDragDelay = function endDragDelay() {
    document.removeEventListener("mouseup", endDragDelay);
    document.removeEventListener("mousemove", checkDragDelay);
    startCoordinates.current = null;
  };

  var startDragDelay = function startDragDelay(e) {
    if (onDragDelayStart) {
      onDragDelayStart(e);
    }

    e.stopPropagation();
    var x;
    var y;

    if ("ontouchstart" in window && e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      e.preventDefault();
      x = e.clientX;
      y = e.clientY;
    }

    startCoordinates.current = {
      x: x,
      y: y
    };
    document.addEventListener("mouseup", endDragDelay);
    document.addEventListener("mousemove", checkDragDelay);
  };

  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseDown: function onMouseDown(e) {
      if (!disabled) {
        startDragDelay(e);
      }

      if (_onMouseDown) {
        _onMouseDown(e);
      }
    },
    onTouchStart: function onTouchStart(e) {
      if (!disabled) {
        startDragDelay(e);
      }

      if (_onTouchStart) {
        _onTouchStart(e);
      }
    },
    onDragStart: function onDragStart(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    ref: function ref(_ref2) {
      wrapper.current = _ref2;

      if (innerRef) {
        innerRef.current = _ref2;
      }
    }
  }, rest), children);
});

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

var isArray$9 = isArray_1,
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
  if (isArray$9(value)) {
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

var baseGetTag$3 = _baseGetTag,
    isObject$2 = isObject_1;

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
  if (!isObject$2(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag$3(value);
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
    isObject$1 = isObject_1,
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
    objectProto$9 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$7).replace(reRegExpChar, '\\$&')
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
  if (!isObject$1(value) || isMasked(value)) {
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
function getNative$6(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var _getNative = getNative$6;

var getNative$5 = _getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate$4 = getNative$5(Object, 'create');

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
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

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
  return hasOwnProperty$6.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet$1;

var nativeCreate$1 = _nativeCreate;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

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
  return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$5.call(data, key);
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

function eq$2(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq$2;

var eq$1 = eq_1;

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
    if (eq$1(array[length][0], key)) {
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

var getNative$4 = _getNative,
    root$5 = _root;

/* Built-in method references that are verified to be native. */
var Map$4 = getNative$4(root$5, 'Map');

var _Map = Map$4;

var Hash = _Hash,
    ListCache$3 = _ListCache,
    Map$3 = _Map;

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
    'map': new (Map$3 || ListCache$3),
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

var Symbol$2 = _Symbol,
    arrayMap$1 = _arrayMap,
    isArray$8 = isArray_1,
    isSymbol$2 = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : undefined,
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
  if (isArray$8(value)) {
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

var isArray$7 = isArray_1,
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
  if (isArray$7(value)) {
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
    Map$2 = _Map,
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
    if (!Map$2 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
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

var Symbol$1 = _Symbol,
    Uint8Array = _Uint8Array,
    eq = eq_1,
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
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
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
      return eq(+object, +other);

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

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */

function arrayPush$1(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush$1;

var arrayPush = _arrayPush,
    isArray$6 = isArray_1;

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
  return isArray$6(object) ? result : arrayPush(result, symbolsFunc(object));
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
var objectProto$6 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

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
    return propertyIsEnumerable$1.call(object, symbol);
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

var baseGetTag$2 = _baseGetTag,
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
  return isObjectLike$3(value) && baseGetTag$2(value) == argsTag$2;
}

var _baseIsArguments = baseIsArguments$1;

var baseIsArguments = _baseIsArguments,
    isObjectLike$2 = isObjectLike_1;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

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
var isArguments$2 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike$2(value) && hasOwnProperty$4.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments$2;

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
function isIndex$2(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex$2;

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
    isArray$5 = isArray_1,
    isBuffer$1 = isBuffer$2.exports,
    isIndex$1 = _isIndex,
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
  var isArr = isArray$5(value),
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
           isIndex$1(key, length)
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
function isArrayLike$3(value) {
  return value != null && isLength$1(value.length) && !isFunction(value);
}

var isArrayLike_1 = isArrayLike$3;

var arrayLikeKeys = _arrayLikeKeys,
    baseKeys = _baseKeys,
    isArrayLike$2 = isArrayLike_1;

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
  return isArrayLike$2(object) ? arrayLikeKeys(object) : baseKeys(object);
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

var getNative$3 = _getNative,
    root$3 = _root;

/* Built-in method references that are verified to be native. */
var DataView$1 = getNative$3(root$3, 'DataView');

var _DataView = DataView$1;

var getNative$2 = _getNative,
    root$2 = _root;

/* Built-in method references that are verified to be native. */
var Promise$2 = getNative$2(root$2, 'Promise');

var _Promise = Promise$2;

var getNative$1 = _getNative,
    root$1 = _root;

/* Built-in method references that are verified to be native. */
var Set$1 = getNative$1(root$1, 'Set');

var _Set = Set$1;

var getNative = _getNative,
    root = _root;

/* Built-in method references that are verified to be native. */
var WeakMap$1 = getNative(root, 'WeakMap');

var _WeakMap = WeakMap$1;

var DataView = _DataView,
    Map$1 = _Map,
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
    mapCtorString = toSource(Map$1),
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
    (Map$1 && getTag$1(new Map$1) != mapTag) ||
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
    isArray$4 = isArray_1,
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
  var objIsArr = isArray$4(object),
      othIsArr = isArray$4(other),
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

var isObject = isObject_1;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable$2(value) {
  return value === value && !isObject(value);
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
    isArray$3 = isArray_1,
    isIndex = _isIndex,
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
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray$3(object) || isArguments(object));
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

function identity$2(value) {
  return value;
}

var identity_1 = identity$2;

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
    identity$1 = identity_1,
    isArray$2 = isArray_1,
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
    return identity$1;
  }
  if (typeof value == 'object') {
    return isArray$2(value)
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

var isArrayLike$1 = isArrayLike_1;

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
    if (!isArrayLike$1(collection)) {
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
    isArrayLike = isArrayLike_1;

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
      result = isArrayLike(collection) ? Array(collection.length) : [];

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
    identity = identity_1,
    isArray$1 = isArray_1;

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
      if (isArray$1(iteratee)) {
        return function(value) {
          return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        }
      }
      return iteratee;
    });
  } else {
    iteratees = [identity];
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

var baseOrderBy = _baseOrderBy,
    isArray = isArray_1;

/**
 * This method is like `_.sortBy` except that it allows specifying the sort
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @param {string[]} [orders] The sort orders of `iteratees`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * // Sort by `user` in ascending order and by `age` in descending order.
 * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
function orderBy(collection, iteratees, orders, guard) {
  if (collection == null) {
    return [];
  }
  if (!isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }
  orders = guard ? undefined : orders;
  if (!isArray(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return baseOrderBy(collection, iteratees, orders);
}

var orderBy_1 = orderBy;

var STAGE_ID = '__node_editor_stage__';
var DRAG_CONNECTION_ID = '__node_editor_drag_connection__';
var CONNECTIONS_ID = '__node_editor_connections__';

var Stage = function Stage(_ref) {
  var scale = _ref.scale,
      translate = _ref.translate,
      editorId = _ref.editorId,
      dispatchStageState = _ref.dispatchStageState,
      children = _ref.children,
      outerStageChildren = _ref.outerStageChildren,
      numNodes = _ref.numNodes,
      stageRef = _ref.stageRef,
      spaceToPan = _ref.spaceToPan,
      dispatchComments = _ref.dispatchComments,
      disableComments = _ref.disableComments,
      disablePan = _ref.disablePan,
      disableZoom = _ref.disableZoom;
  var nodeTypes = React.useContext(NodeTypesContext);
  var dispatchNodes = React.useContext(NodeDispatchContext);
  var wrapper = React.useRef();
  var translateWrapper = React.useRef();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      menuOpen = _React$useState2[0],
      setMenuOpen = _React$useState2[1];

  var _React$useState3 = React.useState({
    x: 0,
    y: 0
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      menuCoordinates = _React$useState4[0],
      setMenuCoordinates = _React$useState4[1];

  var dragData = React.useRef({
    x: 0,
    y: 0
  });

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      spaceIsPressed = _React$useState6[0],
      setSpaceIsPressed = _React$useState6[1];

  var setStageRect = React.useCallback(function () {
    stageRef.current = wrapper.current.getBoundingClientRect();
  }, []);
  React.useEffect(function () {
    stageRef.current = wrapper.current.getBoundingClientRect();
    window.addEventListener("resize", setStageRect);
    return function () {
      window.removeEventListener("resize", setStageRect);
    };
  }, [stageRef, setStageRect]);
  var handleWheel = React.useCallback(function (e) {
    if (e.target.nodeName === "TEXTAREA" || e.target.dataset.comment) {
      if (e.target.clientHeight < e.target.scrollHeight) return;
    }

    e.preventDefault();

    if (numNodes > 0) {
      var delta = e.deltaY;
      dispatchStageState(function (_ref2) {
        var scale = _ref2.scale;
        return {
          type: "SET_SCALE",
          scale: clamp_1(scale - clamp_1(delta, -10, 10) * 0.005, 0.1, 7)
        };
      });
    }
  }, [dispatchStageState, numNodes]);

  var handleDragDelayStart = function handleDragDelayStart(e) {
    wrapper.current.focus();
  };

  var handleDragStart = function handleDragStart(e) {
    e.preventDefault();
    dragData.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  var handleMouseDrag = function handleMouseDrag(coords, e) {
    var xDistance = dragData.current.x - e.clientX;
    var yDistance = dragData.current.y - e.clientY;
    translateWrapper.current.style.transform = "translate(".concat(-(translate.x + xDistance), "px, ").concat(-(translate.y + yDistance), "px)");
  };

  var handleDragEnd = function handleDragEnd(e) {
    var xDistance = dragData.current.x - e.clientX;
    var yDistance = dragData.current.y - e.clientY;
    dragData.current.x = e.clientX;
    dragData.current.y = e.clientY;
    dispatchStageState(function (_ref3) {
      var tran = _ref3.translate;
      return {
        type: "SET_TRANSLATE",
        translate: {
          x: tran.x + xDistance,
          y: tran.y + yDistance
        }
      };
    });
  };

  var handleContextMenu = function handleContextMenu(e) {
    e.preventDefault();
    setMenuCoordinates({
      x: e.clientX,
      y: e.clientY
    });
    setMenuOpen(true);
    return false;
  };

  var closeContextMenu = function closeContextMenu() {
    setMenuOpen(false);
  };

  var byScale = function byScale(value) {
    return 1 / scale * value;
  };

  var addNode = function addNode(_ref4) {
    var node = _ref4.node,
        internalType = _ref4.internalType;
    var wrapperRect = wrapper.current.getBoundingClientRect();
    var x = byScale(menuCoordinates.x - wrapperRect.x - wrapperRect.width / 2) + byScale(translate.x);
    var y = byScale(menuCoordinates.y - wrapperRect.y - wrapperRect.height / 2) + byScale(translate.y);

    if (internalType === "comment") {
      dispatchComments({
        type: "ADD_COMMENT",
        x: x,
        y: y
      });
    } else {
      dispatchNodes({
        type: "ADD_NODE",
        x: x,
        y: y,
        nodeType: node.type
      });
    }
  };

  var handleDocumentKeyUp = function handleDocumentKeyUp(e) {
    if (e.which === 32) {
      setSpaceIsPressed(false);
      document.removeEventListener("keyup", handleDocumentKeyUp);
    }
  };

  var handleKeyDown = function handleKeyDown(e) {
    if (e.which === 32 && document.activeElement === wrapper.current) {
      e.preventDefault();
      e.stopPropagation();
      setSpaceIsPressed(true);
      document.addEventListener("keyup", handleDocumentKeyUp);
    }
  };

  var handleMouseEnter = function handleMouseEnter() {
    if (!wrapper.current.contains(document.activeElement)) {
      wrapper.current.focus();
    }
  };

  React.useEffect(function () {
    if (!disableZoom) {
      var stageWrapper = wrapper.current;
      stageWrapper.addEventListener("wheel", handleWheel);
      return function () {
        stageWrapper.removeEventListener("wheel", handleWheel);
      };
    }
  }, [handleWheel, disableZoom]);
  var menuOptions = React.useMemo(function () {
    var options = orderBy_1(Object.values(nodeTypes).filter(function (node) {
      return node.addable !== false;
    }).map(function (node) {
      return {
        value: node.type,
        label: node.label,
        description: node.description,
        sortIndex: node.sortIndex,
        node: node
      };
    }), ["sortIndex", "label"]);

    if (!disableComments) {
      options.push({
        value: "comment",
        label: "Comment",
        description: "A comment for documenting nodes",
        internalType: "comment"
      });
    }

    return options;
  }, [nodeTypes, disableComments]);
  return /*#__PURE__*/React.createElement(Draggable, {
    id: "".concat(STAGE_ID).concat(editorId),
    className: styles$d.wrapper,
    innerRef: wrapper,
    onContextMenu: handleContextMenu,
    onMouseEnter: handleMouseEnter,
    onDragDelayStart: handleDragDelayStart,
    onDragStart: handleDragStart,
    onDrag: handleMouseDrag,
    onDragEnd: handleDragEnd,
    onKeyDown: handleKeyDown,
    tabIndex: -1,
    stageState: {
      scale: scale,
      translate: translate
    },
    style: {
      cursor: spaceIsPressed && spaceToPan ? "grab" : ""
    },
    disabled: disablePan || spaceToPan && !spaceIsPressed,
    "data-flume-stage": true
  }, menuOpen ? /*#__PURE__*/React.createElement(Portal$1, null, /*#__PURE__*/React.createElement(ContextMenu, {
    x: menuCoordinates.x,
    y: menuCoordinates.y,
    options: menuOptions,
    onRequestClose: closeContextMenu,
    onOptionSelected: addNode,
    label: "Add Node"
  })) : null, /*#__PURE__*/React.createElement("div", {
    ref: translateWrapper,
    className: styles$d.transformWrapper,
    style: {
      transform: "translate(".concat(-translate.x, "px, ").concat(-translate.y, "px)")
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$d.scaleWrapper,
    style: {
      transform: "scale(".concat(scale, ")")
    }
  }, children)), outerStageChildren);
};

var css_248z$b = ".Node_wrapper__S8Vij{\n  background: rgba(91, 96, 99, 0.9);\n  border-radius: 5px;\n  box-shadow: 0px 4px 8px rgba(0,0,0,.4);\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  user-select: none;\n  display: flex;\n  flex-direction: column;\n  z-index: 1;\n  cursor: default;\n}\n.Node_label__v7h4v{\n  font-size: 13px;\n  text-transform: uppercase;\n  padding: 5px;\n  background: #464b4e;\n  border-radius: 5px 5px 0px 0px;\n  margin: 0px;\n  margin-bottom: 3px;\n  border-bottom: 1px solid rgba(0,0,0,.15);\n}\n";
var styles$b = {"wrapper":"Node_wrapper__S8Vij","label":"Node_label__v7h4v"};
styleInject(css_248z$b);

var css_248z$a = ".Connection_svg__dY13y{\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  pointer-events: none;\n  z-index: 0;\n  overflow: visible !important;\n}\n";
var styles$a = {"svg":"Connection_svg__dY13y"};
styleInject(css_248z$a);

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
      case 1: this._point = 2; // proceed
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

function line() {
  var x$1 = x,
      y$1 = y,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function line(data) {
    var i,
        n = data.length,
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
      case 3: point(this, this._x1, this._y1); // proceed
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
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function curveBasis(context) {
  return new Basis(context);
}

var getPort = function getPort(nodeId, portName) {
  var transputType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "input";
  return document.querySelector("[data-node-id=\"".concat(nodeId, "\"] [data-port-name=\"").concat(portName, "\"][data-port-transput-type=\"").concat(transputType, "\"]"));
};

var getPortRect = function getPortRect(nodeId, portName) {
  var transputType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "input";
  var cache = arguments.length > 3 ? arguments[3] : undefined;

  if (cache) {
    var portCacheName = nodeId + portName + transputType;
    var cachedPort = cache.current.ports[portCacheName];

    if (cachedPort) {
      return cachedPort.getBoundingClientRect();
    } else {
      var port = getPort(nodeId, portName, transputType);
      cache.current.ports[portCacheName] = port;
      return port && port.getBoundingClientRect();
    }
  } else {
    var _port = getPort(nodeId, portName, transputType);

    return _port && _port.getBoundingClientRect();
  }
};
var calculateCurve = function calculateCurve(from, to) {
  var length = to.x - from.x;
  var thirdLength = length / 3;
  var curve = line().curve(curveBasis)([[from.x, from.y], [from.x + thirdLength, from.y], [from.x + thirdLength * 2, to.y], [to.x, to.y]]);
  return curve;
};
var deleteConnection = function deleteConnection(_ref3) {
  var id = _ref3.id;
  var line = document.querySelector("[data-connection-id=\"".concat(id, "\"]"));
  if (line) line.parentNode.remove();
};
var deleteConnectionsByNodeId = function deleteConnectionsByNodeId(nodeId) {
  var lines = document.querySelectorAll("[data-output-node-id=\"".concat(nodeId, "\"], [data-input-node-id=\"").concat(nodeId, "\"]"));

  var _iterator = _createForOfIteratorHelper(lines),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _line = _step.value;

      _line.parentNode.remove();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
var updateConnection = function updateConnection(_ref4) {
  var line = _ref4.line,
      from = _ref4.from,
      to = _ref4.to;
  line.setAttribute("d", calculateCurve(from, to));
};
var createSVG = function createSVG(_ref5) {
  var from = _ref5.from,
      to = _ref5.to,
      stage = _ref5.stage,
      id = _ref5.id,
      outputNodeId = _ref5.outputNodeId,
      outputPortName = _ref5.outputPortName,
      inputNodeId = _ref5.inputNodeId,
      inputPortName = _ref5.inputPortName,
      stroke = _ref5.stroke;
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", styles$a.svg);
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
var getStageRef = function getStageRef(editorId) {
  return document.getElementById("".concat(CONNECTIONS_ID).concat(editorId));
};
var createConnections = function createConnections(nodes, _ref6, editorId, portTypes) {
  var scale = _ref6.scale;
      _ref6.stageId;
  var stageRef = getStageRef(editorId);

  if (stageRef) {
    var stage = stageRef.getBoundingClientRect();
    var stageHalfWidth = stage.width / 2;
    var stageHalfHeight = stage.height / 2;

    var byScale = function byScale(value) {
      return 1 / scale * value;
    };

    Object.values(nodes).forEach(function (node) {
      if (node.connections && node.connections.inputs) {
        Object.entries(node.connections.inputs).forEach(function (_ref7, k) {
          var _ref8 = _slicedToArray(_ref7, 2),
              inputName = _ref8[0],
              outputs = _ref8[1];

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
                    x: byScale(fromPort.x - stage.x + portHalf - stageHalfWidth),
                    y: byScale(fromPort.y - stage.y + portHalf - stageHalfHeight)
                  },
                  to: {
                    x: byScale(toPort.x - stage.x + portHalf - stageHalfWidth),
                    y: byScale(toPort.y - stage.y + portHalf - stageHalfHeight)
                  }
                });
              } else {
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
                    x: byScale(fromPort.x - stage.x + portHalf - stageHalfWidth),
                    y: byScale(fromPort.y - stage.y + portHalf - stageHalfHeight)
                  },
                  to: {
                    x: byScale(toPort.x - stage.x + portHalf - stageHalfWidth),
                    y: byScale(toPort.y - stage.y + portHalf - stageHalfHeight)
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

var css_248z$9 = ".IoPorts_wrapper__4jboF{\n  display: flex;\n  flex-direction: column;\n  margin-top: auto;\n  width: 100%;\n  padding: 5px;\n}\n.IoPorts_inputs__M7xAH{\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  width: 100%;\n  margin-bottom: 10px;\n}\n.IoPorts_inputs__M7xAH:last-child{\n    margin-bottom: 0px;\n  }\n.IoPorts_inputs__M7xAH .IoPorts_transput__5JT3i:first-child .IoPorts_portLabel__XY5gi, .IoPorts_inputs__M7xAH .IoPorts_transput__5JT3i:first-child .IoPorts_port__ZC6Mw{\n        margin-top: 5px;\n      }\n.IoPorts_inputs__M7xAH .IoPorts_transput__5JT3i:last-child .IoPorts_portLabel__XY5gi, .IoPorts_inputs__M7xAH .IoPorts_transput__5JT3i:last-child .IoPorts_port__ZC6Mw{\n        margin-bottom: 5px;\n      }\n.IoPorts_outputs__hqc88{\n  display: flex;\n  flex-direction: column;\n  margin-left: auto;\n  justify-content: flex-end;\n  align-items: flex-end;\n  width: 100%;\n}\n.IoPorts_outputs__hqc88 .IoPorts_transput__5JT3i:last-child .IoPorts_portLabel__XY5gi, .IoPorts_outputs__hqc88 .IoPorts_transput__5JT3i:last-child .IoPorts_port__ZC6Mw{\n        margin-bottom: 5px;\n      }\n.IoPorts_outputs__hqc88:first-child{\n    margin-top: 5px;\n  }\n.IoPorts_transput__5JT3i{\n  display: flex;\n  align-items: center;\n  margin-top: 6px;\n  margin-bottom: 6px;\n}\n.IoPorts_transput__5JT3i:first-child{\n    margin-top: 0px;\n  }\n.IoPorts_transput__5JT3i[data-controlless=\"true\"]{\n    margin-top: 6px;\n    margin-bottom: 6px;\n  }\n.IoPorts_transput__5JT3i[data-controlless=\"true\"]:first-child{\n      margin-top: 0px;\n    }\n.IoPorts_transput__5JT3i[data-controlless=\"false\"]{\n    margin-top: 2px;\n    margin-bottom: 2px;\n  }\n.IoPorts_controls__J4rPJ{\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n.IoPorts_portLabel__XY5gi{\n  font-size: 13px;\n  font-weight: 400;\n}\n.IoPorts_port__ZC6Mw{\n  width: 12px;\n  height: 12px;\n  background: linear-gradient(to bottom, #acb1b4, #919699);\n  border-radius: 100%;\n  margin-right: 5px;\n  margin-left: -11px;\n  flex: 0 0 auto;\n  box-shadow: 0px 2px 1px 0px rgba(0,0,0,.6);\n}\n.IoPorts_port__ZC6Mw:last-child{\n    margin-right: -11px;\n    margin-left: 5px;\n  }\n.IoPorts_port__ZC6Mw[data-port-color=\"red\"]{\n    background: linear-gradient(to bottom, #fa4a6f, #c22e4d);\n  }\n.IoPorts_port__ZC6Mw[data-port-color=\"purple\"]{\n    background: linear-gradient(to bottom, #9e55fb, #6024b6);\n  }\n.IoPorts_port__ZC6Mw[data-port-color=\"blue\"]{\n    background: linear-gradient(to bottom, #4284f7, #2867d4);\n  }\n.IoPorts_port__ZC6Mw[data-port-color=\"green\"]{\n    background: linear-gradient(to bottom, #31dd9f, #11ad7a);\n  }\n.IoPorts_port__ZC6Mw[data-port-color=\"yellow\"]{\n    background: linear-gradient(to bottom, #d6bf47, #9d8923);\n  }\n.IoPorts_port__ZC6Mw[data-port-color=\"orange\"]{\n    background: linear-gradient(to bottom, #fa7841, #c94b23);\n  }\n.IoPorts_port__ZC6Mw[data-port-color=\"pink\"]{\n    background: linear-gradient(to bottom, #fe8aeb, #e046c3);\n  }\n";
var styles$9 = {"wrapper":"IoPorts_wrapper__4jboF","inputs":"IoPorts_inputs__M7xAH","transput":"IoPorts_transput__5JT3i","portLabel":"IoPorts_portLabel__XY5gi","port":"IoPorts_port__ZC6Mw","outputs":"IoPorts_outputs__hqc88","controls":"IoPorts_controls__J4rPJ"};
styleInject(css_248z$9);

var css_248z$8 = ".Control_wrapper__-SFsk {\n  width: 100%;\n  padding-right: 3px;\n  padding-top: 3px;\n  padding-bottom: 5px;\n}\n.Control_label__KZtDp {\n  font-size: 14px;\n}\n.Control_controlLabel__4z-U8 {\n  font-size: 13px;\n  display: inline-block;\n  margin-left: 2px;\n}\n";
var styles$8 = {"wrapper":"Control_wrapper__-SFsk","label":"Control_label__KZtDp","controlLabel":"Control_controlLabel__4z-U8"};
styleInject(css_248z$8);

var css_248z$7 = ".Checkbox_wrapper__KYSY7{\n  display: flex;\n  align-items: center;\n}\n.Checkbox_checkbox__-WxSv{\n  background: linear-gradient(to bottom, #5b5f62, #6f7477);\n  border: 1px solid #3c3e40;\n  border-radius: 4px;\n  margin-right: 8px;\n}\n.Checkbox_label__z44oI{\n  padding-top: 2px;\n  font-size: 13px;\n}\n";
var styles$7 = {"wrapper":"Checkbox_wrapper__KYSY7","checkbox":"Checkbox_checkbox__-WxSv","label":"Checkbox_label__z44oI"};
styleInject(css_248z$7);

var Checkbox = function Checkbox(_ref) {
  var label = _ref.label,
      data = _ref.data,
      _onChange = _ref.onChange;
  var id = React.useRef(nanoid(10));
  return /*#__PURE__*/React.createElement("div", {
    className: styles$7.wrapper
  }, /*#__PURE__*/React.createElement("input", {
    className: styles$7.checkbox,
    type: "checkbox",
    id: id,
    value: data,
    checked: data,
    onChange: function onChange(e) {
      return _onChange(e.target.checked);
    }
  }), /*#__PURE__*/React.createElement("label", {
    className: styles$7.label,
    htmlFor: id
  }, label));
};

var css_248z$6 = ".TextInput_wrapper__9lufS{\n  background: none;\n  border: none;\n}\n.TextInput_input__EPXF0{\n  background: linear-gradient(to bottom, #5b5f62, #6f7477);\n  width: 100%;\n  border: 1px solid #3c3e40;\n  border-radius: 4px;\n  font-size: 13px;\n  padding: 5px;\n  resize: vertical;\n  outline: none;\n}\n.TextInput_input__EPXF0::placeholder{\n    color: rgb(47, 49, 50);\n  }\n.TextInput_input__EPXF0:focus{\n    background: linear-gradient(to bottom, #676b6e, #75797c);\n  }\n";
var styles$6 = {"wrapper":"TextInput_wrapper__9lufS","input":"TextInput_input__EPXF0"};
styleInject(css_248z$6);

var TextInput = function TextInput(_ref) {
  var placeholder = _ref.placeholder,
      updateNodeConnections = _ref.updateNodeConnections,
      _onChange = _ref.onChange,
      data = _ref.data,
      step = _ref.step,
      type = _ref.type;
  var numberInput = React.useRef();
  var recalculateStageRect = React.useContext(RecalculateStageRectContext);

  var handleDragEnd = function handleDragEnd() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  var handleMouseMove = function handleMouseMove(e) {
    e.stopPropagation();
    updateNodeConnections();
  };

  var handlePossibleResize = function handlePossibleResize(e) {
    e.stopPropagation();
    recalculateStageRect();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles$6.wrapper
  }, type === "number" ? /*#__PURE__*/React.createElement("input", {
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === 69) {
        e.preventDefault();
        return false;
      }
    },
    onChange: function onChange(e) {
      var inputValue = e.target.value.replace(/[^0-9.]+/g, '');

      if (!!inputValue) {
        var value = parseFloat(inputValue, 10);

        if (Number.isNaN(value)) {
          _onChange(0);
        } else {
          _onChange(value);

          numberInput.current.value = value;
        }
      }
    },
    onBlur: function onBlur(e) {
      if (!e.target.value) {
        _onChange(0);

        numberInput.current.value = 0;
      }
    },
    step: step || "1",
    onMouseDown: handlePossibleResize,
    type: type || "text",
    placeholder: placeholder,
    className: styles$6.input,
    defaultValue: data,
    onDragStart: function onDragStart(e) {
      return e.stopPropagation();
    },
    ref: numberInput
  }) : /*#__PURE__*/React.createElement("textarea", {
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    },
    onMouseDown: handlePossibleResize,
    type: "text",
    placeholder: placeholder,
    className: styles$6.input,
    value: data,
    onDragStart: function onDragStart(e) {
      return e.stopPropagation();
    }
  }));
};

var css_248z$5 = ".Select_wrapper__LU8xp{\n  font-size: 14px;\n  padding: 3px 6px;\n  border-radius: 4px;\n  background: linear-gradient(to top, #5b5f62, #6f7477);\n  width: 100%;\n  border: 1px solid #3c3e40;\n  padding-right: 15px;\n  position: relative;\n}\n  .Select_wrapper__LU8xp::after{\n    content: \"\";\n    position: absolute;\n    background: none;\n    right: 5px;\n    top: 8px;\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-width: 6px 5px 0 5px;\n    border-color: #191b1c transparent transparent transparent;\n  }\n  .Select_wrapper__LU8xp:hover{\n    background: linear-gradient(to top, #63676a, #777b7e);\n  }\n.Select_chipWrapper__zZu-R{\n  font-size: 14px;\n  padding: 3px 6px;\n  border-radius: 4px;\n  background: linear-gradient(to top, #5b5f62, #6f7477);\n  border: 1px solid #3c3e40;\n  margin: 2px;\n  position: relative;\n}\n.Select_chipWrapper__zZu-R:hover .Select_deleteButton__K7AfO{\n  opacity: 1;\n}\n.Select_chipsWrapper__3uo8O{\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 6px;\n}\n.Select_deleteButton__K7AfO{\n  position: absolute;\n  right: 0px;\n  top: 0px;\n  height: 100%;\n  width: 22px;\n  padding: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: linear-gradient(to top, #5b5f62, #6f7477);\n  border-radius: 3px;\n  border: none;\n  font-weight: bold;\n  opacity: 0;\n}\n.Select_deleteButton__K7AfO:focus{\n  opacity: 1;\n}\n.Select_deleteButton__K7AfO:hover{\n  background: linear-gradient(to top, #64696c, #797f82);\n}\n.Select_selectedWrapper__JsEFo{\n  display: flex;\n  flex-direction: column;\n  border-radius: 4px;\n  background: linear-gradient(to top, #5b5f62, #6f7477);\n  width: 100%;\n  border: 1px solid #3c3e40;\n  font-size: 14px;\n  padding: 3px 6px;\n  padding-right: 15px;\n  position: relative;\n}\n.Select_selectedWrapper__JsEFo::after{\n    content: \"\";\n    position: absolute;\n    background: none;\n    right: 5px;\n    top: calc(50% - 4px);\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-width: 6px 5px 0 5px;\n    border-color: #191b1c transparent transparent transparent;\n  }\n.Select_selectedWrapper__JsEFo label{\n    margin: 0px;\n  }\n.Select_selectedWrapper__JsEFo p{\n    margin: 0px;\n    margin-top: 5px;\n    font-size: 12px;\n    font-style: italic;\n    color: rgb(50, 50, 50);\n  }\n";
var styles$5 = {"wrapper":"Select_wrapper__LU8xp","chipWrapper":"Select_chipWrapper__zZu-R","deleteButton":"Select_deleteButton__K7AfO","chipsWrapper":"Select_chipsWrapper__3uo8O","selectedWrapper":"Select_selectedWrapper__JsEFo"};
styleInject(css_248z$5);

var MAX_LABEL_LENGTH = 50;

var Select = function Select(_ref) {
  var _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? "[Select an option]" : _ref$placeholder,
      onChange = _ref.onChange,
      data = _ref.data,
      allowMultiple = _ref.allowMultiple;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      drawerOpen = _React$useState2[0],
      setDrawerOpen = _React$useState2[1];

  var _React$useState3 = React.useState({
    x: 0,
    y: 0
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      drawerCoordinates = _React$useState4[0],
      setDrawerCoordinates = _React$useState4[1];

  var wrapper = React.useRef();

  var closeDrawer = function closeDrawer() {
    setDrawerOpen(false);
  };

  var openDrawer = function openDrawer() {
    if (!drawerOpen) {
      var wrapperRect = wrapper.current.getBoundingClientRect();
      setDrawerCoordinates({
        x: wrapperRect.x,
        y: wrapperRect.y + wrapperRect.height
      });
      setDrawerOpen(true);
    }
  };

  var handleOptionSelected = function handleOptionSelected(option) {
    if (allowMultiple) {
      onChange([].concat(_toConsumableArray(data), [option.value]));
    } else {
      onChange(option.value);
    }
  };

  var handleOptionDeleted = function handleOptionDeleted(optionIndex) {
    onChange([].concat(_toConsumableArray(data.slice(0, optionIndex)), _toConsumableArray(data.slice(optionIndex + 1))));
  };

  var getFilteredOptions = function getFilteredOptions() {
    return allowMultiple ? options.filter(function (opt) {
      return !data.includes(opt.value);
    }) : options;
  };

  var selectedOption = React.useMemo(function () {
    var option = options.find(function (o) {
      return o.value === data;
    });

    if (option) {
      return _objectSpread2(_objectSpread2({}, option), {}, {
        label: option.label.length > MAX_LABEL_LENGTH ? option.label.slice(0, MAX_LABEL_LENGTH) + "..." : option.label
      });
    }
  }, [options, data]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, allowMultiple ? data.length ? /*#__PURE__*/React.createElement("div", {
    className: styles$5.chipsWrapper
  }, data.map(function (val, i) {
    var optLabel = (options.find(function (opt) {
      return opt.value === val;
    }) || {}).label || "";
    return /*#__PURE__*/React.createElement(OptionChip, {
      onRequestDelete: function onRequestDelete() {
        return handleOptionDeleted(i);
      },
      key: val
    }, optLabel);
  })) : null : data ? /*#__PURE__*/React.createElement(SelectedOption, {
    wrapperRef: wrapper,
    option: selectedOption,
    onClick: openDrawer
  }) : null, (allowMultiple || !data) && /*#__PURE__*/React.createElement("div", {
    className: styles$5.wrapper,
    ref: wrapper,
    onClick: openDrawer
  }, placeholder), drawerOpen && /*#__PURE__*/React.createElement(Portal$1, null, /*#__PURE__*/React.createElement(ContextMenu, {
    x: drawerCoordinates.x,
    y: drawerCoordinates.y,
    emptyText: "There are no options",
    options: getFilteredOptions(),
    onOptionSelected: handleOptionSelected,
    onRequestClose: closeDrawer
  })));
};

var SelectedOption = function SelectedOption(_ref2) {
  var _ref2$option = _ref2.option;
  _ref2$option = _ref2$option === void 0 ? {} : _ref2$option;
  var label = _ref2$option.label,
      description = _ref2$option.description,
      wrapperRef = _ref2.wrapperRef,
      onClick = _ref2.onClick;
  return /*#__PURE__*/React.createElement("div", {
    className: styles$5.selectedWrapper,
    onClick: onClick,
    ref: wrapperRef
  }, /*#__PURE__*/React.createElement("label", null, label), description ? /*#__PURE__*/React.createElement("p", null, description) : null);
};

var OptionChip = function OptionChip(_ref3) {
  var children = _ref3.children,
      onRequestDelete = _ref3.onRequestDelete;
  return /*#__PURE__*/React.createElement("div", {
    className: styles$5.chipWrapper
  }, children, /*#__PURE__*/React.createElement("button", {
    className: styles$5.deleteButton,
    onMouseDown: function onMouseDown(e) {
      e.stopPropagation();
    },
    onClick: onRequestDelete
  }, "\u2715"));
};

var Control = function Control(_ref) {
  var type = _ref.type,
      name = _ref.name,
      nodeId = _ref.nodeId,
      portName = _ref.portName,
      label = _ref.label,
      inputLabel = _ref.inputLabel,
      data = _ref.data,
      allData = _ref.allData,
      render = _ref.render,
      step = _ref.step,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options,
      placeholder = _ref.placeholder,
      inputData = _ref.inputData,
      triggerRecalculation = _ref.triggerRecalculation,
      updateNodeConnections = _ref.updateNodeConnections,
      getOptions = _ref.getOptions,
      setValue = _ref.setValue,
      defaultValue = _ref.defaultValue,
      isMonoControl = _ref.isMonoControl;
  var nodesDispatch = React.useContext(NodeDispatchContext);
  var executionContext = React.useContext(ContextContext);
  var calculatedLabel = isMonoControl ? inputLabel : label;

  var onChange = function onChange(data) {
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

  var getControlByType = function getControlByType(type) {
    var commonProps = {
      triggerRecalculation: triggerRecalculation,
      updateNodeConnections: updateNodeConnections,
      onChange: onChange,
      data: data
    };

    switch (type) {
      case "select":
        return /*#__PURE__*/React.createElement(Select, _extends({}, commonProps, {
          options: getOptions ? getOptions(inputData, executionContext) : options,
          placeholder: placeholder
        }));

      case "text":
        return /*#__PURE__*/React.createElement(TextInput, _extends({}, commonProps, {
          placeholder: placeholder
        }));

      case "number":
        return /*#__PURE__*/React.createElement(TextInput, _extends({}, commonProps, {
          step: step,
          type: "number",
          placeholder: placeholder
        }));

      case "checkbox":
        return /*#__PURE__*/React.createElement(Checkbox, _extends({}, commonProps, {
          label: calculatedLabel
        }));

      case "multiselect":
        return /*#__PURE__*/React.createElement(Select, _extends({
          allowMultiple: true
        }, commonProps, {
          options: getOptions ? getOptions(inputData, executionContext) : options,
          placeholder: placeholder,
          label: label
        }));

      case "custom":
        return render(data, onChange, executionContext, triggerRecalculation, {
          label: label,
          name: name,
          portName: portName,
          inputLabel: inputLabel,
          defaultValue: defaultValue
        }, allData);

      default:
        return /*#__PURE__*/React.createElement("div", null, "Control");
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles$8.wrapper
  }, calculatedLabel && type !== "checkbox" && type !== "custom" && /*#__PURE__*/React.createElement("label", {
    className: styles$8.controlLabel
  }, calculatedLabel), getControlByType(type));
};

var Connection = function Connection(_ref) {
  var from = _ref.from,
      to = _ref.to,
      id = _ref.id,
      lineRef = _ref.lineRef,
      outputNodeId = _ref.outputNodeId,
      outputPortName = _ref.outputPortName,
      inputNodeId = _ref.inputNodeId,
      inputPortName = _ref.inputPortName,
      stroke = _ref.stroke;
  var curve = calculateCurve(from, to);
  return /*#__PURE__*/React.createElement("svg", {
    className: styles$a.svg
  }, /*#__PURE__*/React.createElement("path", {
    "data-connection-id": id,
    "data-output-node-id": outputNodeId,
    "data-output-port-name": outputPortName,
    "data-input-node-id": inputNodeId,
    "data-input-port-name": inputPortName,
    stroke: stroke,
    fill: "none",
    strokeWidth: 3,
    strokeLinecap: "round",
    d: curve,
    ref: lineRef
  }));
};

var usePrevious = function usePrevious(value) {
  var ref = React.useRef();
  React.useEffect(function () {
    ref.current = value;
  });
  return ref.current;
};

function useTransputs(transputsFn, transputType, nodeId, inputData, connections) {
  var nodesDispatch = React.useContext(NodeDispatchContext);
  var executionContext = React.useContext(ContextContext);
  var transputs = React.useMemo(function () {
    if (Array.isArray(transputsFn)) return transputsFn;
    return transputsFn(inputData, connections, executionContext);
  }, [transputsFn, inputData, connections, executionContext]);
  var prevTransputs = usePrevious(transputs);
  React.useEffect(function () {
    if (!prevTransputs || Array.isArray(transputsFn)) return;

    var _iterator = _createForOfIteratorHelper(prevTransputs),
        _step;

    try {
      var _loop = function _loop() {
        var transput = _step.value;
        var current = transputs.find(function (_ref) {
          var name = _ref.name;
          return transput.name === name;
        });

        if (!current) {
          nodesDispatch({
            type: 'DESTROY_TRANSPUT',
            transputType: transputType,
            transput: {
              nodeId: nodeId,
              portName: '' + transput.name
            }
          });
        }
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }, [transputsFn, transputs, prevTransputs, nodesDispatch, nodeId, transputType]);
  return transputs;
}

var IoPorts = function IoPorts(_ref2) {
  var nodeId = _ref2.nodeId,
      _ref2$inputs = _ref2.inputs,
      inputs = _ref2$inputs === void 0 ? [] : _ref2$inputs,
      _ref2$outputs = _ref2.outputs,
      outputs = _ref2$outputs === void 0 ? [] : _ref2$outputs,
      connections = _ref2.connections,
      inputData = _ref2.inputData,
      updateNodeConnections = _ref2.updateNodeConnections;
  var inputTypes = React.useContext(PortTypesContext);
  var triggerRecalculation = React.useContext(ConnectionRecalculateContext);
  var resolvedInputs = useTransputs(inputs, 'input', nodeId, inputData, connections);
  var resolvedOutputs = useTransputs(outputs, 'output', nodeId, inputData, connections);
  return /*#__PURE__*/React.createElement("div", {
    className: styles$9.wrapper
  }, resolvedInputs.length ? /*#__PURE__*/React.createElement("div", {
    className: styles$9.inputs
  }, resolvedInputs.map(function (input) {
    return /*#__PURE__*/React.createElement(Input, _extends({}, input, {
      data: inputData[input.name] || {},
      isConnected: !!connections.inputs[input.name],
      triggerRecalculation: triggerRecalculation,
      updateNodeConnections: updateNodeConnections,
      inputTypes: inputTypes,
      nodeId: nodeId,
      inputData: inputData,
      key: input.name
    }));
  })) : null, !!resolvedOutputs.length && /*#__PURE__*/React.createElement("div", {
    className: styles$9.outputs
  }, resolvedOutputs.map(function (output) {
    return /*#__PURE__*/React.createElement(Output, _extends({}, output, {
      triggerRecalculation: triggerRecalculation,
      inputTypes: inputTypes,
      nodeId: nodeId,
      inputData: inputData,
      portOnRight: true,
      key: output.name
    }));
  })));
};

var Input = function Input(_ref3) {
  var type = _ref3.type,
      label = _ref3.label,
      name = _ref3.name,
      nodeId = _ref3.nodeId,
      data = _ref3.data,
      localControls = _ref3.controls,
      inputTypes = _ref3.inputTypes,
      noControls = _ref3.noControls,
      triggerRecalculation = _ref3.triggerRecalculation,
      updateNodeConnections = _ref3.updateNodeConnections,
      isConnected = _ref3.isConnected,
      inputData = _ref3.inputData,
      hidePort = _ref3.hidePort;

  var _ref4 = inputTypes[type] || {},
      defaultLabel = _ref4.label,
      color = _ref4.color,
      _ref4$controls = _ref4.controls,
      defaultControls = _ref4$controls === void 0 ? [] : _ref4$controls;

  var prevConnected = usePrevious(isConnected);
  var controls = localControls || defaultControls;
  React.useEffect(function () {
    if (isConnected !== prevConnected) {
      triggerRecalculation();
    }
  }, [isConnected, prevConnected, triggerRecalculation]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles$9.transput,
    "data-controlless": isConnected || noControls || !controls.length,
    onDragStart: function onDragStart(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, !hidePort ? /*#__PURE__*/React.createElement(Port, {
    type: type,
    color: color,
    name: name,
    nodeId: nodeId,
    isInput: true,
    triggerRecalculation: triggerRecalculation
  }) : null, (!controls.length || noControls || isConnected) && /*#__PURE__*/React.createElement("label", {
    className: styles$9.portLabel
  }, label || defaultLabel), !noControls && !isConnected ? /*#__PURE__*/React.createElement("div", {
    className: styles$9.controls
  }, controls.map(function (control) {
    return /*#__PURE__*/React.createElement(Control, _extends({}, control, {
      nodeId: nodeId,
      portName: name,
      triggerRecalculation: triggerRecalculation,
      updateNodeConnections: updateNodeConnections,
      inputLabel: label,
      data: data[control.name],
      allData: data,
      key: control.name,
      inputData: inputData,
      isMonoControl: controls.length === 1
    }));
  })) : null);
};

var Output = function Output(_ref5) {
  var label = _ref5.label,
      name = _ref5.name,
      nodeId = _ref5.nodeId,
      type = _ref5.type,
      inputTypes = _ref5.inputTypes,
      triggerRecalculation = _ref5.triggerRecalculation;

  var _ref6 = inputTypes[type] || {},
      defaultLabel = _ref6.label,
      color = _ref6.color;

  return /*#__PURE__*/React.createElement("div", {
    className: styles$9.transput,
    "data-controlless": true,
    onDragStart: function onDragStart(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: styles$9.portLabel
  }, label || defaultLabel), /*#__PURE__*/React.createElement(Port, {
    type: type,
    name: name,
    color: color,
    nodeId: nodeId,
    triggerRecalculation: triggerRecalculation
  }));
};

var Port = function Port(_ref7) {
  var _ref7$color = _ref7.color,
      color = _ref7$color === void 0 ? "grey" : _ref7$color,
      _ref7$name = _ref7.name,
      name = _ref7$name === void 0 ? "" : _ref7$name,
      type = _ref7.type,
      isInput = _ref7.isInput,
      nodeId = _ref7.nodeId,
      triggerRecalculation = _ref7.triggerRecalculation;
  var nodesDispatch = React.useContext(NodeDispatchContext);
  var stageState = React.useContext(StageContext);
  var editorId = React.useContext(EditorIdContext);
  var stageId = "".concat(STAGE_ID).concat(editorId);
  var inputTypes = React.useContext(PortTypesContext);

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isDragging = _React$useState2[0],
      setIsDragging = _React$useState2[1];

  var _React$useState3 = React.useState({
    x: 0,
    y: 0
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      dragStartCoordinates = _React$useState4[0],
      setDragStartCoordinates = _React$useState4[1];

  var dragStartCoordinatesCache = React.useRef(dragStartCoordinates);
  var port = React.useRef();
  var line = React.useRef();
  var lineInToPort = React.useRef();

  var byScale = function byScale(value) {
    return 1 / stageState.scale * value;
  };

  var handleDrag = function handleDrag(e) {
    var stage = document.getElementById(stageId).getBoundingClientRect();

    if (isInput) {
      var to = {
        x: byScale(e.clientX - stage.x - stage.width / 2) + byScale(stageState.translate.x),
        y: byScale(e.clientY - stage.y - stage.height / 2) + byScale(stageState.translate.y)
      };
      lineInToPort.current.setAttribute("d", calculateCurve(dragStartCoordinatesCache.current, to));
    } else {
      var _to = {
        x: byScale(e.clientX - stage.x - stage.width / 2) + byScale(stageState.translate.x),
        y: byScale(e.clientY - stage.y - stage.height / 2) + byScale(stageState.translate.y)
      };
      line.current.setAttribute("d", calculateCurve(dragStartCoordinatesCache.current, _to));
    }
  };

  var handleDragEnd = function handleDragEnd(e) {
    var droppedOnPort = !!e.target.dataset.portName;

    if (isInput) {
      var _lineInToPort$current = lineInToPort.current.dataset,
          inputNodeId = _lineInToPort$current.inputNodeId,
          inputPortName = _lineInToPort$current.inputPortName,
          outputNodeId = _lineInToPort$current.outputNodeId,
          outputPortName = _lineInToPort$current.outputPortName;
      nodesDispatch({
        type: "REMOVE_CONNECTION",
        input: {
          nodeId: inputNodeId,
          portName: inputPortName
        },
        output: {
          nodeId: outputNodeId,
          portName: outputPortName
        }
      });

      if (droppedOnPort) {
        var _e$target$dataset = e.target.dataset,
            connectToPortName = _e$target$dataset.portName,
            connectToNodeId = _e$target$dataset.nodeId,
            connectToPortType = _e$target$dataset.portType,
            connectToTransputType = _e$target$dataset.portTransputType;
        var isNotSameNode = outputNodeId !== connectToNodeId;

        if (isNotSameNode && connectToTransputType !== "output") {
          var inputWillAcceptConnection = inputTypes[connectToPortType].acceptTypes.includes(type);

          if (inputWillAcceptConnection) {
            nodesDispatch({
              type: "ADD_CONNECTION",
              input: {
                nodeId: connectToNodeId,
                portName: connectToPortName
              },
              output: {
                nodeId: outputNodeId,
                portName: outputPortName
              }
            });
          }
        }
      }
    } else {
      if (droppedOnPort) {
        var _e$target$dataset2 = e.target.dataset,
            _inputPortName = _e$target$dataset2.portName,
            _inputNodeId = _e$target$dataset2.nodeId,
            inputNodeType = _e$target$dataset2.portType,
            inputTransputType = _e$target$dataset2.portTransputType;

        var _isNotSameNode = _inputNodeId !== nodeId;

        if (_isNotSameNode && inputTransputType !== "output") {
          var _inputWillAcceptConnection = inputTypes[inputNodeType].acceptTypes.includes(type);

          if (_inputWillAcceptConnection) {
            nodesDispatch({
              type: "ADD_CONNECTION",
              output: {
                nodeId: nodeId,
                portName: name
              },
              input: {
                nodeId: _inputNodeId,
                portName: _inputPortName
              }
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

  var handleDragStart = function handleDragStart(e) {
    e.preventDefault();
    e.stopPropagation();
    var startPort = port.current.getBoundingClientRect();
    var stage = document.getElementById(stageId).getBoundingClientRect();

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
    } else {
      var _outputPort = inputTypes[port.current.dataset.portType];
      var nodes = document.querySelectorAll("[data-output-node-id=\"".concat(nodeId, "\"][data-output-port-name=\"").concat(name, "\"]"));
      var canConnect = nodes.length < _outputPort.maxOutputs;

      if (canConnect) {
        var _coordinates = {
          x: byScale(startPort.x - stage.x + startPort.width / 2 - stage.width / 2) + byScale(stageState.translate.x),
          y: byScale(startPort.y - stage.y + startPort.width / 2 - stage.height / 2) + byScale(stageState.translate.y)
        };
        setDragStartCoordinates(_coordinates);
        dragStartCoordinatesCache.current = _coordinates;
        setIsDragging(true);
        document.addEventListener("mouseup", handleDragEnd);
        document.addEventListener("mousemove", handleDrag);
      }
    }
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      zIndex: 999
    },
    onMouseDown: handleDragStart,
    className: styles$9.port,
    "data-port-color": color,
    "data-port-name": name,
    "data-port-type": type,
    "data-port-transput-type": isInput ? "input" : "output",
    "data-node-id": nodeId,
    onDragStart: function onDragStart(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    ref: port
  }), isDragging && !isInput ? /*#__PURE__*/React.createElement(Portal$1, {
    node: document.getElementById("".concat(DRAG_CONNECTION_ID).concat(editorId))
  }, /*#__PURE__*/React.createElement(Connection, {
    from: dragStartCoordinates,
    to: dragStartCoordinates,
    lineRef: line,
    stroke: color
  })) : null);
};

var _excluded$2 = ["children", "className"];

var Node = function Node(_ref) {
  var id = _ref.id,
      width = _ref.width,
      x = _ref.x,
      y = _ref.y,
      stageRect = _ref.stageRect,
      connections = _ref.connections,
      type = _ref.type,
      inputData = _ref.inputData,
      onDragStart = _ref.onDragStart,
      renderNodeHeader = _ref.renderNodeHeader;
  var cache = React.useContext(CacheContext);
  var nodeTypes = React.useContext(NodeTypesContext);
  var nodesDispatch = React.useContext(NodeDispatchContext);
  var stageState = React.useContext(StageContext);
  var currentNodeType = nodeTypes[type];
  var label = currentNodeType.label,
      deletable = currentNodeType.deletable,
      _currentNodeType$inpu = currentNodeType.inputs,
      inputs = _currentNodeType$inpu === void 0 ? [] : _currentNodeType$inpu,
      _currentNodeType$outp = currentNodeType.outputs,
      outputs = _currentNodeType$outp === void 0 ? [] : _currentNodeType$outp;
  var nodeWrapper = React.useRef();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      menuOpen = _React$useState2[0],
      setMenuOpen = _React$useState2[1];

  var _React$useState3 = React.useState({
    x: 0,
    y: 0
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      menuCoordinates = _React$useState4[0],
      setMenuCoordinates = _React$useState4[1];

  var byScale = function byScale(value) {
    return 1 / stageState.scale * value;
  };

  var updateConnectionsByTransput = function updateConnectionsByTransput() {
    var transput = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var isOutput = arguments.length > 1 ? arguments[1] : undefined;
    Object.entries(transput).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          portName = _ref3[0],
          outputs = _ref3[1];

      outputs.forEach(function (output) {
        var toRect = getPortRect(id, portName, isOutput ? "output" : "input", cache);
        var fromRect = getPortRect(output.nodeId, output.portName, isOutput ? "input" : "output", cache);
        var portHalf = fromRect.width / 2;
        var combined;

        if (isOutput) {
          combined = id + portName + output.nodeId + output.portName;
        } else {
          combined = output.nodeId + output.portName + id + portName;
        }

        var cnx;
        var cachedConnection = cache.current.connections[combined];

        if (cachedConnection) {
          cnx = cachedConnection;
        } else {
          cnx = document.querySelector("[data-connection-id=\"".concat(combined, "\"]"));
          cache.current.connections[combined] = cnx;
        }

        var from = {
          x: byScale(toRect.x - stageRect.current.x + portHalf - stageRect.current.width / 2) + byScale(stageState.translate.x),
          y: byScale(toRect.y - stageRect.current.y + portHalf - stageRect.current.height / 2) + byScale(stageState.translate.y)
        };
        var to = {
          x: byScale(fromRect.x - stageRect.current.x + portHalf - stageRect.current.width / 2) + byScale(stageState.translate.x),
          y: byScale(fromRect.y - stageRect.current.y + portHalf - stageRect.current.height / 2) + byScale(stageState.translate.y)
        };
        cnx.setAttribute("d", calculateCurve(from, to));
      });
    });
  };

  var updateNodeConnections = function updateNodeConnections() {
    if (connections) {
      updateConnectionsByTransput(connections.inputs);
      updateConnectionsByTransput(connections.outputs, true);
    }
  };

  var stopDrag = function stopDrag(e, coordinates) {
    nodesDispatch(_objectSpread2(_objectSpread2({
      type: "SET_NODE_COORDINATES"
    }, coordinates), {}, {
      nodeId: id
    }));
  };

  var handleDrag = function handleDrag(_ref4) {
    var x = _ref4.x,
        y = _ref4.y;
    nodeWrapper.current.style.transform = "translate(".concat(x, "px,").concat(y, "px)");
    updateNodeConnections();
  };

  var startDrag = function startDrag(e) {
    onDragStart();
  };

  var handleContextMenu = function handleContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    setMenuCoordinates({
      x: e.clientX,
      y: e.clientY
    });
    setMenuOpen(true);
    return false;
  };

  var closeContextMenu = function closeContextMenu() {
    setMenuOpen(false);
  };

  var deleteNode = function deleteNode() {
    nodesDispatch({
      type: "REMOVE_NODE",
      nodeId: id
    });
  };

  var handleMenuOption = function handleMenuOption(_ref5) {
    var value = _ref5.value;

    switch (value) {
      case "deleteNode":
        deleteNode();
        break;

      default:
        return;
    }
  };

  return /*#__PURE__*/React.createElement(Draggable, {
    className: styles$b.wrapper,
    style: {
      width: width,
      transform: "translate(".concat(x, "px, ").concat(y, "px)")
    },
    onDragStart: startDrag,
    onDrag: handleDrag,
    onDragEnd: stopDrag,
    innerRef: nodeWrapper,
    "data-node-id": id,
    onContextMenu: handleContextMenu,
    stageState: stageState,
    stageRect: stageRect
  }, renderNodeHeader ? renderNodeHeader(NodeHeader, currentNodeType, {
    openMenu: handleContextMenu,
    closeMenu: closeContextMenu,
    deleteNode: deleteNode
  }) : /*#__PURE__*/React.createElement(NodeHeader, null, label), /*#__PURE__*/React.createElement(IoPorts, {
    nodeId: id,
    inputs: inputs,
    outputs: outputs,
    connections: connections,
    updateNodeConnections: updateNodeConnections,
    inputData: inputData
  }), menuOpen ? /*#__PURE__*/React.createElement(Portal$1, null, /*#__PURE__*/React.createElement(ContextMenu, {
    x: menuCoordinates.x,
    y: menuCoordinates.y,
    options: _toConsumableArray(deletable !== false ? [{
      label: "Delete Node",
      value: "deleteNode",
      description: "Deletes a node and all of its connections."
    }] : []),
    onRequestClose: closeContextMenu,
    onOptionSelected: handleMenuOption,
    hideFilter: true,
    label: "Node Options",
    emptyText: "This node has no options."
  })) : null);
};

var NodeHeader = function NodeHeader(_ref6) {
  var children = _ref6.children,
      _ref6$className = _ref6.className,
      className = _ref6$className === void 0 ? "" : _ref6$className,
      props = _objectWithoutProperties(_ref6, _excluded$2);

  return /*#__PURE__*/React.createElement("h2", _extends({}, props, {
    className: styles$b.label + (className ? " ".concat(className) : "")
  }), children);
};

var css_248z$4 = ".Comment_wrapper__2CG3I {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  padding: 5px;\n  background: rgba(147, 154, 158, 0.7);\n  border-radius: 5px;\n  border-bottom-right-radius: 2px;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);\n  min-width: 80px;\n  font-size: 14px;\n  display: flex;\n  text-shadow: 0px 1px rgba(255,255,255,.1);\n  border: 1px solid rgba(168, 176, 181, 0.7);\n  user-select: none;\n}\n  .Comment_wrapper__2CG3I[data-color=\"red\"]{\n    background: rgba(213, 84, 103, 0.65);\n    border-color: rgba(227, 85, 119, 0.65);\n  }\n  .Comment_wrapper__2CG3I[data-color=\"purple\"]{\n    background: rgba(153, 83, 196, 0.65);\n    border-color: rgba(156, 85, 227, 0.65);\n  }\n  .Comment_wrapper__2CG3I[data-color=\"blue\"]{\n    background: rgba(76, 142, 203, 0.65);\n    border-color: rgba(85, 159, 227, 0.65);\n  }\n  .Comment_wrapper__2CG3I[data-color=\"green\"]{\n    background: rgba(70, 200, 130, 0.65);\n    border-color: rgba(85, 227, 150, 0.65);\n  }\n  .Comment_wrapper__2CG3I[data-color=\"yellow\"]{\n    background: rgba(200, 167, 63, 0.65);\n    border-color: rgba(227, 213, 85, 0.65);\n  }\n  .Comment_wrapper__2CG3I[data-color=\"orange\"]{\n    background: rgba(215, 123, 64, 0.65);\n    border-color: rgba(227, 149, 85, 0.65);\n  }\n  .Comment_wrapper__2CG3I[data-color=\"pink\"]{\n    background: rgba(255, 102, 208, 0.65);\n    border-color: rgba(242, 131, 228, 0.65);\n  }\n.Comment_text__wBsGB{\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  white-space: pre-wrap;\n  cursor: default;\n}\n.Comment_resizeThumb__e-57p {\n  width: 10px;\n  height: 10px;\n  border-radius: 4px 0px 4px 0px;\n  position: absolute;\n  right: 0px;\n  bottom: 0px;\n  overflow: hidden;\n  cursor: nwse-resize;\n}\n.Comment_resizeThumb__e-57p::before,\n  .Comment_resizeThumb__e-57p::after {\n    content: \"\";\n    position: absolute;\n    right: 0px;\n    top: 0px;\n    width: 250%;\n    height: 0px;\n    border-top: 1px solid rgba(0, 0, 0, 0.7);\n    border-bottom: 2px solid rgba(255, 255, 255, 0.7);\n    transform-origin: center right;\n    transform: rotate(-45deg) scale(0.5);\n  }\n.Comment_resizeThumb__e-57p::after {\n    transform: rotate(-45deg) translateY(3px) scale(0.5);\n  }\n.Comment_textarea__i7qnk {\n  resize: none;\n  width: calc(100% + 2px);\n  height: calc(100% + 2px);\n  border-radius: 3px;\n  background: rgba(255,255,255,.1);\n  border: none;\n  outline: none;\n  margin: -2px;\n  margin-top: -1px;\n  padding-top: 0px;\n  font-size: 14px;\n}\n.Comment_textarea__i7qnk::placeholder{\n    color: rgba(0,0,0,.5);\n  }\n";
var styles$4 = {"wrapper":"Comment_wrapper__2CG3I","text":"Comment_text__wBsGB","resizeThumb":"Comment_resizeThumb__e-57p","textarea":"Comment_textarea__i7qnk"};
styleInject(css_248z$4);

var css_248z$3 = ".ColorPicker_wrapper__MW540{\n  position: fixed;\n  z-index: 9999;\n  background: rgba(29, 32, 34, 0.95);\n  border-radius: 5px;\n  box-shadow: 0px 6px 7px rgba(0,0,0,.3);\n  border: 1px solid rgba(0,0,0,.4);\n  color: #fff;\n  display: flex;\n  width: 102px;\n  flex-wrap: wrap;\n  padding: 2px;\n}\n@supports (backdrop-filter: blur(6px)){\n  .ColorPicker_wrapper__MW540{\n    backdrop-filter: blur(6px);\n    background: rgba(29, 32, 34, 0.8);\n  }\n}\n.ColorPicker_colorButtonWrapper__Z123Z{\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 2px;\n}\n.ColorPicker_colorButton__A82sm{\n  border-radius: 3px;\n  border: none;\n  width: 20px;\n  height: 20px;\n  background: rgba(204, 204, 204, 1);\n}\n.ColorPicker_colorButton__A82sm[data-color=\"red\"]{\n    background: rgba(210, 101, 111, 1)\n  }\n.ColorPicker_colorButton__A82sm[data-color=\"purple\"]{\n    background: rgba(159, 101, 210, 1)\n  }\n.ColorPicker_colorButton__A82sm[data-color=\"blue\"]{\n    background: rgba(101, 151, 210, 1)\n  }\n.ColorPicker_colorButton__A82sm[data-color=\"green\"]{\n    background: rgba(101, 210, 168, 1)\n  }\n.ColorPicker_colorButton__A82sm[data-color=\"orange\"]{\n    background: rgba(210, 137, 101, 1)\n  }\n.ColorPicker_colorButton__A82sm[data-color=\"yellow\"]{\n    background: rgba(210, 196, 101, 1)\n  }\n.ColorPicker_colorButton__A82sm[data-color=\"pink\"]{\n    background: rgba(241, 124, 226, 1)\n  }\n.ColorPicker_colorButton__A82sm:hover{\n    opacity: .8;\n  }\n";
var styles$3 = {"wrapper":"ColorPicker_wrapper__MW540","colorButtonWrapper":"ColorPicker_colorButtonWrapper__Z123Z","colorButton":"ColorPicker_colorButton__A82sm"};
styleInject(css_248z$3);

var define = function define(value, defaultValue) {
  return value !== undefined ? value : defaultValue;
};

var buildControlType = function buildControlType(defaultConfig) {
  var validate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var setup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return {};
  };
  return function (config) {
    validate(config);
    return _objectSpread2({
      type: defaultConfig.type,
      label: define(config.label, defaultConfig.label || ""),
      name: define(config.name, defaultConfig.name || ""),
      defaultValue: define(config.defaultValue, defaultConfig.defaultValue),
      setValue: define(config.setValue, undefined)
    }, setup(config));
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
  }, function () {}, function (config) {
    return {
      options: define(config.options, []),
      getOptions: define(config.getOptions, undefined),
      placeholder: define(config.placeholder, undefined)
    };
  }),
  number: buildControlType({
    type: "number",
    name: "number",
    defaultValue: 0
  }, function () {}, function (config) {
    return {
      step: define(config.step, undefined)
    };
  }),
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
  }, function () {}, function (config) {
    return {
      options: define(config.options, []),
      getOptions: define(config.getOptions, undefined),
      placeholder: define(config.placeholder, undefined)
    };
  }),
  custom: buildControlType({
    type: "custom",
    name: "custom",
    render: function render() {},
    defaultValue: undefined
  }, function () {}, function (config) {
    return {
      render: define(config.render, function () {})
    };
  })
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
var getPortBuilders = function getPortBuilders(ports) {
  return Object.values(ports).reduce(function (obj, port) {
    obj[port.type] = function () {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
var FlumeConfig = /*#__PURE__*/function () {
  function FlumeConfig(config) {
    _classCallCheck$2(this, FlumeConfig);

    if (config) {
      this.nodeTypes = _objectSpread2({}, config.nodeTypes);
      this.portTypes = _objectSpread2({}, config.portTypes);
    } else {
      this.nodeTypes = {};
      this.portTypes = {};
    }
  }

  _createClass$2(FlumeConfig, [{
    key: "addRootNodeType",
    value: function addRootNodeType(config) {
      this.addNodeType(_objectSpread2(_objectSpread2({}, config), {}, {
        root: true,
        addable: false,
        deletable: false
      }));
      return this;
    }
  }, {
    key: "addNodeType",
    value: function addNodeType(config) {
      if (_typeof(config) !== "object" && config !== null) {
        throw new Error("You must provide a configuration object when calling addNodeType.");
      }

      if (typeof config.type !== "string") {
        throw new Error("Required key, \"type\" must be a string when calling addNodeType.");
      }

      if (typeof config.initialWidth !== "undefined" && typeof config.initialWidth !== "number") {
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
      } else if (config.inputs === undefined) {
        node.inputs = [];
      } else if (!Array.isArray(config.inputs)) {
        throw new Error("Optional key, \"inputs\" must be an array.");
      } else {
        node.inputs = config.inputs;
      }

      if (typeof config.outputs === "function") {
        var outputs = config.outputs(getPortBuilders(this.portTypes));

        if (!Array.isArray(outputs) && typeof config.outputs !== 'function') {
          throw new Error("When providing a function to the \"outputs\" key, you must return either an array or a function.");
        }

        node.outputs = outputs;
      } else if (config.outputs === undefined) {
        node.outputs = [];
      } else if (config.outputs !== undefined && !Array.isArray(config.outputs)) {
        throw new Error("Optional key, \"outputs\" must be an array.");
      } else {
        node.outputs = config.outputs;
      }

      if (config.root !== undefined) {
        if (typeof config.root !== "boolean") {
          throw new Error("Optional key, \"root\" must be a boolean.");
        } else {
          node.root = config.root;
        }
      }

      this.nodeTypes[config.type] = node;
      return this;
    }
  }, {
    key: "removeNodeType",
    value: function removeNodeType(type) {
      if (!this.nodeTypes[type]) {
        console.error("Non-existent node type \"".concat(type, "\" cannot be removed."));
      } else {
        var _this$nodeTypes = this.nodeTypes;
            _this$nodeTypes[type];
            var nodeTypes = _objectWithoutProperties(_this$nodeTypes, [type].map(_toPropertyKey));

        this.nodeTypes = nodeTypes;
      }

      return this;
    }
  }, {
    key: "addPortType",
    value: function addPortType(config) {
      if (_typeof(config) !== "object" && config !== null) {
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
      } else if (!Array.isArray(config.acceptTypes)) {
        throw new Error("Optional key, \"acceptTypes\" must be an array.");
      } else {
        port.acceptTypes = config.acceptTypes;
      }

      if (typeof config.maxOutputs !== "undefined" && typeof config.maxOutputs !== "number") {
        throw new Error("Optional key, \"maxOutputs\" must be a number when calling addPortType.");
      } else if (config.maxOutputs === undefined) {
        port.maxOutputs = Infinity;
      } else {
        port.maxOutputs = config.maxOutputs;
      }

      if (config.controls === undefined) {
        port.controls = [];
      } else if (!Array.isArray(config.controls)) {
        throw new Error("Optional key, \"controls\" must be an array.");
      } else {
        port.controls = config.controls;
      }

      this.portTypes[config.type] = port;
      return this;
    }
  }, {
    key: "removePortType",
    value: function removePortType(type) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$skipDynamicNodes = _ref.skipDynamicNodesCheck,
          skipDynamicNodesCheck = _ref$skipDynamicNodes === void 0 ? false : _ref$skipDynamicNodes;

      if (!this.portTypes[type]) {
        console.error("Non-existent port type \"".concat(type, "\" cannot be removed."));
      } else {
        if (!skipDynamicNodesCheck) {
          var dynamicNodes = Object.values(this.nodeTypes).filter(function (node) {
            return typeof node.inputs === 'function' || typeof node.outputs === 'function';
          });

          if (dynamicNodes.length) {
            console.warn("We've detected that one or more of your nodes is using dynamic inputs/outputs. This is a potentially dangerous operation as we are unable to detect if this portType is being used in one of those nodes. You can quiet this message by passing { skipDynamicNodesCheck: true } in as the second argument.");
          }
        }

        var affectedNodes = Object.values(this.nodeTypes).filter(function (node) {
          return Array.isArray(node.inputs) && node.inputs.find(function (p) {
            return p.type === type;
          }) || Array.isArray(node.outputs) && node.outputs.find(function (p) {
            return p.type === type;
          });
        });

        if (affectedNodes.length) {
          throw new Error("Cannot delete port type \"".concat(type, "\" without first deleting all node types using these ports: [").concat(affectedNodes.map(function (n) {
            return "".concat(n.type);
          }).join(", "), "]"));
        } else {
          var _this$portTypes = this.portTypes;
              _this$portTypes[type];
              var portTypes = _objectWithoutProperties(_this$portTypes, [type].map(_toPropertyKey));

          this.portTypes = portTypes;
        }
      }

      return this;
    }
  }]);

  return FlumeConfig;
}();

var ColorPicker = (function (_ref) {
  var x = _ref.x,
      y = _ref.y,
      onColorPicked = _ref.onColorPicked,
      onRequestClose = _ref.onRequestClose;
  var wrapper = React.useRef();
  var testClickOutside = React.useCallback(function (e) {
    if (wrapper.current && !wrapper.current.contains(e.target)) {
      onRequestClose();
      document.removeEventListener("click", testClickOutside);
      document.removeEventListener("contextmenu", testClickOutside);
    }
  }, [wrapper, onRequestClose]);
  var testEscape = React.useCallback(function (e) {
    if (e.keyCode === 27) {
      onRequestClose();
      document.removeEventListener("keydown", testEscape);
    }
  }, [onRequestClose]);
  React.useEffect(function () {
    document.addEventListener("keydown", testEscape);
    document.addEventListener("click", testClickOutside);
    document.addEventListener("contextmenu", testClickOutside);
    return function () {
      document.removeEventListener("click", testClickOutside);
      document.removeEventListener("contextmenu", testClickOutside);
      document.removeEventListener("keydown", testEscape);
    };
  }, [testClickOutside, testEscape]);
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapper,
    className: styles$3.wrapper,
    style: {
      left: x,
      top: y
    }
  }, Object.values(Colors).map(function (color) {
    return /*#__PURE__*/React.createElement(ColorButton, {
      onSelected: function onSelected() {
        onColorPicked(color);
        onRequestClose();
      },
      color: color,
      key: color
    });
  }));
});

var ColorButton = function ColorButton(_ref2) {
  var color = _ref2.color,
      onSelected = _ref2.onSelected;
  return /*#__PURE__*/React.createElement("div", {
    className: styles$3.colorButtonWrapper
  }, /*#__PURE__*/React.createElement("button", {
    className: styles$3.colorButton,
    onClick: onSelected,
    "data-color": color,
    "aria-label": color
  }));
};

var Comment = (function (_ref) {
  var dispatch = _ref.dispatch,
      id = _ref.id,
      x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height,
      color = _ref.color,
      text = _ref.text,
      stageRect = _ref.stageRect,
      onDragStart = _ref.onDragStart,
      isNew = _ref.isNew;
  var stageState = React.useContext(StageContext);
  var wrapper = React.useRef();
  var textarea = React.useRef();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isEditing = _React$useState2[0],
      setIsEditing = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isPickingColor = _React$useState4[0],
      setIsPickingColor = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      menuOpen = _React$useState6[0],
      setMenuOpen = _React$useState6[1];

  var _React$useState7 = React.useState({
    x: 0,
    y: 0
  }),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      menuCoordinates = _React$useState8[0],
      setMenuCoordinates = _React$useState8[1];

  var _React$useState9 = React.useState({
    x: 0,
    y: 0
  }),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      colorPickerCoordinates = _React$useState10[0],
      setColorPickerCoordinates = _React$useState10[1];

  var handleContextMenu = function handleContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    setMenuCoordinates({
      x: e.clientX,
      y: e.clientY
    });
    setMenuOpen(true);
    return false;
  };

  var closeContextMenu = function closeContextMenu() {
    return setMenuOpen(false);
  };

  var startDrag = function startDrag(e) {
    onDragStart();
  };

  var handleDrag = function handleDrag(_ref2) {
    var x = _ref2.x,
        y = _ref2.y;
    wrapper.current.style.transform = "translate(".concat(x, "px,").concat(y, "px)");
  };

  var handleDragEnd = function handleDragEnd(_, _ref3) {
    var x = _ref3.x,
        y = _ref3.y;
    dispatch({
      type: "SET_COMMENT_COORDINATES",
      id: id,
      x: x,
      y: y
    });
  };

  var handleResize = function handleResize(coordinates) {
    var width = clamp_1(coordinates.x - x + 10, 80, 10000);
    var height = clamp_1(coordinates.y - y + 10, 30, 10000);
    wrapper.current.style.width = "".concat(width, "px");
    wrapper.current.style.height = "".concat(height, "px");
  };

  var handleResizeEnd = function handleResizeEnd(_, coordinates) {
    var width = clamp_1(coordinates.x - x + 10, 80, 10000);
    var height = clamp_1(coordinates.y - y + 10, 30, 10000);
    dispatch({
      type: "SET_COMMENT_DIMENSIONS",
      id: id,
      width: width,
      height: height
    });
  };

  var handleMenuOption = function handleMenuOption(option, e) {
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

  var startTextEdit = function startTextEdit() {
    setIsEditing(true);
  };

  var endTextEdit = function endTextEdit() {
    setIsEditing(false);
  };

  var handleTextChange = function handleTextChange(e) {
    dispatch({
      type: "SET_COMMENT_TEXT",
      id: id,
      text: e.target.value
    });
  };

  var handleColorPicked = function handleColorPicked(color) {
    dispatch({
      type: "SET_COMMENT_COLOR",
      id: id,
      color: color
    });
  };

  React.useEffect(function () {
    if (isNew) {
      setIsEditing(true);
      dispatch({
        type: "REMOVE_COMMENT_NEW",
        id: id
      });
    }
  }, [isNew, dispatch, id]);
  return /*#__PURE__*/React.createElement(Draggable, {
    innerRef: wrapper,
    className: styles$4.wrapper,
    style: {
      transform: "translate(".concat(x, "px,").concat(y, "px)"),
      width: width,
      height: height,
      zIndex: isEditing ? 999 : ""
    },
    stageState: stageState,
    stageRect: stageRect,
    onDragStart: startDrag,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
    onContextMenu: handleContextMenu,
    onDoubleClick: startTextEdit,
    onWheel: function onWheel(e) {
      return e.stopPropagation();
    },
    "data-color": color
  }, isEditing ? /*#__PURE__*/React.createElement("textarea", {
    className: styles$4.textarea,
    onChange: handleTextChange,
    onMouseDown: function onMouseDown(e) {
      return e.stopPropagation();
    },
    onBlur: endTextEdit,
    placeholder: "Text of the comment...",
    autoFocus: true,
    value: text,
    ref: textarea
  }) : /*#__PURE__*/React.createElement("div", {
    "data-comment": true,
    className: styles$4.text
  }, text), /*#__PURE__*/React.createElement(Draggable, {
    className: styles$4.resizeThumb,
    stageState: stageState,
    stageRect: stageRect,
    onDrag: handleResize,
    onDragEnd: handleResizeEnd
  }), menuOpen ? /*#__PURE__*/React.createElement(Portal$1, null, /*#__PURE__*/React.createElement(ContextMenu, {
    hideFilter: true,
    label: "Comment Options",
    x: menuCoordinates.x,
    y: menuCoordinates.y,
    options: [{
      value: "edit",
      label: "Edit Comment",
      description: "Edit the text of the comment"
    }, {
      value: "color",
      label: "Change Color",
      description: "Change the color of the comment"
    }, {
      value: "delete",
      label: "Delete Comment",
      description: "Delete the comment"
    }],
    onRequestClose: closeContextMenu,
    onOptionSelected: handleMenuOption
  })) : null, isPickingColor ? /*#__PURE__*/React.createElement(Portal$1, null, /*#__PURE__*/React.createElement(ColorPicker, {
    x: colorPickerCoordinates.x,
    y: colorPickerCoordinates.y,
    onRequestClose: function onRequestClose() {
      return setIsPickingColor(false);
    },
    onColorPicked: handleColorPicked
  })) : null);
});

var css_248z$2 = ".Toaster_toaster__E5R8O{\n  position: absolute;\n  left: 0px;\n  bottom: 0px;\n  width: 100%;\n  height: 1px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-bottom: 15px;\n  box-shadow: 0px 5px 10px -2px rgba(0,0,0,.3);\n  pointer-events: none;\n}\n.Toaster_toast__2wgPt{\n  position: absolute;\n  left: calc(50% - 200px);\n  top: 0px;\n  pointer-events: all;\n  width: 400px;\n  padding: 10px;\n  padding-top: 7px;\n  padding-right: 16px;\n  border-radius: 6px;\n  background: rgba(231, 231, 231, 1);\n  border: 1px solid;\n  margin-bottom: 5px;\n  transition: transform 300ms;\n  flex: 0 0 auto;\n  animation: Toaster_fade-in__y8znw 150ms;\n  user-select: none;\n  font-size: 14px;\n  display: flex;\n  flex-direction: column;\n  will-change: transform;\n}\n.Toaster_toast__2wgPt[data-type=\"danger\"]{\n    background: rgb(255, 116, 137);\n    border-color: rgb(254, 99, 136);\n    color: rgb(66, 6, 20);\n  }\n.Toaster_toast__2wgPt[data-type=\"info\"]{\n    background: rgb(76, 193, 250);\n    border-color: rgb(103, 182, 255);\n    color: rgb(5, 36, 64);\n  }\n.Toaster_toast__2wgPt[data-type=\"success\"]{\n    background: rgb(81, 230, 150);\n    border-color: rgb(85, 227, 150);\n    color: rgb(7, 57, 30);\n  }\n.Toaster_toast__2wgPt[data-type=\"warning\"]{\n    background: rgb(245, 208, 93);\n    border-color: rgb(247, 235, 125);\n    color: rgb(83, 75, 8);\n  }\n.Toaster_toast__2wgPt[data-exiting=true]{\n    animation: Toaster_fade-out__XANRE 150ms;\n    animation-fill-mode: forwards;\n  }\n.Toaster_toast__2wgPt p{\n  margin: 0px;\n}\n.Toaster_title__UqwtP{\n  font-size: 16px;\n  font-weight: bold;\n  margin-bottom: 5px;\n}\n.Toaster_timer__P6Wpm{\n  position: absolute;\n  bottom: -1px;\n  left: -1px;\n  width: calc(100% + 2px);\n  height: 3px;\n  background: rgba(0,0,0,.4);\n  transform-origin: left center;\n  animation: Toaster_timer__P6Wpm 1000ms linear;\n  animation-fill-mode: forwards;\n  z-index: 9;\n}\n.Toaster_exitButton__8SpPt{\n  position: absolute;\n  right: 0px;\n  top: 0px;\n  width: 20px;\n  height: 20px;\n  padding: 0px;\n  background: none;\n  border: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 14px;\n  color: inherit;\n  opacity: .6;\n}\n.Toaster_exitButton__8SpPt:hover{\n  opacity: .9;\n}\n\n@keyframes Toaster_fade-in__y8znw {\n  from{\n    opacity: 0;\n  }\n  to{\n    opacity: 1;\n  }\n}\n\n@keyframes Toaster_fade-out__XANRE {\n  from{\n    opacity: 1;\n  }\n  to{\n    opacity: 0;\n  }\n}\n\n@keyframes Toaster_timer__P6Wpm {\n  from{\n    transform: scaleX(1);\n  }\n  to{\n    transform: scaleX(0);\n  }\n}\n";
var styles$2 = {"toaster":"Toaster_toaster__E5R8O","toast":"Toaster_toast__2wgPt","fade-in":"Toaster_fade-in__y8znw","fade-out":"Toaster_fade-out__XANRE","title":"Toaster_title__UqwtP","timer":"Toaster_timer__P6Wpm","exitButton":"Toaster_exitButton__8SpPt"};
styleInject(css_248z$2);

var Toaster = (function (_ref) {
  var _ref$toasts = _ref.toasts,
      toasts = _ref$toasts === void 0 ? [] : _ref$toasts,
      dispatchToasts = _ref.dispatchToasts;
  var setHeight = React.useCallback(function (id, height) {
    dispatchToasts({
      type: "SET_HEIGHT",
      id: id,
      height: height
    });
  }, [dispatchToasts]);
  var startExit = React.useCallback(function (id) {
    dispatchToasts({
      type: "SET_EXITING",
      id: id
    });
  }, [dispatchToasts]);
  var removeToast = React.useCallback(function (id) {
    dispatchToasts({
      type: "REMOVE_TOAST",
      id: id
    });
  }, [dispatchToasts]);
  return /*#__PURE__*/React.createElement("div", {
    className: styles$2.toaster
  }, toasts.map(function (toast, i) {
    return /*#__PURE__*/React.createElement(Toast, _extends({}, toast, {
      onHeightReceived: setHeight,
      onExitRequested: startExit,
      onRemoveRequested: removeToast,
      y: toasts.slice(0, i + 1).reduce(function (y, t) {
        return t.height + y + 5;
      }, 0),
      key: toast.id
    }));
  }));
});

var Toast = function Toast(_ref2) {
  var id = _ref2.id,
      title = _ref2.title,
      message = _ref2.message,
      duration = _ref2.duration,
      type = _ref2.type,
      exiting = _ref2.exiting,
      y = _ref2.y,
      onHeightReceived = _ref2.onHeightReceived,
      onExitRequested = _ref2.onExitRequested,
      onRemoveRequested = _ref2.onRemoveRequested;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      paused = _React$useState2[0],
      setPaused = _React$useState2[1];

  var wrapper = React.useRef();
  var timer = React.useRef();
  var stopTimer = React.useCallback(function () {
    setPaused(true);
    clearTimeout(timer.current);
  }, []);
  var resumeTimer = React.useCallback(function () {
    setPaused(false);
    timer.current = setTimeout(function () {
      return onExitRequested(id);
    }, duration);
  }, [id, duration, onExitRequested]);
  React.useLayoutEffect(function () {
    var _wrapper$current$getB = wrapper.current.getBoundingClientRect(),
        height = _wrapper$current$getB.height;

    onHeightReceived(id, height);
  }, [onHeightReceived, id]);
  React.useEffect(function () {
    resumeTimer();
    return stopTimer;
  }, [resumeTimer, stopTimer]);

  var handleAnimationEnd = function handleAnimationEnd() {
    if (exiting) {
      onRemoveRequested(id);
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    ref: wrapper,
    className: styles$2.toast,
    "data-type": type,
    style: {
      transform: "translateY(-".concat(y, "px)")
    },
    "data-exiting": exiting,
    onAnimationEnd: handleAnimationEnd,
    onMouseEnter: stopTimer,
    onMouseLeave: resumeTimer,
    role: "alert"
  }, title ? /*#__PURE__*/React.createElement("span", {
    className: styles$2.title
  }, title) : null, /*#__PURE__*/React.createElement("p", null, message), !paused && /*#__PURE__*/React.createElement("div", {
    className: styles$2.timer,
    style: {
      animationDuration: "".concat(duration, "ms")
    },
    onAnimationEnd: function onAnimationEnd(e) {
      return e.stopPropagation();
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: styles$2.exitButton,
    onClick: function onClick() {
      stopTimer();
      onExitRequested(id);
    }
  }, "\u2715"));
};

var css_248z$1 = ".Connections_svgWrapper__6Rcg4{\n  position: absolute;\n  left: 0px;\n  height: 0px;\n}\n";
var styles$1 = {"svgWrapper":"Connections_svgWrapper__6Rcg4"};
styleInject(css_248z$1);

var Connections = function Connections(_ref) {
  _ref.nodes;
      var editorId = _ref.editorId;
  return /*#__PURE__*/React.createElement("div", {
    className: styles$1.svgWrapper,
    id: "".concat(CONNECTIONS_ID).concat(editorId)
  });
};

var checkForCircularNodes = function checkForCircularNodes(nodes, startNodeId) {
  var isCircular = false;

  var walk = function walk(nodeId) {
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
        } else {
          walk(connectedTo.nodeId);
        }
      }
    }
  };

  walk(startNodeId);
  return isCircular;
};

var _excluded$1 = ["id", "defaultNode"];

var addConnection = function addConnection(nodes, input, output, portTypes) {
  var _objectSpread4;

  var newNodes = _objectSpread2(_objectSpread2({}, nodes), {}, (_objectSpread4 = {}, _defineProperty(_objectSpread4, input.nodeId, _objectSpread2(_objectSpread2({}, nodes[input.nodeId]), {}, {
    connections: _objectSpread2(_objectSpread2({}, nodes[input.nodeId].connections), {}, {
      inputs: _objectSpread2(_objectSpread2({}, nodes[input.nodeId].connections.inputs), {}, _defineProperty({}, input.portName, [].concat(_toConsumableArray(nodes[input.nodeId].connections.inputs[input.portName] || []), [{
        nodeId: output.nodeId,
        portName: output.portName
      }])))
    })
  })), _defineProperty(_objectSpread4, output.nodeId, _objectSpread2(_objectSpread2({}, nodes[output.nodeId]), {}, {
    connections: _objectSpread2(_objectSpread2({}, nodes[output.nodeId].connections), {}, {
      outputs: _objectSpread2(_objectSpread2({}, nodes[output.nodeId].connections.outputs), {}, _defineProperty({}, output.portName, [].concat(_toConsumableArray(nodes[output.nodeId].connections.outputs[output.portName] || []), [{
        nodeId: input.nodeId,
        portName: input.portName
      }])))
    })
  })), _objectSpread4));

  return newNodes;
};

var removeConnection = function removeConnection(nodes, input, output) {
  var _objectSpread6;

  var inputNode = nodes[input.nodeId];

  var _inputNode$connection = inputNode.connections.inputs,
      _input$portName = input.portName;
      _inputNode$connection[_input$portName];
      var newInputNodeConnectionsInputs = _objectWithoutProperties(_inputNode$connection, [_input$portName].map(_toPropertyKey));

  var newInputNode = _objectSpread2(_objectSpread2({}, inputNode), {}, {
    connections: _objectSpread2(_objectSpread2({}, inputNode.connections), {}, {
      inputs: newInputNodeConnectionsInputs
    })
  });

  var outputNode = nodes[output.nodeId];
  var filteredOutputNodes = outputNode.connections.outputs[output.portName].filter(function (cnx) {
    return cnx.nodeId === input.nodeId ? cnx.portName !== input.portName : true;
  });

  var newOutputNode = _objectSpread2(_objectSpread2({}, outputNode), {}, {
    connections: _objectSpread2(_objectSpread2({}, outputNode.connections), {}, {
      outputs: _objectSpread2(_objectSpread2({}, outputNode.connections.outputs), {}, _defineProperty({}, output.portName, filteredOutputNodes))
    })
  });

  return _objectSpread2(_objectSpread2({}, nodes), {}, (_objectSpread6 = {}, _defineProperty(_objectSpread6, input.nodeId, newInputNode), _defineProperty(_objectSpread6, output.nodeId, newOutputNode), _objectSpread6));
};

var getFilteredTransputs = function getFilteredTransputs(transputs, nodeId) {
  return Object.entries(transputs).reduce(function (obj, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        portName = _ref2[0],
        transput = _ref2[1];

    var newTransputs = transput.filter(function (t) {
      return t.nodeId !== nodeId;
    });

    if (newTransputs.length) {
      obj[portName] = newTransputs;
    }

    return obj;
  }, {});
};

var removeConnections = function removeConnections(connections, nodeId) {
  return {
    inputs: getFilteredTransputs(connections.inputs, nodeId),
    outputs: getFilteredTransputs(connections.outputs, nodeId)
  };
};

var removeNode = function removeNode(startNodes, nodeId) {
  startNodes[nodeId];
      var nodes = _objectWithoutProperties(startNodes, [nodeId].map(_toPropertyKey));

  nodes = Object.values(nodes).reduce(function (obj, node) {
    obj[node.id] = _objectSpread2(_objectSpread2({}, node), {}, {
      connections: removeConnections(node.connections, nodeId)
    });
    return obj;
  }, {});
  deleteConnectionsByNodeId(nodeId);
  return nodes;
};

var reconcileNodes = function reconcileNodes(initialNodes, nodeTypes, portTypes, context) {
  var nodes = _objectSpread2({}, initialNodes); // Delete extraneous nodes


  var nodesToDelete = Object.values(nodes).map(function (node) {
    return !nodeTypes[node.type] ? node.id : undefined;
  }).filter(function (x) {
    return x;
  });
  nodesToDelete.forEach(function (nodeId) {
    nodes = nodesReducer(nodes, {
      type: "REMOVE_NODE",
      nodeId: nodeId
    }, {
      nodeTypes: nodeTypes,
      portTypes: portTypes,
      context: context
    });
  }); // Reconcile input data for each node

  var reconciledNodes = Object.values(nodes).reduce(function (nodesObj, node) {
    var nodeType = nodeTypes[node.type];
    var defaultInputData = getDefaultData({
      node: node,
      nodeType: nodeType,
      portTypes: portTypes,
      context: context
    });
    var currentInputData = Object.entries(node.inputData).reduce(function (dataObj, _ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          data = _ref4[1];

      if (defaultInputData[key] !== undefined) {
        dataObj[key] = data;
      }

      return dataObj;
    }, {});

    var newInputData = _objectSpread2(_objectSpread2({}, defaultInputData), currentInputData);

    nodesObj[node.id] = _objectSpread2(_objectSpread2({}, node), {}, {
      inputData: newInputData
    });
    return nodesObj;
  }, {}); // Reconcile node attributes for each node

  reconciledNodes = Object.values(reconciledNodes).reduce(function (nodesObj, node) {
    var newNode = _objectSpread2({}, node);

    var nodeType = nodeTypes[node.type];

    if (nodeType.root !== node.root) {
      if (nodeType.root && !node.root) {
        newNode.root = nodeType.root;
      } else if (!nodeType.root && node.root) {
        delete newNode.root;
      }
    }

    nodesObj[node.id] = newNode;
    return nodesObj;
  }, {});
  return reconciledNodes;
};

var getInitialNodes = function getInitialNodes() {
  var initialNodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var nodeTypes = arguments.length > 2 ? arguments[2] : undefined;
  var portTypes = arguments.length > 3 ? arguments[3] : undefined;
  var context = arguments.length > 4 ? arguments[4] : undefined;
  var reconciledNodes = reconcileNodes(initialNodes, nodeTypes, portTypes, context);
  return _objectSpread2(_objectSpread2({}, reconciledNodes), defaultNodes.reduce(function (nodes, dNode, i) {
    var nodeNotAdded = !Object.values(initialNodes).find(function (n) {
      return n.type === dNode.type;
    });

    if (nodeNotAdded) {
      nodes = nodesReducer(nodes, {
        type: "ADD_NODE",
        id: "default-".concat(i),
        defaultNode: true,
        x: dNode.x || 0,
        y: dNode.y || 0,
        nodeType: dNode.type
      }, {
        nodeTypes: nodeTypes,
        portTypes: portTypes,
        context: context
      });
    }

    return nodes;
  }, {}));
};

var getDefaultData = function getDefaultData(_ref5) {
  var node = _ref5.node,
      nodeType = _ref5.nodeType,
      portTypes = _ref5.portTypes,
      context = _ref5.context;
  var inputs = Array.isArray(nodeType.inputs) ? nodeType.inputs : nodeType.inputs(node.inputData, node.connections, context);
  return inputs.reduce(function (obj, input) {
    var inputType = portTypes[input.type];
    obj[input.name || inputType.name] = (input.controls || inputType.controls || []).reduce(function (obj2, control) {
      obj2[control.name] = control.defaultValue;
      return obj2;
    }, {});
    return obj;
  }, {});
};

var nodesReducer = function nodesReducer(nodes) {
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref6 = arguments.length > 2 ? arguments[2] : undefined,
      nodeTypes = _ref6.nodeTypes,
      portTypes = _ref6.portTypes,
      cache = _ref6.cache,
      circularBehavior = _ref6.circularBehavior,
      context = _ref6.context;

  var dispatchToasts = arguments.length > 3 ? arguments[3] : undefined;

  switch (action.type) {
    case "ADD_CONNECTION":
      {
        var input = action.input,
            output = action.output;
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
          } else {
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
        } else return nodes;
      }

    case "REMOVE_CONNECTION":
      {
        var _input = action.input,
            _output = action.output;
        var id = _output.nodeId + _output.portName + _input.nodeId + _input.portName;
        delete cache.current.connections[id];
        deleteConnection({
          id: id
        });
        return removeConnection(nodes, _input, _output);
      }

    case "DESTROY_TRANSPUT":
      {
        var transput = action.transput,
            transputType = action.transputType;
        var portId = transput.nodeId + transput.portName + transputType;
        delete cache.current.ports[portId];
        var cnxType = transputType === 'input' ? 'inputs' : 'outputs';
        var connections = nodes[transput.nodeId].connections[cnxType][transput.portName];
        if (!connections || !connections.length) return nodes;
        return connections.reduce(function (nodes, cnx) {
          var _ref7 = transputType === 'input' ? [transput, cnx] : [cnx, transput],
              _ref8 = _slicedToArray(_ref7, 2),
              input = _ref8[0],
              output = _ref8[1];

          var id = output.nodeId + output.portName + input.nodeId + input.portName;
          delete cache.current.connections[id];
          deleteConnection({
            id: id
          });
          return removeConnection(nodes, input, output);
        }, nodes);
      }

    case "ADD_NODE":
      {
        var x = action.x,
            y = action.y,
            nodeType = action.nodeType,
            _id = action.id,
            defaultNode = action.defaultNode;

        var newNodeId = _id || nanoid(10);

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

        return _objectSpread2(_objectSpread2({}, nodes), {}, _defineProperty({}, newNodeId, newNode));
      }

    case "REMOVE_NODE":
      {
        var nodeId = action.nodeId;
        return removeNode(nodes, nodeId);
      }

    case "HYDRATE_DEFAULT_NODES":
      {
        var _newNodes = _objectSpread2({}, nodes);

        for (var key in _newNodes) {
          if (_newNodes[key].defaultNode) {
            var _newNodeId = nanoid(10);

            var _newNodes$key = _newNodes[key];
                _newNodes$key.id;
                _newNodes$key.defaultNode;
                var node = _objectWithoutProperties(_newNodes$key, _excluded$1);

            _newNodes[_newNodeId] = _objectSpread2(_objectSpread2({}, node), {}, {
              id: _newNodeId
            });
            delete _newNodes[key];
          }
        }

        return _newNodes;
      }

    case "SET_PORT_DATA":
      {
        var _nodeId = action.nodeId,
            portName = action.portName,
            controlName = action.controlName,
            data = action.data,
            setValue = action.setValue;

        var newData = _objectSpread2(_objectSpread2({}, nodes[_nodeId].inputData), {}, _defineProperty({}, portName, _objectSpread2(_objectSpread2({}, nodes[_nodeId].inputData[portName]), {}, _defineProperty({}, controlName, data))));

        if (setValue) {
          newData = setValue(newData, nodes[_nodeId].inputData);
        }

        return _objectSpread2(_objectSpread2({}, nodes), {}, _defineProperty({}, _nodeId, _objectSpread2(_objectSpread2({}, nodes[_nodeId]), {}, {
          inputData: newData
        })));
      }

    case "SET_NODE_COORDINATES":
      {
        var _x = action.x,
            _y = action.y,
            _nodeId2 = action.nodeId;
        return _objectSpread2(_objectSpread2({}, nodes), {}, _defineProperty({}, _nodeId2, _objectSpread2(_objectSpread2({}, nodes[_nodeId2]), {}, {
          x: _x,
          y: _y
        })));
      }

    default:
      return nodes;
  }
};

var connectNodesReducer = function connectNodesReducer(reducer, environment, dispatchToasts) {
  return function (state, action) {
    return reducer(state, action, environment, dispatchToasts);
  };
};

var _excluded = ["isNew"];

var setComment = function setComment(comments, id, merge) {
  return _objectSpread2(_objectSpread2({}, comments), {}, _defineProperty({}, id, _objectSpread2(_objectSpread2({}, comments[id]), merge)));
};

var commentsReducer = (function () {
  var comments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "ADD_COMMENT":
      {
        var _comment = {
          id: nanoid(10),
          text: "",
          x: action.x,
          y: action.y,
          width: 200,
          height: 30,
          color: "blue",
          isNew: true
        };
        return _objectSpread2(_objectSpread2({}, comments), {}, _defineProperty({}, _comment.id, _comment));
      }

    case "REMOVE_COMMENT_NEW":
      var _comments$action$id = comments[action.id];
          _comments$action$id.isNew;
          var comment = _objectWithoutProperties(_comments$action$id, _excluded);

      return _objectSpread2(_objectSpread2({}, comments), {}, _defineProperty({}, action.id, comment));

    case "SET_COMMENT_COORDINATES":
      {
        return setComment(comments, action.id, {
          x: action.x,
          y: action.y
        });
      }

    case "SET_COMMENT_DIMENSIONS":
      {
        return setComment(comments, action.id, {
          width: action.width,
          height: action.height
        });
      }

    case "SET_COMMENT_TEXT":
      {
        return setComment(comments, action.id, {
          text: action.text
        });
      }

    case "SET_COMMENT_COLOR":
      {
        return setComment(comments, action.id, {
          color: action.color
        });
      }

    case "DELETE_COMMENT":
      {
        var _action$id = action.id;
            comments[_action$id];
            var newComments = _objectWithoutProperties(comments, [_action$id].map(_toPropertyKey));

        return newComments;
      }

    default:
      return comments;
  }
});

var toastsReducer = (function () {
  var toasts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "ADD_TOAST":
      return [{
        id: nanoid(5),
        title: action.title,
        message: action.message,
        type: action.toastType || 'info',
        duration: action.duration || 10000,
        height: 0,
        exiting: false
      }].concat(_toConsumableArray(toasts));

    case "SET_HEIGHT":
      {
        var index = toasts.findIndex(function (t) {
          return t.id === action.id;
        });
        return [].concat(_toConsumableArray(toasts.slice(0, index)), [_objectSpread2(_objectSpread2({}, toasts[index]), {}, {
          height: action.height
        })], _toConsumableArray(toasts.slice(index + 1)));
      }

    case "SET_EXITING":
      {
        var _index = toasts.findIndex(function (t) {
          return t.id === action.id;
        });

        return [].concat(_toConsumableArray(toasts.slice(0, _index)), [_objectSpread2(_objectSpread2({}, toasts[_index]), {}, {
          exiting: true
        })], _toConsumableArray(toasts.slice(_index + 1)));
      }

    case "REMOVE_TOAST":
      {
        var _index2 = toasts.findIndex(function (t) {
          return t.id === action.id;
        });

        return [].concat(_toConsumableArray(toasts.slice(0, _index2)), _toConsumableArray(toasts.slice(_index2 + 1)));
      }

    default:
      return toasts;
  }
});

var stageReducer = (function (state, incomingAction) {
  var action = typeof incomingAction === 'function' ? incomingAction(state) : incomingAction;

  switch (action.type) {
    case 'SET_SCALE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        scale: action.scale
      });

    case 'SET_TRANSLATE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        translate: action.translate
      });

    default:
      return state;
  }
});

var Cache = /*#__PURE__*/_createClass$2(function Cache() {
  _classCallCheck$2(this, Cache);

  this.ports = {};
  this.connections = {};
});

var css_248z = ".styles_dragWrapper__A5S3T{\n  z-index: 9999;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n}\n.styles_debugWrapper__LEI-b{\n  display: flex;\n  position: absolute;\n  left: 10px;\n  bottom: 10px;\n  gap: 15px;\n}\n";
var styles = {"dragWrapper":"styles_dragWrapper__A5S3T","debugWrapper":"styles_debugWrapper__LEI-b"};
styleInject(css_248z);

var LoopError = /*#__PURE__*/function (_Error) {
  _inherits$2(LoopError, _Error);

  var _super = _createSuper(LoopError);

  function LoopError(message, code) {
    var _this;

    _classCallCheck$2(this, LoopError);

    _this = _super.call(this, message);
    _this.code = code;
    return _this;
  }

  return _createClass$2(LoopError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

_defineProperty(LoopError, "maxLoopsExceeded", 1);

var RootEngine = /*#__PURE__*/function () {
  function RootEngine(config, resolveInputControls, fireNodeFunction) {
    var _this2 = this;

    _classCallCheck$2(this, RootEngine);

    _defineProperty(this, "resetLoops", function (maxLoops) {
      _this2.maxLoops = maxLoops !== undefined ? maxLoops : 1000;
      _this2.loops = 0;
    });

    _defineProperty(this, "checkLoops", function () {
      if (_this2.maxLoops >= 0 && _this2.loops > _this2.maxLoops) {
        throw new LoopError("Max loop count exceeded.", LoopError.maxLoopsExceeded);
      } else {
        _this2.loops++;
      }
    });

    _defineProperty(this, "getRootNode", function (nodes) {
      var roots = Object.values(nodes).filter(function (n) {
        return n.root;
      });

      if (roots.length > 1) {
        throw new Error("The root engine must not be called with more than one root node.");
      }

      return roots[0];
    });

    _defineProperty(this, "reduceRootInputs", function (inputs, callback) {
      return Object.entries(inputs).reduce(function (obj, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            inputName = _ref2[0],
            connection = _ref2[1];

        var input = callback(inputName, connection);
        obj[input.name] = input.value;
        return obj;
      }, {});
    });

    _defineProperty(this, "resolveInputValues", function (node, nodeType, nodes, context) {
      var inputs = nodeType.inputs;

      if (typeof inputs === 'function') {
        inputs = inputs(node.inputData, node.connections, context);
      }

      return inputs.reduce(function (obj, input) {
        var inputConnections = node.connections.inputs[input.name] || [];

        if (inputConnections.length > 0) {
          obj[input.name] = _this2.getValueOfConnection(inputConnections[0], nodes, context);
        } else {
          obj[input.name] = _this2.resolveInputControls(input.type, node.inputData[input.name] || {}, context);
        }

        return obj;
      }, {});
    });

    _defineProperty(this, "getValueOfConnection", function (connection, nodes, context) {
      _this2.checkLoops();

      var outputNode = nodes[connection.nodeId];
      var outputNodeType = _this2.config.nodeTypes[outputNode.type];

      var inputValues = _this2.resolveInputValues(outputNode, outputNodeType, nodes, context);

      var outputResult = _this2.fireNodeFunction(outputNode, inputValues, outputNodeType, context)[connection.portName];

      return outputResult;
    });

    this.config = config;
    this.fireNodeFunction = fireNodeFunction;
    this.resolveInputControls = resolveInputControls;
    this.loops = 0;
    this.maxLoops = 1000;
  }

  _createClass$2(RootEngine, [{
    key: "resolveRootNode",
    value: function resolveRootNode(nodes) {
      var _this3 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var rootNode = options.rootNodeId ? nodes[options.rootNodeId] : this.getRootNode(nodes);

      if (rootNode) {
        var inputs = this.config.nodeTypes[rootNode.type].inputs;

        if (typeof inputs === 'function') {
          inputs = inputs(rootNode.inputData, rootNode.connections, options.context);
        }

        var controlValues = inputs.reduce(function (obj, input) {
          obj[input.name] = _this3.resolveInputControls(input.type, rootNode.inputData[input.name] || {}, options.context);
          return obj;
        }, {});
        var inputValues = this.reduceRootInputs(rootNode.connections.inputs, function (inputName, connection) {
          _this3.resetLoops(options.maxLoops);

          var value;

          try {
            value = _this3.getValueOfConnection(connection[0], nodes, options.context);
          } catch (e) {
            if (e.code === LoopError.maxLoopsExceeded) {
              console.error("".concat(e.message, " Circular nodes detected in ").concat(inputName, " port."));
            } else {
              console.error(e);
            }
          } finally {
            return {
              name: inputName,
              value: value
            };
          }
        });

        if (options.onlyResolveConnected) {
          return inputValues;
        } else {
          return _objectSpread2(_objectSpread2({}, controlValues), inputValues);
        }
      } else {
        console.error("A root node was not found. The Root Engine requires that exactly one node be marked as the root node.");
        return {};
      }
    }
  }]);

  return RootEngine;
}();

var defaultContext = {};
var NodeEditor = function NodeEditor(_ref, ref) {
  var initialComments = _ref.comments,
      initialNodes = _ref.nodes,
      _ref$nodeTypes = _ref.nodeTypes,
      nodeTypes = _ref$nodeTypes === void 0 ? {} : _ref$nodeTypes,
      _ref$portTypes = _ref.portTypes,
      portTypes = _ref$portTypes === void 0 ? {} : _ref$portTypes,
      _ref$defaultNodes = _ref.defaultNodes,
      defaultNodes = _ref$defaultNodes === void 0 ? [] : _ref$defaultNodes,
      _ref$context = _ref.context,
      context = _ref$context === void 0 ? defaultContext : _ref$context,
      onChange = _ref.onChange,
      onCommentsChange = _ref.onCommentsChange,
      initialScale = _ref.initialScale,
      _ref$spaceToPan = _ref.spaceToPan,
      spaceToPan = _ref$spaceToPan === void 0 ? false : _ref$spaceToPan,
      _ref$hideComments = _ref.hideComments,
      hideComments = _ref$hideComments === void 0 ? false : _ref$hideComments,
      _ref$disableComments = _ref.disableComments,
      disableComments = _ref$disableComments === void 0 ? false : _ref$disableComments,
      _ref$disableZoom = _ref.disableZoom,
      disableZoom = _ref$disableZoom === void 0 ? false : _ref$disableZoom,
      _ref$disablePan = _ref.disablePan,
      disablePan = _ref$disablePan === void 0 ? false : _ref$disablePan,
      circularBehavior = _ref.circularBehavior,
      renderNodeHeader = _ref.renderNodeHeader,
      debug = _ref.debug;
  var editorId = useId();
  var cache = React.useRef(new Cache());
  var stage = React.useRef();

  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      sideEffectToasts = _React$useState2[0],
      setSideEffectToasts = _React$useState2[1];

  var _React$useReducer = React.useReducer(toastsReducer, []),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      toasts = _React$useReducer2[0],
      dispatchToasts = _React$useReducer2[1];

  var _React$useReducer3 = React.useReducer(connectNodesReducer(nodesReducer, {
    nodeTypes: nodeTypes,
    portTypes: portTypes,
    cache: cache,
    circularBehavior: circularBehavior,
    context: context
  }, setSideEffectToasts), {}, function () {
    return getInitialNodes(initialNodes, defaultNodes, nodeTypes, portTypes, context);
  }),
      _React$useReducer4 = _slicedToArray(_React$useReducer3, 2),
      nodes = _React$useReducer4[0],
      dispatchNodes = _React$useReducer4[1];

  var _React$useReducer5 = React.useReducer(commentsReducer, initialComments || {}),
      _React$useReducer6 = _slicedToArray(_React$useReducer5, 2),
      comments = _React$useReducer6[0],
      dispatchComments = _React$useReducer6[1];

  React.useEffect(function () {
    dispatchNodes({
      type: "HYDRATE_DEFAULT_NODES"
    });
  }, []);

  var _React$useState3 = React.useState(true),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      shouldRecalculateConnections = _React$useState4[0],
      setShouldRecalculateConnections = _React$useState4[1];

  var _React$useReducer7 = React.useReducer(stageReducer, {
    scale: typeof initialScale === "number" ? clamp_1(initialScale, 0.1, 7) : 1,
    translate: {
      x: 0,
      y: 0
    }
  }),
      _React$useReducer8 = _slicedToArray(_React$useReducer7, 2),
      stageState = _React$useReducer8[0],
      dispatchStageState = _React$useReducer8[1];

  var recalculateConnections = React.useCallback(function () {
    createConnections(nodes, stageState, editorId);
  }, [nodes, editorId, stageState, portTypes]);

  var recalculateStageRect = function recalculateStageRect() {
    stage.current = document.getElementById("".concat(STAGE_ID).concat(editorId)).getBoundingClientRect();
  };

  React.useLayoutEffect(function () {
    if (shouldRecalculateConnections) {
      recalculateConnections();
      setShouldRecalculateConnections(false);
    }
  }, [shouldRecalculateConnections, recalculateConnections]);

  var triggerRecalculation = function triggerRecalculation() {
    setShouldRecalculateConnections(true);
  };

  React.useImperativeHandle(ref, function () {
    return {
      getNodes: function getNodes() {
        return nodes;
      },
      getComments: function getComments() {
        return comments;
      }
    };
  });
  var previousNodes = usePrevious(nodes);
  React.useEffect(function () {
    if (previousNodes && onChange && nodes !== previousNodes) {
      onChange(nodes);
    }
  }, [nodes, previousNodes, onChange]);
  var previousComments = usePrevious(comments);
  React.useEffect(function () {
    if (previousComments && onCommentsChange && comments !== previousComments) {
      onCommentsChange(comments);
    }
  }, [comments, previousComments, onCommentsChange]);
  React.useEffect(function () {
    if (sideEffectToasts) {
      dispatchToasts(sideEffectToasts);
      setSideEffectToasts(null);
    }
  }, [sideEffectToasts]);
  return /*#__PURE__*/React.createElement(PortTypesContext.Provider, {
    value: portTypes
  }, /*#__PURE__*/React.createElement(NodeTypesContext.Provider, {
    value: nodeTypes
  }, /*#__PURE__*/React.createElement(NodeDispatchContext.Provider, {
    value: dispatchNodes
  }, /*#__PURE__*/React.createElement(ConnectionRecalculateContext.Provider, {
    value: triggerRecalculation
  }, /*#__PURE__*/React.createElement(ContextContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement(StageContext.Provider, {
    value: stageState
  }, /*#__PURE__*/React.createElement(CacheContext.Provider, {
    value: cache
  }, /*#__PURE__*/React.createElement(EditorIdContext.Provider, {
    value: editorId
  }, /*#__PURE__*/React.createElement(RecalculateStageRectContext.Provider, {
    value: recalculateStageRect
  }, /*#__PURE__*/React.createElement(Stage, {
    editorId: editorId,
    scale: stageState.scale,
    translate: stageState.translate,
    spaceToPan: spaceToPan,
    disablePan: disablePan,
    disableZoom: disableZoom,
    dispatchStageState: dispatchStageState,
    dispatchComments: dispatchComments,
    disableComments: disableComments || hideComments,
    stageRef: stage,
    numNodes: Object.keys(nodes).length,
    outerStageChildren: /*#__PURE__*/React.createElement(React.Fragment, null, debug && /*#__PURE__*/React.createElement("div", {
      className: styles.debugWrapper
    }, /*#__PURE__*/React.createElement("button", {
      className: styles.debugButton,
      onClick: function onClick() {
        return console.log(nodes);
      }
    }, "Log Nodes"), /*#__PURE__*/React.createElement("button", {
      className: styles.debugButton,
      onClick: function onClick() {
        return console.log(JSON.stringify(nodes));
      }
    }, "Export Nodes"), /*#__PURE__*/React.createElement("button", {
      className: styles.debugButton,
      onClick: function onClick() {
        return console.log(comments);
      }
    }, "Log Comments")), /*#__PURE__*/React.createElement(Toaster, {
      toasts: toasts,
      dispatchToasts: dispatchToasts
    }))
  }, !hideComments && Object.values(comments).map(function (comment) {
    return /*#__PURE__*/React.createElement(Comment, _extends({}, comment, {
      stageRect: stage,
      dispatch: dispatchComments,
      onDragStart: recalculateStageRect,
      key: comment.id
    }));
  }), Object.values(nodes).map(function (node) {
    return /*#__PURE__*/React.createElement(Node, _extends({}, node, {
      stageRect: stage,
      onDragEnd: triggerRecalculation,
      onDragStart: recalculateStageRect,
      renderNodeHeader: renderNodeHeader,
      key: node.id
    }));
  }), /*#__PURE__*/React.createElement(Connections, {
    nodes: nodes,
    editorId: editorId
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.dragWrapper,
    id: "".concat(DRAG_CONNECTION_ID).concat(editorId)
  })))))))))));
};
NodeEditor = /*#__PURE__*/React.forwardRef(NodeEditor);
var useRootEngine = function useRootEngine(nodes, engine, context) {
  return Object.keys(nodes).length ? engine.resolveRootNode(nodes, {
    context: context
  }) : {};
};

export { Colors, Controls, FlumeConfig, NodeEditor, RootEngine, useRootEngine };
//# sourceMappingURL=index.es.js.map
