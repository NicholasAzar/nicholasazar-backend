webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(160);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(161);

	var _componentsCommonHistory = __webpack_require__(212);

	var _componentsCommonHistory2 = _interopRequireDefault(_componentsCommonHistory);

	var Main = __webpack_require__(214);
	var Home = __webpack_require__(404);
	var Blogs = __webpack_require__(406);
	var Blog = __webpack_require__(411);
	var BlogPost = __webpack_require__(424);
	var Contact = __webpack_require__(426);
	__webpack_require__(429);
	window.React = _react2['default'];

	var injectTapEventPlugin = __webpack_require__(430);
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
			_react2['default'].createElement(_reactRouter.Route, { path: 'contact', component: Contact }),
			_react2['default'].createElement(_reactRouter.Route, { path: '*', component: Home })
		)
	), document.getElementById('content'));

/***/ },

/***/ 2:
/***/ function(module, exports) {

	"use strict";

	exports.default = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    default: obj
	  };
	};

	exports.__esModule = true;

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _historyLibCreateBrowserHistory = __webpack_require__(213);

	var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);

	exports['default'] = (0, _historyLibCreateBrowserHistory2['default'])();
	module.exports = exports['default'];

/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(166);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(167);

	var _ExecutionEnvironment = __webpack_require__(168);

	var _DOMUtils = __webpack_require__(169);

	var _DOMStateStorage = __webpack_require__(170);

	var _createDOMHistory = __webpack_require__(171);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);

	var AppBar = __webpack_require__(215);
	var ThemeManager = __webpack_require__(259);
	var IconButton = __webpack_require__(236);
	var LeftNavMenu = __webpack_require__(269);
	var Theme = __webpack_require__(403);
	var history = __webpack_require__(212);

	var Main = React.createClass({
	    displayName: 'Main',

	    childContextTypes: {
	        muiTheme: React.PropTypes.object
	    },
	    getChildContext: function getChildContext() {
	        return {
	            muiTheme: ThemeManager.getMuiTheme(Theme)
	        };
	    },

	    _userMenuTouched: function _userMenuTouched(e, value) {
	        history.replaceState(null, '/contact');
	    },

	    render: function render() {
	        var styles = this.getStyles();

	        var rightMenu = React.createElement(
	            'div',
	            null,
	            React.createElement(
	                IconButton,
	                { iconClassName: 'material-icons', iconStyle: { color: 'rgba(255, 255, 255, 0.90)' }, onClick: this._userMenuTouched },
	                'chat'
	            )
	        );

	        return React.createElement(
	            'div',
	            { className: 'mainRoot' },
	            React.createElement(AppBar, { title: 'Nicholas Azar', onLeftIconButtonTouchTap: this.showSideBar, iconElementRight: rightMenu, zDepth: 0, style: styles.topMenu }),
	            React.createElement(LeftNavMenu, { ref: 'leftNav' }),
	            React.createElement(
	                'div',
	                { className: 'contentRoot' },
	                this.props.children
	            ),
	            React.createElement(
	                'div',
	                { className: 'mainFooter' },
	                React.createElement(
	                    'p',
	                    { className: 'footerText' },
	                    'Copyright Nicholas Azar - 2015'
	                )
	            )
	        );
	    },
	    getStyles: function getStyles() {
	        return {
	            topMenu: {
	                position: 'fixed',
	                top: '0px',
	                left: '0px',
	                right: '0px',
	                height: '64px'
	            }
	        };
	    },
	    showSideBar: function showSideBar(e) {
	        this.refs.leftNav.toggle();
	    }
	});

	module.exports = Main;

/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var LeftNav = __webpack_require__(270);

	var MenuStore = __webpack_require__(288);
	var MenuActions = __webpack_require__(401);

	var history = __webpack_require__(212);

	var LeftNavMenu = React.createClass({
	    displayName: 'LeftNavMenu',

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
	            root: {}
	        };
	    },

	    render: function render() {
	        var header = React.createElement(
	            'div',
	            { className: 'leftNavRoot', onTouchTap: this.onHeaderClick },
	            'Nicholas Azar'
	        );

	        return React.createElement(LeftNav, {
	            ref: 'leftNav',
	            docked: false,
	            isInitiallyOpen: false,
	            header: header,
	            menuItems: this.state.menu,
	            onChange: this.onLeftNavChange });
	    },

	    toggle: function toggle() {
	        this.refs.leftNav.toggle();
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

/***/ 288:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(289);
	var EventEmitter = __webpack_require__(293).EventEmitter;
	var AppConstants = __webpack_require__(294);
	var _ = __webpack_require__(296);

	var _require = __webpack_require__(297);

	var MenuItem = _require.MenuItem;

	var _menu = [];

	var MenuStore = _.extend({}, EventEmitter.prototype, {
	    getMenu: function getMenu() {
	        return _menu;
	    },

	    getDefaultMenu: function getDefaultMenu() {
	        return [{ type: MenuItem.Types.SUBHEADER, text: 'Menu' }, { route: 'blogs', text: 'Blog' }, { route: 'contact', text: 'Contact Me' }, { type: MenuItem.Types.SUBHEADER, text: 'Find Me' }, {
	            type: MenuItem.Types.LINK,
	            payload: 'https://github.com/NicholasAzar',
	            text: 'GitHub'
	        }, {
	            type: MenuItem.Types.LINK,
	            payload: 'https://ca.linkedin.com/in/nicholas-azar-74532933',
	            text: 'LinkedIn'
	        }, {
	            type: MenuItem.Types.LINK,
	            payload: 'https://www.facebook.com/FDDoSD',
	            text: 'Facebook'
	        }, {
	            type: MenuItem.Types.LINK,
	            payload: 'https://twitter.com/NicholasAzar',
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

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Dispatcher = __webpack_require__(290).Dispatcher;
	var assign = __webpack_require__(41);

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

/***/ 294:
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

	var keyMirror = __webpack_require__(295);

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

/***/ 295:
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

/***/ 401:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by steve on 08/07/15.
	 */
	'use strict';

	var AppDispatcher = __webpack_require__(289);
	var AppConstants = __webpack_require__(294);
	var $ = __webpack_require__(402);

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
	                var errorText = jqXHR.responseText;
	                AppDispatcher.handleAction({
	                    type: ActionTypes.MENU_RESPONSE,
	                    json: null,
	                    error: errorText
	                });
	            },
	            success: function success(result, status, xhr) {
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

/***/ 403:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Colors = __webpack_require__(235);
	var Typography = __webpack_require__(234);
	var ColorManipulator = __webpack_require__(257);
	var Spacing = __webpack_require__(258);

	module.exports = {
		spacing: Spacing,
		fontFamily: 'Roboto, sans-serif',
		palette: {
			primary1Color: Colors.green300,
			primary2Color: Colors.green500,
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
				textColor: Colors.green500
			}
		}
	};

/***/ },

/***/ 404:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);

	var _require = __webpack_require__(297);

	var RaisedButton = _require.RaisedButton;
	var Styles = _require.Styles;

	var FullWidthSection = __webpack_require__(405);
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

/***/ 405:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);

	var _require = __webpack_require__(297);

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

/***/ 406:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var FullWidthSection = __webpack_require__(405);
	var BlogStore = __webpack_require__(407);
	var BlogAction = __webpack_require__(409);
	var BlogRow = __webpack_require__(410);

	var _require = __webpack_require__(297);

	var List = _require.List;
	var ListItem = _require.ListItem;
	var Paper = _require.Paper;
	var Styles = _require.Styles;

	var BlogStore = __webpack_require__(407);
	var BlogAction = __webpack_require__(409);
	var Colors = Styles.Colors;
	var Spacing = Styles.Spacing;
	var Typography = Styles.Typography;

	var BlogConstants = __webpack_require__(408);

	var Blogs = React.createClass({
	    displayName: 'Blogs',

	    getInitialState: function getInitialState() {
	        return {
	            blogs: []
	        };
	    },

	    componentWillMount: function componentWillMount() {
	        BlogStore.addChangeListener(this._onChange, BlogConstants.ActionTypes.GET_BLOGS);
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
	                { className: 'header' },
	                React.createElement(
	                    'h2',
	                    { className: 'headerContent' },
	                    BlogConstants.BLOG_HEADER
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

/***/ 407:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(289);
	var EventEmitter = __webpack_require__(293).EventEmitter;
	var AppConstants = __webpack_require__(294);
	var BlogConstants = __webpack_require__(408);
	var _ = __webpack_require__(296);

	var _blogs = [];
	var _currentBlog = {};
	var _currentPost = {};
	var _blogPosts = [];
	var _post = {};

	var BlogStore = _.extend({}, EventEmitter.prototype, {
	    getBlogs: function getBlogs() {
	        return _blogs;
	    },

	    getCurrentBlog: function getCurrentBlog() {
	        return _currentBlog;
	    },

	    getCurrentPost: function getCurrentPost() {
	        return _currentPost;
	    },

	    getBlogPosts: function getBlogPosts() {
	        return _blogPosts;
	    },

	    getPost: function getPost() {
	        return _post;
	    },

	    emitChange: function emitChange(event) {
	        this.emit(event);
	    },

	    addChangeListener: function addChangeListener(callback, event) {
	        this.on(event, callback);
	    },

	    removeChangeListener: function removeChangeListener(callback, event) {
	        this.removeListener(event, callback);
	    }

	});

	AppDispatcher.register(function (payload) {
	    console.log("BlogStore payload:", payload);
	    var data = payload.action;
	    if (data == null) return;
	    if (data.type === BlogConstants.ActionTypes.GET_BLOGS) {
	        console.log("BlogStore received GET_BLOGS:", data.json);
	        _blogs = data.json;
	        BlogStore.emitChange(BlogConstants.ActionTypes.GET_BLOGS);
	    } else if (data.type === BlogConstants.ActionTypes.GET_BLOG_POSTS) {
	        console.log("BlogStore received GET_BLOG_POSTS:", data.json);
	        _blogPosts = data.json;
	        BlogStore.emitChange(BlogConstants.ActionTypes.GET_BLOG_POSTS);
	    } else if (data.type === BlogConstants.ActionTypes.GET_CURRENT_POST) {
	        console.log("BlogStore received GET_CURRENT_POST:", data.json);
	        _post = data.json;
	        BlogStore.emitChange(BlogConstants.ActionTypes.GET_CURRENT_POST);
	    } else if (data.type === BlogConstants.ActionTypes.GET_CURRENT_BLOG) {
	        console.log("BlogStore received GET_CURRENT_BLOG:", data.json);
	        if (data.json && data.json.length > 0) {
	            _currentBlog = data.json[0];
	        }
	        BlogStore.emitChange(BlogConstants.ActionTypes.GET_CURRENT_BLOG);
	    } else if (data.type === BlogConstants.ActionTypes.SET_CURRENT_BLOG) {
	        // When opening a blog, set this.
	        console.log("BlogStore receive SET_CURRENT_BLOG:", data.json);
	        _currentBlog = data.json;
	        BlogStore.emitChange(BlogConstants.ActionTypes.SET_CURRENT_BLOG);
	    } else if (data.type === BlogConstants.ActionTypes.SET_CURRENT_POST) {
	        console.log("BlogStore receive SET_CURRENT_POST:", data.json);
	        _currentPost = data.json;
	        BlogStore.emitChange(BlogConstants.ActionTypes.SET_CURRENT_POST);
	    }
	    return true;
	});

	module.exports = BlogStore;

/***/ },

/***/ 408:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keyMirror = __webpack_require__(295);

	module.exports = {

		BLOG_HEADER: 'Blogs',

		ActionTypes: keyMirror({
			BLOG_ADD: null,
			BLOG_REMOVE: null,
			BLOG_UPDATE: null,
			GET_BLOGS: null,
			GET_BLOG_POSTS: null,
			SET_CURRENT_BLOG: null,
			SET_CURRENT_POST: null,
			GET_CURRENT_BLOG: null,
			GET_CURRENT_POST: null
		})
	};

/***/ },

/***/ 409:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(289);
	var AppConstants = __webpack_require__(294);
	var BlogConstants = __webpack_require__(408);
	var $ = __webpack_require__(402);

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
						type: BlogConstants.ActionTypes.GET_BLOGS,
						json: result,
						error: null
					});
				}
			});
		},

		getCurrentBlog: function getCurrentBlog(blogPermaLink) {
			$.ajax({
				type: 'POST',
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				dataType: 'json',
				url: '/app/components/blog/Blog.php',
				data: {
					blogPermaLink: blogPermaLink
				},
				error: function error(jqXHR, status, _error2) {},
				success: function success(result, status, xhr) {
					AppDispatcher.handleAction({
						type: BlogConstants.ActionTypes.GET_CURRENT_BLOG,
						json: result,
						error: null
					});
				}
			});
		},

		setCurrentBlog: function setCurrentBlog(blog) {
			AppDispatcher.handleAction({
				type: BlogConstants.ActionTypes.SET_CURRENT_BLOG,
				json: blog,
				error: null
			});
		},

		setCurrentBlogPost: function setCurrentBlogPost(post) {
			console.log("BlogActions setCurrentBlogPost", post);
			AppDispatcher.handleAction({
				type: BlogConstants.ActionTypes.SET_CURRENT_POST,
				json: post,
				error: null
			});
		},

		getCurrentBlogPost: function getCurrentBlogPost(blogPermaLink, postPermaLink) {
			$.ajax({
				type: 'POST',
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				dataType: 'json',
				url: '/app/components/blog/BlogPost.php',
				data: {
					blogPermaLink: blogPermaLink,
					postPermaLink: postPermaLink
				},
				error: function error(jqXHR, status, _error3) {},
				success: function success(result, status, xhr) {
					AppDispatcher.handleAction({
						type: BlogConstants.ActionTypes.GET_CURRENT_POST,
						json: result,
						error: null
					});
				}
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
				error: function error(jqXHR, status, _error4) {
					console.log('BlogActions.getBlogPosts - Error received, using mock data.', status, _error4);
					//setTimeout(this.getBlogPosts, 10000); // try again every 10 seconds
				},
				success: function success(result, status, xhr) {
					console.log('BlogActions.getBlogPosts - Success received.', result);
					AppDispatcher.handleAction({
						type: BlogConstants.ActionTypes.GET_BLOG_POSTS,
						json: result,
						error: null
					});
				}
			});
		}
	};

	module.exports = BlogActions;

/***/ },

/***/ 410:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);

	var _require = __webpack_require__(297);

	var ListItem = _require.ListItem;
	var Styles = _require.Styles;
	var Avatar = _require.Avatar;

	var BlogActions = __webpack_require__(409);
	var Colors = Styles.Colors;
	var Spacing = Styles.Spacing;
	var Typography = Styles.Typography;

	var history = __webpack_require__(212);

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
	                return this._createItems(child);
	            }).bind(this));
	        }
	        return React.createElement(
	            ListItem,
	            {
	                key: blogs.BLOG_ID,
	                value: blogs.BLOG_PERMA_LINK,
	                leftAvatar: this._getLeftAvatar(blogs.BLOG_POST_COUNT),
	                primaryText: blogs.BLOG_TITLE,
	                secondaryText: blogs.BLOG_DESCRIPTION,
	                onTouchTap: this._onTouchTap.bind(this, blogs.BLOG_PERMA_LINK) },
	            children
	        );
	    },

	    _getLeftAvatar: function _getLeftAvatar(count) {
	        return React.createElement(
	            'div',
	            { className: 'blogLeftAvatar' },
	            count
	        );
	    }
	});

	module.exports = BlogRow;

/***/ },

/***/ 411:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$keys = __webpack_require__(412)['default'];

	var React = __webpack_require__(3);

	var _require = __webpack_require__(161);

	var Link = _require.Link;

	var FullWidthSection = __webpack_require__(405);
	var BlogStore = __webpack_require__(407);
	var BlogActions = __webpack_require__(409);

	var _require2 = __webpack_require__(297);

	var List = _require2.List;
	var ListItem = _require2.ListItem;
	var Paper = _require2.Paper;
	var RaisedButton = _require2.RaisedButton;

	var AppConstants = __webpack_require__(294);
	var BlogConstants = __webpack_require__(408);
	var history = __webpack_require__(212);

	var Blog = React.createClass({
	    displayName: 'Blog',

	    componentDidMount: function componentDidMount() {
	        BlogStore.addChangeListener(this._receiveBlogPosts, BlogConstants.ActionTypes.GET_BLOG_POSTS);
	        BlogActions.getBlogPosts(this.props.params.blogPermaLink);
	        if (_Object$keys(BlogStore.getCurrentBlog()).length === 0) {
	            BlogStore.addChangeListener(this._receiveCurrentBlog, BlogConstants.ActionTypes.GET_CURRENT_BLOG);
	            BlogActions.getCurrentBlog(this.props.params.blogPermaLink);
	        } else {
	            this.setState({
	                currentBlog: BlogStore.getCurrentBlog()
	            });
	        }
	    },

	    getInitialState: function getInitialState() {
	        return {
	            blogPosts: [],
	            currentBlog: {}
	        };
	    },

	    _receiveBlogPosts: function _receiveBlogPosts() {
	        this.setState({
	            blogPosts: BlogStore.getBlogPosts()
	        });
	    },

	    _receiveCurrentBlog: function _receiveCurrentBlog() {
	        this.setState({
	            currentBlog: BlogStore.getCurrentBlog()
	        });
	    },

	    _routeToPost: function _routeToPost(post) {
	        BlogActions.setCurrentBlogPost(post);
	        history.replaceState(null, '/blogs/' + this.state.currentBlog.BLOG_PERMA_LINK + '/' + post.BLOG_POST_PERMA_LINK);
	    },

	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'header' },
	                React.createElement(
	                    'h2',
	                    { className: 'headerContent' },
	                    BlogConstants.BLOG_HEADER
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

	                            var boundClick = this._routeToPost.bind(this, post);
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
	                                this.state.currentBlog.BLOG_TITLE
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                this.state.currentBlog.BLOG_INFORMATION
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

/***/ 412:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(413), __esModule: true };

/***/ },

/***/ 413:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(414);
	module.exports = __webpack_require__(420).Object.keys;

/***/ },

/***/ 414:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(415);

	__webpack_require__(417)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },

/***/ 415:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(416);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },

/***/ 416:
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },

/***/ 417:
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(418)
	  , core    = __webpack_require__(420)
	  , fails   = __webpack_require__(423);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },

/***/ 418:
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(419)
	  , core      = __webpack_require__(420)
	  , ctx       = __webpack_require__(421)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },

/***/ 419:
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },

/***/ 420:
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },

/***/ 421:
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(422);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },

/***/ 422:
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },

/***/ 423:
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },

/***/ 424:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);

	var _require = __webpack_require__(161);

	var Link = _require.Link;

	var FullWidthSection = __webpack_require__(405);
	var BlogStore = __webpack_require__(407);
	var BlogActions = __webpack_require__(409);

	var _require2 = __webpack_require__(297);

	var Paper = _require2.Paper;
	var RaisedButton = _require2.RaisedButton;

	var AppConstants = __webpack_require__(294);
	var BlogConstants = __webpack_require__(408);
	var marked = __webpack_require__(425);

	var BlogPostView = React.createClass({
	    displayName: 'BlogPostView',

	    componentWillMount: function componentWillMount() {
	        console.log("this.props", this.props);

	        if (BlogStore.getCurrentPost()) {
	            BlogActions.getCurrentBlog(this.props.params.blogPermaLink);
	            BlogActions.getCurrentBlogPost(this.props.params.blogPermaLink, this.props.params.postPermaLink);
	        }

	        this.setState({
	            post: BlogStore.getCurrentPost()
	        });
	    },

	    render: function render() {
	        var dateArray = this.state.post.CREATE_DTTM.split(/[- :]/);
	        var date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'header' },
	                React.createElement(
	                    'h2',
	                    { className: 'headerContent' },
	                    BlogConstants.BLOG_HEADER
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
	                        this.state.post.BLOG_POST_TITLE
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'date' },
	                        AppConstants.monthNames[date.getMonth()],
	                        ' ',
	                        date.getDate(),
	                        ', ',
	                        date.getFullYear()
	                    ),
	                    React.createElement('div', { className: 'content', dangerouslySetInnerHTML: { __html: marked(this.state.post.BLOG_POST_CONTENT) } })
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
	                            'Nicholas Azar'
	                        )
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        'Just having fun.'
	                    )
	                ),
	                React.createElement(
	                    Link,
	                    { to: "/blogs/" + this.props.params.blogPermaLink },
	                    React.createElement(RaisedButton, { label: 'Back' })
	                )
	            )
	        );
	    }

	});

	module.exports = BlogPostView;

/***/ },

/***/ 426:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var TextField = __webpack_require__(300);
	var Paper = __webpack_require__(268);
	var RaisedButton = __webpack_require__(369);

	var ContactActions = __webpack_require__(427);
	var history = __webpack_require__(212);

	var Contact = React.createClass({
		displayName: 'Contact',

		// Default values
		getInitialState: function getInitialState() {
			return {
				name: '',
				email: '',
				text: ''
			};
		},

		// TODO: Add validation.
		onNameChange: function onNameChange(e) {
			this.setState({
				name: e.target.value
			});
		},
		onEmailChange: function onEmailChange(e) {
			this.setState({
				email: e.target.value
			});
		},
		onTextChange: function onTextChange(e) {
			this.setState({
				text: e.target.value
			});
		},

		// Action buttons
		onSubmit: function onSubmit() {
			ContactActions.submitContact(this.state.name, this.state.email, this.state.text);
		},
		onHome: function onHome() {
			history.replaceState(null, '/');
		},

		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'header' },
					React.createElement(
						'h2',
						{ className: 'headerContent' },
						'Contact Me'
					)
				),
				React.createElement(
					'div',
					{ className: 'contactRoot' },
					React.createElement(
						Paper,
						{ className: 'contactPaper' },
						React.createElement(
							'div',
							{ className: 'contactFormFields' },
							React.createElement(
								'div',
								null,
								React.createElement(TextField, { floatingLabelText: 'Name', value: this.state.name, onChange: this.onNameChange })
							),
							React.createElement(
								'div',
								null,
								React.createElement(TextField, { floatingLabelText: 'Email', value: this.state.email, onChange: this.onEmailChange })
							),
							React.createElement(
								'div',
								null,
								React.createElement(TextField, { floatingLabelText: 'Text',
									value: this.state.text,
									onChange: this.onTextChange,
									ref: 'text',
									multiLine: true,
									rowsMax: 20 })
							)
						),
						React.createElement(
							'div',
							{ className: 'contactFormButtons' },
							React.createElement(RaisedButton, { label: 'Submit', secondary: true, onTouchTap: this.onSubmit }),
							React.createElement(RaisedButton, { label: 'Home', primary: true, onTouchTap: this.onHome })
						)
					)
				)
			);
		}
	});

	module.exports = Contact;

/***/ },

/***/ 427:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(289);
	var ContactConstants = __webpack_require__(428);
	var $ = __webpack_require__(402);

	var ContactActions = {

		submitContact: function submitContact(name, email, text) {
			$.ajax({
				type: 'POST',
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				dataType: 'json',
				url: '/app/components/contact/Contact.php',
				data: {
					name: name,
					email: email,
					text: text
				},
				error: function error(jqXHR, status, _error) {
					console.log("error contact", _error);
					//setTimeout(this.getBlogs, 10000); // try again every 10 seconds
				},
				success: function success(result, status, xhr) {
					console.log("success contact", result);
					// add a listener to this to validate successful message.
					AppDispatcher.handleAction({
						type: ContactConstants.ActionTypes.SUBMIT_CONTACT,
						json: result,
						error: null
					});
				}
			});
		}
	};

	module.exports = ContactActions;

/***/ },

/***/ 428:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keyMirror = __webpack_require__(295);

	module.exports = {

		ActionTypes: keyMirror({
			SUBMIT_CONTACT: null
		})
	};

/***/ },

/***/ 429:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 430:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function injectTapEventPlugin () {
	  __webpack_require__(33).injection.injectEventPluginsByName({
	    "TapEventPlugin":       __webpack_require__(431)
	  });
	};


/***/ },

/***/ 431:
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

	var EventConstants = __webpack_require__(32);
	var EventPluginUtils = __webpack_require__(35);
	var EventPropagators = __webpack_require__(75);
	var SyntheticUIEvent = __webpack_require__(89);
	var TouchEventUtils = __webpack_require__(432);
	var ViewportMetrics = __webpack_require__(40);

	var keyOf = __webpack_require__(433);
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

/***/ 432:
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

/***/ 433:
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

/***/ }

});