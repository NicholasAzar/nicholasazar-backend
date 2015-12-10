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
	__webpack_require__(494);
	window.React = _react2['default'];

	var injectTapEventPlugin = __webpack_require__(495);
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
	var Dialog = __webpack_require__(352);
	var RefreshIndicator = __webpack_require__(370);

	var ContactConstants = __webpack_require__(428);
	var ContactStore = __webpack_require__(554);
	var ContactActions = __webpack_require__(427);
	var history = __webpack_require__(212);

	var clientKey = __webpack_require__(429).clientKey;

	var ReCAPTCHA = __webpack_require__(430);

	var Contact = React.createClass({
		displayName: 'Contact',

		// Default values
		getInitialState: function getInitialState() {
			console.log("clientKey", clientKey);
			return {
				name: '',
				nameError: '',
				email: '',
				emailError: '',
				text: '',
				textError: '',
				captcha: '',
				showSuccessDialog: false,
				refreshIndicator: 'hide',
				submitButtonDisabled: false
			};
		},

		// TODO: Add validation.
		onNameChange: function onNameChange(e) {
			var error = '';
			if (!e.target.value) {
				error = 'Name is required.';
			}
			this.setState({
				name: e.target.value,
				nameError: error
			});
		},
		onEmailChange: function onEmailChange(e) {
			var error = '';
			var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!e.target.value) {
				error = 'Email is required.';
			} else if (!emailRegex.test(e.target.value)) {
				error = 'Must be a valid email format';
			}
			this.setState({
				email: e.target.value,
				emailError: error
			});
		},
		onTextChange: function onTextChange(e) {
			var error = '';
			if (!e.target.value) {
				error = 'Text is required.';
			}
			this.setState({
				text: e.target.value,
				textError: error
			});
		},

		onCaptchaChange: function onCaptchaChange(e) {
			this.setState({
				captcha: e
			});
		},

		// Action buttons
		onSubmit: function onSubmit() {
			if (this.state.name && this.state.email && this.state.text && !this.state.nameError && !this.state.emailError && !this.state.textError && this.state.captcha) {
				this.setState({
					refreshIndicator: 'loading',
					submitButtonDisabled: true
				});
				ContactStore.addChangeListener(this.submitContactResult, ContactConstants.ActionTypes.SUBMIT_CONTACT);
				ContactActions.submitContact(this.state.name, this.state.email, this.state.text);
			}
		},
		onHome: function onHome() {
			history.replaceState(null, '/');
		},

		submitContactResult: function submitContactResult() {
			if (ContactStore.isReceived()) {
				this.setState({
					showSuccessDialog: true,
					refreshIndicator: 'hide'
				});
			}
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
								React.createElement(TextField, { floatingLabelText: 'Name', errorText: this.state.nameError, value: this.state.name, onChange: this.onNameChange })
							),
							React.createElement(
								'div',
								null,
								React.createElement(TextField, { floatingLabelText: 'Email', errorText: this.state.emailError, value: this.state.email, onChange: this.onEmailChange })
							),
							React.createElement(
								'div',
								null,
								React.createElement(TextField, { floatingLabelText: 'Text',
									errorText: this.state.textError,
									value: this.state.text,
									onChange: this.onTextChange,
									ref: 'text',
									multiLine: true,
									rowsMax: 20 })
							),
							React.createElement('br', null),
							React.createElement(ReCAPTCHA, {
								ref: 'recaptcha',
								sitekey: clientKey,
								onChange: this.onCaptchaChange
							})
						),
						React.createElement(
							'div',
							{ className: 'contactFormButtons' },
							React.createElement(RefreshIndicator, { size: 30, left: 40, top: 2, status: this.state.refreshIndicator }),
							React.createElement(RaisedButton, { label: 'Submit', secondary: true, onTouchTap: this.onSubmit, disabled: this.state.submitButtonDisabled }),
							React.createElement(RaisedButton, { label: 'Home', primary: true, onTouchTap: this.onHome })
						)
					)
				),
				React.createElement(
					Dialog,
					{
						title: 'Thanks for the message!',
						actions: [{ text: 'Ok', onTouchTap: this.onHome, ref: 'submit' }],
						actionFocus: 'submit',
						open: this.state.showSuccessDialog,
						onRequestClose: this.onHome },
					'I received it and will get back to you soon, have a good one!'
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

	"use strict";

	module.exports = {
		clientKey: "6LcbwxITAAAAAHiL7Soa1ADG1TadeuPROeuKfAWl"
	};

/***/ },

/***/ 430:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequireDefault = __webpack_require__(431)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _recaptcha = __webpack_require__(432);

	var _recaptcha2 = _interopRequireDefault(_recaptcha);

	var _reactAsyncScript = __webpack_require__(450);

	var _reactAsyncScript2 = _interopRequireDefault(_reactAsyncScript);

	var callbackName = "onloadcallback";
	var URL = "https://www.google.com/recaptcha/api.js?onload=" + callbackName + "&render=explicit";
	var globalName = "grecaptcha";

	exports["default"] = (0, _reactAsyncScript2["default"])(_recaptcha2["default"], URL, {
	  callbackName: callbackName,
	  globalName: globalName,
	  exposeFuncs: ["getValue", "reset"]
	});
	module.exports = exports["default"];

/***/ },

/***/ 431:
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },

/***/ 432:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _objectWithoutProperties = __webpack_require__(433)["default"];

	var _extends = __webpack_require__(434)["default"];

	var _interopRequireDefault = __webpack_require__(431)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var ReCAPTCHA = _react2["default"].createClass({
	  displayName: "reCAPTCHA",
	  propTypes: {
	    sitekey: _react.PropTypes.string.isRequired,
	    onChange: _react.PropTypes.func.isRequired,
	    grecaptcha: _react.PropTypes.object,
	    theme: _react.PropTypes.oneOf(["dark", "light"]),
	    type: _react.PropTypes.oneOf(["image", "audio"]),
	    tabindex: _react.PropTypes.number,
	    onExpired: _react.PropTypes.func,
	    size: _react.PropTypes.oneOf(["compact", "normal"]),
	    stoken: _react.PropTypes.string
	  },

	  getInitialState: function getInitialState() {
	    return {};
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      theme: "light",
	      type: "image",
	      tabindex: 0,
	      size: "normal"
	    };
	  },

	  getValue: function getValue() {
	    if (this.props.grecaptcha && this.state.widgetId !== undefined) {
	      return this.props.grecaptcha.getResponse(this.state.widgetId);
	    }
	    return null;
	  },

	  reset: function reset() {
	    if (this.props.grecaptcha && this.state.widgetId !== undefined) {
	      this.props.grecaptcha.reset(this.state.widgetId);
	    }
	  },

	  handleExpired: function handleExpired() {
	    if (this.props.onExpired) {
	      this.props.onExpired();
	    } else if (this.props.onChange) {
	      this.props.onChange(null);
	    }
	  },

	  explicitRender: function explicitRender(cb) {
	    if (this.props.grecaptcha && this.state.widgetId === undefined) {
	      var id = this.props.grecaptcha.render(this.refs.captcha, {
	        sitekey: this.props.sitekey,
	        callback: this.props.onChange,
	        theme: this.props.theme,
	        type: this.props.type,
	        tabindex: this.props.tabindex,
	        "expired-callback": this.handleExpired,
	        size: this.props.size,
	        stoken: this.props.stoken
	      });
	      this.setState({
	        widgetId: id
	      }, cb);
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    this.explicitRender();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this.explicitRender();
	  },

	  render: function render() {
	    // consume properties owned by the reCATPCHA, pass the rest to the div so the user can style it.
	    /* eslint-disable no-unused-vars */
	    var _props = this.props;
	    var sitekey = _props.sitekey;
	    var onChange = _props.onChange;
	    var theme = _props.theme;
	    var type = _props.type;
	    var tabindex = _props.tabindex;
	    var onExpired = _props.onExpired;
	    var size = _props.size;
	    var stoken = _props.stoken;

	    var childProps = _objectWithoutProperties(_props, ["sitekey", "onChange", "theme", "type", "tabindex", "onExpired", "size", "stoken"]);

	    /* eslint-enable no-unused-vars */
	    return _react2["default"].createElement("div", _extends({}, childProps, { ref: "captcha" }));
	  }
	});

	exports["default"] = ReCAPTCHA;
	module.exports = exports["default"];

/***/ },

/***/ 433:
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },

/***/ 434:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(435)["default"];

	exports["default"] = _Object$assign || function (target) {
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

	exports.__esModule = true;

/***/ },

/***/ 435:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(436), __esModule: true };

/***/ },

/***/ 436:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(437);
	module.exports = __webpack_require__(440).Object.assign;

/***/ },

/***/ 437:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(438);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(443)});

/***/ },

/***/ 438:
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(439)
	  , core      = __webpack_require__(440)
	  , ctx       = __webpack_require__(441)
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

/***/ 439:
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },

/***/ 440:
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },

/***/ 441:
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(442);
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

/***/ 442:
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },

/***/ 443:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(444)
	  , toObject = __webpack_require__(445)
	  , IObject  = __webpack_require__(447);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(449)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },

/***/ 444:
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },

/***/ 445:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(446);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },

/***/ 446:
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },

/***/ 447:
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(448);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },

/***/ 448:
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },

/***/ 449:
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },

/***/ 450:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _objectWithoutProperties = __webpack_require__(433)["default"];

	var _extends = __webpack_require__(434)["default"];

	var _Map = __webpack_require__(451)["default"];

	var _getIterator = __webpack_require__(491)["default"];

	var _interopRequireDefault = __webpack_require__(431)["default"];

	exports.__esModule = true;
	exports["default"] = makeAsyncScript;

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var SCRIPT_MAP = new _Map();

	// A counter used to generate a unique id for each component that uses the function
	var idCount = 0;

	function makeAsyncScript(Component, scriptURL, options) {
	  options = options || {};
	  var funcs = {
	    displayName: "AsyncScriptLoader",

	    propTypes: {
	      asyncScriptOnLoad: _react.PropTypes.func
	    },

	    statics: {
	      asyncScriptLoaderTriggerOnScriptLoaded: function asyncScriptLoaderTriggerOnScriptLoaded() {
	        var mapEntry = SCRIPT_MAP.get(scriptURL);
	        if (!mapEntry || !mapEntry.loaded) {
	          throw new Error("Script is not loaded.");
	        }
	        for (var _iterator = mapEntry.observers.values(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
	          var _ref;

	          if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	          } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	          }

	          var observer = _ref;

	          observer(mapEntry);
	        }
	        delete window[options.callbackName];
	      }
	    },

	    getInitialState: function getInitialState() {
	      return {};
	    },

	    asyncScriptLoaderGetScriptLoaderID: function asyncScriptLoaderGetScriptLoaderID() {
	      if (!this.__scriptLoaderID) {
	        this.__scriptLoaderID = "async-script-loader-" + idCount++;
	      }
	      return this.__scriptLoaderID;
	    },

	    getComponent: function getComponent() {
	      return this.childComponent;
	    },

	    componentDidMount: function componentDidMount() {
	      var _this = this;

	      var key = this.asyncScriptLoaderGetScriptLoaderID();
	      var _options = options;
	      var globalName = _options.globalName;
	      var callbackName = _options.callbackName;

	      if (globalName && typeof window[globalName] !== "undefined") {
	        SCRIPT_MAP.set(scriptURL, { loaded: true, observers: new _Map() });
	      }

	      if (SCRIPT_MAP.has(scriptURL)) {
	        var entry = SCRIPT_MAP.get(scriptURL);
	        if (entry.loaded || entry.errored) {
	          this.asyncScriptLoaderHandleLoad(entry);
	          return;
	        }
	        entry.observers.set(key, this.asyncScriptLoaderHandleLoad);
	        return;
	      }

	      var observers = new _Map();
	      observers.set(key, this.asyncScriptLoaderHandleLoad);
	      SCRIPT_MAP.set(scriptURL, {
	        loaded: false,
	        observers: observers
	      });

	      var script = document.createElement("script");

	      script.src = scriptURL;
	      script.async = 1;

	      var callObserverFuncAndRemoveObserver = function callObserverFuncAndRemoveObserver(func) {
	        if (SCRIPT_MAP.has(scriptURL)) {
	          var mapEntry = SCRIPT_MAP.get(scriptURL);
	          var observersMap = mapEntry.observers;

	          for (var _iterator2 = observersMap, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2);;) {
	            var _ref2;

	            if (_isArray2) {
	              if (_i2 >= _iterator2.length) break;
	              _ref2 = _iterator2[_i2++];
	            } else {
	              _i2 = _iterator2.next();
	              if (_i2.done) break;
	              _ref2 = _i2.value;
	            }

	            var obsKey = _ref2[0];
	            var observer = _ref2[1];

	            if (func(observer)) {
	              observersMap["delete"](obsKey);
	            }
	          }
	        }
	      };

	      if (callbackName && typeof window !== "undefined") {
	        window[callbackName] = AsyncScriptLoader.asyncScriptLoaderTriggerOnScriptLoaded;
	      }

	      script.onload = function () {
	        var mapEntry = SCRIPT_MAP.get(scriptURL);
	        mapEntry.loaded = true;
	        callObserverFuncAndRemoveObserver(function (observer) {
	          if (callbackName) {
	            return false;
	          }
	          observer(mapEntry);
	          return true;
	        });
	      };
	      script.onerror = function (event) {
	        var mapEntry = SCRIPT_MAP.get(scriptURL);
	        mapEntry.errored = true;
	        callObserverFuncAndRemoveObserver(function (observer) {
	          observer(mapEntry);
	          return true;
	        });
	      };

	      // (old) MSIE browsers may call "onreadystatechange" instead of "onload"
	      script.onreadystatechange = function () {
	        if (_this.readyState === "loaded") {
	          // wait for other events, then call onload if default onload hadn't been called
	          window.setTimeout(function () {
	            if (SCRIPT_MAP.get(scriptURL).loaded !== true) {
	              script.onload();
	            }
	          }, 0);
	        }
	      };

	      document.body.appendChild(script);
	    },

	    asyncScriptLoaderHandleLoad: function asyncScriptLoaderHandleLoad(state) {
	      this.setState(state, this.props.asyncScriptOnLoad);
	    },

	    componentWillUnmount: function componentWillUnmount() {
	      // Clean the observer entry
	      var mapEntry = SCRIPT_MAP.get(scriptURL);
	      if (mapEntry) {
	        mapEntry.observers["delete"](this.asyncScriptLoaderGetScriptLoaderID());
	      }
	    },

	    render: function render() {
	      var _this2 = this;

	      var globalName = options.globalName;
	      var _props = this.props;
	      var asyncScriptOnLoad = _props.asyncScriptOnLoad;

	      var childProps = _objectWithoutProperties(_props, ["asyncScriptOnLoad"]);

	      if (globalName && typeof window !== "undefined") {
	        childProps[globalName] = typeof window[globalName] !== "undefined" ? window[globalName] : undefined;
	      }
	      return _react2["default"].createElement(Component, _extends({ ref: function (comp) {
	          _this2.childComponent = comp;
	        } }, childProps));
	    }

	  };

	  if (options.exposeFuncs) {
	    var _loop = function () {
	      if (_isArray3) {
	        if (_i3 >= _iterator3.length) return "break";
	        _ref3 = _iterator3[_i3++];
	      } else {
	        _i3 = _iterator3.next();
	        if (_i3.done) return "break";
	        _ref3 = _i3.value;
	      }

	      var funcToExpose = _ref3;

	      /* eslint-disable no-loop-func */
	      funcs[funcToExpose] = function () {
	        var _childComponent;

	        return (_childComponent = this.childComponent)[funcToExpose].apply(_childComponent, arguments);
	      };
	      /* eslint-enable no-loop-func */
	    };

	    for (var _iterator3 = options.exposeFuncs, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _getIterator(_iterator3);;) {
	      var _ref3;

	      var _ret = _loop();

	      if (_ret === "break") break;
	    }
	  }
	  var AsyncScriptLoader = _react2["default"].createClass(funcs);

	  return AsyncScriptLoader;
	}

	module.exports = exports["default"];

/***/ },

/***/ 451:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(452), __esModule: true };

/***/ },

/***/ 452:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(453);
	__webpack_require__(454);
	__webpack_require__(470);
	__webpack_require__(475);
	__webpack_require__(489);
	module.exports = __webpack_require__(440).Map;

/***/ },

/***/ 453:
/***/ function(module, exports) {

	

/***/ },

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(455)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(457)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },

/***/ 455:
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(456)
	  , defined   = __webpack_require__(446);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },

/***/ 456:
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },

/***/ 457:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(458)
	  , $export        = __webpack_require__(438)
	  , redefine       = __webpack_require__(459)
	  , hide           = __webpack_require__(460)
	  , has            = __webpack_require__(463)
	  , Iterators      = __webpack_require__(464)
	  , $iterCreate    = __webpack_require__(465)
	  , setToStringTag = __webpack_require__(466)
	  , getProto       = __webpack_require__(444).getProto
	  , ITERATOR       = __webpack_require__(467)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },

/***/ 458:
/***/ function(module, exports) {

	module.exports = true;

/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(460);

/***/ },

/***/ 460:
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(444)
	  , createDesc = __webpack_require__(461);
	module.exports = __webpack_require__(462) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },

/***/ 461:
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },

/***/ 462:
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(449)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },

/***/ 463:
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },

/***/ 464:
/***/ function(module, exports) {

	module.exports = {};

/***/ },

/***/ 465:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(444)
	  , descriptor     = __webpack_require__(461)
	  , setToStringTag = __webpack_require__(466)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(460)(IteratorPrototype, __webpack_require__(467)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },

/***/ 466:
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(444).setDesc
	  , has = __webpack_require__(463)
	  , TAG = __webpack_require__(467)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },

/***/ 467:
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(468)('wks')
	  , uid    = __webpack_require__(469)
	  , Symbol = __webpack_require__(439).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },

/***/ 468:
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(439)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },

/***/ 469:
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },

/***/ 470:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(471);
	var Iterators = __webpack_require__(464);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },

/***/ 471:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(472)
	  , step             = __webpack_require__(473)
	  , Iterators        = __webpack_require__(464)
	  , toIObject        = __webpack_require__(474);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(457)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },

/***/ 472:
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },

/***/ 473:
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },

/***/ 474:
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(447)
	  , defined = __webpack_require__(446);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },

/***/ 475:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(476);

	// 23.1 Map Objects
	__webpack_require__(488)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },

/***/ 476:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(444)
	  , hide         = __webpack_require__(460)
	  , redefineAll  = __webpack_require__(477)
	  , ctx          = __webpack_require__(441)
	  , strictNew    = __webpack_require__(478)
	  , defined      = __webpack_require__(446)
	  , forOf        = __webpack_require__(479)
	  , $iterDefine  = __webpack_require__(457)
	  , step         = __webpack_require__(473)
	  , ID           = __webpack_require__(469)('id')
	  , $has         = __webpack_require__(463)
	  , isObject     = __webpack_require__(482)
	  , setSpecies   = __webpack_require__(487)
	  , DESCRIPTORS  = __webpack_require__(462)
	  , isExtensible = Object.isExtensible || isObject
	  , SIZE         = DESCRIPTORS ? '_s' : 'size'
	  , id           = 0;

	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	};

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined;      // first entry
	      that._l = undefined;      // last entry
	      that[SIZE] = 0;           // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },

/***/ 477:
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(459);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },

/***/ 478:
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },

/***/ 479:
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(441)
	  , call        = __webpack_require__(480)
	  , isArrayIter = __webpack_require__(483)
	  , anObject    = __webpack_require__(481)
	  , toLength    = __webpack_require__(484)
	  , getIterFn   = __webpack_require__(485);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },

/***/ 480:
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(481);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },

/***/ 481:
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(482);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },

/***/ 482:
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },

/***/ 483:
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(464)
	  , ITERATOR   = __webpack_require__(467)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },

/***/ 484:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(456)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },

/***/ 485:
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(486)
	  , ITERATOR  = __webpack_require__(467)('iterator')
	  , Iterators = __webpack_require__(464);
	module.exports = __webpack_require__(440).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },

/***/ 486:
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(448)
	  , TAG = __webpack_require__(467)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },

/***/ 487:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(440)
	  , $           = __webpack_require__(444)
	  , DESCRIPTORS = __webpack_require__(462)
	  , SPECIES     = __webpack_require__(467)('species');

	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },

/***/ 488:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(444)
	  , global         = __webpack_require__(439)
	  , $export        = __webpack_require__(438)
	  , fails          = __webpack_require__(449)
	  , hide           = __webpack_require__(460)
	  , redefineAll    = __webpack_require__(477)
	  , forOf          = __webpack_require__(479)
	  , strictNew      = __webpack_require__(478)
	  , isObject       = __webpack_require__(482)
	  , setToStringTag = __webpack_require__(466)
	  , DESCRIPTORS    = __webpack_require__(462);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    C = wrapper(function(target, iterable){
	      strictNew(target, C, NAME);
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },

/***/ 489:
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(438);

	$export($export.P, 'Map', {toJSON: __webpack_require__(490)('Map')});

/***/ },

/***/ 490:
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__(479)
	  , classof = __webpack_require__(486);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },

/***/ 491:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(492), __esModule: true };

/***/ },

/***/ 492:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(470);
	__webpack_require__(454);
	module.exports = __webpack_require__(493);

/***/ },

/***/ 493:
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(481)
	  , get      = __webpack_require__(485);
	module.exports = __webpack_require__(440).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },

/***/ 494:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 495:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function injectTapEventPlugin () {
	  __webpack_require__(33).injection.injectEventPluginsByName({
	    "TapEventPlugin":       __webpack_require__(496)
	  });
	};


/***/ },

/***/ 496:
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
	var TouchEventUtils = __webpack_require__(497);
	var ViewportMetrics = __webpack_require__(40);

	var keyOf = __webpack_require__(498);
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

/***/ 497:
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

/***/ 498:
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

/***/ 554:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(289);
	var EventEmitter = __webpack_require__(293).EventEmitter;
	var ContactConstants = __webpack_require__(428);
	var _ = __webpack_require__(296);

	var _isReceived;

	var ContactStore = _.extend({}, EventEmitter.prototype, {
		isReceived: function isReceived() {
			return _isReceived;
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
		var data = payload.action;
		if (data == null) return;
		if (data.type === ContactConstants.ActionTypes.SUBMIT_CONTACT) {
			console.log("ContactStore received SUBMIT_CONTACT:", data.json);
			_isReceived = data.json;
			ContactStore.emitChange(ContactConstants.ActionTypes.SUBMIT_CONTACT);
		}
		return true;
	});

	module.exports = ContactStore;

/***/ }

});