import React, { useLayoutEffect, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

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

function _isPlaceholder(a) {
  return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;

      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;

      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        });

      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function (_c) {
          return fn(a, b, _c);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} minimum The lower limit of the clamp (inclusive)
 * @param {Number} maximum The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      R.clamp(1, 10, -5) // => 1
 *      R.clamp(1, 10, 15) // => 10
 *      R.clamp(1, 10, 4)  // => 4
 */

var clamp =
/*#__PURE__*/
_curry3(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }

  return value < min ? min : value > max ? max : value;
});

var clamp$1 = clamp;

/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      const sortByFirstItem = R.sortBy(R.prop(0));
 *      const pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *
 *      const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      const people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */

var sortBy =
/*#__PURE__*/
_curry2(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});

var sortBy$1 = sortBy;

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
    var menuWrapper = React.useRef();
    var menuOptionsWrapper = React.useRef();
    var filterInput = React.useRef();
    var _c = React.useState(""), filter = _c[0], setFilter = _c[1];
    var _d = React.useState(0), menuWidth = _d[0], setMenuWidth = _d[1];
    var _e = React.useState(0), selectedIndex = _e[0], setSelectedIndex = _e[1];
    var menuId = React.useRef(nanoid(10));
    var handleOptionSelected = function (option) {
        onOptionSelected(option);
        onRequestClose();
    };
    var testClickOutside = React.useCallback(function (e) {
        if (menuWrapper.current && !menuWrapper.current.contains(e.target)) {
            onRequestClose();
            document.removeEventListener("click", testClickOutside, { capture: true });
            document.removeEventListener("contextmenu", testClickOutside, { capture: true });
        }
    }, [menuWrapper, onRequestClose]);
    var testEscape = React.useCallback(function (e) {
        if (e.keyCode === 27) {
            onRequestClose();
            document.removeEventListener("keydown", testEscape, { capture: true });
        }
    }, [onRequestClose]);
    React.useEffect(function () {
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
    var filteredOptions = React.useMemo(function () {
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
            if (optionRect.y + optionRect.height > menuRect.y + menuRect.height ||
                optionRect.y < menuRect.y) {
                menuOption.scrollIntoView({ block: "nearest" });
            }
        }
    }, [selectedIndex]);
    return (React.createElement("div", { className: styles$d.menuWrapper, onMouseDown: function (e) { return e.stopPropagation(); }, onKeyDown: handleKeyDown, style: {
            left: x,
            top: y,
            width: filter ? menuWidth : "auto"
        }, ref: menuWrapper, tabIndex: 0, role: "menu", "aria-activedescendant": "".concat(menuId.current, "-").concat(selectedIndex) },
        !hideHeader && (label ? true : !!options.length) ? (React.createElement("div", { className: styles$d.menuHeader },
            React.createElement("label", { className: styles$d.menuLabel }, label),
            !hideFilter && options.length ? (React.createElement("input", { type: "text", placeholder: "Filter options", value: filter, onChange: handleFilterChange, className: styles$d.menuFilter, autoFocus: true, ref: filterInput })) : null)) : null,
        React.createElement("div", { className: styles$d.optionsWrapper, role: "menu", ref: menuOptionsWrapper, style: { maxHeight: clamp$1(window.innerHeight - y - 70, 10, 300) } },
            filteredOptions.map(function (option, i) { return (React.createElement(ContextOption, { menuId: menuId.current, selected: selectedIndex === i, onClick: function () { return handleOptionSelected(option); }, onMouseEnter: function () { return setSelectedIndex(null); }, index: i, key: option.value + i },
                React.createElement("label", null, option.label),
                option.description ? React.createElement("p", null, option.description) : null)); }),
            !options.length ? (React.createElement("span", { className: styles$d.emptyText }, emptyText)) : null)));
};
var ContextOption = function (_a) {
    var menuId = _a.menuId, index = _a.index, children = _a.children, onClick = _a.onClick, selected = _a.selected, onMouseEnter = _a.onMouseEnter;
    return (React.createElement("div", { className: styles$d.option, role: "menuitem", onClick: onClick, onMouseEnter: onMouseEnter, "data-selected": selected, id: "".concat(menuId, "-").concat(index) }, children));
};

var NodeTypesContext = React.createContext();
var PortTypesContext = React.createContext();
var NodeDispatchContext = React.createContext();
var ConnectionRecalculateContext = React.createContext();
var ContextContext = React.createContext();
var StageContext = React.createContext();
var CacheContext = React.createContext();
var RecalculateStageRectContext = React.createContext();
var EditorIdContext = React.createContext();

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
    var startCoordinates = React.useRef(null);
    var offset = React.useRef();
    var wrapper = React.useRef();
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
    return (React.createElement("div", __assign$c({ onMouseDown: function (e) {
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

var STAGE_ID = '__node_editor_stage__';
var DRAG_CONNECTION_ID = '__node_editor_drag_connection__';
var CONNECTIONS_ID = '__node_editor_connections__';

var styles$c = {"wrapper":"Stage-module_wrapper__4mnnp","transformWrapper":"Stage-module_transformWrapper__sSHnC","scaleWrapper":"Stage-module_scaleWrapper__PEsM4"};

var Stage = function (_a) {
    var scale = _a.scale, translate = _a.translate, editorId = _a.editorId, dispatchStageState = _a.dispatchStageState, children = _a.children, outerStageChildren = _a.outerStageChildren, numNodes = _a.numNodes, stageRef = _a.stageRef, spaceToPan = _a.spaceToPan, dispatchComments = _a.dispatchComments, disableComments = _a.disableComments, disablePan = _a.disablePan, disableZoom = _a.disableZoom;
    var nodeTypes = React.useContext(NodeTypesContext);
    var dispatchNodes = React.useContext(NodeDispatchContext);
    var wrapper = React.useRef();
    var translateWrapper = React.useRef();
    var _b = React.useState(false), menuOpen = _b[0], setMenuOpen = _b[1];
    var _c = React.useState({ x: 0, y: 0 }), menuCoordinates = _c[0], setMenuCoordinates = _c[1];
    var dragData = React.useRef({ x: 0, y: 0 });
    var _d = React.useState(false), spaceIsPressed = _d[0], setSpaceIsPressed = _d[1];
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
                    scale: clamp$1(scale - clamp$1(delta_1, -10, 10) * 0.005, 0.1, 7)
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
    React.useEffect(function () {
        if (!disableZoom) {
            var stageWrapper_1 = wrapper.current;
            stageWrapper_1.addEventListener("wheel", handleWheel);
            return function () {
                stageWrapper_1.removeEventListener("wheel", handleWheel);
            };
        }
    }, [handleWheel, disableZoom]);
    var menuOptions = React.useMemo(function () {
        var options = sortBy$1(Object.values(nodeTypes)
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
    return (React.createElement(Draggable, { id: "".concat(STAGE_ID).concat(editorId), className: styles$c.wrapper, innerRef: wrapper, onContextMenu: handleContextMenu, onMouseEnter: handleMouseEnter, onDragDelayStart: handleDragDelayStart, onDragStart: handleDragStart, onDrag: handleMouseDrag, onDragEnd: handleDragEnd, onKeyDown: handleKeyDown, tabIndex: -1, stageState: { scale: scale, translate: translate }, style: { cursor: spaceIsPressed && spaceToPan ? "grab" : "" }, disabled: disablePan || (spaceToPan && !spaceIsPressed), "data-flume-stage": true },
        menuOpen ? (React.createElement(Portal$1, null,
            React.createElement(ContextMenu, { x: menuCoordinates.x, y: menuCoordinates.y, options: menuOptions, onRequestClose: closeContextMenu, onOptionSelected: addNode, label: "Add Node" }))) : null,
        React.createElement("div", { ref: translateWrapper, className: styles$c.transformWrapper, style: { transform: "translate(".concat(-translate.x, "px, ").concat(-translate.y, "px)") } },
            React.createElement("div", { className: styles$c.scaleWrapper, style: { transform: "scale(".concat(scale, ")") } }, children)),
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
    var id = React.useRef(nanoid(10));
    return (React.createElement("div", { className: styles$a.wrapper },
        React.createElement("input", { className: styles$a.checkbox, type: "checkbox", id: id, value: data, checked: data, onChange: function (e) { return onChange(e.target.checked); } }),
        React.createElement("label", { className: styles$a.label, htmlFor: id }, label)));
};

var styles$9 = {"wrapper":"TextInput-module_wrapper__z4wcl","input":"TextInput-module_input__UOLLa"};

var TextInput = function (_a) {
    var placeholder = _a.placeholder, updateNodeConnections = _a.updateNodeConnections, onChange = _a.onChange, data = _a.data, step = _a.step, type = _a.type;
    var numberInput = React.useRef();
    var recalculateStageRect = React.useContext(RecalculateStageRectContext);
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
    return (React.createElement("div", { className: styles$9.wrapper }, type === "number" ? (React.createElement("input", { onKeyDown: function (e) {
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
        }, step: step || "1", onMouseDown: handlePossibleResize, type: type || "text", placeholder: placeholder, className: styles$9.input, defaultValue: data, onDragStart: function (e) { return e.stopPropagation(); }, ref: numberInput })) : (React.createElement("textarea", { onChange: function (e) { return onChange(e.target.value); }, onMouseDown: handlePossibleResize, type: "text", placeholder: placeholder, className: styles$9.input, value: data, onDragStart: function (e) { return e.stopPropagation(); } }))));
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
    var _d = React.useState(false), drawerOpen = _d[0], setDrawerOpen = _d[1];
    var _e = React.useState({
        x: 0,
        y: 0
    }), drawerCoordinates = _e[0], setDrawerCoordinates = _e[1];
    var wrapper = React.useRef();
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
    var selectedOption = React.useMemo(function () {
        var option = options.find(function (o) { return o.value === data; });
        if (option) {
            return __assign$b(__assign$b({}, option), { label: option.label.length > MAX_LABEL_LENGTH
                    ? option.label.slice(0, MAX_LABEL_LENGTH) + "..."
                    : option.label });
        }
    }, [options, data]);
    return (React.createElement(React.Fragment, null,
        allowMultiple ? (data.length ? (React.createElement("div", { className: styles$8.chipsWrapper }, data.map(function (val, i) {
            var optLabel = (options.find(function (opt) { return opt.value === val; }) || {}).label || "";
            return (React.createElement(OptionChip, { onRequestDelete: function () { return handleOptionDeleted(i); }, key: val }, optLabel));
        }))) : null) : data ? (React.createElement(SelectedOption, { wrapperRef: wrapper, option: selectedOption, onClick: openDrawer })) : null,
        (allowMultiple || !data) &&
            React.createElement("div", { className: styles$8.wrapper, ref: wrapper, onClick: openDrawer }, placeholder),
        drawerOpen && (React.createElement(Portal$1, null,
            React.createElement(ContextMenu, { x: drawerCoordinates.x, y: drawerCoordinates.y, emptyText: "There are no options", options: getFilteredOptions(), onOptionSelected: handleOptionSelected, onRequestClose: closeDrawer })))));
};
var SelectedOption = function (_a) {
    var _b = _a.option, _c = _b === void 0 ? {} : _b, label = _c.label, description = _c.description, wrapperRef = _a.wrapperRef, onClick = _a.onClick;
    return (React.createElement("div", { className: styles$8.selectedWrapper, onClick: onClick, ref: wrapperRef },
        React.createElement("label", null, label),
        description ? React.createElement("p", null, description) : null));
};
var OptionChip = function (_a) {
    var children = _a.children, onRequestDelete = _a.onRequestDelete;
    return (React.createElement("div", { className: styles$8.chipWrapper },
        children,
        React.createElement("button", { className: styles$8.deleteButton, onMouseDown: function (e) {
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
    var nodesDispatch = React.useContext(NodeDispatchContext);
    var executionContext = React.useContext(ContextContext);
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
                return (React.createElement(Select, __assign$a({}, commonProps, { options: getOptions ? getOptions(inputData, executionContext) : options, placeholder: placeholder })));
            case "text":
                return React.createElement(TextInput, __assign$a({}, commonProps, { placeholder: placeholder }));
            case "number":
                return (React.createElement(TextInput, __assign$a({}, commonProps, { step: step, type: "number", placeholder: placeholder })));
            case "checkbox":
                return React.createElement(Checkbox, __assign$a({}, commonProps, { label: calculatedLabel }));
            case "multiselect":
                return (React.createElement(Select, __assign$a({ allowMultiple: true }, commonProps, { options: getOptions ? getOptions(inputData, executionContext) : options, placeholder: placeholder, label: label })));
            case "custom":
                return render(data, onChange, executionContext, triggerRecalculation, {
                    label: label,
                    name: name,
                    portName: portName,
                    inputLabel: inputLabel,
                    defaultValue: defaultValue
                }, allData);
            default:
                return React.createElement("div", null, "Control");
        }
    };
    return (React.createElement("div", { className: styles$7.wrapper },
        calculatedLabel && type !== "checkbox" && type !== "custom" && (React.createElement("label", { className: styles$7.controlLabel }, calculatedLabel)),
        getControlByType(type)));
};

var Connection = function (_a) {
    var from = _a.from, to = _a.to, id = _a.id, lineRef = _a.lineRef, outputNodeId = _a.outputNodeId, outputPortName = _a.outputPortName, inputNodeId = _a.inputNodeId, inputPortName = _a.inputPortName, stroke = _a.stroke;
    var curve = calculateCurve(from, to);
    return (React.createElement("svg", { className: styles$b.svg },
        React.createElement("path", { "data-connection-id": id, "data-output-node-id": outputNodeId, "data-output-port-name": outputPortName, "data-input-node-id": inputNodeId, "data-input-port-name": inputPortName, stroke: stroke, fill: "none", strokeWidth: 3, strokeLinecap: "round", d: curve, ref: lineRef })));
};

var usePrevious = function (value) {
    var ref = React.useRef();
    React.useEffect(function () {
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
    var nodesDispatch = React.useContext(NodeDispatchContext);
    var executionContext = React.useContext(ContextContext);
    var transputs = React.useMemo(function () {
        if (Array.isArray(transputsFn))
            return transputsFn;
        return transputsFn(inputData, connections, executionContext);
    }, [transputsFn, inputData, connections, executionContext]);
    var prevTransputs = usePrevious(transputs);
    React.useEffect(function () {
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
    var inputTypes = React.useContext(PortTypesContext);
    var triggerRecalculation = React.useContext(ConnectionRecalculateContext);
    var resolvedInputs = useTransputs(inputs, 'input', nodeId, inputData, connections);
    var resolvedOutputs = useTransputs(outputs, 'output', nodeId, inputData, connections);
    return (React.createElement("div", { className: styles$6.wrapper },
        resolvedInputs.length ? (React.createElement("div", { className: styles$6.inputs }, resolvedInputs.map(function (input) { return (React.createElement(Input, __assign$9({}, input, { data: inputData[input.name] || {}, isConnected: !!connections.inputs[input.name], triggerRecalculation: triggerRecalculation, updateNodeConnections: updateNodeConnections, inputTypes: inputTypes, nodeId: nodeId, inputData: inputData, key: input.name }))); }))) : null,
        !!resolvedOutputs.length && (React.createElement("div", { className: styles$6.outputs }, resolvedOutputs.map(function (output) { return (React.createElement(Output, __assign$9({}, output, { triggerRecalculation: triggerRecalculation, inputTypes: inputTypes, nodeId: nodeId, inputData: inputData, portOnRight: true, key: output.name }))); })))));
};
var Input = function (_a) {
    var type = _a.type, label = _a.label, name = _a.name, nodeId = _a.nodeId, data = _a.data, localControls = _a.controls, inputTypes = _a.inputTypes, noControls = _a.noControls, triggerRecalculation = _a.triggerRecalculation, updateNodeConnections = _a.updateNodeConnections, isConnected = _a.isConnected, inputData = _a.inputData, hidePort = _a.hidePort;
    var _b = inputTypes[type] || {}, defaultLabel = _b.label, color = _b.color, _c = _b.controls, defaultControls = _c === void 0 ? [] : _c;
    var prevConnected = usePrevious(isConnected);
    var controls = localControls || defaultControls;
    React.useEffect(function () {
        if (isConnected !== prevConnected) {
            triggerRecalculation();
        }
    }, [isConnected, prevConnected, triggerRecalculation]);
    return (React.createElement("div", { className: styles$6.transput, "data-controlless": isConnected || noControls || !controls.length, onDragStart: function (e) {
            e.preventDefault();
            e.stopPropagation();
        } },
        !hidePort ? (React.createElement(Port, { type: type, color: color, name: name, nodeId: nodeId, isInput: true, triggerRecalculation: triggerRecalculation })) : null,
        (!controls.length || noControls || isConnected) && (React.createElement("label", { className: styles$6.portLabel }, label || defaultLabel)),
        !noControls && !isConnected
            ? (React.createElement("div", { className: styles$6.controls }, controls.map(function (control) { return (React.createElement(Control, __assign$9({}, control, { nodeId: nodeId, portName: name, triggerRecalculation: triggerRecalculation, updateNodeConnections: updateNodeConnections, inputLabel: label, data: data[control.name], allData: data, key: control.name, inputData: inputData, isMonoControl: controls.length === 1 }))); })))
            : null));
};
var Output = function (_a) {
    var label = _a.label, name = _a.name, nodeId = _a.nodeId, type = _a.type, inputTypes = _a.inputTypes, triggerRecalculation = _a.triggerRecalculation;
    var _b = inputTypes[type] || {}, defaultLabel = _b.label, color = _b.color;
    return (React.createElement("div", { className: styles$6.transput, "data-controlless": true, onDragStart: function (e) {
            e.preventDefault();
            e.stopPropagation();
        } },
        React.createElement("label", { className: styles$6.portLabel }, label || defaultLabel),
        React.createElement(Port, { type: type, name: name, color: color, nodeId: nodeId, triggerRecalculation: triggerRecalculation })));
};
var Port = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "grey" : _b, _c = _a.name, name = _c === void 0 ? "" : _c, type = _a.type, isInput = _a.isInput, nodeId = _a.nodeId, triggerRecalculation = _a.triggerRecalculation;
    var nodesDispatch = React.useContext(NodeDispatchContext);
    var stageState = React.useContext(StageContext);
    var editorId = React.useContext(EditorIdContext);
    var stageId = "".concat(STAGE_ID).concat(editorId);
    var inputTypes = React.useContext(PortTypesContext);
    var _d = React.useState(false), isDragging = _d[0], setIsDragging = _d[1];
    var _e = React.useState({
        x: 0,
        y: 0
    }), dragStartCoordinates = _e[0], setDragStartCoordinates = _e[1];
    var dragStartCoordinatesCache = React.useRef(dragStartCoordinates);
    var port = React.useRef();
    var line = React.useRef();
    var lineInToPort = React.useRef();
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
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { zIndex: 999 }, onMouseDown: handleDragStart, className: styles$6.port, "data-port-color": color, "data-port-name": name, "data-port-type": type, "data-port-transput-type": isInput ? "input" : "output", "data-node-id": nodeId, onDragStart: function (e) {
                e.preventDefault();
                e.stopPropagation();
            }, ref: port }),
        isDragging && !isInput ? (React.createElement(Portal$1, { node: document.getElementById("".concat(DRAG_CONNECTION_ID).concat(editorId)) },
            React.createElement(Connection, { from: dragStartCoordinates, to: dragStartCoordinates, lineRef: line, stroke: color }))) : null));
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
    var cache = React.useContext(CacheContext);
    var nodeTypes = React.useContext(NodeTypesContext);
    var nodesDispatch = React.useContext(NodeDispatchContext);
    var stageState = React.useContext(StageContext);
    var currentNodeType = nodeTypes[type];
    var label = currentNodeType.label, deletable = currentNodeType.deletable, _b = currentNodeType.inputs, inputs = _b === void 0 ? [] : _b, _c = currentNodeType.outputs, outputs = _c === void 0 ? [] : _c;
    var nodeWrapper = React.useRef();
    var _d = React.useState(false), menuOpen = _d[0], setMenuOpen = _d[1];
    var _e = React.useState({ x: 0, y: 0 }), menuCoordinates = _e[0], setMenuCoordinates = _e[1];
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
    return (React.createElement(Draggable, { className: styles$5.wrapper, style: {
            width: width,
            transform: "translate(".concat(x, "px, ").concat(y, "px)")
        }, onDragStart: startDrag, onDrag: handleDrag, onDragEnd: stopDrag, innerRef: nodeWrapper, "data-node-id": id, onContextMenu: handleContextMenu, stageState: stageState, stageRect: stageRect },
        renderNodeHeader ? (renderNodeHeader(NodeHeader, currentNodeType, {
            openMenu: handleContextMenu,
            closeMenu: closeContextMenu,
            deleteNode: deleteNode
        })) : (React.createElement(NodeHeader, null, label)),
        React.createElement(IoPorts, { nodeId: id, inputs: inputs, outputs: outputs, connections: connections, updateNodeConnections: updateNodeConnections, inputData: inputData }),
        menuOpen ? (React.createElement(Portal$1, null,
            React.createElement(ContextMenu, { x: menuCoordinates.x, y: menuCoordinates.y, options: __spreadArray$2([], (deletable !== false
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
    return (React.createElement("h2", __assign$8({}, props, { className: styles$5.label + (className ? " ".concat(className) : "") }), children));
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
    return (React.createElement("div", { ref: wrapper, className: styles$4.wrapper, style: {
            left: x,
            top: y
        } }, Object.values(Colors).map(function (color) { return (React.createElement(ColorButton, { onSelected: function () {
            onColorPicked(color);
            onRequestClose();
        }, color: color, key: color })); })));
});
var ColorButton = function (_a) {
    var color = _a.color, onSelected = _a.onSelected;
    return (React.createElement("div", { className: styles$4.colorButtonWrapper },
        React.createElement("button", { className: styles$4.colorButton, onClick: onSelected, "data-color": color, "aria-label": color })));
};

var styles$3 = {"wrapper":"Comment-module_wrapper__4-iQL","text":"Comment-module_text__wBPGw","resizeThumb":"Comment-module_resizeThumb__cp55C","textarea":"Comment-module_textarea__9Jwsf"};

var Comment = (function (_a) {
    var dispatch = _a.dispatch, id = _a.id, x = _a.x, y = _a.y, width = _a.width, height = _a.height, color = _a.color, text = _a.text, stageRect = _a.stageRect, onDragStart = _a.onDragStart, isNew = _a.isNew;
    var stageState = React.useContext(StageContext);
    var wrapper = React.useRef();
    var textarea = React.useRef();
    var _b = React.useState(false), isEditing = _b[0], setIsEditing = _b[1];
    var _c = React.useState(false), isPickingColor = _c[0], setIsPickingColor = _c[1];
    var _d = React.useState(false), menuOpen = _d[0], setMenuOpen = _d[1];
    var _e = React.useState({ x: 0, y: 0 }), menuCoordinates = _e[0], setMenuCoordinates = _e[1];
    var _f = React.useState({
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
        var width = clamp$1(coordinates.x - x + 10, 80, 10000);
        var height = clamp$1(coordinates.y - y + 10, 30, 10000);
        wrapper.current.style.width = "".concat(width, "px");
        wrapper.current.style.height = "".concat(height, "px");
    };
    var handleResizeEnd = function (_, coordinates) {
        var width = clamp$1(coordinates.x - x + 10, 80, 10000);
        var height = clamp$1(coordinates.y - y + 10, 30, 10000);
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
    React.useEffect(function () {
        if (isNew) {
            setIsEditing(true);
            dispatch({
                type: "REMOVE_COMMENT_NEW",
                id: id
            });
        }
    }, [isNew, dispatch, id]);
    return (React.createElement(Draggable, { innerRef: wrapper, className: styles$3.wrapper, style: {
            transform: "translate(".concat(x, "px,").concat(y, "px)"),
            width: width,
            height: height,
            zIndex: isEditing ? 999 : ""
        }, stageState: stageState, stageRect: stageRect, onDragStart: startDrag, onDrag: handleDrag, onDragEnd: handleDragEnd, onContextMenu: handleContextMenu, onDoubleClick: startTextEdit, onWheel: function (e) { return e.stopPropagation(); }, "data-color": color },
        isEditing ? (React.createElement("textarea", { className: styles$3.textarea, onChange: handleTextChange, onMouseDown: function (e) { return e.stopPropagation(); }, onBlur: endTextEdit, placeholder: "Text of the comment...", autoFocus: true, value: text, ref: textarea })) : (React.createElement("div", { "data-comment": true, className: styles$3.text }, text)),
        React.createElement(Draggable, { className: styles$3.resizeThumb, stageState: stageState, stageRect: stageRect, onDrag: handleResize, onDragEnd: handleResizeEnd }),
        menuOpen ? (React.createElement(Portal$1, null,
            React.createElement(ContextMenu, { hideFilter: true, label: "Comment Options", x: menuCoordinates.x, y: menuCoordinates.y, options: [
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
        isPickingColor ? (React.createElement(Portal$1, null,
            React.createElement(ColorPicker, { x: colorPickerCoordinates.x, y: colorPickerCoordinates.y, onRequestClose: function () { return setIsPickingColor(false); }, onColorPicked: handleColorPicked }))) : null));
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
    return (React.createElement("div", { className: styles$2.toaster }, toasts.map(function (toast, i) {
        return (React.createElement(Toast, __assign$6({}, toast, { onHeightReceived: setHeight, onExitRequested: startExit, onRemoveRequested: removeToast, y: toasts.slice(0, i + 1).reduce(function (y, t) { return t.height + y + 5; }, 0), key: toast.id })));
    })));
});
var Toast = function (_a) {
    var id = _a.id, title = _a.title, message = _a.message, duration = _a.duration, type = _a.type, exiting = _a.exiting, y = _a.y, onHeightReceived = _a.onHeightReceived, onExitRequested = _a.onExitRequested, onRemoveRequested = _a.onRemoveRequested;
    var _b = React.useState(false), paused = _b[0], setPaused = _b[1];
    var wrapper = React.useRef();
    var timer = React.useRef();
    var stopTimer = React.useCallback(function () {
        setPaused(true);
        clearTimeout(timer.current);
    }, []);
    var resumeTimer = React.useCallback(function () {
        setPaused(false);
        timer.current = setTimeout(function () { return onExitRequested(id); }, duration);
    }, [id, duration, onExitRequested]);
    React.useLayoutEffect(function () {
        var height = wrapper.current.getBoundingClientRect().height;
        onHeightReceived(id, height);
    }, [onHeightReceived, id]);
    React.useEffect(function () {
        resumeTimer();
        return stopTimer;
    }, [resumeTimer, stopTimer]);
    var handleAnimationEnd = function () {
        if (exiting) {
            onRemoveRequested(id);
        }
    };
    return (React.createElement("div", { ref: wrapper, className: styles$2.toast, "data-type": type, style: { transform: "translateY(-".concat(y, "px)") }, "data-exiting": exiting, onAnimationEnd: handleAnimationEnd, onMouseEnter: stopTimer, onMouseLeave: resumeTimer, role: "alert" },
        title ? React.createElement("span", { className: styles$2.title }, title) : null,
        React.createElement("p", null, message),
        !paused && (React.createElement("div", { className: styles$2.timer, style: { animationDuration: "".concat(duration, "ms") }, onAnimationEnd: function (e) { return e.stopPropagation(); } })),
        React.createElement("button", { className: styles$2.exitButton, onClick: function () {
                stopTimer();
                onExitRequested(id);
            } }, "\u2715")));
};

var styles$1 = {"svgWrapper":"Connections-module_svgWrapper__UpHhQ"};

var Connections = function (_a) {
    _a.nodes; var editorId = _a.editorId;
    return (React.createElement("div", { className: styles$1.svgWrapper, id: "".concat(CONNECTIONS_ID).concat(editorId) }));
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
    var cache = React.useRef(new Cache());
    var stage = React.useRef();
    var _l = React.useState(), sideEffectToasts = _l[0], setSideEffectToasts = _l[1];
    var _m = React.useReducer(toastsReducer, []), toasts = _m[0], dispatchToasts = _m[1];
    var _o = React.useReducer(connectNodesReducer(nodesReducer, { nodeTypes: nodeTypes, portTypes: portTypes, cache: cache, circularBehavior: circularBehavior, context: context }, setSideEffectToasts), {}, function () { return getInitialNodes(initialNodes, defaultNodes, nodeTypes, portTypes, context); }), nodes = _o[0], dispatchNodes = _o[1];
    var _p = React.useReducer(commentsReducer, initialComments || {}), comments = _p[0], dispatchComments = _p[1];
    React.useEffect(function () {
        dispatchNodes({ type: "HYDRATE_DEFAULT_NODES" });
    }, []);
    var _q = React.useState(true), shouldRecalculateConnections = _q[0], setShouldRecalculateConnections = _q[1];
    var _r = React.useReducer(stageReducer, {
        scale: typeof initialScale === "number" ? clamp$1(initialScale, 0.1, 7) : 1,
        translate: { x: 0, y: 0 }
    }), stageState = _r[0], dispatchStageState = _r[1];
    var recalculateConnections = React.useCallback(function () {
        createConnections(nodes, stageState, editorId);
    }, [nodes, editorId, stageState, portTypes]);
    var recalculateStageRect = function () {
        stage.current = document
            .getElementById("".concat(STAGE_ID).concat(editorId))
            .getBoundingClientRect();
    };
    React.useLayoutEffect(function () {
        if (shouldRecalculateConnections) {
            recalculateConnections();
            setShouldRecalculateConnections(false);
        }
    }, [shouldRecalculateConnections, recalculateConnections]);
    var triggerRecalculation = function () {
        setShouldRecalculateConnections(true);
    };
    React.useImperativeHandle(ref, function () { return ({
        getNodes: function () {
            return nodes;
        },
        getComments: function () {
            return comments;
        }
    }); });
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
    return (React.createElement(PortTypesContext.Provider, { value: portTypes },
        React.createElement(NodeTypesContext.Provider, { value: nodeTypes },
            React.createElement(NodeDispatchContext.Provider, { value: dispatchNodes },
                React.createElement(ConnectionRecalculateContext.Provider, { value: triggerRecalculation },
                    React.createElement(ContextContext.Provider, { value: context },
                        React.createElement(StageContext.Provider, { value: stageState },
                            React.createElement(CacheContext.Provider, { value: cache },
                                React.createElement(EditorIdContext.Provider, { value: editorId },
                                    React.createElement(RecalculateStageRectContext.Provider, { value: recalculateStageRect },
                                        React.createElement(Stage, { editorId: editorId, scale: stageState.scale, translate: stageState.translate, spaceToPan: spaceToPan, disablePan: disablePan, disableZoom: disableZoom, dispatchStageState: dispatchStageState, dispatchComments: dispatchComments, disableComments: disableComments || hideComments, stageRef: stage, numNodes: Object.keys(nodes).length, outerStageChildren: React.createElement(React.Fragment, null,
                                                debug && (React.createElement("div", { className: styles.debugWrapper },
                                                    React.createElement("button", { className: styles.debugButton, onClick: function () { return console.log(nodes); } }, "Log Nodes"),
                                                    React.createElement("button", { className: styles.debugButton, onClick: function () {
                                                            return console.log(JSON.stringify(nodes));
                                                        } }, "Export Nodes"),
                                                    React.createElement("button", { className: styles.debugButton, onClick: function () { return console.log(comments); } }, "Log Comments"))),
                                                React.createElement(Toaster, { toasts: toasts, dispatchToasts: dispatchToasts })) },
                                            !hideComments &&
                                                Object.values(comments).map(function (comment) { return (React.createElement(Comment, __assign({}, comment, { stageRect: stage, dispatch: dispatchComments, onDragStart: recalculateStageRect, key: comment.id }))); }),
                                            Object.values(nodes).map(function (node) { return (React.createElement(Node, __assign({}, node, { stageRect: stage, onDragEnd: triggerRecalculation, onDragStart: recalculateStageRect, renderNodeHeader: renderNodeHeader, key: node.id }))); }),
                                            React.createElement(Connections, { nodes: nodes, editorId: editorId }),
                                            React.createElement("div", { className: styles.dragWrapper, id: "".concat(DRAG_CONNECTION_ID).concat(editorId) }))))))))))));
};
var index = React.forwardRef(NodeEditor);
var useRootEngine = function (nodes, engine, context) {
    return Object.keys(nodes).length ? engine.resolveRootNode(nodes, { context: context }) : {};
};

export { Colors, Controls, FlumeConfig, RootEngine, index as default, useRootEngine };
//# sourceMappingURL=index.es.js.map
