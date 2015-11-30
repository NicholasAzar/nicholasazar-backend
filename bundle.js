webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(159);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(160);

	var _componentsCommonHistory = __webpack_require__(211);

	var _componentsCommonHistory2 = _interopRequireDefault(_componentsCommonHistory);

	var Main = __webpack_require__(213);
	var Home = __webpack_require__(399);
	var Blogs = __webpack_require__(400);
	var Blog = __webpack_require__(405);
	var BlogPost = __webpack_require__(406);
	__webpack_require__(407);
	window.React = _react2['default'];

	var injectTapEventPlugin = __webpack_require__(408);
	injectTapEventPlugin();

	_reactDom2['default'].render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: _componentsCommonHistory2['default'] },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: Main },
	    _react2['default'].createElement(_reactRouter.IndexRoute, { component: Home }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'blogs', component: Blogs }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'blogs/:blogPermaLink', component: Blog }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'blogs/:blogPermaLink/:postPermaLink', component: BlogPost }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '*', component: Home })
	  )
	), document.getElementById('content'));

/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _historyLibCreateBrowserHistory = __webpack_require__(212);

	var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);

	exports['default'] = (0, _historyLibCreateBrowserHistory2['default'])();
	module.exports = exports['default'];

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(165);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(166);

	var _ExecutionEnvironment = __webpack_require__(167);

	var _DOMUtils = __webpack_require__(168);

	var _DOMStateStorage = __webpack_require__(169);

	var _createDOMHistory = __webpack_require__(170);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve URLs.
	 */
	function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

	  var forceRefresh = options.forceRefresh;

	  var isSupported = _DOMUtils.supportsHistory();
	  var useRefresh = !isSupported || forceRefresh;

	  function getCurrentLocation(historyState) {
	    historyState = historyState || window.history.state || {};

	    var path = _DOMUtils.getWindowPath();
	    var _historyState = historyState;
	    var key = _historyState.key;

	    var state = undefined;
	    if (key) {
	      state = _DOMStateStorage.readState(key);
	    } else {
	      state = null;
	      key = history.createKey();

	      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
	    }

	    return history.createLocation(path, state, undefined, key);
	  }

	  function startPopStateListener(_ref) {
	    var transitionTo = _ref.transitionTo;

	    function popStateListener(event) {
	      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

	      transitionTo(getCurrentLocation(event.state));
	    }

	    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

	    return function () {
	      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
	    };
	  }

	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;

	    if (action === _Actions.POP) return; // Nothing to do.

	    _DOMStateStorage.saveState(key, state);

	    var path = (basename || '') + pathname + search + hash;
	    var historyState = {
	      key: key
	    };

	    if (action === _Actions.PUSH) {
	      if (useRefresh) {
	        window.location.href = path;
	        return false; // Prevent location update.
	      } else {
	          window.history.pushState(historyState, null, path);
	        }
	    } else {
	      // REPLACE
	      if (useRefresh) {
	        window.location.replace(path);
	        return false; // Prevent location update.
	      } else {
	          window.history.replaceState(historyState, null, path);
	        }
	    }
	  }

	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));

	  var listenerCount = 0,
	      stopPopStateListener = undefined;

	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listenBefore(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  function listen(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    var unlisten = history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

	    history.registerTransitionHook(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);

	    if (--listenerCount === 0) stopPopStateListener();
	  }

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook
	  });
	}

	exports['default'] = createBrowserHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var AppBar = __webpack_require__(214);
	var Colors = __webpack_require__(234);
	var Typography = __webpack_require__(233);
	var ThemeManager = __webpack_require__(258);
	var LightRawTheme = __webpack_require__(255);
	var IconButton = __webpack_require__(235);

	var FullWidthSection = __webpack_require__(268);

	var LeftNavMenu = __webpack_require__(386);

	var Theme = __webpack_require__(398);

	var history = __webpack_require__(211);

	var Main = React.createClass({
	    displayName: 'Main',

	    _userMenuTouched: function _userMenuTouched(e, value) {
	        console.log("Main._rightMenuChange", value);
	        history.replaceState(null, '/' + value._store.props.value);
	    },

	    render: function render() {
	        var styles = this.getStyles();

	        var rightMenu = React.createElement(
	            'div',
	            null,
	            React.createElement(
	                IconButton,
	                { iconClassName: 'material-icons', iconStyle: styles.userIcon, onItemTouchTap: this._userMenuTouched },
	                'chat'
	            )
	        );

	        return React.createElement(
	            'div',
	            { style: styles.parent },
	            React.createElement(AppBar, { title: 'Nicholas Azar', onLeftIconButtonTouchTap: this.showSideBar, iconElementRight: rightMenu, zDepth: 0, style: styles.topMenu }),
	            React.createElement(LeftNavMenu, { ref: 'leftNav' }),
	            React.createElement(
	                'div',
	                { className: 'contentRoot' },
	                this.props.children
	            ),
	            React.createElement(
	                FullWidthSection,
	                { style: styles.footer },
	                React.createElement(
	                    'p',
	                    { style: styles.p },
	                    'Copyright Nicholas Azar - 2015'
	                )
	            )
	        );
	    },
	    getStyles: function getStyles() {
	        return {
	            parent: {
	                position: 'relative',
	                margin: '64px 0 120px 0',
	                overflow: 'hidden'
	            },
	            footer: {
	                backgroundColor: Colors.grey800,
	                textAlign: 'center',
	                position: 'fixed',
	                left: '0px',
	                right: '0px',
	                bottom: '0px',
	                height: '120px',
	                zIndex: '-10'
	            },
	            userIcon: {
	                color: 'rgba(255, 255, 255, 0.90)'
	            },
	            a: {
	                color: Colors.red
	            },
	            p: {
	                margin: '0 auto',
	                padding: '0',
	                color: Colors.lightWhite
	            },
	            rightMenuButton: {
	                display: 'flex',
	                alignItems: 'center',
	                justifyContent: 'center',
	                backgroundColor: Colors.transparent,
	                color: Typography.textFullWhite,
	                margin: 0,
	                paddingTop: 6
	            },
	            topMenu: {
	                backgroundColor: Colors.green300,
	                position: 'fixed',
	                top: '0px',
	                left: '0px',
	                right: '0px',
	                height: '64px'
	            },
	            subheaderMenuItem: {
	                backgroundColor: Colors.green300
	            }
	        };
	    },
	    showSideBar: function showSideBar(e) {
	        this.refs.leftNav.toggle();
	    }
	});

	module.exports = Main;

/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var _require = __webpack_require__(269);

	var ClearFix = _require.ClearFix;
	var Mixins = _require.Mixins;
	var Styles = _require.Styles;
	var StylePropable = Mixins.StylePropable;
	var StyleResizable = Mixins.StyleResizable;

	var DesktopGutter = Styles.Spacing.desktopGutter;

	var FullWidthSection = React.createClass({
	    displayName: 'FullWidthSection',

	    mixins: [StylePropable, StyleResizable],

	    propTypes: {
	        'useContent': React.PropTypes.bool,
	        'contentType': React.PropTypes.string,
	        'contentStyle': React.PropTypes.object
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            useContent: false,
	            contentType: 'div'
	        };
	    },

	    getStyles: function getStyles() {
	        return {
	            root: {
	                padding: DesktopGutter + 'px',
	                boxSizing: 'border-box'
	            },
	            content: {
	                maxWidth: '1200px',
	                margin: '0 auto'
	            },
	            rootWhenSmall: {
	                paddingTop: DesktopGutter * 2 + 'px',
	                paddingBottom: DesktopGutter * 2 + 'px'
	            },
	            rootWhenLarge: {
	                paddingTop: DesktopGutter * 3 + 'px',
	                paddingBottom: DesktopGutter * 3 + 'px'
	            }
	        };
	    },

	    render: function render() {
	        var styles = this.getStyles();
	        var _props = this.props;
	        var style = _props.style;
	        var useContent = _props.useContent;
	        var contentType = _props.contentType;
	        var contentStyle = _props.contentStyle;

	        var content;

	        if (useContent) {
	            content = React.createElement(contentType, { style: this.mergeAndPrefix(styles.content, contentStyle) }, this.props.children);
	        } else {
	            content = this.props.children;
	        }

	        return React.createElement(
	            ClearFix,
	            { style: this.mergeAndPrefix(styles.root, style, this.isDeviceSize(StyleResizable.statics.Sizes.SMALL) && styles.rootWhenSmall, this.isDeviceSize(StyleResizable.statics.Sizes.LARGE) && styles.rootWhenLarge) },
	            content
	        );
	    }
	});

	module.exports = FullWidthSection;

/***/ },

/***/ 386:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var Router = __webpack_require__(160);
	var LeftNav = __webpack_require__(336);

	var MenuStore = __webpack_require__(387);
	var MenuActions = __webpack_require__(396);

	var Colors = __webpack_require__(234);
	var Typography = __webpack_require__(233);
	var Spacing = __webpack_require__(257);

	var history = __webpack_require__(211);

	var ThemeManager = __webpack_require__(258);

	var LeftNavMenu = React.createClass({
	    displayName: 'LeftNavMenu',

	    contextTypes: {
	        router: React.PropTypes.func,
	        muiTheme: React.PropTypes.object
	    },

	    componentWillMount: function componentWillMount() {
	        //this.context.muiTheme.setComponentThemes({
	        //    menuSubheader: {
	        //        textColor: Colors.green300
	        //    }
	        //});
	    },
	    getInitialState: function getInitialState() {
	        return {
	            menu: []
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        MenuStore.addChangeListener(this._onMenuChange);
	        MenuActions.getMenu();
	    },

	    _onMenuChange: function _onMenuChange() {
	        var newMenu = MenuStore.getDefaultMenu();
	        this.setState({
	            menu: newMenu
	        });
	    },

	    getStyles: function getStyles() {
	        return {
	            root: {
	                cursor: 'pointer',
	                fontSize: '24px',
	                color: Typography.textFullWhite,
	                lineHeight: Spacing.desktopKeylineIncrement + 'px',
	                fontWeight: Typography.fontWeightLight,
	                backgroundColor: Colors.green300,
	                paddingLeft: Spacing.desktopGutter,
	                paddingTop: '0px',
	                marginBottom: '0px'
	            },
	            leftNav: {
	                "SubheaderMenuItem backgroundColor": Colors.green400
	            }

	        };
	    },

	    render: function render() {
	        var style = this.getStyles();
	        var header = React.createElement(
	            'div',
	            { style: style.root, onTouchTap: this.onHeaderClick },
	            'Nicholas Azar'
	        );

	        return React.createElement(LeftNav, {
	            ref: 'leftNav',
	            style: style.leftNav,
	            docked: false,
	            isInitiallyOpen: false,
	            header: header,
	            menuItems: this.state.menu,
	            selectedIndex: this.getSelectedIndex(),
	            onChange: this.onLeftNavChange });
	    },

	    toggle: function toggle() {
	        this.refs.leftNav.toggle();
	    },

	    getSelectedIndex: function getSelectedIndex() {
	        var currentItem;
	        for (var i = this.state.menu.length - 1; i >= 0; i--) {
	            currentItem = this.state.menu[i];
	            if (currentItem.route) return i;
	        }
	    },

	    onLeftNavChange: function onLeftNavChange(e, key, payload) {
	        history.replaceState(null, payload.route);
	    },

	    onHeaderClick: function onHeaderClick() {
	        history.replaceState(null, '/');
	        this.refs.leftNav.close();
	    }
	});
	module.exports = LeftNavMenu;

/***/ },

/***/ 387:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(388);
	var EventEmitter = __webpack_require__(392).EventEmitter;
	var AppConstants = __webpack_require__(393);
	var _ = __webpack_require__(395);

	var _require = __webpack_require__(269);

	var MenuItem = _require.MenuItem;

	var _menu = [];

	var MenuStore = _.extend({}, EventEmitter.prototype, {
	    getMenu: function getMenu() {
	        return _menu;
	    },

	    getDefaultMenu: function getDefaultMenu() {
	        return [{ type: MenuItem.Types.SUBHEADER, text: 'Menu' }, { route: 'blogs', text: 'Blog' }, { route: 'contactMe', text: 'Contact Me' }, { type: MenuItem.Types.SUBHEADER, text: 'External' }, {
	            type: MenuItem.Types.LINK,
	            payload: 'https://github.com/NicholasAzar',
	            text: 'GitHub'
	        }, {
	            type: MenuItem.Types.LINK,
	            payload: 'https://github.com/NicholasAzar',
	            text: 'LinkedIn'
	        }, {
	            type: MenuItem.Types.LINK,
	            payload: 'https://github.com/NicholasAzar',
	            text: 'Facebook'
	        }, {
	            type: MenuItem.Types.LINK,
	            payload: 'https://github.com/NicholasAzar',
	            text: 'Twitter'
	        }];
	    },

	    emitChange: function emitChange() {
	        this.emit(AppConstants.ChangeEvents.MENU_CHANGE_EVENT);
	    },

	    addChangeListener: function addChangeListener(callback) {
	        this.on(AppConstants.ChangeEvents.MENU_CHANGE_EVENT, callback);
	    },

	    removeChangeListener: function removeChangeListener(callback) {
	        this.removeListener(AppConstants.ChangeEvents.MENU_CHANGE_EVENT, callback);
	    }

	});

	AppDispatcher.register(function (payload) {
	    var action = payload.action;
	    if (action == null) return;
	    switch (action.type) {
	        case AppConstants.ActionTypes.MENU_RESPONSE:
	            if (action.json != null) {
	                _menu = action.json.out_Own;
	            }
	            MenuStore.emitChange();
	            break;
	        default:
	            return true;
	    }
	    return true;
	});

	module.exports = MenuStore;

/***/ },

/***/ 388:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Dispatcher = __webpack_require__(389).Dispatcher;
	var assign = __webpack_require__(40);

	var AppDispatcher = assign(new Dispatcher(), {
	    handleAction: function handleAction(action) {
	        this.dispatch({
	            source: 'APP_ACTION', // not sure why this exists... flux documentation suggests a single dispatcher per application.
	            action: action
	        });
	    }
	});

	module.exports = AppDispatcher;

/***/ },

/***/ 393:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2015 Network New Technologies Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	'use strict';

	var keyMirror = __webpack_require__(394);

	var host = "example";

	module.exports = {
	    APIRoot: '/api/rs',
	    ClientId: 'example@Browser',
	    host: host,

	    ChangeEvents: {
	        ROUTE_CHANGE_EVENT: 'routeChange',
	        BLOG_CHANGE_EVENT: 'blogChange',
	        MENU_CHANGE_EVENT: 'menuChange'
	    },

	    ActionTypes: keyMirror({
	        // Routes
	        REDIRECT: null,
	        SIGNUP_REQUEST: null,
	        SIGNUP_RESPONSE: null,
	        INIT: null,
	        LOGIN_REQUEST: null,
	        LOGIN_RESPONSE: null,
	        LOGOUT: null,
	        REFRESH: null,
	        MENU_RESPONSE: null,
	        BLOGS_RESPONSE: null,
	        BLOG_POSTS_RESPONSE: null,
	        BLOG_POST_RESPONSE: null,

	        // Commerce
	        RECEIVE_CATALOG: null,
	        RECEIVE_PRODUCTS: null,
	        ADD_PRODUCT_TO_CART: null,
	        SET_PRODUCT_VARIANT: null, // set product variation
	        SET_QTY: null,
	        REMOVE_CART_ITEM: null,
	        SET_PRODUCT_INVENTORY: null,
	        REMOVE_ONE_FROM_INVENTORY: null,
	        TOGGLE_CART: null, // Open/close cart
	        LOAD_CATALOG: null,
	        SELECT_CATALOG: null,
	        LOAD_PRODUCTS: null
	    }),

	    APIEndpoints: {
	        SIGNIN: {
	            category: 'user',
	            name: 'signInUser',
	            readOnly: false
	        },
	        REGISTRATION: {},
	        GETMENU: {
	            category: 'menu',
	            name: 'getMenu',
	            readOnly: true,
	            data: {
	                host: host
	            }
	        }
	    },

	    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

	};

/***/ },

/***/ 394:
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */

	"use strict";

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  if (!(obj instanceof Object && !Array.isArray(obj))) {
	    throw new Error('keyMirror(...): Argument must be an object.');
	  }
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;


/***/ },

/***/ 396:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by steve on 08/07/15.
	 */
	'use strict';

	var AppDispatcher = __webpack_require__(388);
	var AppConstants = __webpack_require__(393);
	var $ = __webpack_require__(397);

	var ActionTypes = AppConstants.ActionTypes;

	module.exports = {

	    getMenu: function getMenu() {
	        $.ajax({
	            type: 'POST',
	            url: 'http://example:8080/api/rs',
	            data: JSON.stringify({
	                category: 'menu',
	                name: 'getMenu',
	                readOnly: true,
	                "data": {
	                    host: AppConstants.host
	                }
	            }),
	            contentType: 'application/json',
	            dataType: 'json',
	            error: function error(jqXHR, status, _error) {
	                console.log('MenuActions.getMenu error', _error);
	                var errorText = jqXHR.responseText;
	                AppDispatcher.handleAction({
	                    type: ActionTypes.MENU_RESPONSE,
	                    json: null,
	                    error: errorText
	                });
	            },
	            success: function success(result, status, xhr) {
	                console.log("MenuActions.getMenu success", result);
	                AppDispatcher.handleAction({
	                    type: ActionTypes.MENU_RESPONSE,
	                    json: result,
	                    error: null
	                });
	            }
	        });
	    }
	};

/***/ },

/***/ 398:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Colors = __webpack_require__(234);
	var Typography = __webpack_require__(233);
	var ColorManipulator = __webpack_require__(256);
	var Spacing = __webpack_require__(257);

	module.exports = {
	  spacing: Spacing,
	  fontFamily: 'Roboto, sans-serif',
	  palette: {
	    primary1Color: Colors.green500,
	    primary2Color: Colors.green700,
	    primary3Color: Colors.lightBlack,
	    accent1Color: Colors.pinkA200,
	    accent2Color: Colors.grey100,
	    accent3Color: Colors.grey500,
	    textColor: Colors.darkBlack,
	    alternateTextColor: Colors.white,
	    canvasColor: Colors.white,
	    borderColor: Colors.grey300,
	    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
	    menuSubheader: {
	      textColor: Colors.green300
	    }
	  }
	};

/***/ },

/***/ 399:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var _require = __webpack_require__(269);

	var RaisedButton = _require.RaisedButton;
	var Styles = _require.Styles;

	var FullWidthSection = __webpack_require__(268);
	var Colors = Styles.Colors;
	var Spacing = Styles.Spacing;
	var Typography = Styles.Typography;

	var Home = React.createClass({
	    displayName: 'Home',

	    render: function render() {
	        var styles = this.getStyles();
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                FullWidthSection,
	                { style: styles.root },
	                React.createElement(
	                    'div',
	                    { style: styles.tagline },
	                    React.createElement(
	                        'h1',
	                        { style: styles.h1 },
	                        'Nicholas Azar\'s personal website'
	                    ),
	                    React.createElement(
	                        'h2',
	                        { style: styles.h2 },
	                        'A place to link to any of my work and provide an easy way to contact me.'
	                    )
	                )
	            ),
	            React.createElement(
	                FullWidthSection,
	                { style: styles.githubSection },
	                React.createElement(
	                    'h2',
	                    { style: styles.githubSectionh2 },
	                    'All the code for this site can be found on Github!'
	                ),
	                React.createElement(RaisedButton, { label: 'GitHub', primary: true, linkButton: true, href: 'https://github.com/NicholasAzar/nicholasazar' })
	            )
	        );
	    },
	    getStyles: function getStyles() {
	        return {
	            root: {
	                backgroundColor: Colors.green400,
	                overflow: 'hidden',
	                width: '100%'
	            },
	            tagline: {
	                margin: '16px auto 0 auto',
	                textAlign: 'center',
	                maxWidth: '575px'
	            },
	            h1: {
	                color: Colors.darkWhite,
	                fontWeight: Typography.fontWeightLight,
	                lineHeight: 1.5
	            },
	            h2: {
	                //.mui-font-style-title
	                fontSize: '20px',
	                lineHeight: '28px',
	                paddingTop: '19px',
	                marginBottom: '13px',
	                letterSpacing: '0',
	                color: Colors.darkWhite,
	                fontWeight: Typography.fontWeightLight
	            },
	            githubSection: {
	                backgroundColor: Colors.grey200,
	                textAlign: 'center'
	            },
	            githubSectionh2: {
	                color: Colors.grey900,
	                fontSize: '20px',
	                lineHeight: '28px',
	                paddingTop: '19px',
	                marginBottom: '13px',
	                letterSpacing: '0',
	                fontWeight: Typography.fontWeightLight
	            }
	        };
	    }
	});

	module.exports = Home;

/***/ },

/***/ 400:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var FullWidthSection = __webpack_require__(268);
	var BlogStore = __webpack_require__(401);
	var BlogAction = __webpack_require__(402);
	var BlogRow = __webpack_require__(404);

	var _require = __webpack_require__(269);

	var List = _require.List;
	var ListItem = _require.ListItem;
	var Paper = _require.Paper;
	var Styles = _require.Styles;

	var BlogStore = __webpack_require__(401);
	var BlogAction = __webpack_require__(402);
	var Colors = Styles.Colors;
	var Spacing = Styles.Spacing;
	var Typography = Styles.Typography;

	var Blogs = React.createClass({
	    displayName: 'Blogs',

	    getInitialState: function getInitialState() {
	        return {
	            blogs: []
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        BlogStore.addChangeListener(this._onChange);
	        BlogAction.getBlogs();
	    },

	    _onChange: function _onChange() {
	        this.setState({
	            blogs: BlogStore.getBlogs()
	        });
	    },

	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'blogs' },
	            React.createElement(
	                'div',
	                { className: 'blogHeader' },
	                React.createElement(
	                    'h2',
	                    { className: 'mainBlogHeader' },
	                    'Blogs'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'blogsSection' },
	                React.createElement(
	                    'div',
	                    { className: 'blogsDescription' },
	                    React.createElement(
	                        'h1',
	                        null,
	                        'These are the blogs.'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        'Splitting up and categorizing blogs helps you to only see the post you want! Select any blog from the selection to check out the posts.',
	                        React.createElement('br', null)
	                    )
	                ),
	                React.createElement(
	                    Paper,
	                    { className: 'blogsList' },
	                    React.createElement(
	                        List,
	                        null,
	                        this.state.blogs.map(function (blog, index) {
	                            return React.createElement(BlogRow, { key: index, blog: blog });
	                        })
	                    )
	                )
	            )
	        );
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        BlogStore.removeChangeListener(this._onChange);
	    }

	});

	module.exports = Blogs;

/***/ },

/***/ 401:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(388);
	var EventEmitter = __webpack_require__(392).EventEmitter;
	var AppConstants = __webpack_require__(393);
	var BlogConstants = __webpack_require__(468);
	var _ = __webpack_require__(395);

	var _blogs = [];
	var _currentBlog = {};
	var _blogPosts = [];
	var _post = {};

	var BlogStore = _.extend({}, EventEmitter.prototype, {
	    getBlogs: function getBlogs() {
	        return _blogs;
	    },

	    getCurrentBlog: function getCurrentBlog() {
	        return _currentBlog;
	    },

	    getBlogPosts: function getBlogPosts() {
	        return _blogPosts;
	    },

	    getPost: function getPost() {
	        return _post;
	    },

	    emitChange: function emitChange() {
	        this.emit(AppConstants.ChangeEvents.BLOG_CHANGE_EVENT);
	    },

	    addChangeListener: function addChangeListener(callback) {
	        this.on(AppConstants.ChangeEvents.BLOG_CHANGE_EVENT, callback);
	    },

	    removeChangeListener: function removeChangeListener(callback) {
	        this.removeListener(AppConstants.ChangeEvents.BLOG_CHANGE_EVENT, callback);
	    }

	});

	AppDispatcher.register(function (payload) {
	    console.log("BlogStore payload:", payload);
	    var data = payload.action;
	    if (data == null) return;
	    if (data.type === AppConstants.ActionTypes.BLOGS_RESPONSE) {
	        console.log("BlogStore received BLOGS:", data.json);
	        _blogs = data.json;
	        BlogStore.emitChange();
	    } else if (data.type === AppConstants.ActionTypes.BLOG_POSTS_RESPONSE) {
	        console.log("BlogStore received BLOG_POSTS:", data.json);
	        _blogPosts = data.json;
	        BlogStore.emitChange();
	    } else if (data.type === AppConstants.ActionTypes.BLOG_POST_RESPONSE) {
	        console.log("BlogStore received BLOG_POST:", data.json);
	        _post = data.json;
	        BlogStore.emitChange();
	    } else if (data.type === BlogConstants.ActionTypes.SET_CURRENT_BLOG) {
	        // When opening a blog, set this.
	        console.log("BlogStore receive SET_CURRENT_BLOG:", data.json);
	        _currentBlog = data.json;
	        BlogStore.emitChange();
	    }
	    return true;
	});

	module.exports = BlogStore;

/***/ },

/***/ 402:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(388);
	var AppConstants = __webpack_require__(393);
	var BlogConstants = __webpack_require__(468);
	var MockBlogData = __webpack_require__(403);
	var $ = __webpack_require__(397);

	var BlogActions = {

	    getBlogs: function getBlogs() {
	        $.ajax({
	            type: 'POST',
	            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	            dataType: 'json',
	            url: '/app/components/blog/Blogs.php',
	            error: function error(jqXHR, status, _error) {
	                console.log('BlogActions.getBlogs - Error received, using mock data.', _error);
	                //setTimeout(this.getBlogs, 10000); // try again every 10 seconds
	            },
	            success: function success(result, status, xhr) {
	                AppDispatcher.handleAction({
	                    type: AppConstants.ActionTypes.BLOGS_RESPONSE,
	                    json: result,
	                    error: null
	                });
	            }
	        });
	    },

	    setCurrentBlog: function setCurrentBlog(blog) {
	        console.log("BlogActions setCurrentBlog", blog);
	        AppDispatcher.handleAction({
	            type: BlogConstants.ActionTypes.SET_CURRENT_BLOG,
	            json: blog,
	            error: null
	        });
	    },

	    getBlogPosts: function getBlogPosts(blogPermaLink) {
	        $.ajax({
	            type: 'POST',
	            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	            url: '/app/components/blog/BlogPosts.php',
	            dataType: 'json',
	            data: {
	                blogPermaLink: blogPermaLink
	            },
	            error: function error(jqXHR, status, _error2) {
	                console.log('BlogActions.getBlogPosts - Error received, using mock data.', status, _error2);
	                //setTimeout(this.getBlogPosts, 10000); // try again every 10 seconds
	            },
	            success: function success(result, status, xhr) {
	                console.log('BlogActions.getBlogPosts - Success received.', result);
	                AppDispatcher.handleAction({
	                    type: AppConstants.ActionTypes.BLOG_POSTS_RESPONSE,
	                    json: result,
	                    error: null
	                });
	            }
	        });
	    },

	    getPost: function getPost(rid) {
	        $.ajax({
	            type: 'POST',
	            url: 'http://example:8080/api/rs',
	            data: JSON.stringify({
	                category: 'blog',
	                name: 'getPost',
	                readOnly: true,
	                "data": {
	                    host: AppConstants.host,
	                    "@rid": rid
	                }
	            }),
	            contentType: 'application/json',
	            dataType: 'json',
	            error: function error(jqXHR, status, _error3) {
	                console.log('BlogActions.getBlogPosts - Error received, using mock data.', _error3);
	                AppDispatcher.handleAction({
	                    type: AppConstants.ActionTypes.BLOG_POST_RESPONSE,
	                    json: MockBlogData.getPost(),
	                    error: null
	                });
	            },
	            success: function success(result, status, xhr) {
	                AppDispatcher.handleAction({
	                    type: AppConstants.ActionTypes.BLOG_POST_RESPONSE,
	                    json: result,
	                    error: null
	                });
	            }
	        });
	    }

	};

	module.exports = BlogActions;

/***/ },

/***/ 403:
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    getBlogs: function getBlogs() {
	        return [{
	            "@rid": "#33:12",
	            "host": "example",
	            "description": "New and improved??",
	            "blogId": "The new blog ID",
	            "createDate": "2015-05-22T00:22:37.607",
	            "$$hashKey": "object:241"
	        }, {
	            "@rid": "#33:1",
	            "host": "example",
	            "description": "sdgasdgag",
	            "blogId": "asdga",
	            "createDate": "2015-05-02T12:52:20.121",
	            "out_HasPost": ["#36:9", "#36:10", "#36:11"],
	            "out_Own": [{
	                "@rid": "#33:8",
	                "host": "example",
	                "description": "fgjdfgjdj",
	                "blogId": "hdfgjd",
	                "createDate": "2015-05-02T15:57:28.789",
	                "in_Own": ["#33:1"],
	                "out_Own": [{
	                    "@rid": "#33:9",
	                    "host": "example",
	                    "description": "dfhsdfhsdf",
	                    "blogId": "dgsdfhs",
	                    "createDate": "2015-05-02T19:15:53.034",
	                    "in_Own": ["#33:8"],
	                    "out_Own": [{
	                        "@rid": "#33:11",
	                        "host": "example",
	                        "description": "asdgasdg",
	                        "blogId": "sdfhsdfhs",
	                        "createDate": "2015-05-02T21:22:25.813",
	                        "in_Own": ["#33:9"]
	                    }]
	                }, {
	                    "@rid": "#33:10",
	                    "host": "example",
	                    "description": "dgasdgasdg",
	                    "blogId": "asdsdfhgasdg",
	                    "createDate": "2015-05-02T21:19:58.117",
	                    "in_Own": ["#33:8"]
	                }],
	                "blog": {
	                    "@rid": "#33:1",
	                    "host": "example",
	                    "description": "sdgasdgag",
	                    "blogId": "asdga",
	                    "createDate": "2015-05-02T12:52:20.121",
	                    "out_HasPost": ["#36:9", "#36:10", "#36:11"]
	                }
	            }],
	            "$$hashKey": "object:242"
	        }, {
	            "@rid": "#33:2",
	            "host": "example",
	            "description": "asdgasdg",
	            "blogId": "asdgasdg",
	            "createDate": "2015-05-02T12:52:23.067",
	            "$$hashKey": "object:243"
	        }, {
	            "@rid": "#33:3",
	            "host": "example",
	            "description": "sdgasdga",
	            "blogId": "asdgasdga",
	            "createDate": "2015-05-02T12:52:25.675",
	            "$$hashKey": "object:244"
	        }, {
	            "@rid": "#33:7",
	            "host": "example",
	            "description": "dfgjdfgjdj",
	            "blogId": "dfgjdfgjdfgj",
	            "createDate": "2015-05-02T12:52:43.251",
	            "$$hashKey": "object:245"
	        }, {
	            "@rid": "#33:5",
	            "host": "example",
	            "description": "jfdgdfjhdfgjh",
	            "blogId": "dfgjdsdfsdfh",
	            "createDate": "2015-05-02T12:52:36.714",
	            "$$hashKey": "object:246"
	        }];
	    },

	    getBlogPosts: function getBlogPosts() {
	        return [{
	            "createUserId": "stevehu",
	            "postId": "GT3ZmMIxTxiE8WzGudooQA",
	            "createRid": "#14:0",
	            "rid": "#36:11",
	            "title": "TEst",
	            "content": "This is the post - Edited -5/21/2015",
	            "parentId": "asdga",
	            "createDate": "2015-05-02T14:20:13.512"
	        }, {
	            "createUserId": "stevehu",
	            "postId": "uGRKOudDR4e3EGwrNYi6cQ",
	            "createRid": "#14:0",
	            "rid": "#36:10",
	            "title": "jdfgjdfgjd",
	            "content": "fgjdfgj",
	            "parentId": "asdga",
	            "createDate": "2015-05-02T12:57:12.315"
	        }, {
	            "createUserId": "stevehu",
	            "postId": "FY4pUJ1CSzSURhihDlLg5g",
	            "createRid": "#14:0",
	            "rid": "#36:9",
	            "title": "sdfhsdfhsdf",
	            "content": "hsdfhsdfhsdf",
	            "parentId": "asdga",
	            "createDate": "2015-05-02T12:55:51.351"
	        }];
	    },
	    getPost: function getPost() {
	        return {
	            "createUserId": "stevehu",
	            "postId": "GT3ZmMIxTxiE8WzGudooQA",
	            "createRid": "#14:0",
	            "rid": "#36:11",
	            "title": "TEst",
	            "content": "This is the post - Edited -5/21/2015",
	            "parentId": "asdga",
	            "createDate": "2015-05-02T14:20:13.512"
	        };
	    },
	    init: function init() {
	        localStorage.clear();
	        localStorage.setItem('blogs', JSON.stringify([{
	            "@rid": "#33:12",
	            "host": "example",
	            "description": "New and improved??",
	            "blogId": "The new blog ID",
	            "createDate": "2015-05-22T00:22:37.607",
	            "$$hashKey": "object:241"
	        }, {
	            "@rid": "#33:1",
	            "host": "example",
	            "description": "sdgasdgag",
	            "blogId": "asdga",
	            "createDate": "2015-05-02T12:52:20.121",
	            "out_HasPost": ["#36:9", "#36:10", "#36:11"],
	            "out_Own": [{
	                "@rid": "#33:8",
	                "host": "example",
	                "description": "fgjdfgjdj",
	                "blogId": "hdfgjd",
	                "createDate": "2015-05-02T15:57:28.789",
	                "in_Own": ["#33:1"],
	                "out_Own": [{
	                    "@rid": "#33:9",
	                    "host": "example",
	                    "description": "dfhsdfhsdf",
	                    "blogId": "dgsdfhs",
	                    "createDate": "2015-05-02T19:15:53.034",
	                    "in_Own": ["#33:8"],
	                    "out_Own": [{
	                        "@rid": "#33:11",
	                        "host": "example",
	                        "description": "asdgasdg",
	                        "blogId": "sdfhsdfhs",
	                        "createDate": "2015-05-02T21:22:25.813",
	                        "in_Own": ["#33:9"]
	                    }]
	                }, {
	                    "@rid": "#33:10",
	                    "host": "example",
	                    "description": "dgasdgasdg",
	                    "blogId": "asdsdfhgasdg",
	                    "createDate": "2015-05-02T21:19:58.117",
	                    "in_Own": ["#33:8"]
	                }],
	                "blog": {
	                    "@rid": "#33:1",
	                    "host": "example",
	                    "description": "sdgasdgag",
	                    "blogId": "asdga",
	                    "createDate": "2015-05-02T12:52:20.121",
	                    "out_HasPost": ["#36:9", "#36:10", "#36:11"]
	                }
	            }],
	            "$$hashKey": "object:242"
	        }, {
	            "@rid": "#33:2",
	            "host": "example",
	            "description": "asdgasdg",
	            "blogId": "asdgasdg",
	            "createDate": "2015-05-02T12:52:23.067",
	            "$$hashKey": "object:243"
	        }, {
	            "@rid": "#33:3",
	            "host": "example",
	            "description": "sdgasdga",
	            "blogId": "asdgasdga",
	            "createDate": "2015-05-02T12:52:25.675",
	            "$$hashKey": "object:244"
	        }, {
	            "@rid": "#33:7",
	            "host": "example",
	            "description": "dfgjdfgjdj",
	            "blogId": "dfgjdfgjdfgj",
	            "createDate": "2015-05-02T12:52:43.251",
	            "$$hashKey": "object:245"
	        }, {
	            "@rid": "#33:5",
	            "host": "example",
	            "description": "jfdgdfjhdfgjh",
	            "blogId": "dfgjdsdfsdfh",
	            "createDate": "2015-05-02T12:52:36.714",
	            "$$hashKey": "object:246"
	        }]));
	        localStorage.setItem('blogPosts', JSON.stringify([{
	            "createUserId": "stevehu",
	            "postId": "GT3ZmMIxTxiE8WzGudooQA",
	            "createRid": "#14:0",
	            "rid": "#36:11",
	            "title": "TEst",
	            "content": "This is the post - Edited -5/21/2015",
	            "parentId": "asdga",
	            "createDate": "2015-05-02T14:20:13.512"
	        }, {
	            "createUserId": "stevehu",
	            "postId": "uGRKOudDR4e3EGwrNYi6cQ",
	            "createRid": "#14:0",
	            "rid": "#36:10",
	            "title": "jdfgjdfgjd",
	            "content": "fgjdfgj",
	            "parentId": "asdga",
	            "createDate": "2015-05-02T12:57:12.315"
	        }, {
	            "createUserId": "stevehu",
	            "postId": "FY4pUJ1CSzSURhihDlLg5g",
	            "createRid": "#14:0",
	            "rid": "#36:9",
	            "title": "sdfhsdfhsdf",
	            "content": "hsdfhsdfhsdf",
	            "parentId": "asdga",
	            "createDate": "2015-05-02T12:55:51.351"
	        }]));
	        return JSON.parse(localStorage.getItem('blogs'));
	    }
	};

/***/ },

/***/ 404:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var _require = __webpack_require__(269);

	var ListItem = _require.ListItem;
	var Styles = _require.Styles;
	var Avatar = _require.Avatar;

	var BlogActions = __webpack_require__(402);
	var Colors = Styles.Colors;
	var Spacing = Styles.Spacing;
	var Typography = Styles.Typography;

	var history = __webpack_require__(211);

	var BlogRow = React.createClass({
	    displayName: 'BlogRow',

	    render: function render() {
	        return this._createItems(this.props.blog);
	    },

	    _onTouchTap: function _onTouchTap(permaLink) {
	        BlogActions.setCurrentBlog(this.props.blog);
	        history.replaceState(null, '/blogs/' + permaLink);
	    },

	    _createItems: function _createItems(blogs) {
	        var children;
	        if (blogs.out_Own) {
	            children = blogs.out_Own.map((function (child) {
	                return this._createItems(child); // on dat recursive level sheeee
	            }).bind(this));
	        }
	        return React.createElement(
	            ListItem,
	            {
	                key: blogs.BLOG_ID,
	                value: blogs.BLOG_PERMA_LINK,
	                leftAvatar: this._getLeftAvatar(blogs),
	                primaryText: blogs.BLOG_TITLE,
	                secondaryText: blogs.BLOG_DESCRIPTION,
	                onTouchTap: this._onTouchTap.bind(this, blogs.BLOG_PERMA_LINK) },
	            children
	        );
	    },

	    _getLeftAvatar: function _getLeftAvatar(blogs) {
	        var count = "0";
	        if (blogs.out_HasPost != null && blogs.out_HasPost.length > 0) {
	            count = blogs.out_HasPost.length.toString();
	        }
	        return React.createElement(
	            'div',
	            { className: 'blogLeftAvatar' },
	            count
	        );
	    }
	});

	module.exports = BlogRow;

/***/ },

/***/ 405:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var _require = __webpack_require__(160);

	var Link = _require.Link;

	var FullWidthSection = __webpack_require__(268);
	var BlogStore = __webpack_require__(401);
	var BlogActions = __webpack_require__(402);

	var _require2 = __webpack_require__(269);

	var List = _require2.List;
	var ListItem = _require2.ListItem;
	var Paper = _require2.Paper;
	var RaisedButton = _require2.RaisedButton;

	var AppConstants = __webpack_require__(393);

	var history = __webpack_require__(211);

	var Blog = React.createClass({
	    displayName: 'Blog',

	    componentDidMount: function componentDidMount() {
	        BlogStore.addChangeListener(this._receiveBlogPosts);
	        BlogActions.getBlogPosts(this.props.params.blogPermaLink);
	    },

	    getInitialState: function getInitialState() {
	        return {
	            blogPosts: []
	        };
	    },

	    _receiveBlogPosts: function _receiveBlogPosts() {
	        this.setState({
	            blogPosts: BlogStore.getBlogPosts()
	        });
	    },
	    _routeToPost: function _routeToPost(BLOG_POST_PERMA_LINK) {
	        history.replaceState(null, '/blogs/' + BlogStore.getCurrentBlog().BLOG_PERMA_LINK + '/' + BLOG_POST_PERMA_LINK);
	    },

	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'blogHeader' },
	                React.createElement(
	                    'h2',
	                    { className: 'mainBlogHeader' },
	                    'Blogs'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'blogRoot' },
	                React.createElement(
	                    'div',
	                    { className: 'blogPostsRoot' },
	                    React.createElement(
	                        'div',
	                        { className: 'blogPostsleftColumn' },
	                        this.state.blogPosts.map(function (post) {
	                            var dateArray = post.CREATE_DTTM.split(/[- :]/);
	                            var date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);

	                            var boundClick = this._routeToPost.bind(this, post.BLOG_POST_PERMA_LINK);
	                            return React.createElement(
	                                'span',
	                                null,
	                                React.createElement(
	                                    Paper,
	                                    { className: 'blogPostsPaper' },
	                                    React.createElement(
	                                        'div',
	                                        { className: 'blogPost' },
	                                        React.createElement(
	                                            'h2',
	                                            null,
	                                            React.createElement(
	                                                'strong',
	                                                { className: 'strongDate' },
	                                                AppConstants.monthNames[date.getMonth()],
	                                                ' ',
	                                                date.getDate(),
	                                                ','
	                                            ),
	                                            ' ',
	                                            React.createElement(
	                                                'span',
	                                                { className: 'year' },
	                                                date.getFullYear()
	                                            )
	                                        ),
	                                        React.createElement(
	                                            'h1',
	                                            { className: 'title' },
	                                            React.createElement(
	                                                'a',
	                                                { onClick: boundClick },
	                                                post.BLOG_POST_TITLE
	                                            )
	                                        ),
	                                        React.createElement(
	                                            'p',
	                                            { className: 'content' },
	                                            post.BLOG_POST_DESCRIPTION
	                                        )
	                                    )
	                                ),
	                                React.createElement('hr', null)
	                            );
	                        }, this)
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'blogPostsRightColumn' },
	                        React.createElement(
	                            'div',
	                            { className: 'blogInfo' },
	                            React.createElement(
	                                'h1',
	                                null,
	                                'Blog Information'
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                BlogStore.getCurrentBlog().BLOG_INFORMATION
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    Link,
	                    { to: '/blogs' },
	                    React.createElement(RaisedButton, { label: 'Back' })
	                )
	            )
	        );
	    }
	});

	module.exports = Blog;

/***/ },

/***/ 406:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var FullWidthSection = __webpack_require__(268);
	var BlogStore = __webpack_require__(401);
	var BlogAction = __webpack_require__(402);

	var _require = __webpack_require__(269);

	var Paper = _require.Paper;

	var AppConstants = __webpack_require__(393);

	var BlogPostView = React.createClass({
	    displayName: 'BlogPostView',

	    getInitialState: function getInitialState() {
	        return {
	            post: {}
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        BlogStore.addChangeListener(this._receivePost);
	        BlogAction.getPost("#" + this.props.params.postRid);
	    },

	    _receivePost: function _receivePost() {
	        this.setState({
	            post: BlogStore.getPost()
	        });
	    },

	    render: function render() {
	        var date = new Date(this.state.post.createDate);
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'blogHeader' },
	                React.createElement(
	                    'h2',
	                    { className: 'mainBlogHeader' },
	                    'NetworkNt Blogs'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'blogPostRoot' },
	                React.createElement(
	                    Paper,
	                    { className: 'blogPostPaper' },
	                    React.createElement(
	                        'div',
	                        { className: 'title' },
	                        this.state.post.title
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'date' },
	                        AppConstants.monthNames[date.getMonth()],
	                        ' ',
	                        date.getDay(),
	                        ', ',
	                        date.getFullYear()
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'content' },
	                        this.state.post.content
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'aboutTheAuthor' },
	                    React.createElement(
	                        'h1',
	                        null,
	                        'This post was brought to you by ',
	                        React.createElement(
	                            'span',
	                            { className: 'author' },
	                            this.state.post.createUserId
	                        )
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '(Info about the author): Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aspernatur dignissimos dolorem, eos, eum iste iusto molestiae mollitia non quidem, quis quisquam sed sint vitae? Error hic necessitatibus nostrum!'
	                    )
	                )
	            )
	        );
	    }

	});

	module.exports = BlogPostView;

/***/ },

/***/ 407:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 408:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function injectTapEventPlugin () {
	  __webpack_require__(32).injection.injectEventPluginsByName({
	    "TapEventPlugin":       __webpack_require__(409)
	  });
	};


/***/ },

/***/ 409:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule TapEventPlugin
	 * @typechecks static-only
	 */

	"use strict";

	var EventConstants = __webpack_require__(31);
	var EventPluginUtils = __webpack_require__(34);
	var EventPropagators = __webpack_require__(74);
	var SyntheticUIEvent = __webpack_require__(88);
	var TouchEventUtils = __webpack_require__(410);
	var ViewportMetrics = __webpack_require__(39);

	var keyOf = __webpack_require__(411);
	var topLevelTypes = EventConstants.topLevelTypes;

	var isStartish = EventPluginUtils.isStartish;
	var isEndish = EventPluginUtils.isEndish;

	var isTouch = function(topLevelType) {
	  var touchTypes = [
	    topLevelTypes.topTouchCancel,
	    topLevelTypes.topTouchEnd,
	    topLevelTypes.topTouchStart,
	    topLevelTypes.topTouchMove
	  ];
	  return touchTypes.indexOf(topLevelType) >= 0;
	}

	/**
	 * Number of pixels that are tolerated in between a `touchStart` and `touchEnd`
	 * in order to still be considered a 'tap' event.
	 */
	var tapMoveThreshold = 10;
	var ignoreMouseThreshold = 750;
	var startCoords = {x: null, y: null};
	var lastTouchEvent = null;

	var Axis = {
	  x: {page: 'pageX', client: 'clientX', envScroll: 'currentPageScrollLeft'},
	  y: {page: 'pageY', client: 'clientY', envScroll: 'currentPageScrollTop'}
	};

	function getAxisCoordOfEvent(axis, nativeEvent) {
	  var singleTouch = TouchEventUtils.extractSingleTouch(nativeEvent);
	  if (singleTouch) {
	    return singleTouch[axis.page];
	  }
	  return axis.page in nativeEvent ?
	    nativeEvent[axis.page] :
	    nativeEvent[axis.client] + ViewportMetrics[axis.envScroll];
	}

	function getDistance(coords, nativeEvent) {
	  var pageX = getAxisCoordOfEvent(Axis.x, nativeEvent);
	  var pageY = getAxisCoordOfEvent(Axis.y, nativeEvent);
	  return Math.pow(
	    Math.pow(pageX - coords.x, 2) + Math.pow(pageY - coords.y, 2),
	    0.5
	  );
	}

	var touchEvents = [
	  topLevelTypes.topTouchStart,
	  topLevelTypes.topTouchCancel,
	  topLevelTypes.topTouchEnd,
	  topLevelTypes.topTouchMove,
	];

	var dependencies = [
	  topLevelTypes.topMouseDown,
	  topLevelTypes.topMouseMove,
	  topLevelTypes.topMouseUp,
	].concat(touchEvents);

	var eventTypes = {
	  touchTap: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchTap: null}),
	      captured: keyOf({onTouchTapCapture: null})
	    },
	    dependencies: dependencies
	  }
	};

	var now = (function() {
	  if (Date.now) {
	    return Date.now;
	  } else {
	    // IE8 support: http://stackoverflow.com/questions/9430357/please-explain-why-and-how-new-date-works-as-workaround-for-date-now-in
	    return function () {
	      return +new Date;
	    }
	  }
	})();

	var TapEventPlugin = {

	  tapMoveThreshold: tapMoveThreshold,

	  ignoreMouseThreshold: ignoreMouseThreshold,

	  eventTypes: eventTypes,

	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent,
	      nativeEventTarget) {

	    if (isTouch(topLevelType)) {
	      lastTouchEvent = now();
	    } else {
	      if (lastTouchEvent && (now() - lastTouchEvent) < ignoreMouseThreshold) {
	        return null;
	      }
	    }

	    if (!isStartish(topLevelType) && !isEndish(topLevelType)) {
	      return null;
	    }
	    var event = null;
	    var distance = getDistance(startCoords, nativeEvent);
	    if (isEndish(topLevelType) && distance < tapMoveThreshold) {
	      event = SyntheticUIEvent.getPooled(
	        eventTypes.touchTap,
	        topLevelTargetID,
	        nativeEvent,
	        nativeEventTarget
	      );
	    }
	    if (isStartish(topLevelType)) {
	      startCoords.x = getAxisCoordOfEvent(Axis.x, nativeEvent);
	      startCoords.y = getAxisCoordOfEvent(Axis.y, nativeEvent);
	    } else if (isEndish(topLevelType)) {
	      startCoords.x = 0;
	      startCoords.y = 0;
	    }
	    EventPropagators.accumulateTwoPhaseDispatches(event);
	    return event;
	  }

	};

	module.exports = TapEventPlugin;


/***/ },

/***/ 410:
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule TouchEventUtils
	 */

	var TouchEventUtils = {
	  /**
	   * Utility function for common case of extracting out the primary touch from a
	   * touch event.
	   * - `touchEnd` events usually do not have the `touches` property.
	   *   http://stackoverflow.com/questions/3666929/
	   *   mobile-sarai-touchend-event-not-firing-when-last-touch-is-removed
	   *
	   * @param {Event} nativeEvent Native event that may or may not be a touch.
	   * @return {TouchesObject?} an object with pageX and pageY or null.
	   */
	  extractSingleTouch: function(nativeEvent) {
	    var touches = nativeEvent.touches;
	    var changedTouches = nativeEvent.changedTouches;
	    var hasTouches = touches && touches.length > 0;
	    var hasChangedTouches = changedTouches && changedTouches.length > 0;

	    return !hasTouches && hasChangedTouches ? changedTouches[0] :
	           hasTouches ? touches[0] :
	           nativeEvent;
	  }
	};

	module.exports = TouchEventUtils;


/***/ },

/***/ 411:
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyOf
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	"use strict";

	var keyOf = function (oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};

	module.exports = keyOf;

/***/ },

/***/ 468:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keyMirror = __webpack_require__(394);

	module.exports = {

	  ActionTypes: keyMirror({
	    BLOG_ADD: null,
	    BLOG_REMOVE: null,
	    BLOG_UPDATE: null,
	    RECEIVE_BLOGS: null,
	    RECEIVE_BLOG_POSTS: null,
	    SET_CURRENT_BLOG: null
	  })
	};

/***/ }

});