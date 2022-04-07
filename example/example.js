/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/fieldError.riot":
/*!*****************************!*\
  !*** ./src/fieldError.riot ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  css: null,

  exports: {
    state: {
        errors: [

        ],

        // css class for
        closest: '.field-group',
    },

    /**
     *
     *
     *  @param  {Object} props
     *  @param  {Object} state
     *
     */
    onBeforeMounted(props, state)
    {
        if (props.closest) {
            state.closest = props.closest
        }
    },

    /**
     *
     *
     *  @param  {Object} props
     *  @param  {Object} state
     *
     */
    onMounted(props, state)
    {
        // getting parent element for entire field
        const parent = this.root.closest(state.closest)

        // getting current element by name
        const element = parent.querySelector('[name="' + props.name + '"]')

        // getting form
        const form = element.closest('form')

        // element, form are exists and nofieldupdate is not set
        // each change of the element dispatch a event to form validation
        if (element && form && !props.nofieldupdate) {
            element.addEventListener('input', (event) => {
                this.dispatchCustomEvent(event, form, props.name)
            })
        }

        // add custom event to listen to form-validation
        this.root.addEventListener('form-validation', (event) => {
            this.onFormValidation(event, parent)
        })
    },

    /**
     *  process form validation triggered by form
     *
     *  @param  {Event} event
     *  @param  {Element} parent
     *
     */
    onFormValidation(event, parent)
    {
        // if detail is a value, set to errors
        if (event.detail) {
            this.state.errors = event.detail

            parent.classList.add('field--error')
            parent.classList.remove('field--valid')
        } else {
            this.state.errors = []

            parent.classList.remove('field--error')
            parent.classList.add('field--valid')
        }

        this.update()
    },

    /**
     *  create event to send to form validation
     *
     *  @param  {Event} event
     *  @param  {Element} form
     *  @param  {string} name
     *
     */
    dispatchCustomEvent(event, form, name)
    {
        const fieldUpdateEvent = new CustomEvent('field-update', {
            'detail': {
                'name': name,
                'value': event.target.value
            }
        })

        form.dispatchEvent(fieldUpdateEvent)
    }
  },

  template: (
    template,
    expressionTypes,
    bindingTypes,
    getComponent
  ) => template(
    '<div expr0="expr0" class="field-error"></div>',
    [
      {
        type: bindingTypes.IF,
        evaluate: _scope => _scope.state.errors.length > 0,
        redundantAttribute: 'expr0',
        selector: '[expr0]',

        template: template(
          '<ul><li expr1="expr1"></li></ul>',
          [
            {
              type: bindingTypes.EACH,
              getKey: null,
              condition: null,

              template: template(
                ' ',
                [
                  {
                    expressions: [
                      {
                        type: expressionTypes.TEXT,
                        childNodeIndex: 0,

                        evaluate: _scope => [
                          _scope.error
                        ].join(
                          ''
                        )
                      }
                    ]
                  }
                ]
              ),

              redundantAttribute: 'expr1',
              selector: '[expr1]',
              itemName: 'error',
              indexName: null,
              evaluate: _scope => _scope.state.errors
            }
          ]
        )
      }
    ]
  ),

  name: 'field-error'
});

/***/ }),

/***/ "./src/formComponent.riot":
/*!********************************!*\
  !*** ./src/formComponent.riot ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _formValidator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formValidator.js */ "./src/formValidator.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  css: null,

  exports: {
    state:
    {
        result: undefined,
        validator: undefined,
        class: undefined
    },

    onMounted()
    {
        // creating formValidator
        this.state.validator = new _formValidator_js__WEBPACK_IMPORTED_MODULE_0__.default(this.$('.form'), {
            'email': {
                'presence': true,
                'email': true
            },
            'password': {
                'presence': true
            }
        })

        // adding on success
        this.state.validator.onSuccess((event, data) => {
            this.handleSuccess(event, data)
        })

        // adding on error
        this.state.validator.onError((event, errors, data) => {
            this.handleError(event, errors, data)
        })
    },

    /**
     *
     *  @param  {object} event
     *  @param  {array} data
     *
     */
    handleSuccess(event, data)
    {
        event.preventDefault()

        this.state.class = 'background-color-success'
        this.state.result = JSON.stringify(data)
        this.update()
    },

    /**
     *
     *
     *  @param  {object} event
     *  @param  {array} errors
     *  @param  {array} data
     *
     */
    handleError(event, errors, data)
    {
        this.state.class = 'background-color-danger'
        this.state.result = JSON.stringify(errors)
        this.update()
    }
  },

  template: (
    template,
    expressionTypes,
    bindingTypes,
    getComponent
  ) => template(
    '<div><form expr2="expr2" class="form" novalidate method="post"><div class="field-group"><label class="field-label">\n                    email\n                    <input type="email" class="field-text" name="email"/></label><field-error expr3="expr3" name="email"></field-error></div><div class="field-group"><label class="field-label">\n                    password\n                    <input type="password" class="field-text" name="password"/></label><field-error expr4="expr4" name="password"></field-error></div><button class="button" type="submit">\n                Send\n            </button></form><div expr5="expr5" class="loading"></div><div expr6="expr6"></div></div>',
    [
      {
        redundantAttribute: 'expr2',
        selector: '[expr2]',

        expressions: [
          {
            type: expressionTypes.EVENT,
            name: 'onsubmit',
            evaluate: _scope => (event) => ( _scope.state.validator.submit(event) )
          }
        ]
      },
      {
        type: bindingTypes.TAG,
        getComponent: getComponent,
        evaluate: _scope => 'field-error',
        slots: [],
        attributes: [],
        redundantAttribute: 'expr3',
        selector: '[expr3]'
      },
      {
        type: bindingTypes.TAG,
        getComponent: getComponent,
        evaluate: _scope => 'field-error',
        slots: [],
        attributes: [],
        redundantAttribute: 'expr4',
        selector: '[expr4]'
      },
      {
        type: bindingTypes.IF,
        evaluate: _scope => _scope.state.isLoading,
        redundantAttribute: 'expr5',
        selector: '[expr5]',

        template: template(
          '<span></span><span></span><span></span>',
          []
        )
      },
      {
        type: bindingTypes.IF,
        evaluate: _scope => _scope.state.result,
        redundantAttribute: 'expr6',
        selector: '[expr6]',

        template: template(
          '<div class="panel__body"><div expr7="expr7" class="content m-bottom-last-child-0"> </div></div>',
          [
            {
              expressions: [
                {
                  type: expressionTypes.ATTRIBUTE,
                  name: 'class',

                  evaluate: _scope => [
                    'panel color-text-contrast ',
                    _scope.state.class
                  ].join(
                    ''
                  )
                }
              ]
            },
            {
              redundantAttribute: 'expr7',
              selector: '[expr7]',

              expressions: [
                {
                  type: expressionTypes.TEXT,
                  childNodeIndex: 0,

                  evaluate: _scope => [
                    _scope.state.result
                  ].join(
                    ''
                  )
                }
              ]
            }
          ]
        )
      }
    ]
  ),

  name: 'form-component'
});

/***/ }),

/***/ "./src/example.js":
/*!************************!*\
  !*** ./src/example.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var riot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! riot */ "./node_modules/riot/riot.esm.js");
/* harmony import */ var _formValidator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formValidator */ "./src/formValidator.js");
/* harmony import */ var _fieldError_riot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fieldError.riot */ "./src/fieldError.riot");
/* harmony import */ var _formComponent_riot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formComponent.riot */ "./src/formComponent.riot");



 // register & mount riot component

riot__WEBPACK_IMPORTED_MODULE_3__.register('field-error', _fieldError_riot__WEBPACK_IMPORTED_MODULE_1__.default);
riot__WEBPACK_IMPORTED_MODULE_3__.mount('field-error'); // creating formValidation

var formValidation = new _formValidator__WEBPACK_IMPORTED_MODULE_0__.default(document.querySelector('.form-html'), {
  'email': {
    'presence': true,
    'email': true
  },
  'password': {
    'presence': true
  }
}, true);
formValidation.onSuccess(function (event, data) {
  event.preventDefault(); // show message and content of data from form

  document.querySelector('#result .content').innerHTML = '<p>' + JSON.stringify(data) + '</p>';
  document.querySelector('#result').classList.remove('hidden');
});
riot__WEBPACK_IMPORTED_MODULE_3__.register('form-component', _formComponent_riot__WEBPACK_IMPORTED_MODULE_2__.default);
riot__WEBPACK_IMPORTED_MODULE_3__.mount('form-component');

/***/ }),

/***/ "./src/formValidator.js":
/*!******************************!*\
  !*** ./src/formValidator.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! validate.js */ "./node_modules/validate.js/validate.js");
/* harmony import */ var validate_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(validate_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var form_serialize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! form-serialize */ "./node_modules/form-serialize/index.js");
/* harmony import */ var form_serialize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(form_serialize__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



/**
 *  Form Validator with RiotJS Components
 *
 *
 *  @author HerrHase
 *
 */

var FormValidator = /*#__PURE__*/function () {
  /**
   *
   *  @param {[type]} formSelector [description]
   *  @param {[type]} constraits   [description]
   */
  function FormValidator(formElement, constraits) {
    var _this = this;

    var addSubmitEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, FormValidator);

    // constraits for validate.js
    this.constraits = constraits; // get form and elements

    this.formElement = formElement; // if form not found

    if (!this.formElement) {
      console.error('FormValidator: form not found!');
    }

    this.elements = this.formElement.querySelectorAll('field-error'); // adding event if a element is updated

    this.formElement.addEventListener('field-update', function (event) {
      _this._onFieldUpdate(event);
    }); // adding submit event

    if (addSubmitEvent) {
      this.formElement.addEventListener('submit', function (event) {
        _this._onSubmit(event);
      });
    }
  }
  /**
   *  trigger submit
   *
   *  @param {object} event
   *
   */


  _createClass(FormValidator, [{
    key: "submit",
    value: function submit(event) {
      this._onSubmit(event);
    }
    /**
     *
     *  @param  {function} onError
     *
     */

  }, {
    key: "onError",
    value: function onError(_onError) {
      this._onError = _onError;
    }
    /**
     *  settin onSuccess callback and add submit-event on form
     *
     *  @param  {function} onSuccess
     *
     */

  }, {
    key: "onSuccess",
    value: function onSuccess(_onSuccess) {
      // adding onSuccess
      this._onSuccess = _onSuccess;
    }
    /**
     *
     *  @param  {function} onError
     *
     */

  }, {
    key: "onBeforeSubmit",
    value: function onBeforeSubmit(_onBeforeSubmit) {
      this._onBeforeSubmit = _onBeforeSubmit;
    }
    /**
     *  handle submit
     *
     *
     *  @param  {Event} event
     *
     */

  }, {
    key: "_onSubmit",
    value: function _onSubmit(event) {
      var _this2 = this;

      // getting data from target of submit event
      var data = form_serialize__WEBPACK_IMPORTED_MODULE_1___default()(event.target, {
        hash: true
      }); // options for validate.js

      var options = {
        fullMessages: false
      };

      if (this._onBeforeSubmit) {
        this._onBeforeSubmit();
      } // check form and getting errors


      validate_js__WEBPACK_IMPORTED_MODULE_0___default().async(data, this.constraits, options).then(function () {
        _this2._onSuccess(event, data);
      }, function (errors) {
        event.preventDefault(); // if onError is set, tha

        if (_this2._onError) {
          _this2._onError(event, errors, data);
        } // send each element a event


        _this2.elements.forEach(function (element) {
          var elementErrors = false; // check for errors by name

          if (errors[element.attributes.name.nodeValue]) {
            elementErrors = errors[element.attributes.name.nodeValue];
          }

          _this2._dispatchCustomEvent(elementErrors, element);
        });
      });
    }
    /**
     *  send update to fields
     *
     *
     *  @param  {Event} event
     *
     */

  }, {
    key: "_onFieldUpdate",
    value: function _onFieldUpdate(event) {
      var _this3 = this;

      // workaround, make sure that value for single is undefined if it is empty
      if (event.detail.value == '') {
        event.detail.value = undefined;
      }

      var errors = validate_js__WEBPACK_IMPORTED_MODULE_0___default().single(event.detail.value, this.constraits[event.detail.name]); // search for element by name and dispatch event

      this.elements.forEach(function (element) {
        if (element.attributes.name.nodeValue == event.detail.name) {
          _this3._dispatchCustomEvent(errors, element);
        }
      });
    }
    /**
     *  dispatch event to single element
     *
     *  @param  {Array} errors
     *  @param  {Element} element
     *
     */

  }, {
    key: "_dispatchCustomEvent",
    value: function _dispatchCustomEvent(errors, element) {
      var detail = false;

      if (errors) {
        detail = errors;
      }

      var formValidationEvent = new CustomEvent('form-validation', {
        'detail': detail
      });
      element.dispatchEvent(formValidationEvent);
    }
  }]);

  return FormValidator;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormValidator);

/***/ }),

/***/ "./node_modules/form-serialize/index.js":
/*!**********************************************!*\
  !*** ./node_modules/form-serialize/index.js ***!
  \**********************************************/
/***/ ((module) => {

// get successful control from form and assemble into object
// http://www.w3.org/TR/html401/interact/forms.html#h-17.13.2

// types which indicate a submit action and are not successful controls
// these will be ignored
var k_r_submitter = /^(?:submit|button|image|reset|file)$/i;

// node names which could be successful controls
var k_r_success_contrls = /^(?:input|select|textarea|keygen)/i;

// Matches bracket notation.
var brackets = /(\[[^\[\]]*\])/g;

// serializes form fields
// @param form MUST be an HTMLForm element
// @param options is an optional argument to configure the serialization. Default output
// with no options specified is a url encoded string
//    - hash: [true | false] Configure the output type. If true, the output will
//    be a js object.
//    - serializer: [function] Optional serializer function to override the default one.
//    The function takes 3 arguments (result, key, value) and should return new result
//    hash and url encoded str serializers are provided with this module
//    - disabled: [true | false]. If true serialize disabled fields.
//    - empty: [true | false]. If true serialize empty fields
function serialize(form, options) {
    if (typeof options != 'object') {
        options = { hash: !!options };
    }
    else if (options.hash === undefined) {
        options.hash = true;
    }

    var result = (options.hash) ? {} : '';
    var serializer = options.serializer || ((options.hash) ? hash_serializer : str_serialize);

    var elements = form && form.elements ? form.elements : [];

    //Object store each radio and set if it's empty or not
    var radio_store = Object.create(null);

    for (var i=0 ; i<elements.length ; ++i) {
        var element = elements[i];

        // ingore disabled fields
        if ((!options.disabled && element.disabled) || !element.name) {
            continue;
        }
        // ignore anyhting that is not considered a success field
        if (!k_r_success_contrls.test(element.nodeName) ||
            k_r_submitter.test(element.type)) {
            continue;
        }

        var key = element.name;
        var val = element.value;

        // we can't just use element.value for checkboxes cause some browsers lie to us
        // they say "on" for value when the box isn't checked
        if ((element.type === 'checkbox' || element.type === 'radio') && !element.checked) {
            val = undefined;
        }

        // If we want empty elements
        if (options.empty) {
            // for checkbox
            if (element.type === 'checkbox' && !element.checked) {
                val = '';
            }

            // for radio
            if (element.type === 'radio') {
                if (!radio_store[element.name] && !element.checked) {
                    radio_store[element.name] = false;
                }
                else if (element.checked) {
                    radio_store[element.name] = true;
                }
            }

            // if options empty is true, continue only if its radio
            if (val == undefined && element.type == 'radio') {
                continue;
            }
        }
        else {
            // value-less fields are ignored unless options.empty is true
            if (!val) {
                continue;
            }
        }

        // multi select boxes
        if (element.type === 'select-multiple') {
            val = [];

            var selectOptions = element.options;
            var isSelectedOptions = false;
            for (var j=0 ; j<selectOptions.length ; ++j) {
                var option = selectOptions[j];
                var allowedEmpty = options.empty && !option.value;
                var hasValue = (option.value || allowedEmpty);
                if (option.selected && hasValue) {
                    isSelectedOptions = true;

                    // If using a hash serializer be sure to add the
                    // correct notation for an array in the multi-select
                    // context. Here the name attribute on the select element
                    // might be missing the trailing bracket pair. Both names
                    // "foo" and "foo[]" should be arrays.
                    if (options.hash && key.slice(key.length - 2) !== '[]') {
                        result = serializer(result, key + '[]', option.value);
                    }
                    else {
                        result = serializer(result, key, option.value);
                    }
                }
            }

            // Serialize if no selected options and options.empty is true
            if (!isSelectedOptions && options.empty) {
                result = serializer(result, key, '');
            }

            continue;
        }

        result = serializer(result, key, val);
    }

    // Check for all empty radio buttons and serialize them with key=""
    if (options.empty) {
        for (var key in radio_store) {
            if (!radio_store[key]) {
                result = serializer(result, key, '');
            }
        }
    }

    return result;
}

function parse_keys(string) {
    var keys = [];
    var prefix = /^([^\[\]]*)/;
    var children = new RegExp(brackets);
    var match = prefix.exec(string);

    if (match[1]) {
        keys.push(match[1]);
    }

    while ((match = children.exec(string)) !== null) {
        keys.push(match[1]);
    }

    return keys;
}

function hash_assign(result, keys, value) {
    if (keys.length === 0) {
        result = value;
        return result;
    }

    var key = keys.shift();
    var between = key.match(/^\[(.+?)\]$/);

    if (key === '[]') {
        result = result || [];

        if (Array.isArray(result)) {
            result.push(hash_assign(null, keys, value));
        }
        else {
            // This might be the result of bad name attributes like "[][foo]",
            // in this case the original `result` object will already be
            // assigned to an object literal. Rather than coerce the object to
            // an array, or cause an exception the attribute "_values" is
            // assigned as an array.
            result._values = result._values || [];
            result._values.push(hash_assign(null, keys, value));
        }

        return result;
    }

    // Key is an attribute name and can be assigned directly.
    if (!between) {
        result[key] = hash_assign(result[key], keys, value);
    }
    else {
        var string = between[1];
        // +var converts the variable into a number
        // better than parseInt because it doesn't truncate away trailing
        // letters and actually fails if whole thing is not a number
        var index = +string;

        // If the characters between the brackets is not a number it is an
        // attribute name and can be assigned directly.
        if (isNaN(index)) {
            result = result || {};
            result[string] = hash_assign(result[string], keys, value);
        }
        else {
            result = result || [];
            result[index] = hash_assign(result[index], keys, value);
        }
    }

    return result;
}

// Object/hash encoding serializer.
function hash_serializer(result, key, value) {
    var matches = key.match(brackets);

    // Has brackets? Use the recursive assignment function to walk the keys,
    // construct any missing objects in the result tree and make the assignment
    // at the end of the chain.
    if (matches) {
        var keys = parse_keys(key);
        hash_assign(result, keys, value);
    }
    else {
        // Non bracket notation can make assignments directly.
        var existing = result[key];

        // If the value has been assigned already (for instance when a radio and
        // a checkbox have the same name attribute) convert the previous value
        // into an array before pushing into it.
        //
        // NOTE: If this requirement were removed all hash creation and
        // assignment could go through `hash_assign`.
        if (existing) {
            if (!Array.isArray(existing)) {
                result[key] = [ existing ];
            }

            result[key].push(value);
        }
        else {
            result[key] = value;
        }
    }

    return result;
}

// urlform encoding serializer
function str_serialize(result, key, value) {
    // encode newlines as \r\n cause the html spec says so
    value = value.replace(/(\r)?\n/g, '\r\n');
    value = encodeURIComponent(value);

    // spaces should be '+' rather than '%20'.
    value = value.replace(/%20/g, '+');
    return result + (result ? '&' : '') + encodeURIComponent(key) + '=' + value;
}

module.exports = serialize;


/***/ }),

/***/ "./src/example.scss":
/*!**************************!*\
  !*** ./src/example.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/riot/riot.esm.js":
/*!***************************************!*\
  !*** ./node_modules/riot/riot.esm.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__": () => /* binding */ __,
/* harmony export */   "component": () => /* binding */ component,
/* harmony export */   "install": () => /* binding */ install,
/* harmony export */   "mount": () => /* binding */ mount,
/* harmony export */   "pure": () => /* binding */ pure,
/* harmony export */   "register": () => /* binding */ register,
/* harmony export */   "uninstall": () => /* binding */ uninstall,
/* harmony export */   "unmount": () => /* binding */ unmount,
/* harmony export */   "unregister": () => /* binding */ unregister,
/* harmony export */   "version": () => /* binding */ version,
/* harmony export */   "withTypes": () => /* binding */ withTypes
/* harmony export */ });
/* Riot v6.1.2, @license MIT */
/**
 * Convert a string from camel case to dash-case
 * @param   {string} string - probably a component tag name
 * @returns {string} component name normalized
 */
function camelToDashCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
/**
 * Convert a string containing dashes to camel case
 * @param   {string} string - input string
 * @returns {string} my-string -> myString
 */

function dashToCamelCase(string) {
  return string.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}

/**
 * Get all the element attributes as object
 * @param   {HTMLElement} element - DOM node we want to parse
 * @returns {Object} all the attributes found as a key value pairs
 */

function DOMattributesToObject(element) {
  return Array.from(element.attributes).reduce((acc, attribute) => {
    acc[dashToCamelCase(attribute.name)] = attribute.value;
    return acc;
  }, {});
}
/**
 * Move all the child nodes from a source tag to another
 * @param   {HTMLElement} source - source node
 * @param   {HTMLElement} target - target node
 * @returns {undefined} it's a void method ¯\_(ツ)_/¯
 */
// Ignore this helper because it's needed only for svg tags

function moveChildren(source, target) {
  if (source.firstChild) {
    target.appendChild(source.firstChild);
    moveChildren(source, target);
  }
}
/**
 * Remove the child nodes from any DOM node
 * @param   {HTMLElement} node - target node
 * @returns {undefined}
 */

function cleanNode(node) {
  clearChildren(node.childNodes);
}
/**
 * Clear multiple children in a node
 * @param   {HTMLElement[]} children - direct children nodes
 * @returns {undefined}
 */

function clearChildren(children) {
  Array.from(children).forEach(removeChild);
}
/**
 * Remove a node
 * @param {HTMLElement}node - node to remove
 * @returns {undefined}
 */

const removeChild = node => node && node.parentNode && node.parentNode.removeChild(node);
/**
 * Insert before a node
 * @param {HTMLElement} newNode - node to insert
 * @param {HTMLElement} refNode - ref child
 * @returns {undefined}
 */

const insertBefore = (newNode, refNode) => refNode && refNode.parentNode && refNode.parentNode.insertBefore(newNode, refNode);
/**
 * Replace a node
 * @param {HTMLElement} newNode - new node to add to the DOM
 * @param {HTMLElement} replaced - node to replace
 * @returns {undefined}
 */

const replaceChild = (newNode, replaced) => replaced && replaced.parentNode && replaced.parentNode.replaceChild(newNode, replaced);

// Riot.js constants that can be used accross more modules
const COMPONENTS_IMPLEMENTATION_MAP$1 = new Map(),
      DOM_COMPONENT_INSTANCE_PROPERTY$1 = Symbol('riot-component'),
      PLUGINS_SET$1 = new Set(),
      IS_DIRECTIVE = 'is',
      VALUE_ATTRIBUTE = 'value',
      MOUNT_METHOD_KEY = 'mount',
      UPDATE_METHOD_KEY = 'update',
      UNMOUNT_METHOD_KEY = 'unmount',
      SHOULD_UPDATE_KEY = 'shouldUpdate',
      ON_BEFORE_MOUNT_KEY = 'onBeforeMount',
      ON_MOUNTED_KEY = 'onMounted',
      ON_BEFORE_UPDATE_KEY = 'onBeforeUpdate',
      ON_UPDATED_KEY = 'onUpdated',
      ON_BEFORE_UNMOUNT_KEY = 'onBeforeUnmount',
      ON_UNMOUNTED_KEY = 'onUnmounted',
      PROPS_KEY = 'props',
      STATE_KEY = 'state',
      SLOTS_KEY = 'slots',
      ROOT_KEY = 'root',
      IS_PURE_SYMBOL = Symbol('pure'),
      IS_COMPONENT_UPDATING = Symbol('is_updating'),
      PARENT_KEY_SYMBOL = Symbol('parent'),
      ATTRIBUTES_KEY_SYMBOL = Symbol('attributes'),
      TEMPLATE_KEY_SYMBOL = Symbol('template');

var globals = /*#__PURE__*/Object.freeze({
  __proto__: null,
  COMPONENTS_IMPLEMENTATION_MAP: COMPONENTS_IMPLEMENTATION_MAP$1,
  DOM_COMPONENT_INSTANCE_PROPERTY: DOM_COMPONENT_INSTANCE_PROPERTY$1,
  PLUGINS_SET: PLUGINS_SET$1,
  IS_DIRECTIVE: IS_DIRECTIVE,
  VALUE_ATTRIBUTE: VALUE_ATTRIBUTE,
  MOUNT_METHOD_KEY: MOUNT_METHOD_KEY,
  UPDATE_METHOD_KEY: UPDATE_METHOD_KEY,
  UNMOUNT_METHOD_KEY: UNMOUNT_METHOD_KEY,
  SHOULD_UPDATE_KEY: SHOULD_UPDATE_KEY,
  ON_BEFORE_MOUNT_KEY: ON_BEFORE_MOUNT_KEY,
  ON_MOUNTED_KEY: ON_MOUNTED_KEY,
  ON_BEFORE_UPDATE_KEY: ON_BEFORE_UPDATE_KEY,
  ON_UPDATED_KEY: ON_UPDATED_KEY,
  ON_BEFORE_UNMOUNT_KEY: ON_BEFORE_UNMOUNT_KEY,
  ON_UNMOUNTED_KEY: ON_UNMOUNTED_KEY,
  PROPS_KEY: PROPS_KEY,
  STATE_KEY: STATE_KEY,
  SLOTS_KEY: SLOTS_KEY,
  ROOT_KEY: ROOT_KEY,
  IS_PURE_SYMBOL: IS_PURE_SYMBOL,
  IS_COMPONENT_UPDATING: IS_COMPONENT_UPDATING,
  PARENT_KEY_SYMBOL: PARENT_KEY_SYMBOL,
  ATTRIBUTES_KEY_SYMBOL: ATTRIBUTES_KEY_SYMBOL,
  TEMPLATE_KEY_SYMBOL: TEMPLATE_KEY_SYMBOL
});

const EACH = 0;
const IF = 1;
const SIMPLE = 2;
const TAG = 3;
const SLOT = 4;
var bindingTypes = {
  EACH,
  IF,
  SIMPLE,
  TAG,
  SLOT
};

const ATTRIBUTE = 0;
const EVENT = 1;
const TEXT = 2;
const VALUE = 3;
var expressionTypes = {
  ATTRIBUTE,
  EVENT,
  TEXT,
  VALUE
};

const HEAD_SYMBOL = Symbol('head');
const TAIL_SYMBOL = Symbol('tail');

/**
 * Create the <template> fragments text nodes
 * @return {Object} {{head: Text, tail: Text}}
 */

function createHeadTailPlaceholders() {
  const head = document.createTextNode('');
  const tail = document.createTextNode('');
  head[HEAD_SYMBOL] = true;
  tail[TAIL_SYMBOL] = true;
  return {
    head,
    tail
  };
}

/**
 * Create the template meta object in case of <template> fragments
 * @param   {TemplateChunk} componentTemplate - template chunk object
 * @returns {Object} the meta property that will be passed to the mount function of the TemplateChunk
 */

function createTemplateMeta(componentTemplate) {
  const fragment = componentTemplate.dom.cloneNode(true);
  const {
    head,
    tail
  } = createHeadTailPlaceholders();
  return {
    avoidDOMInjection: true,
    fragment,
    head,
    tail,
    children: [head, ...Array.from(fragment.childNodes), tail]
  };
}

/**
 * Helper function to set an immutable property
 * @param   {Object} source - object where the new property will be set
 * @param   {string} key - object key where the new property will be stored
 * @param   {*} value - value of the new property
 * @param   {Object} options - set the propery overriding the default options
 * @returns {Object} - the original object modified
 */
function defineProperty(source, key, value, options) {
  if (options === void 0) {
    options = {};
  }

  /* eslint-disable fp/no-mutating-methods */
  Object.defineProperty(source, key, Object.assign({
    value,
    enumerable: false,
    writable: false,
    configurable: true
  }, options));
  /* eslint-enable fp/no-mutating-methods */

  return source;
}
/**
 * Define multiple properties on a target object
 * @param   {Object} source - object where the new properties will be set
 * @param   {Object} properties - object containing as key pair the key + value properties
 * @param   {Object} options - set the propery overriding the default options
 * @returns {Object} the original object modified
 */

function defineProperties(source, properties, options) {
  Object.entries(properties).forEach(_ref => {
    let [key, value] = _ref;
    defineProperty(source, key, value, options);
  });
  return source;
}
/**
 * Define default properties if they don't exist on the source object
 * @param   {Object} source - object that will receive the default properties
 * @param   {Object} defaults - object containing additional optional keys
 * @returns {Object} the original object received enhanced
 */

function defineDefaults(source, defaults) {
  Object.entries(defaults).forEach(_ref2 => {
    let [key, value] = _ref2;
    if (!source[key]) source[key] = value;
  });
  return source;
}

/**
 * Quick type checking
 * @param   {*} element - anything
 * @param   {string} type - type definition
 * @returns {boolean} true if the type corresponds
 */
function checkType(element, type) {
  return typeof element === type;
}
/**
 * Check if an element is part of an svg
 * @param   {HTMLElement}  el - element to check
 * @returns {boolean} true if we are in an svg context
 */

function isSvg(el) {
  const owner = el.ownerSVGElement;
  return !!owner || owner === null;
}
/**
 * Check if an element is a template tag
 * @param   {HTMLElement}  el - element to check
 * @returns {boolean} true if it's a <template>
 */

function isTemplate(el) {
  return el.tagName.toLowerCase() === 'template';
}
/**
 * Check that will be passed if its argument is a function
 * @param   {*} value - value to check
 * @returns {boolean} - true if the value is a function
 */

function isFunction(value) {
  return checkType(value, 'function');
}
/**
 * Check if a value is a Boolean
 * @param   {*}  value - anything
 * @returns {boolean} true only for the value is a boolean
 */

function isBoolean(value) {
  return checkType(value, 'boolean');
}
/**
 * Check if a value is an Object
 * @param   {*}  value - anything
 * @returns {boolean} true only for the value is an object
 */

function isObject(value) {
  return !isNil(value) && value.constructor === Object;
}
/**
 * Check if a value is null or undefined
 * @param   {*}  value - anything
 * @returns {boolean} true only for the 'undefined' and 'null' types
 */

function isNil(value) {
  return value === null || value === undefined;
}

/**
 * ISC License
 *
 * Copyright (c) 2020, Andrea Giammarchi, @WebReflection
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
 * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
// fork of https://github.com/WebReflection/udomdiff version 1.1.0
// due to https://github.com/WebReflection/udomdiff/pull/2

/* eslint-disable */

/**
 * @param {Node[]} a The list of current/live children
 * @param {Node[]} b The list of future children
 * @param {(entry: Node, action: number) => Node} get
 * The callback invoked per each entry related DOM operation.
 * @param {Node} [before] The optional node used as anchor to insert before.
 * @returns {Node[]} The same list of future children.
 */

var udomdiff = ((a, b, get, before) => {
  const bLength = b.length;
  let aEnd = a.length;
  let bEnd = bLength;
  let aStart = 0;
  let bStart = 0;
  let map = null;

  while (aStart < aEnd || bStart < bEnd) {
    // append head, tail, or nodes in between: fast path
    if (aEnd === aStart) {
      // we could be in a situation where the rest of nodes that
      // need to be added are not at the end, and in such case
      // the node to `insertBefore`, if the index is more than 0
      // must be retrieved, otherwise it's gonna be the first item.
      const node = bEnd < bLength ? bStart ? get(b[bStart - 1], -0).nextSibling : get(b[bEnd - bStart], 0) : before;

      while (bStart < bEnd) insertBefore(get(b[bStart++], 1), node);
    } // remove head or tail: fast path
    else if (bEnd === bStart) {
      while (aStart < aEnd) {
        // remove the node only if it's unknown or not live
        if (!map || !map.has(a[aStart])) removeChild(get(a[aStart], -1));
        aStart++;
      }
    } // same node: fast path
    else if (a[aStart] === b[bStart]) {
      aStart++;
      bStart++;
    } // same tail: fast path
    else if (a[aEnd - 1] === b[bEnd - 1]) {
      aEnd--;
      bEnd--;
    } // The once here single last swap "fast path" has been removed in v1.1.0
    // https://github.com/WebReflection/udomdiff/blob/single-final-swap/esm/index.js#L69-L85
    // reverse swap: also fast path
    else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
      // this is a "shrink" operation that could happen in these cases:
      // [1, 2, 3, 4, 5]
      // [1, 4, 3, 2, 5]
      // or asymmetric too
      // [1, 2, 3, 4, 5]
      // [1, 2, 3, 5, 6, 4]
      const node = get(a[--aEnd], -1).nextSibling;
      insertBefore(get(b[bStart++], 1), get(a[aStart++], -1).nextSibling);
      insertBefore(get(b[--bEnd], 1), node); // mark the future index as identical (yeah, it's dirty, but cheap 👍)
      // The main reason to do this, is that when a[aEnd] will be reached,
      // the loop will likely be on the fast path, as identical to b[bEnd].
      // In the best case scenario, the next loop will skip the tail,
      // but in the worst one, this node will be considered as already
      // processed, bailing out pretty quickly from the map index check

      a[aEnd] = b[bEnd];
    } // map based fallback, "slow" path
    else {
      // the map requires an O(bEnd - bStart) operation once
      // to store all future nodes indexes for later purposes.
      // In the worst case scenario, this is a full O(N) cost,
      // and such scenario happens at least when all nodes are different,
      // but also if both first and last items of the lists are different
      if (!map) {
        map = new Map();
        let i = bStart;

        while (i < bEnd) map.set(b[i], i++);
      } // if it's a future node, hence it needs some handling


      if (map.has(a[aStart])) {
        // grab the index of such node, 'cause it might have been processed
        const index = map.get(a[aStart]); // if it's not already processed, look on demand for the next LCS

        if (bStart < index && index < bEnd) {
          let i = aStart; // counts the amount of nodes that are the same in the future

          let sequence = 1;

          while (++i < aEnd && i < bEnd && map.get(a[i]) === index + sequence) sequence++; // effort decision here: if the sequence is longer than replaces
          // needed to reach such sequence, which would brings again this loop
          // to the fast path, prepend the difference before a sequence,
          // and move only the future list index forward, so that aStart
          // and bStart will be aligned again, hence on the fast path.
          // An example considering aStart and bStart are both 0:
          // a: [1, 2, 3, 4]
          // b: [7, 1, 2, 3, 6]
          // this would place 7 before 1 and, from that time on, 1, 2, and 3
          // will be processed at zero cost


          if (sequence > index - bStart) {
            const node = get(a[aStart], 0);

            while (bStart < index) insertBefore(get(b[bStart++], 1), node);
          } // if the effort wasn't good enough, fallback to a replace,
          // moving both source and target indexes forward, hoping that some
          // similar node will be found later on, to go back to the fast path
          else {
            replaceChild(get(b[bStart++], 1), get(a[aStart++], -1));
          }
        } // otherwise move the source forward, 'cause there's nothing to do
        else aStart++;
      } // this node has no meaning in the future list, so it's more than safe
      // to remove it, and check the next live node out instead, meaning
      // that only the live list index should be forwarded
      else removeChild(get(a[aStart++], -1));
    }
  }

  return b;
});

const UNMOUNT_SCOPE = Symbol('unmount');
const EachBinding = {
  // dynamic binding properties
  // childrenMap: null,
  // node: null,
  // root: null,
  // condition: null,
  // evaluate: null,
  // template: null,
  // isTemplateTag: false,
  nodes: [],

  // getKey: null,
  // indexName: null,
  // itemName: null,
  // afterPlaceholder: null,
  // placeholder: null,
  // API methods
  mount(scope, parentScope) {
    return this.update(scope, parentScope);
  },

  update(scope, parentScope) {
    const {
      placeholder,
      nodes,
      childrenMap
    } = this;
    const collection = scope === UNMOUNT_SCOPE ? null : this.evaluate(scope);
    const items = collection ? Array.from(collection) : []; // prepare the diffing

    const {
      newChildrenMap,
      batches,
      futureNodes
    } = createPatch(items, scope, parentScope, this); // patch the DOM only if there are new nodes

    udomdiff(nodes, futureNodes, patch(Array.from(childrenMap.values()), parentScope), placeholder); // trigger the mounts and the updates

    batches.forEach(fn => fn()); // update the children map

    this.childrenMap = newChildrenMap;
    this.nodes = futureNodes;
    return this;
  },

  unmount(scope, parentScope) {
    this.update(UNMOUNT_SCOPE, parentScope);
    return this;
  }

};
/**
 * Patch the DOM while diffing
 * @param   {any[]} redundant - list of all the children (template, nodes, context) added via each
 * @param   {*} parentScope - scope of the parent template
 * @returns {Function} patch function used by domdiff
 */

function patch(redundant, parentScope) {
  return (item, info) => {
    if (info < 0) {
      // get the last element added to the childrenMap saved previously
      const element = redundant[redundant.length - 1];

      if (element) {
        // get the nodes and the template in stored in the last child of the childrenMap
        const {
          template,
          nodes,
          context
        } = element; // remove the last node (notice <template> tags might have more children nodes)

        nodes.pop(); // notice that we pass null as last argument because
        // the root node and its children will be removed by domdiff

        if (!nodes.length) {
          // we have cleared all the children nodes and we can unmount this template
          redundant.pop();
          template.unmount(context, parentScope, null);
        }
      }
    }

    return item;
  };
}
/**
 * Check whether a template must be filtered from a loop
 * @param   {Function} condition - filter function
 * @param   {Object} context - argument passed to the filter function
 * @returns {boolean} true if this item should be skipped
 */


function mustFilterItem(condition, context) {
  return condition ? !condition(context) : false;
}
/**
 * Extend the scope of the looped template
 * @param   {Object} scope - current template scope
 * @param   {Object} options - options
 * @param   {string} options.itemName - key to identify the looped item in the new context
 * @param   {string} options.indexName - key to identify the index of the looped item
 * @param   {number} options.index - current index
 * @param   {*} options.item - collection item looped
 * @returns {Object} enhanced scope object
 */


function extendScope(scope, _ref) {
  let {
    itemName,
    indexName,
    index,
    item
  } = _ref;
  defineProperty(scope, itemName, item);
  if (indexName) defineProperty(scope, indexName, index);
  return scope;
}
/**
 * Loop the current template items
 * @param   {Array} items - expression collection value
 * @param   {*} scope - template scope
 * @param   {*} parentScope - scope of the parent template
 * @param   {EachBinding} binding - each binding object instance
 * @returns {Object} data
 * @returns {Map} data.newChildrenMap - a Map containing the new children template structure
 * @returns {Array} data.batches - array containing the template lifecycle functions to trigger
 * @returns {Array} data.futureNodes - array containing the nodes we need to diff
 */


function createPatch(items, scope, parentScope, binding) {
  const {
    condition,
    template,
    childrenMap,
    itemName,
    getKey,
    indexName,
    root,
    isTemplateTag
  } = binding;
  const newChildrenMap = new Map();
  const batches = [];
  const futureNodes = [];
  items.forEach((item, index) => {
    const context = extendScope(Object.create(scope), {
      itemName,
      indexName,
      index,
      item
    });
    const key = getKey ? getKey(context) : index;
    const oldItem = childrenMap.get(key);
    const nodes = [];

    if (mustFilterItem(condition, context)) {
      return;
    }

    const mustMount = !oldItem;
    const componentTemplate = oldItem ? oldItem.template : template.clone();
    const el = componentTemplate.el || root.cloneNode();
    const meta = isTemplateTag && mustMount ? createTemplateMeta(componentTemplate) : componentTemplate.meta;

    if (mustMount) {
      batches.push(() => componentTemplate.mount(el, context, parentScope, meta));
    } else {
      batches.push(() => componentTemplate.update(context, parentScope));
    } // create the collection of nodes to update or to add
    // in case of template tags we need to add all its children nodes


    if (isTemplateTag) {
      nodes.push(...meta.children);
    } else {
      nodes.push(el);
    } // delete the old item from the children map


    childrenMap.delete(key);
    futureNodes.push(...nodes); // update the children map

    newChildrenMap.set(key, {
      nodes,
      template: componentTemplate,
      context,
      index
    });
  });
  return {
    newChildrenMap,
    batches,
    futureNodes
  };
}

function create$6(node, _ref2) {
  let {
    evaluate,
    condition,
    itemName,
    indexName,
    getKey,
    template
  } = _ref2;
  const placeholder = document.createTextNode('');
  const root = node.cloneNode();
  insertBefore(placeholder, node);
  removeChild(node);
  return Object.assign({}, EachBinding, {
    childrenMap: new Map(),
    node,
    root,
    condition,
    evaluate,
    isTemplateTag: isTemplate(root),
    template: template.createDOM(node),
    getKey,
    indexName,
    itemName,
    placeholder
  });
}

/**
 * Binding responsible for the `if` directive
 */

const IfBinding = {
  // dynamic binding properties
  // node: null,
  // evaluate: null,
  // isTemplateTag: false,
  // placeholder: null,
  // template: null,
  // API methods
  mount(scope, parentScope) {
    return this.update(scope, parentScope);
  },

  update(scope, parentScope) {
    const value = !!this.evaluate(scope);
    const mustMount = !this.value && value;
    const mustUnmount = this.value && !value;

    const mount = () => {
      const pristine = this.node.cloneNode();
      insertBefore(pristine, this.placeholder);
      this.template = this.template.clone();
      this.template.mount(pristine, scope, parentScope);
    };

    switch (true) {
      case mustMount:
        mount();
        break;

      case mustUnmount:
        this.unmount(scope);
        break;

      default:
        if (value) this.template.update(scope, parentScope);
    }

    this.value = value;
    return this;
  },

  unmount(scope, parentScope) {
    this.template.unmount(scope, parentScope, true);
    return this;
  }

};
function create$5(node, _ref) {
  let {
    evaluate,
    template
  } = _ref;
  const placeholder = document.createTextNode('');
  insertBefore(placeholder, node);
  removeChild(node);
  return Object.assign({}, IfBinding, {
    node,
    evaluate,
    placeholder,
    template: template.createDOM(node)
  });
}

/**
 * Throw an error with a descriptive message
 * @param   { string } message - error message
 * @returns { undefined } hoppla.. at this point the program should stop working
 */

function panic(message) {
  throw new Error(message);
}
/**
 * Returns the memoized (cached) function.
 * // borrowed from https://www.30secondsofcode.org/js/s/memoize
 * @param {Function} fn - function to memoize
 * @returns {Function} memoize function
 */

function memoize(fn) {
  const cache = new Map();

  const cached = val => {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
  };

  cached.cache = cache;
  return cached;
}
/**
 * Evaluate a list of attribute expressions
 * @param   {Array} attributes - attribute expressions generated by the riot compiler
 * @returns {Object} key value pairs with the result of the computation
 */

function evaluateAttributeExpressions(attributes) {
  return attributes.reduce((acc, attribute) => {
    const {
      value,
      type
    } = attribute;

    switch (true) {
      // spread attribute
      case !attribute.name && type === ATTRIBUTE:
        return Object.assign({}, acc, value);
      // value attribute

      case type === VALUE:
        acc.value = attribute.value;
        break;
      // normal attributes

      default:
        acc[dashToCamelCase(attribute.name)] = attribute.value;
    }

    return acc;
  }, {});
}

const ElementProto = typeof Element === 'undefined' ? {} : Element.prototype;
const isNativeHtmlProperty = memoize(name => ElementProto.hasOwnProperty(name)); // eslint-disable-line

/**
 * Add all the attributes provided
 * @param   {HTMLElement} node - target node
 * @param   {Object} attributes - object containing the attributes names and values
 * @returns {undefined} sorry it's a void function :(
 */

function setAllAttributes(node, attributes) {
  Object.entries(attributes).forEach(_ref => {
    let [name, value] = _ref;
    return attributeExpression(node, {
      name
    }, value);
  });
}
/**
 * Remove all the attributes provided
 * @param   {HTMLElement} node - target node
 * @param   {Object} newAttributes - object containing all the new attribute names
 * @param   {Object} oldAttributes - object containing all the old attribute names
 * @returns {undefined} sorry it's a void function :(
 */


function removeAllAttributes(node, newAttributes, oldAttributes) {
  const newKeys = newAttributes ? Object.keys(newAttributes) : [];
  Object.keys(oldAttributes).filter(name => !newKeys.includes(name)).forEach(attribute => node.removeAttribute(attribute));
}
/**
 * Check whether the attribute value can be rendered
 * @param {*} value - expression value
 * @returns {boolean} true if we can render this attribute value
 */


function canRenderAttribute(value) {
  return value === true || ['string', 'number'].includes(typeof value);
}
/**
 * Check whether the attribute should be removed
 * @param {*} value - expression value
 * @returns {boolean} boolean - true if the attribute can be removed}
 */


function shouldRemoveAttribute(value) {
  return !value && value !== 0;
}
/**
 * This methods handles the DOM attributes updates
 * @param   {HTMLElement} node - target node
 * @param   {Object} expression - expression object
 * @param   {string} expression.name - attribute name
 * @param   {*} value - new expression value
 * @param   {*} oldValue - the old expression cached value
 * @returns {undefined}
 */


function attributeExpression(node, _ref2, value, oldValue) {
  let {
    name
  } = _ref2;

  // is it a spread operator? {...attributes}
  if (!name) {
    if (oldValue) {
      // remove all the old attributes
      removeAllAttributes(node, value, oldValue);
    } // is the value still truthy?


    if (value) {
      setAllAttributes(node, value);
    }

    return;
  } // handle boolean attributes


  if (!isNativeHtmlProperty(name) && (isBoolean(value) || isObject(value) || isFunction(value))) {
    node[name] = value;
  }

  if (shouldRemoveAttribute(value)) {
    node.removeAttribute(name);
  } else if (canRenderAttribute(value)) {
    node.setAttribute(name, normalizeValue(name, value));
  }
}
/**
 * Get the value as string
 * @param   {string} name - attribute name
 * @param   {*} value - user input value
 * @returns {string} input value as string
 */

function normalizeValue(name, value) {
  // be sure that expressions like selected={ true } will be always rendered as selected='selected'
  return value === true ? name : value;
}

const RE_EVENTS_PREFIX = /^on/;

const getCallbackAndOptions = value => Array.isArray(value) ? value : [value, false]; // see also https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38


const EventListener = {
  handleEvent(event) {
    this[event.type](event);
  }

};
const ListenersWeakMap = new WeakMap();

const createListener = node => {
  const listener = Object.create(EventListener);
  ListenersWeakMap.set(node, listener);
  return listener;
};
/**
 * Set a new event listener
 * @param   {HTMLElement} node - target node
 * @param   {Object} expression - expression object
 * @param   {string} expression.name - event name
 * @param   {*} value - new expression value
 * @returns {value} the callback just received
 */


function eventExpression(node, _ref, value) {
  let {
    name
  } = _ref;
  const normalizedEventName = name.replace(RE_EVENTS_PREFIX, '');
  const eventListener = ListenersWeakMap.get(node) || createListener(node);
  const [callback, options] = getCallbackAndOptions(value);
  const handler = eventListener[normalizedEventName];
  const mustRemoveEvent = handler && !callback;
  const mustAddEvent = callback && !handler;

  if (mustRemoveEvent) {
    node.removeEventListener(normalizedEventName, eventListener);
  }

  if (mustAddEvent) {
    node.addEventListener(normalizedEventName, eventListener, options);
  }

  eventListener[normalizedEventName] = callback;
}

/**
 * Normalize the user value in order to render a empty string in case of falsy values
 * @param   {*} value - user input value
 * @returns {string} hopefully a string
 */

function normalizeStringValue(value) {
  return isNil(value) ? '' : value;
}

/**
 * Get the the target text node to update or create one from of a comment node
 * @param   {HTMLElement} node - any html element containing childNodes
 * @param   {number} childNodeIndex - index of the text node in the childNodes list
 * @returns {Text} the text node to update
 */

const getTextNode = (node, childNodeIndex) => {
  const target = node.childNodes[childNodeIndex];

  if (target.nodeType === Node.COMMENT_NODE) {
    const textNode = document.createTextNode('');
    node.replaceChild(textNode, target);
    return textNode;
  }

  return target;
};
/**
 * This methods handles a simple text expression update
 * @param   {HTMLElement} node - target node
 * @param   {Object} data - expression object
 * @param   {*} value - new expression value
 * @returns {undefined}
 */

function textExpression(node, data, value) {
  node.data = normalizeStringValue(value);
}

/**
 * This methods handles the input fileds value updates
 * @param   {HTMLElement} node - target node
 * @param   {Object} expression - expression object
 * @param   {*} value - new expression value
 * @returns {undefined}
 */

function valueExpression(node, expression, value) {
  node.value = normalizeStringValue(value);
}

var expressions = {
  [ATTRIBUTE]: attributeExpression,
  [EVENT]: eventExpression,
  [TEXT]: textExpression,
  [VALUE]: valueExpression
};

const Expression = {
  // Static props
  // node: null,
  // value: null,
  // API methods

  /**
   * Mount the expression evaluating its initial value
   * @param   {*} scope - argument passed to the expression to evaluate its current values
   * @returns {Expression} self
   */
  mount(scope) {
    // hopefully a pure function
    this.value = this.evaluate(scope); // IO() DOM updates

    apply(this, this.value);
    return this;
  },

  /**
   * Update the expression if its value changed
   * @param   {*} scope - argument passed to the expression to evaluate its current values
   * @returns {Expression} self
   */
  update(scope) {
    // pure function
    const value = this.evaluate(scope);

    if (this.value !== value) {
      // IO() DOM updates
      apply(this, value);
      this.value = value;
    }

    return this;
  },

  /**
   * Expression teardown method
   * @returns {Expression} self
   */
  unmount() {
    // unmount only the event handling expressions
    if (this.type === EVENT) apply(this, null);
    return this;
  }

};
/**
 * IO() function to handle the DOM updates
 * @param {Expression} expression - expression object
 * @param {*} value - current expression value
 * @returns {undefined}
 */

function apply(expression, value) {
  return expressions[expression.type](expression.node, expression, value, expression.value);
}

function create$4(node, data) {
  return Object.assign({}, Expression, data, {
    node: data.type === TEXT ? getTextNode(node, data.childNodeIndex) : node
  });
}

/**
 * Create a flat object having as keys a list of methods that if dispatched will propagate
 * on the whole collection
 * @param   {Array} collection - collection to iterate
 * @param   {Array<string>} methods - methods to execute on each item of the collection
 * @param   {*} context - context returned by the new methods created
 * @returns {Object} a new object to simplify the the nested methods dispatching
 */
function flattenCollectionMethods(collection, methods, context) {
  return methods.reduce((acc, method) => {
    return Object.assign({}, acc, {
      [method]: scope => {
        return collection.map(item => item[method](scope)) && context;
      }
    });
  }, {});
}

function create$3(node, _ref) {
  let {
    expressions
  } = _ref;
  return Object.assign({}, flattenCollectionMethods(expressions.map(expression => create$4(node, expression)), ['mount', 'update', 'unmount']));
}

function extendParentScope(attributes, scope, parentScope) {
  if (!attributes || !attributes.length) return parentScope;
  const expressions = attributes.map(attr => Object.assign({}, attr, {
    value: attr.evaluate(scope)
  }));
  return Object.assign(Object.create(parentScope || null), evaluateAttributeExpressions(expressions));
} // this function is only meant to fix an edge case
// https://github.com/riot/riot/issues/2842


const getRealParent = (scope, parentScope) => scope[PARENT_KEY_SYMBOL] || parentScope;

const SlotBinding = {
  // dynamic binding properties
  // node: null,
  // name: null,
  attributes: [],

  // template: null,
  getTemplateScope(scope, parentScope) {
    return extendParentScope(this.attributes, scope, parentScope);
  },

  // API methods
  mount(scope, parentScope) {
    const templateData = scope.slots ? scope.slots.find(_ref => {
      let {
        id
      } = _ref;
      return id === this.name;
    }) : false;
    const {
      parentNode
    } = this.node;
    const realParent = getRealParent(scope, parentScope);
    this.template = templateData && create(templateData.html, templateData.bindings).createDOM(parentNode);

    if (this.template) {
      cleanNode(this.node);
      this.template.mount(this.node, this.getTemplateScope(scope, realParent), realParent);
      this.template.children = Array.from(this.node.childNodes);
    }

    moveSlotInnerContent(this.node);
    removeChild(this.node);
    return this;
  },

  update(scope, parentScope) {
    if (this.template) {
      const realParent = getRealParent(scope, parentScope);
      this.template.update(this.getTemplateScope(scope, realParent), realParent);
    }

    return this;
  },

  unmount(scope, parentScope, mustRemoveRoot) {
    if (this.template) {
      this.template.unmount(this.getTemplateScope(scope, parentScope), null, mustRemoveRoot);
    }

    return this;
  }

};
/**
 * Move the inner content of the slots outside of them
 * @param   {HTMLElement} slot - slot node
 * @returns {undefined} it's a void method ¯\_(ツ)_/¯
 */

function moveSlotInnerContent(slot) {
  const child = slot && slot.firstChild;
  if (!child) return;
  insertBefore(child, slot);
  moveSlotInnerContent(slot);
}
/**
 * Create a single slot binding
 * @param   {HTMLElement} node - slot node
 * @param   {string} name - slot id
 * @param   {AttributeExpressionData[]} attributes - slot attributes
 * @returns {Object} Slot binding object
 */


function createSlot(node, _ref2) {
  let {
    name,
    attributes
  } = _ref2;
  return Object.assign({}, SlotBinding, {
    attributes,
    node,
    name
  });
}

/**
 * Create a new tag object if it was registered before, otherwise fallback to the simple
 * template chunk
 * @param   {Function} component - component factory function
 * @param   {Array<Object>} slots - array containing the slots markup
 * @param   {Array} attributes - dynamic attributes that will be received by the tag element
 * @returns {TagImplementation|TemplateChunk} a tag implementation or a template chunk as fallback
 */

function getTag(component, slots, attributes) {
  if (slots === void 0) {
    slots = [];
  }

  if (attributes === void 0) {
    attributes = [];
  }

  // if this tag was registered before we will return its implementation
  if (component) {
    return component({
      slots,
      attributes
    });
  } // otherwise we return a template chunk


  return create(slotsToMarkup(slots), [...slotBindings(slots), {
    // the attributes should be registered as binding
    // if we fallback to a normal template chunk
    expressions: attributes.map(attr => {
      return Object.assign({
        type: ATTRIBUTE
      }, attr);
    })
  }]);
}
/**
 * Merge all the slots bindings into a single array
 * @param   {Array<Object>} slots - slots collection
 * @returns {Array<Bindings>} flatten bindings array
 */


function slotBindings(slots) {
  return slots.reduce((acc, _ref) => {
    let {
      bindings
    } = _ref;
    return acc.concat(bindings);
  }, []);
}
/**
 * Merge all the slots together in a single markup string
 * @param   {Array<Object>} slots - slots collection
 * @returns {string} markup of all the slots in a single string
 */


function slotsToMarkup(slots) {
  return slots.reduce((acc, slot) => {
    return acc + slot.html;
  }, '');
}

const TagBinding = {
  // dynamic binding properties
  // node: null,
  // evaluate: null,
  // name: null,
  // slots: null,
  // tag: null,
  // attributes: null,
  // getComponent: null,
  mount(scope) {
    return this.update(scope);
  },

  update(scope, parentScope) {
    const name = this.evaluate(scope); // simple update

    if (name && name === this.name) {
      this.tag.update(scope);
    } else {
      // unmount the old tag if it exists
      this.unmount(scope, parentScope, true); // mount the new tag

      this.name = name;
      this.tag = getTag(this.getComponent(name), this.slots, this.attributes);
      this.tag.mount(this.node, scope);
    }

    return this;
  },

  unmount(scope, parentScope, keepRootTag) {
    if (this.tag) {
      // keep the root tag
      this.tag.unmount(keepRootTag);
    }

    return this;
  }

};
function create$2(node, _ref2) {
  let {
    evaluate,
    getComponent,
    slots,
    attributes
  } = _ref2;
  return Object.assign({}, TagBinding, {
    node,
    evaluate,
    slots,
    attributes,
    getComponent
  });
}

var bindings = {
  [IF]: create$5,
  [SIMPLE]: create$3,
  [EACH]: create$6,
  [TAG]: create$2,
  [SLOT]: createSlot
};

/**
 * Text expressions in a template tag will get childNodeIndex value normalized
 * depending on the position of the <template> tag offset
 * @param   {Expression[]} expressions - riot expressions array
 * @param   {number} textExpressionsOffset - offset of the <template> tag
 * @returns {Expression[]} expressions containing the text expressions normalized
 */

function fixTextExpressionsOffset(expressions, textExpressionsOffset) {
  return expressions.map(e => e.type === TEXT ? Object.assign({}, e, {
    childNodeIndex: e.childNodeIndex + textExpressionsOffset
  }) : e);
}
/**
 * Bind a new expression object to a DOM node
 * @param   {HTMLElement} root - DOM node where to bind the expression
 * @param   {TagBindingData} binding - binding data
 * @param   {number|null} templateTagOffset - if it's defined we need to fix the text expressions childNodeIndex offset
 * @returns {Binding} Binding object
 */


function create$1(root, binding, templateTagOffset) {
  const {
    selector,
    type,
    redundantAttribute,
    expressions
  } = binding; // find the node to apply the bindings

  const node = selector ? root.querySelector(selector) : root; // remove eventually additional attributes created only to select this node

  if (redundantAttribute) node.removeAttribute(redundantAttribute);
  const bindingExpressions = expressions || []; // init the binding

  return (bindings[type] || bindings[SIMPLE])(node, Object.assign({}, binding, {
    expressions: templateTagOffset && !selector ? fixTextExpressionsOffset(bindingExpressions, templateTagOffset) : bindingExpressions
  }));
}

function createHTMLTree(html, root) {
  const template = isTemplate(root) ? root : document.createElement('template');
  template.innerHTML = html;
  return template.content;
} // for svg nodes we need a bit more work


function createSVGTree(html, container) {
  // create the SVGNode
  const svgNode = container.ownerDocument.importNode(new window.DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${html}</svg>`, 'application/xml').documentElement, true);
  return svgNode;
}
/**
 * Create the DOM that will be injected
 * @param {Object} root - DOM node to find out the context where the fragment will be created
 * @param   {string} html - DOM to create as string
 * @returns {HTMLDocumentFragment|HTMLElement} a new html fragment
 */


function createDOMTree(root, html) {
  if (isSvg(root)) return createSVGTree(html, root);
  return createHTMLTree(html, root);
}

/**
 * Inject the DOM tree into a target node
 * @param   {HTMLElement} el - target element
 * @param   {DocumentFragment|SVGElement} dom - dom tree to inject
 * @returns {undefined}
 */

function injectDOM(el, dom) {
  switch (true) {
    case isSvg(el):
      moveChildren(dom, el);
      break;

    case isTemplate(el):
      el.parentNode.replaceChild(dom, el);
      break;

    default:
      el.appendChild(dom);
  }
}

/**
 * Create the Template DOM skeleton
 * @param   {HTMLElement} el - root node where the DOM will be injected
 * @param   {string|HTMLElement} html - HTML markup or HTMLElement that will be injected into the root node
 * @returns {?DocumentFragment} fragment that will be injected into the root node
 */

function createTemplateDOM(el, html) {
  return html && (typeof html === 'string' ? createDOMTree(el, html) : html);
}
/**
 * Get the offset of the <template> tag
 * @param {HTMLElement} parentNode - template tag parent node
 * @param {HTMLElement} el - the template tag we want to render
 * @param   {Object} meta - meta properties needed to handle the <template> tags in loops
 * @returns {number} offset of the <template> tag calculated from its siblings DOM nodes
 */


function getTemplateTagOffset(parentNode, el, meta) {
  const siblings = Array.from(parentNode.childNodes);
  return Math.max(siblings.indexOf(el), siblings.indexOf(meta.head) + 1, 0);
}
/**
 * Template Chunk model
 * @type {Object}
 */


const TemplateChunk = Object.freeze({
  // Static props
  // bindings: null,
  // bindingsData: null,
  // html: null,
  // isTemplateTag: false,
  // fragment: null,
  // children: null,
  // dom: null,
  // el: null,

  /**
   * Create the template DOM structure that will be cloned on each mount
   * @param   {HTMLElement} el - the root node
   * @returns {TemplateChunk} self
   */
  createDOM(el) {
    // make sure that the DOM gets created before cloning the template
    this.dom = this.dom || createTemplateDOM(el, this.html) || document.createDocumentFragment();
    return this;
  },

  // API methods

  /**
   * Attach the template to a DOM node
   * @param   {HTMLElement} el - target DOM node
   * @param   {*} scope - template data
   * @param   {*} parentScope - scope of the parent template tag
   * @param   {Object} meta - meta properties needed to handle the <template> tags in loops
   * @returns {TemplateChunk} self
   */
  mount(el, scope, parentScope, meta) {
    if (meta === void 0) {
      meta = {};
    }

    if (!el) throw new Error('Please provide DOM node to mount properly your template');
    if (this.el) this.unmount(scope); // <template> tags require a bit more work
    // the template fragment might be already created via meta outside of this call

    const {
      fragment,
      children,
      avoidDOMInjection
    } = meta; // <template> bindings of course can not have a root element
    // so we check the parent node to set the query selector bindings

    const {
      parentNode
    } = children ? children[0] : el;
    const isTemplateTag = isTemplate(el);
    const templateTagOffset = isTemplateTag ? getTemplateTagOffset(parentNode, el, meta) : null; // create the DOM if it wasn't created before

    this.createDOM(el); // create the DOM of this template cloning the original DOM structure stored in this instance
    // notice that if a documentFragment was passed (via meta) we will use it instead

    const cloneNode = fragment || this.dom.cloneNode(true); // store root node
    // notice that for template tags the root note will be the parent tag

    this.el = isTemplateTag ? parentNode : el; // create the children array only for the <template> fragments

    this.children = isTemplateTag ? children || Array.from(cloneNode.childNodes) : null; // inject the DOM into the el only if a fragment is available

    if (!avoidDOMInjection && cloneNode) injectDOM(el, cloneNode); // create the bindings

    this.bindings = this.bindingsData.map(binding => create$1(this.el, binding, templateTagOffset));
    this.bindings.forEach(b => b.mount(scope, parentScope)); // store the template meta properties

    this.meta = meta;
    return this;
  },

  /**
   * Update the template with fresh data
   * @param   {*} scope - template data
   * @param   {*} parentScope - scope of the parent template tag
   * @returns {TemplateChunk} self
   */
  update(scope, parentScope) {
    this.bindings.forEach(b => b.update(scope, parentScope));
    return this;
  },

  /**
   * Remove the template from the node where it was initially mounted
   * @param   {*} scope - template data
   * @param   {*} parentScope - scope of the parent template tag
   * @param   {boolean|null} mustRemoveRoot - if true remove the root element,
   * if false or undefined clean the root tag content, if null don't touch the DOM
   * @returns {TemplateChunk} self
   */
  unmount(scope, parentScope, mustRemoveRoot) {
    if (mustRemoveRoot === void 0) {
      mustRemoveRoot = false;
    }

    const el = this.el;

    if (!el) {
      return this;
    }

    this.bindings.forEach(b => b.unmount(scope, parentScope, mustRemoveRoot));

    switch (true) {
      // pure components should handle the DOM unmount updates by themselves
      // for mustRemoveRoot === null don't touch the DOM
      case el[IS_PURE_SYMBOL] || mustRemoveRoot === null:
        break;
      // if children are declared, clear them
      // applicable for <template> and <slot/> bindings

      case Array.isArray(this.children):
        clearChildren(this.children);
        break;
      // clean the node children only

      case !mustRemoveRoot:
        cleanNode(el);
        break;
      // remove the root node only if the mustRemoveRoot is truly

      case !!mustRemoveRoot:
        removeChild(el);
        break;
    }

    this.el = null;
    return this;
  },

  /**
   * Clone the template chunk
   * @returns {TemplateChunk} a clone of this object resetting the this.el property
   */
  clone() {
    return Object.assign({}, this, {
      meta: {},
      el: null
    });
  }

});
/**
 * Create a template chunk wiring also the bindings
 * @param   {string|HTMLElement} html - template string
 * @param   {BindingData[]} bindings - bindings collection
 * @returns {TemplateChunk} a new TemplateChunk copy
 */

function create(html, bindings) {
  if (bindings === void 0) {
    bindings = [];
  }

  return Object.assign({}, TemplateChunk, {
    html,
    bindingsData: bindings
  });
}

/**
 * Method used to bind expressions to a DOM node
 * @param   {string|HTMLElement} html - your static template html structure
 * @param   {Array} bindings - list of the expressions to bind to update the markup
 * @returns {TemplateChunk} a new TemplateChunk object having the `update`,`mount`, `unmount` and `clone` methods
 *
 * @example
 *
 * riotDOMBindings
 *  .template(
 *   `<div expr0><!----></div><div><p expr1><!----><section expr2></section></p>`,
 *   [
 *     {
 *       selector: '[expr0]',
 *       redundantAttribute: 'expr0',
 *       expressions: [
 *         {
 *           type: expressionTypes.TEXT,
 *           childNodeIndex: 0,
 *           evaluate(scope) {
 *             return scope.time;
 *           },
 *         },
 *       ],
 *     },
 *     {
 *       selector: '[expr1]',
 *       redundantAttribute: 'expr1',
 *       expressions: [
 *         {
 *           type: expressionTypes.TEXT,
 *           childNodeIndex: 0,
 *           evaluate(scope) {
 *             return scope.name;
 *           },
 *         },
 *         {
 *           type: 'attribute',
 *           name: 'style',
 *           evaluate(scope) {
 *             return scope.style;
 *           },
 *         },
 *       ],
 *     },
 *     {
 *       selector: '[expr2]',
 *       redundantAttribute: 'expr2',
 *       type: bindingTypes.IF,
 *       evaluate(scope) {
 *         return scope.isVisible;
 *       },
 *       template: riotDOMBindings.template('hello there'),
 *     },
 *   ]
 * )
 */

var DOMBindings = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: create,
  createBinding: create$1,
  createExpression: create$4,
  bindingTypes: bindingTypes,
  expressionTypes: expressionTypes
});

function noop() {
  return this;
}
/**
 * Autobind the methods of a source object to itself
 * @param   {Object} source - probably a riot tag instance
 * @param   {Array<string>} methods - list of the methods to autobind
 * @returns {Object} the original object received
 */

function autobindMethods(source, methods) {
  methods.forEach(method => {
    source[method] = source[method].bind(source);
  });
  return source;
}
/**
 * Call the first argument received only if it's a function otherwise return it as it is
 * @param   {*} source - anything
 * @returns {*} anything
 */

function callOrAssign(source) {
  return isFunction(source) ? source.prototype && source.prototype.constructor ? new source() : source() : source;
}

/**
 * Converts any DOM node/s to a loopable array
 * @param   { HTMLElement|NodeList } els - single html element or a node list
 * @returns { Array } always a loopable object
 */
function domToArray(els) {
  // can this object be already looped?
  if (!Array.isArray(els)) {
    // is it a node list?
    if (/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(els)) && typeof els.length === 'number') return Array.from(els);else // if it's a single node
      // it will be returned as "array" with one single entry
      return [els];
  } // this object could be looped out of the box


  return els;
}

/**
 * Simple helper to find DOM nodes returning them as array like loopable object
 * @param   { string|DOMNodeList } selector - either the query or the DOM nodes to arraify
 * @param   { HTMLElement }        ctx      - context defining where the query will search for the DOM nodes
 * @returns { Array } DOM nodes found as array
 */

function $(selector, ctx) {
  return domToArray(typeof selector === 'string' ? (ctx || document).querySelectorAll(selector) : selector);
}

/**
 * Normalize the return values, in case of a single value we avoid to return an array
 * @param   { Array } values - list of values we want to return
 * @returns { Array|string|boolean } either the whole list of values or the single one found
 * @private
 */

const normalize = values => values.length === 1 ? values[0] : values;
/**
 * Parse all the nodes received to get/remove/check their attributes
 * @param   { HTMLElement|NodeList|Array } els    - DOM node/s to parse
 * @param   { string|Array }               name   - name or list of attributes
 * @param   { string }                     method - method that will be used to parse the attributes
 * @returns { Array|string } result of the parsing in a list or a single value
 * @private
 */


function parseNodes(els, name, method) {
  const names = typeof name === 'string' ? [name] : name;
  return normalize(domToArray(els).map(el => {
    return normalize(names.map(n => el[method](n)));
  }));
}
/**
 * Set any attribute on a single or a list of DOM nodes
 * @param   { HTMLElement|NodeList|Array } els   - DOM node/s to parse
 * @param   { string|Object }              name  - either the name of the attribute to set
 *                                                 or a list of properties as object key - value
 * @param   { string }                     value - the new value of the attribute (optional)
 * @returns { HTMLElement|NodeList|Array } the original array of elements passed to this function
 *
 * @example
 *
 * import { set } from 'bianco.attr'
 *
 * const img = document.createElement('img')
 *
 * set(img, 'width', 100)
 *
 * // or also
 * set(img, {
 *   width: 300,
 *   height: 300
 * })
 *
 */


function set(els, name, value) {
  const attrs = typeof name === 'object' ? name : {
    [name]: value
  };
  const props = Object.keys(attrs);
  domToArray(els).forEach(el => {
    props.forEach(prop => el.setAttribute(prop, attrs[prop]));
  });
  return els;
}
/**
 * Get any attribute from a single or a list of DOM nodes
 * @param   { HTMLElement|NodeList|Array } els   - DOM node/s to parse
 * @param   { string|Array }               name  - name or list of attributes to get
 * @returns { Array|string } list of the attributes found
 *
 * @example
 *
 * import { get } from 'bianco.attr'
 *
 * const img = document.createElement('img')
 *
 * get(img, 'width') // => '200'
 *
 * // or also
 * get(img, ['width', 'height']) // => ['200', '300']
 *
 * // or also
 * get([img1, img2], ['width', 'height']) // => [['200', '300'], ['500', '200']]
 */

function get(els, name) {
  return parseNodes(els, name, 'getAttribute');
}

const CSS_BY_NAME = new Map();
const STYLE_NODE_SELECTOR = 'style[riot]'; // memoized curried function

const getStyleNode = (style => {
  return () => {
    // lazy evaluation:
    // if this function was already called before
    // we return its cached result
    if (style) return style; // create a new style element or use an existing one
    // and cache it internally

    style = $(STYLE_NODE_SELECTOR)[0] || document.createElement('style');
    set(style, 'type', 'text/css');
    /* istanbul ignore next */

    if (!style.parentNode) document.head.appendChild(style);
    return style;
  };
})();
/**
 * Object that will be used to inject and manage the css of every tag instance
 */


var cssManager = {
  CSS_BY_NAME,

  /**
   * Save a tag style to be later injected into DOM
   * @param { string } name - if it's passed we will map the css to a tagname
   * @param { string } css - css string
   * @returns {Object} self
   */
  add(name, css) {
    if (!CSS_BY_NAME.has(name)) {
      CSS_BY_NAME.set(name, css);
      this.inject();
    }

    return this;
  },

  /**
   * Inject all previously saved tag styles into DOM
   * innerHTML seems slow: http://jsperf.com/riot-insert-style
   * @returns {Object} self
   */
  inject() {
    getStyleNode().innerHTML = [...CSS_BY_NAME.values()].join('\n');
    return this;
  },

  /**
   * Remove a tag style from the DOM
   * @param {string} name a registered tagname
   * @returns {Object} self
   */
  remove(name) {
    if (CSS_BY_NAME.has(name)) {
      CSS_BY_NAME.delete(name);
      this.inject();
    }

    return this;
  }

};

/**
 * Function to curry any javascript method
 * @param   {Function}  fn - the target function we want to curry
 * @param   {...[args]} acc - initial arguments
 * @returns {Function|*} it will return a function until the target function
 *                       will receive all of its arguments
 */
function curry(fn) {
  for (var _len = arguments.length, acc = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    acc[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args = [...acc, ...args];
    return args.length < fn.length ? curry(fn, ...args) : fn(...args);
  };
}

/**
 * Get the tag name of any DOM node
 * @param   {HTMLElement} element - DOM node we want to inspect
 * @returns {string} name to identify this dom node in riot
 */

function getName(element) {
  return get(element, IS_DIRECTIVE) || element.tagName.toLowerCase();
}

const COMPONENT_CORE_HELPERS = Object.freeze({
  // component helpers
  $(selector) {
    return $(selector, this.root)[0];
  },

  $$(selector) {
    return $(selector, this.root);
  }

});
const PURE_COMPONENT_API = Object.freeze({
  [MOUNT_METHOD_KEY]: noop,
  [UPDATE_METHOD_KEY]: noop,
  [UNMOUNT_METHOD_KEY]: noop
});
const COMPONENT_LIFECYCLE_METHODS = Object.freeze({
  [SHOULD_UPDATE_KEY]: noop,
  [ON_BEFORE_MOUNT_KEY]: noop,
  [ON_MOUNTED_KEY]: noop,
  [ON_BEFORE_UPDATE_KEY]: noop,
  [ON_UPDATED_KEY]: noop,
  [ON_BEFORE_UNMOUNT_KEY]: noop,
  [ON_UNMOUNTED_KEY]: noop
});
const MOCKED_TEMPLATE_INTERFACE = Object.assign({}, PURE_COMPONENT_API, {
  clone: noop,
  createDOM: noop
});
/**
 * Performance optimization for the recursive components
 * @param  {RiotComponentWrapper} componentWrapper - riot compiler generated object
 * @returns {Object} component like interface
 */

const memoizedCreateComponent = memoize(createComponent);
/**
 * Evaluate the component properties either from its real attributes or from its initial user properties
 * @param   {HTMLElement} element - component root
 * @param   {Object}  initialProps - initial props
 * @returns {Object} component props key value pairs
 */

function evaluateInitialProps(element, initialProps) {
  if (initialProps === void 0) {
    initialProps = {};
  }

  return Object.assign({}, DOMattributesToObject(element), callOrAssign(initialProps));
}
/**
 * Bind a DOM node to its component object
 * @param   {HTMLElement} node - html node mounted
 * @param   {Object} component - Riot.js component object
 * @returns {Object} the component object received as second argument
 */


const bindDOMNodeToComponentObject = (node, component) => node[DOM_COMPONENT_INSTANCE_PROPERTY$1] = component;
/**
 * Wrap the Riot.js core API methods using a mapping function
 * @param   {Function} mapFunction - lifting function
 * @returns {Object} an object having the { mount, update, unmount } functions
 */


function createCoreAPIMethods(mapFunction) {
  return [MOUNT_METHOD_KEY, UPDATE_METHOD_KEY, UNMOUNT_METHOD_KEY].reduce((acc, method) => {
    acc[method] = mapFunction(method);
    return acc;
  }, {});
}
/**
 * Factory function to create the component templates only once
 * @param   {Function} template - component template creation function
 * @param   {RiotComponentWrapper} componentWrapper - riot compiler generated object
 * @returns {TemplateChunk} template chunk object
 */


function componentTemplateFactory(template, componentWrapper) {
  const components = createSubcomponents(componentWrapper.exports ? componentWrapper.exports.components : {});
  return template(create, expressionTypes, bindingTypes, name => {
    // improve support for recursive components
    if (name === componentWrapper.name) return memoizedCreateComponent(componentWrapper); // return the registered components

    return components[name] || COMPONENTS_IMPLEMENTATION_MAP$1.get(name);
  });
}
/**
 * Create a pure component
 * @param   {Function} pureFactoryFunction - pure component factory function
 * @param   {Array} options.slots - component slots
 * @param   {Array} options.attributes - component attributes
 * @param   {Array} options.template - template factory function
 * @param   {Array} options.template - template factory function
 * @param   {any} options.props - initial component properties
 * @returns {Object} pure component object
 */


function createPureComponent(pureFactoryFunction, _ref) {
  let {
    slots,
    attributes,
    props,
    css,
    template
  } = _ref;
  if (template) panic('Pure components can not have html');
  if (css) panic('Pure components do not have css');
  const component = defineDefaults(pureFactoryFunction({
    slots,
    attributes,
    props
  }), PURE_COMPONENT_API);
  return createCoreAPIMethods(method => function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // intercept the mount calls to bind the DOM node to the pure object created
    // see also https://github.com/riot/riot/issues/2806
    if (method === MOUNT_METHOD_KEY) {
      const [element] = args; // mark this node as pure element

      defineProperty(element, IS_PURE_SYMBOL, true);
      bindDOMNodeToComponentObject(element, component);
    }

    component[method](...args);
    return component;
  });
}
/**
 * Create the component interface needed for the @riotjs/dom-bindings tag bindings
 * @param   {RiotComponentWrapper} componentWrapper - riot compiler generated object
 * @param   {string} componentWrapper.css - component css
 * @param   {Function} componentWrapper.template - function that will return the dom-bindings template function
 * @param   {Object} componentWrapper.exports - component interface
 * @param   {string} componentWrapper.name - component name
 * @returns {Object} component like interface
 */


function createComponent(componentWrapper) {
  const {
    css,
    template,
    exports,
    name
  } = componentWrapper;
  const templateFn = template ? componentTemplateFactory(template, componentWrapper) : MOCKED_TEMPLATE_INTERFACE;
  return _ref2 => {
    let {
      slots,
      attributes,
      props
    } = _ref2;
    // pure components rendering will be managed by the end user
    if (exports && exports[IS_PURE_SYMBOL]) return createPureComponent(exports, {
      slots,
      attributes,
      props,
      css,
      template
    });
    const componentAPI = callOrAssign(exports) || {};
    const component = defineComponent({
      css,
      template: templateFn,
      componentAPI,
      name
    })({
      slots,
      attributes,
      props
    }); // notice that for the components create via tag binding
    // we need to invert the mount (state/parentScope) arguments
    // the template bindings will only forward the parentScope updates
    // and never deal with the component state

    return {
      mount(element, parentScope, state) {
        return component.mount(element, state, parentScope);
      },

      update(parentScope, state) {
        return component.update(state, parentScope);
      },

      unmount(preserveRoot) {
        return component.unmount(preserveRoot);
      }

    };
  };
}
/**
 * Component definition function
 * @param   {Object} implementation - the componen implementation will be generated via compiler
 * @param   {Object} component - the component initial properties
 * @returns {Object} a new component implementation object
 */

function defineComponent(_ref3) {
  let {
    css,
    template,
    componentAPI,
    name
  } = _ref3;
  // add the component css into the DOM
  if (css && name) cssManager.add(name, css);
  return curry(enhanceComponentAPI)(defineProperties( // set the component defaults without overriding the original component API
  defineDefaults(componentAPI, Object.assign({}, COMPONENT_LIFECYCLE_METHODS, {
    [PROPS_KEY]: {},
    [STATE_KEY]: {}
  })), Object.assign({
    // defined during the component creation
    [SLOTS_KEY]: null,
    [ROOT_KEY]: null
  }, COMPONENT_CORE_HELPERS, {
    name,
    css,
    template
  })));
}
/**
 * Create the bindings to update the component attributes
 * @param   {HTMLElement} node - node where we will bind the expressions
 * @param   {Array} attributes - list of attribute bindings
 * @returns {TemplateChunk} - template bindings object
 */

function createAttributeBindings(node, attributes) {
  if (attributes === void 0) {
    attributes = [];
  }

  const expressions = attributes.map(a => create$4(node, a));
  const binding = {};
  return Object.assign(binding, Object.assign({
    expressions
  }, createCoreAPIMethods(method => scope => {
    expressions.forEach(e => e[method](scope));
    return binding;
  })));
}
/**
 * Create the subcomponents that can be included inside a tag in runtime
 * @param   {Object} components - components imported in runtime
 * @returns {Object} all the components transformed into Riot.Component factory functions
 */


function createSubcomponents(components) {
  if (components === void 0) {
    components = {};
  }

  return Object.entries(callOrAssign(components)).reduce((acc, _ref4) => {
    let [key, value] = _ref4;
    acc[camelToDashCase(key)] = createComponent(value);
    return acc;
  }, {});
}
/**
 * Run the component instance through all the plugins set by the user
 * @param   {Object} component - component instance
 * @returns {Object} the component enhanced by the plugins
 */


function runPlugins(component) {
  return [...PLUGINS_SET$1].reduce((c, fn) => fn(c) || c, component);
}
/**
 * Compute the component current state merging it with its previous state
 * @param   {Object} oldState - previous state object
 * @param   {Object} newState - new state givent to the `update` call
 * @returns {Object} new object state
 */


function computeState(oldState, newState) {
  return Object.assign({}, oldState, callOrAssign(newState));
}
/**
 * Add eventually the "is" attribute to link this DOM node to its css
 * @param {HTMLElement} element - target root node
 * @param {string} name - name of the component mounted
 * @returns {undefined} it's a void function
 */


function addCssHook(element, name) {
  if (getName(element) !== name) {
    set(element, IS_DIRECTIVE, name);
  }
}
/**
 * Component creation factory function that will enhance the user provided API
 * @param   {Object} component - a component implementation previously defined
 * @param   {Array} options.slots - component slots generated via riot compiler
 * @param   {Array} options.attributes - attribute expressions generated via riot compiler
 * @returns {Riot.Component} a riot component instance
 */


function enhanceComponentAPI(component, _ref5) {
  let {
    slots,
    attributes,
    props
  } = _ref5;
  return autobindMethods(runPlugins(defineProperties(isObject(component) ? Object.create(component) : component, {
    mount(element, state, parentScope) {
      if (state === void 0) {
        state = {};
      }

      // any element mounted passing through this function can't be a pure component
      defineProperty(element, IS_PURE_SYMBOL, false);
      this[PARENT_KEY_SYMBOL] = parentScope;
      this[ATTRIBUTES_KEY_SYMBOL] = createAttributeBindings(element, attributes).mount(parentScope);
      defineProperty(this, PROPS_KEY, Object.freeze(Object.assign({}, evaluateInitialProps(element, props), evaluateAttributeExpressions(this[ATTRIBUTES_KEY_SYMBOL].expressions))));
      this[STATE_KEY] = computeState(this[STATE_KEY], state);
      this[TEMPLATE_KEY_SYMBOL] = this.template.createDOM(element).clone(); // link this object to the DOM node

      bindDOMNodeToComponentObject(element, this); // add eventually the 'is' attribute

      component.name && addCssHook(element, component.name); // define the root element

      defineProperty(this, ROOT_KEY, element); // define the slots array

      defineProperty(this, SLOTS_KEY, slots); // before mount lifecycle event

      this[ON_BEFORE_MOUNT_KEY](this[PROPS_KEY], this[STATE_KEY]); // mount the template

      this[TEMPLATE_KEY_SYMBOL].mount(element, this, parentScope);
      this[ON_MOUNTED_KEY](this[PROPS_KEY], this[STATE_KEY]);
      return this;
    },

    update(state, parentScope) {
      if (state === void 0) {
        state = {};
      }

      if (parentScope) {
        this[PARENT_KEY_SYMBOL] = parentScope;
        this[ATTRIBUTES_KEY_SYMBOL].update(parentScope);
      }

      const newProps = evaluateAttributeExpressions(this[ATTRIBUTES_KEY_SYMBOL].expressions);
      if (this[SHOULD_UPDATE_KEY](newProps, this[PROPS_KEY]) === false) return;
      defineProperty(this, PROPS_KEY, Object.freeze(Object.assign({}, this[PROPS_KEY], newProps)));
      this[STATE_KEY] = computeState(this[STATE_KEY], state);
      this[ON_BEFORE_UPDATE_KEY](this[PROPS_KEY], this[STATE_KEY]); // avoiding recursive updates
      // see also https://github.com/riot/riot/issues/2895

      if (!this[IS_COMPONENT_UPDATING]) {
        this[IS_COMPONENT_UPDATING] = true;
        this[TEMPLATE_KEY_SYMBOL].update(this, this[PARENT_KEY_SYMBOL]);
      }

      this[ON_UPDATED_KEY](this[PROPS_KEY], this[STATE_KEY]);
      this[IS_COMPONENT_UPDATING] = false;
      return this;
    },

    unmount(preserveRoot) {
      this[ON_BEFORE_UNMOUNT_KEY](this[PROPS_KEY], this[STATE_KEY]);
      this[ATTRIBUTES_KEY_SYMBOL].unmount(); // if the preserveRoot is null the template html will be left untouched
      // in that case the DOM cleanup will happen differently from a parent node

      this[TEMPLATE_KEY_SYMBOL].unmount(this, this[PARENT_KEY_SYMBOL], preserveRoot === null ? null : !preserveRoot);
      this[ON_UNMOUNTED_KEY](this[PROPS_KEY], this[STATE_KEY]);
      return this;
    }

  })), Object.keys(component).filter(prop => isFunction(component[prop])));
}
/**
 * Component initialization function starting from a DOM node
 * @param   {HTMLElement} element - element to upgrade
 * @param   {Object} initialProps - initial component properties
 * @param   {string} componentName - component id
 * @returns {Object} a new component instance bound to a DOM node
 */

function mountComponent(element, initialProps, componentName) {
  const name = componentName || getName(element);
  if (!COMPONENTS_IMPLEMENTATION_MAP$1.has(name)) panic(`The component named "${name}" was never registered`);
  const component = COMPONENTS_IMPLEMENTATION_MAP$1.get(name)({
    props: initialProps
  });
  return component.mount(element);
}

/**
 * Similar to compose but performs from left-to-right function composition.<br/>
 * {@link https://30secondsofcode.org/function#composeright see also}
 * @param   {...[function]} fns) - list of unary function
 * @returns {*} result of the computation
 */
/**
 * Performs right-to-left function composition.<br/>
 * Use Array.prototype.reduce() to perform right-to-left function composition.<br/>
 * The last (rightmost) function can accept one or more arguments; the remaining functions must be unary.<br/>
 * {@link https://30secondsofcode.org/function#compose original source code}
 * @param   {...[function]} fns) - list of unary function
 * @returns {*} result of the computation
 */

function compose() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return fns.reduce((f, g) => function () {
    return f(g(...arguments));
  });
}

const {
  DOM_COMPONENT_INSTANCE_PROPERTY,
  COMPONENTS_IMPLEMENTATION_MAP,
  PLUGINS_SET
} = globals;
/**
 * Riot public api
 */

/**
 * Register a custom tag by name
 * @param   {string} name - component name
 * @param   {Object} implementation - tag implementation
 * @returns {Map} map containing all the components implementations
 */

function register(name, _ref) {
  let {
    css,
    template,
    exports
  } = _ref;
  if (COMPONENTS_IMPLEMENTATION_MAP.has(name)) panic(`The component "${name}" was already registered`);
  COMPONENTS_IMPLEMENTATION_MAP.set(name, createComponent({
    name,
    css,
    template,
    exports
  }));
  return COMPONENTS_IMPLEMENTATION_MAP;
}
/**
 * Unregister a riot web component
 * @param   {string} name - component name
 * @returns {Map} map containing all the components implementations
 */

function unregister(name) {
  if (!COMPONENTS_IMPLEMENTATION_MAP.has(name)) panic(`The component "${name}" was never registered`);
  COMPONENTS_IMPLEMENTATION_MAP.delete(name);
  cssManager.remove(name);
  return COMPONENTS_IMPLEMENTATION_MAP;
}
/**
 * Mounting function that will work only for the components that were globally registered
 * @param   {string|HTMLElement} selector - query for the selection or a DOM element
 * @param   {Object} initialProps - the initial component properties
 * @param   {string} name - optional component name
 * @returns {Array} list of riot components
 */

function mount(selector, initialProps, name) {
  return $(selector).map(element => mountComponent(element, initialProps, name));
}
/**
 * Sweet unmounting helper function for the DOM node mounted manually by the user
 * @param   {string|HTMLElement} selector - query for the selection or a DOM element
 * @param   {boolean|null} keepRootElement - if true keep the root element
 * @returns {Array} list of nodes unmounted
 */

function unmount(selector, keepRootElement) {
  return $(selector).map(element => {
    if (element[DOM_COMPONENT_INSTANCE_PROPERTY]) {
      element[DOM_COMPONENT_INSTANCE_PROPERTY].unmount(keepRootElement);
    }

    return element;
  });
}
/**
 * Define a riot plugin
 * @param   {Function} plugin - function that will receive all the components created
 * @returns {Set} the set containing all the plugins installed
 */

function install(plugin) {
  if (!isFunction(plugin)) panic('Plugins must be of type function');
  if (PLUGINS_SET.has(plugin)) panic('This plugin was already installed');
  PLUGINS_SET.add(plugin);
  return PLUGINS_SET;
}
/**
 * Uninstall a riot plugin
 * @param   {Function} plugin - plugin previously installed
 * @returns {Set} the set containing all the plugins installed
 */

function uninstall(plugin) {
  if (!PLUGINS_SET.has(plugin)) panic('This plugin was never installed');
  PLUGINS_SET.delete(plugin);
  return PLUGINS_SET;
}
/**
 * Helper method to create component without relying on the registered ones
 * @param   {Object} implementation - component implementation
 * @returns {Function} function that will allow you to mount a riot component on a DOM node
 */

function component(implementation) {
  return function (el, props, _temp) {
    let {
      slots,
      attributes,
      parentScope
    } = _temp === void 0 ? {} : _temp;
    return compose(c => c.mount(el, parentScope), c => c({
      props,
      slots,
      attributes
    }), createComponent)(implementation);
  };
}
/**
 * Lift a riot component Interface into a pure riot object
 * @param   {Function} func - RiotPureComponent factory function
 * @returns {Function} the lifted original function received as argument
 */

function pure(func) {
  if (!isFunction(func)) panic('riot.pure accepts only arguments of type "function"');
  func[IS_PURE_SYMBOL] = true;
  return func;
}
/**
 * no-op function needed to add the proper types to your component via typescript
 * @param {Function|Object} component - component default export
 * @returns {Function|Object} returns exactly what it has received
 */

const withTypes = component => component;
/** @type {string} current riot version */

const version = 'v6.1.2'; // expose some internal stuff that might be used from external tools

const __ = {
  cssManager,
  DOMBindings,
  createComponent,
  defineComponent,
  globals
};




/***/ }),

/***/ "./node_modules/validate.js/validate.js":
/*!**********************************************!*\
  !*** ./node_modules/validate.js/validate.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
/*!
 * validate.js 0.13.1
 *
 * (c) 2013-2019 Nicklas Ansman, 2013 Wrapp
 * Validate.js may be freely distributed under the MIT license.
 * For all details and documentation:
 * http://validatejs.org/
 */

(function(exports, module, define) {
  "use strict";

  // The main function that calls the validators specified by the constraints.
  // The options are the following:
  //   - format (string) - An option that controls how the returned value is formatted
  //     * flat - Returns a flat array of just the error messages
  //     * grouped - Returns the messages grouped by attribute (default)
  //     * detailed - Returns an array of the raw validation data
  //   - fullMessages (boolean) - If `true` (default) the attribute name is prepended to the error.
  //
  // Please note that the options are also passed to each validator.
  var validate = function(attributes, constraints, options) {
    options = v.extend({}, v.options, options);

    var results = v.runValidations(attributes, constraints, options)
      , attr
      , validator;

    if (results.some(function(r) { return v.isPromise(r.error); })) {
      throw new Error("Use validate.async if you want support for promises");
    }
    return validate.processValidationResults(results, options);
  };

  var v = validate;

  // Copies over attributes from one or more sources to a single destination.
  // Very much similar to underscore's extend.
  // The first argument is the target object and the remaining arguments will be
  // used as sources.
  v.extend = function(obj) {
    [].slice.call(arguments, 1).forEach(function(source) {
      for (var attr in source) {
        obj[attr] = source[attr];
      }
    });
    return obj;
  };

  v.extend(validate, {
    // This is the version of the library as a semver.
    // The toString function will allow it to be coerced into a string
    version: {
      major: 0,
      minor: 13,
      patch: 1,
      metadata: null,
      toString: function() {
        var version = v.format("%{major}.%{minor}.%{patch}", v.version);
        if (!v.isEmpty(v.version.metadata)) {
          version += "+" + v.version.metadata;
        }
        return version;
      }
    },

    // Below is the dependencies that are used in validate.js

    // The constructor of the Promise implementation.
    // If you are using Q.js, RSVP or any other A+ compatible implementation
    // override this attribute to be the constructor of that promise.
    // Since jQuery promises aren't A+ compatible they won't work.
    Promise: typeof Promise !== "undefined" ? Promise : /* istanbul ignore next */ null,

    EMPTY_STRING_REGEXP: /^\s*$/,

    // Runs the validators specified by the constraints object.
    // Will return an array of the format:
    //     [{attribute: "<attribute name>", error: "<validation result>"}, ...]
    runValidations: function(attributes, constraints, options) {
      var results = []
        , attr
        , validatorName
        , value
        , validators
        , validator
        , validatorOptions
        , error;

      if (v.isDomElement(attributes) || v.isJqueryElement(attributes)) {
        attributes = v.collectFormValues(attributes);
      }

      // Loops through each constraints, finds the correct validator and run it.
      for (attr in constraints) {
        value = v.getDeepObjectValue(attributes, attr);
        // This allows the constraints for an attribute to be a function.
        // The function will be called with the value, attribute name, the complete dict of
        // attributes as well as the options and constraints passed in.
        // This is useful when you want to have different
        // validations depending on the attribute value.
        validators = v.result(constraints[attr], value, attributes, attr, options, constraints);

        for (validatorName in validators) {
          validator = v.validators[validatorName];

          if (!validator) {
            error = v.format("Unknown validator %{name}", {name: validatorName});
            throw new Error(error);
          }

          validatorOptions = validators[validatorName];
          // This allows the options to be a function. The function will be
          // called with the value, attribute name, the complete dict of
          // attributes as well as the options and constraints passed in.
          // This is useful when you want to have different
          // validations depending on the attribute value.
          validatorOptions = v.result(validatorOptions, value, attributes, attr, options, constraints);
          if (!validatorOptions) {
            continue;
          }
          results.push({
            attribute: attr,
            value: value,
            validator: validatorName,
            globalOptions: options,
            attributes: attributes,
            options: validatorOptions,
            error: validator.call(validator,
                value,
                validatorOptions,
                attr,
                attributes,
                options)
          });
        }
      }

      return results;
    },

    // Takes the output from runValidations and converts it to the correct
    // output format.
    processValidationResults: function(errors, options) {
      errors = v.pruneEmptyErrors(errors, options);
      errors = v.expandMultipleErrors(errors, options);
      errors = v.convertErrorMessages(errors, options);

      var format = options.format || "grouped";

      if (typeof v.formatters[format] === 'function') {
        errors = v.formatters[format](errors);
      } else {
        throw new Error(v.format("Unknown format %{format}", options));
      }

      return v.isEmpty(errors) ? undefined : errors;
    },

    // Runs the validations with support for promises.
    // This function will return a promise that is settled when all the
    // validation promises have been completed.
    // It can be called even if no validations returned a promise.
    async: function(attributes, constraints, options) {
      options = v.extend({}, v.async.options, options);

      var WrapErrors = options.wrapErrors || function(errors) {
        return errors;
      };

      // Removes unknown attributes
      if (options.cleanAttributes !== false) {
        attributes = v.cleanAttributes(attributes, constraints);
      }

      var results = v.runValidations(attributes, constraints, options);

      return new v.Promise(function(resolve, reject) {
        v.waitForResults(results).then(function() {
          var errors = v.processValidationResults(results, options);
          if (errors) {
            reject(new WrapErrors(errors, options, attributes, constraints));
          } else {
            resolve(attributes);
          }
        }, function(err) {
          reject(err);
        });
      });
    },

    single: function(value, constraints, options) {
      options = v.extend({}, v.single.options, options, {
        format: "flat",
        fullMessages: false
      });
      return v({single: value}, {single: constraints}, options);
    },

    // Returns a promise that is resolved when all promises in the results array
    // are settled. The promise returned from this function is always resolved,
    // never rejected.
    // This function modifies the input argument, it replaces the promises
    // with the value returned from the promise.
    waitForResults: function(results) {
      // Create a sequence of all the results starting with a resolved promise.
      return results.reduce(function(memo, result) {
        // If this result isn't a promise skip it in the sequence.
        if (!v.isPromise(result.error)) {
          return memo;
        }

        return memo.then(function() {
          return result.error.then(function(error) {
            result.error = error || null;
          });
        });
      }, new v.Promise(function(r) { r(); })); // A resolved promise
    },

    // If the given argument is a call: function the and: function return the value
    // otherwise just return the value. Additional arguments will be passed as
    // arguments to the function.
    // Example:
    // ```
    // result('foo') // 'foo'
    // result(Math.max, 1, 2) // 2
    // ```
    result: function(value) {
      var args = [].slice.call(arguments, 1);
      if (typeof value === 'function') {
        value = value.apply(null, args);
      }
      return value;
    },

    // Checks if the value is a number. This function does not consider NaN a
    // number like many other `isNumber` functions do.
    isNumber: function(value) {
      return typeof value === 'number' && !isNaN(value);
    },

    // Returns false if the object is not a function
    isFunction: function(value) {
      return typeof value === 'function';
    },

    // A simple check to verify that the value is an integer. Uses `isNumber`
    // and a simple modulo check.
    isInteger: function(value) {
      return v.isNumber(value) && value % 1 === 0;
    },

    // Checks if the value is a boolean
    isBoolean: function(value) {
      return typeof value === 'boolean';
    },

    // Uses the `Object` function to check if the given argument is an object.
    isObject: function(obj) {
      return obj === Object(obj);
    },

    // Simply checks if the object is an instance of a date
    isDate: function(obj) {
      return obj instanceof Date;
    },

    // Returns false if the object is `null` of `undefined`
    isDefined: function(obj) {
      return obj !== null && obj !== undefined;
    },

    // Checks if the given argument is a promise. Anything with a `then`
    // function is considered a promise.
    isPromise: function(p) {
      return !!p && v.isFunction(p.then);
    },

    isJqueryElement: function(o) {
      return o && v.isString(o.jquery);
    },

    isDomElement: function(o) {
      if (!o) {
        return false;
      }

      if (!o.querySelectorAll || !o.querySelector) {
        return false;
      }

      if (v.isObject(document) && o === document) {
        return true;
      }

      // http://stackoverflow.com/a/384380/699304
      /* istanbul ignore else */
      if (typeof HTMLElement === "object") {
        return o instanceof HTMLElement;
      } else {
        return o &&
          typeof o === "object" &&
          o !== null &&
          o.nodeType === 1 &&
          typeof o.nodeName === "string";
      }
    },

    isEmpty: function(value) {
      var attr;

      // Null and undefined are empty
      if (!v.isDefined(value)) {
        return true;
      }

      // functions are non empty
      if (v.isFunction(value)) {
        return false;
      }

      // Whitespace only strings are empty
      if (v.isString(value)) {
        return v.EMPTY_STRING_REGEXP.test(value);
      }

      // For arrays we use the length property
      if (v.isArray(value)) {
        return value.length === 0;
      }

      // Dates have no attributes but aren't empty
      if (v.isDate(value)) {
        return false;
      }

      // If we find at least one property we consider it non empty
      if (v.isObject(value)) {
        for (attr in value) {
          return false;
        }
        return true;
      }

      return false;
    },

    // Formats the specified strings with the given values like so:
    // ```
    // format("Foo: %{foo}", {foo: "bar"}) // "Foo bar"
    // ```
    // If you want to write %{...} without having it replaced simply
    // prefix it with % like this `Foo: %%{foo}` and it will be returned
    // as `"Foo: %{foo}"`
    format: v.extend(function(str, vals) {
      if (!v.isString(str)) {
        return str;
      }
      return str.replace(v.format.FORMAT_REGEXP, function(m0, m1, m2) {
        if (m1 === '%') {
          return "%{" + m2 + "}";
        } else {
          return String(vals[m2]);
        }
      });
    }, {
      // Finds %{key} style patterns in the given string
      FORMAT_REGEXP: /(%?)%\{([^\}]+)\}/g
    }),

    // "Prettifies" the given string.
    // Prettifying means replacing [.\_-] with spaces as well as splitting
    // camel case words.
    prettify: function(str) {
      if (v.isNumber(str)) {
        // If there are more than 2 decimals round it to two
        if ((str * 100) % 1 === 0) {
          return "" + str;
        } else {
          return parseFloat(Math.round(str * 100) / 100).toFixed(2);
        }
      }

      if (v.isArray(str)) {
        return str.map(function(s) { return v.prettify(s); }).join(", ");
      }

      if (v.isObject(str)) {
        if (!v.isDefined(str.toString)) {
          return JSON.stringify(str);
        }

        return str.toString();
      }

      // Ensure the string is actually a string
      str = "" + str;

      return str
        // Splits keys separated by periods
        .replace(/([^\s])\.([^\s])/g, '$1 $2')
        // Removes backslashes
        .replace(/\\+/g, '')
        // Replaces - and - with space
        .replace(/[_-]/g, ' ')
        // Splits camel cased words
        .replace(/([a-z])([A-Z])/g, function(m0, m1, m2) {
          return "" + m1 + " " + m2.toLowerCase();
        })
        .toLowerCase();
    },

    stringifyValue: function(value, options) {
      var prettify = options && options.prettify || v.prettify;
      return prettify(value);
    },

    isString: function(value) {
      return typeof value === 'string';
    },

    isArray: function(value) {
      return {}.toString.call(value) === '[object Array]';
    },

    // Checks if the object is a hash, which is equivalent to an object that
    // is neither an array nor a function.
    isHash: function(value) {
      return v.isObject(value) && !v.isArray(value) && !v.isFunction(value);
    },

    contains: function(obj, value) {
      if (!v.isDefined(obj)) {
        return false;
      }
      if (v.isArray(obj)) {
        return obj.indexOf(value) !== -1;
      }
      return value in obj;
    },

    unique: function(array) {
      if (!v.isArray(array)) {
        return array;
      }
      return array.filter(function(el, index, array) {
        return array.indexOf(el) == index;
      });
    },

    forEachKeyInKeypath: function(object, keypath, callback) {
      if (!v.isString(keypath)) {
        return undefined;
      }

      var key = ""
        , i
        , escape = false;

      for (i = 0; i < keypath.length; ++i) {
        switch (keypath[i]) {
          case '.':
            if (escape) {
              escape = false;
              key += '.';
            } else {
              object = callback(object, key, false);
              key = "";
            }
            break;

          case '\\':
            if (escape) {
              escape = false;
              key += '\\';
            } else {
              escape = true;
            }
            break;

          default:
            escape = false;
            key += keypath[i];
            break;
        }
      }

      return callback(object, key, true);
    },

    getDeepObjectValue: function(obj, keypath) {
      if (!v.isObject(obj)) {
        return undefined;
      }

      return v.forEachKeyInKeypath(obj, keypath, function(obj, key) {
        if (v.isObject(obj)) {
          return obj[key];
        }
      });
    },

    // This returns an object with all the values of the form.
    // It uses the input name as key and the value as value
    // So for example this:
    // <input type="text" name="email" value="foo@bar.com" />
    // would return:
    // {email: "foo@bar.com"}
    collectFormValues: function(form, options) {
      var values = {}
        , i
        , j
        , input
        , inputs
        , option
        , value;

      if (v.isJqueryElement(form)) {
        form = form[0];
      }

      if (!form) {
        return values;
      }

      options = options || {};

      inputs = form.querySelectorAll("input[name], textarea[name]");
      for (i = 0; i < inputs.length; ++i) {
        input = inputs.item(i);

        if (v.isDefined(input.getAttribute("data-ignored"))) {
          continue;
        }

        var name = input.name.replace(/\./g, "\\\\.");
        value = v.sanitizeFormValue(input.value, options);
        if (input.type === "number") {
          value = value ? +value : null;
        } else if (input.type === "checkbox") {
          if (input.attributes.value) {
            if (!input.checked) {
              value = values[name] || null;
            }
          } else {
            value = input.checked;
          }
        } else if (input.type === "radio") {
          if (!input.checked) {
            value = values[name] || null;
          }
        }
        values[name] = value;
      }

      inputs = form.querySelectorAll("select[name]");
      for (i = 0; i < inputs.length; ++i) {
        input = inputs.item(i);
        if (v.isDefined(input.getAttribute("data-ignored"))) {
          continue;
        }

        if (input.multiple) {
          value = [];
          for (j in input.options) {
            option = input.options[j];
             if (option && option.selected) {
              value.push(v.sanitizeFormValue(option.value, options));
            }
          }
        } else {
          var _val = typeof input.options[input.selectedIndex] !== 'undefined' ? input.options[input.selectedIndex].value : /* istanbul ignore next */ '';
          value = v.sanitizeFormValue(_val, options);
        }
        values[input.name] = value;
      }

      return values;
    },

    sanitizeFormValue: function(value, options) {
      if (options.trim && v.isString(value)) {
        value = value.trim();
      }

      if (options.nullify !== false && value === "") {
        return null;
      }
      return value;
    },

    capitalize: function(str) {
      if (!v.isString(str)) {
        return str;
      }
      return str[0].toUpperCase() + str.slice(1);
    },

    // Remove all errors who's error attribute is empty (null or undefined)
    pruneEmptyErrors: function(errors) {
      return errors.filter(function(error) {
        return !v.isEmpty(error.error);
      });
    },

    // In
    // [{error: ["err1", "err2"], ...}]
    // Out
    // [{error: "err1", ...}, {error: "err2", ...}]
    //
    // All attributes in an error with multiple messages are duplicated
    // when expanding the errors.
    expandMultipleErrors: function(errors) {
      var ret = [];
      errors.forEach(function(error) {
        // Removes errors without a message
        if (v.isArray(error.error)) {
          error.error.forEach(function(msg) {
            ret.push(v.extend({}, error, {error: msg}));
          });
        } else {
          ret.push(error);
        }
      });
      return ret;
    },

    // Converts the error mesages by prepending the attribute name unless the
    // message is prefixed by ^
    convertErrorMessages: function(errors, options) {
      options = options || {};

      var ret = []
        , prettify = options.prettify || v.prettify;
      errors.forEach(function(errorInfo) {
        var error = v.result(errorInfo.error,
            errorInfo.value,
            errorInfo.attribute,
            errorInfo.options,
            errorInfo.attributes,
            errorInfo.globalOptions);

        if (!v.isString(error)) {
          ret.push(errorInfo);
          return;
        }

        if (error[0] === '^') {
          error = error.slice(1);
        } else if (options.fullMessages !== false) {
          error = v.capitalize(prettify(errorInfo.attribute)) + " " + error;
        }
        error = error.replace(/\\\^/g, "^");
        error = v.format(error, {
          value: v.stringifyValue(errorInfo.value, options)
        });
        ret.push(v.extend({}, errorInfo, {error: error}));
      });
      return ret;
    },

    // In:
    // [{attribute: "<attributeName>", ...}]
    // Out:
    // {"<attributeName>": [{attribute: "<attributeName>", ...}]}
    groupErrorsByAttribute: function(errors) {
      var ret = {};
      errors.forEach(function(error) {
        var list = ret[error.attribute];
        if (list) {
          list.push(error);
        } else {
          ret[error.attribute] = [error];
        }
      });
      return ret;
    },

    // In:
    // [{error: "<message 1>", ...}, {error: "<message 2>", ...}]
    // Out:
    // ["<message 1>", "<message 2>"]
    flattenErrorsToArray: function(errors) {
      return errors
        .map(function(error) { return error.error; })
        .filter(function(value, index, self) {
          return self.indexOf(value) === index;
        });
    },

    cleanAttributes: function(attributes, whitelist) {
      function whitelistCreator(obj, key, last) {
        if (v.isObject(obj[key])) {
          return obj[key];
        }
        return (obj[key] = last ? true : {});
      }

      function buildObjectWhitelist(whitelist) {
        var ow = {}
          , lastObject
          , attr;
        for (attr in whitelist) {
          if (!whitelist[attr]) {
            continue;
          }
          v.forEachKeyInKeypath(ow, attr, whitelistCreator);
        }
        return ow;
      }

      function cleanRecursive(attributes, whitelist) {
        if (!v.isObject(attributes)) {
          return attributes;
        }

        var ret = v.extend({}, attributes)
          , w
          , attribute;

        for (attribute in attributes) {
          w = whitelist[attribute];

          if (v.isObject(w)) {
            ret[attribute] = cleanRecursive(ret[attribute], w);
          } else if (!w) {
            delete ret[attribute];
          }
        }
        return ret;
      }

      if (!v.isObject(whitelist) || !v.isObject(attributes)) {
        return {};
      }

      whitelist = buildObjectWhitelist(whitelist);
      return cleanRecursive(attributes, whitelist);
    },

    exposeModule: function(validate, root, exports, module, define) {
      if (exports) {
        if (module && module.exports) {
          exports = module.exports = validate;
        }
        exports.validate = validate;
      } else {
        root.validate = validate;
        if (validate.isFunction(define) && define.amd) {
          define([], function () { return validate; });
        }
      }
    },

    warn: function(msg) {
      if (typeof console !== "undefined" && console.warn) {
        console.warn("[validate.js] " + msg);
      }
    },

    error: function(msg) {
      if (typeof console !== "undefined" && console.error) {
        console.error("[validate.js] " + msg);
      }
    }
  });

  validate.validators = {
    // Presence validates that the value isn't empty
    presence: function(value, options) {
      options = v.extend({}, this.options, options);
      if (options.allowEmpty !== false ? !v.isDefined(value) : v.isEmpty(value)) {
        return options.message || this.message || "can't be blank";
      }
    },
    length: function(value, options, attribute) {
      // Empty values are allowed
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var is = options.is
        , maximum = options.maximum
        , minimum = options.minimum
        , tokenizer = options.tokenizer || function(val) { return val; }
        , err
        , errors = [];

      value = tokenizer(value);
      var length = value.length;
      if(!v.isNumber(length)) {
        return options.message || this.notValid || "has an incorrect length";
      }

      // Is checks
      if (v.isNumber(is) && length !== is) {
        err = options.wrongLength ||
          this.wrongLength ||
          "is the wrong length (should be %{count} characters)";
        errors.push(v.format(err, {count: is}));
      }

      if (v.isNumber(minimum) && length < minimum) {
        err = options.tooShort ||
          this.tooShort ||
          "is too short (minimum is %{count} characters)";
        errors.push(v.format(err, {count: minimum}));
      }

      if (v.isNumber(maximum) && length > maximum) {
        err = options.tooLong ||
          this.tooLong ||
          "is too long (maximum is %{count} characters)";
        errors.push(v.format(err, {count: maximum}));
      }

      if (errors.length > 0) {
        return options.message || errors;
      }
    },
    numericality: function(value, options, attribute, attributes, globalOptions) {
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var errors = []
        , name
        , count
        , checks = {
            greaterThan:          function(v, c) { return v > c; },
            greaterThanOrEqualTo: function(v, c) { return v >= c; },
            equalTo:              function(v, c) { return v === c; },
            lessThan:             function(v, c) { return v < c; },
            lessThanOrEqualTo:    function(v, c) { return v <= c; },
            divisibleBy:          function(v, c) { return v % c === 0; }
          }
        , prettify = options.prettify ||
          (globalOptions && globalOptions.prettify) ||
          v.prettify;

      // Strict will check that it is a valid looking number
      if (v.isString(value) && options.strict) {
        var pattern = "^-?(0|[1-9]\\d*)";
        if (!options.onlyInteger) {
          pattern += "(\\.\\d+)?";
        }
        pattern += "$";

        if (!(new RegExp(pattern).test(value))) {
          return options.message ||
            options.notValid ||
            this.notValid ||
            this.message ||
            "must be a valid number";
        }
      }

      // Coerce the value to a number unless we're being strict.
      if (options.noStrings !== true && v.isString(value) && !v.isEmpty(value)) {
        value = +value;
      }

      // If it's not a number we shouldn't continue since it will compare it.
      if (!v.isNumber(value)) {
        return options.message ||
          options.notValid ||
          this.notValid ||
          this.message ||
          "is not a number";
      }

      // Same logic as above, sort of. Don't bother with comparisons if this
      // doesn't pass.
      if (options.onlyInteger && !v.isInteger(value)) {
        return options.message ||
          options.notInteger ||
          this.notInteger ||
          this.message ||
          "must be an integer";
      }

      for (name in checks) {
        count = options[name];
        if (v.isNumber(count) && !checks[name](value, count)) {
          // This picks the default message if specified
          // For example the greaterThan check uses the message from
          // this.notGreaterThan so we capitalize the name and prepend "not"
          var key = "not" + v.capitalize(name);
          var msg = options[key] ||
            this[key] ||
            this.message ||
            "must be %{type} %{count}";

          errors.push(v.format(msg, {
            count: count,
            type: prettify(name)
          }));
        }
      }

      if (options.odd && value % 2 !== 1) {
        errors.push(options.notOdd ||
            this.notOdd ||
            this.message ||
            "must be odd");
      }
      if (options.even && value % 2 !== 0) {
        errors.push(options.notEven ||
            this.notEven ||
            this.message ||
            "must be even");
      }

      if (errors.length) {
        return options.message || errors;
      }
    },
    datetime: v.extend(function(value, options) {
      if (!v.isFunction(this.parse) || !v.isFunction(this.format)) {
        throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator");
      }

      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var err
        , errors = []
        , earliest = options.earliest ? this.parse(options.earliest, options) : NaN
        , latest = options.latest ? this.parse(options.latest, options) : NaN;

      value = this.parse(value, options);

      // 86400000 is the number of milliseconds in a day, this is used to remove
      // the time from the date
      if (isNaN(value) || options.dateOnly && value % 86400000 !== 0) {
        err = options.notValid ||
          options.message ||
          this.notValid ||
          "must be a valid date";
        return v.format(err, {value: arguments[0]});
      }

      if (!isNaN(earliest) && value < earliest) {
        err = options.tooEarly ||
          options.message ||
          this.tooEarly ||
          "must be no earlier than %{date}";
        err = v.format(err, {
          value: this.format(value, options),
          date: this.format(earliest, options)
        });
        errors.push(err);
      }

      if (!isNaN(latest) && value > latest) {
        err = options.tooLate ||
          options.message ||
          this.tooLate ||
          "must be no later than %{date}";
        err = v.format(err, {
          date: this.format(latest, options),
          value: this.format(value, options)
        });
        errors.push(err);
      }

      if (errors.length) {
        return v.unique(errors);
      }
    }, {
      parse: null,
      format: null
    }),
    date: function(value, options) {
      options = v.extend({}, options, {dateOnly: true});
      return v.validators.datetime.call(v.validators.datetime, value, options);
    },
    format: function(value, options) {
      if (v.isString(options) || (options instanceof RegExp)) {
        options = {pattern: options};
      }

      options = v.extend({}, this.options, options);

      var message = options.message || this.message || "is invalid"
        , pattern = options.pattern
        , match;

      // Empty values are allowed
      if (!v.isDefined(value)) {
        return;
      }
      if (!v.isString(value)) {
        return message;
      }

      if (v.isString(pattern)) {
        pattern = new RegExp(options.pattern, options.flags);
      }
      match = pattern.exec(value);
      if (!match || match[0].length != value.length) {
        return message;
      }
    },
    inclusion: function(value, options) {
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }
      if (v.isArray(options)) {
        options = {within: options};
      }
      options = v.extend({}, this.options, options);
      if (v.contains(options.within, value)) {
        return;
      }
      var message = options.message ||
        this.message ||
        "^%{value} is not included in the list";
      return v.format(message, {value: value});
    },
    exclusion: function(value, options) {
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }
      if (v.isArray(options)) {
        options = {within: options};
      }
      options = v.extend({}, this.options, options);
      if (!v.contains(options.within, value)) {
        return;
      }
      var message = options.message || this.message || "^%{value} is restricted";
      if (v.isString(options.within[value])) {
        value = options.within[value];
      }
      return v.format(message, {value: value});
    },
    email: v.extend(function(value, options) {
      options = v.extend({}, this.options, options);
      var message = options.message || this.message || "is not a valid email";
      // Empty values are fine
      if (!v.isDefined(value)) {
        return;
      }
      if (!v.isString(value)) {
        return message;
      }
      if (!this.PATTERN.exec(value)) {
        return message;
      }
    }, {
      PATTERN: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
    }),
    equality: function(value, options, attribute, attributes, globalOptions) {
      if (!v.isDefined(value)) {
        return;
      }

      if (v.isString(options)) {
        options = {attribute: options};
      }
      options = v.extend({}, this.options, options);
      var message = options.message ||
        this.message ||
        "is not equal to %{attribute}";

      if (v.isEmpty(options.attribute) || !v.isString(options.attribute)) {
        throw new Error("The attribute must be a non empty string");
      }

      var otherValue = v.getDeepObjectValue(attributes, options.attribute)
        , comparator = options.comparator || function(v1, v2) {
          return v1 === v2;
        }
        , prettify = options.prettify ||
          (globalOptions && globalOptions.prettify) ||
          v.prettify;

      if (!comparator(value, otherValue, options, attribute, attributes)) {
        return v.format(message, {attribute: prettify(options.attribute)});
      }
    },
    // A URL validator that is used to validate URLs with the ability to
    // restrict schemes and some domains.
    url: function(value, options) {
      if (!v.isDefined(value)) {
        return;
      }

      options = v.extend({}, this.options, options);

      var message = options.message || this.message || "is not a valid url"
        , schemes = options.schemes || this.schemes || ['http', 'https']
        , allowLocal = options.allowLocal || this.allowLocal || false
        , allowDataUrl = options.allowDataUrl || this.allowDataUrl || false;
      if (!v.isString(value)) {
        return message;
      }

      // https://gist.github.com/dperini/729294
      var regex =
        "^" +
        // protocol identifier
        "(?:(?:" + schemes.join("|") + ")://)" +
        // user:pass authentication
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:";

      var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";

      if (allowLocal) {
        tld += "?";
      } else {
        regex +=
          // IP address exclusion
          // private & local networks
          "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
          "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
          "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})";
      }

      regex +=
          // IP address dotted notation octets
          // excludes loopback network 0.0.0.0
          // excludes reserved space >= 224.0.0.0
          // excludes network & broacast addresses
          // (first & last IP address of each class)
          "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
          "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
          "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
          // host name
          "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
          // domain name
          "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
          tld +
        ")" +
        // port number
        "(?::\\d{2,5})?" +
        // resource path
        "(?:[/?#]\\S*)?" +
      "$";

      if (allowDataUrl) {
        // RFC 2397
        var mediaType = "\\w+\\/[-+.\\w]+(?:;[\\w=]+)*";
        var urlchar = "[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*";
        var dataurl = "data:(?:"+mediaType+")?(?:;base64)?,"+urlchar;
        regex = "(?:"+regex+")|(?:^"+dataurl+"$)";
      }

      var PATTERN = new RegExp(regex, 'i');
      if (!PATTERN.exec(value)) {
        return message;
      }
    },
    type: v.extend(function(value, originalOptions, attribute, attributes, globalOptions) {
      if (v.isString(originalOptions)) {
        originalOptions = {type: originalOptions};
      }

      if (!v.isDefined(value)) {
        return;
      }

      var options = v.extend({}, this.options, originalOptions);

      var type = options.type;
      if (!v.isDefined(type)) {
        throw new Error("No type was specified");
      }

      var check;
      if (v.isFunction(type)) {
        check = type;
      } else {
        check = this.types[type];
      }

      if (!v.isFunction(check)) {
        throw new Error("validate.validators.type.types." + type + " must be a function.");
      }

      if (!check(value, options, attribute, attributes, globalOptions)) {
        var message = originalOptions.message ||
          this.messages[type] ||
          this.message ||
          options.message ||
          (v.isFunction(type) ? "must be of the correct type" : "must be of type %{type}");

        if (v.isFunction(message)) {
          message = message(value, originalOptions, attribute, attributes, globalOptions);
        }

        return v.format(message, {attribute: v.prettify(attribute), type: type});
      }
    }, {
      types: {
        object: function(value) {
          return v.isObject(value) && !v.isArray(value);
        },
        array: v.isArray,
        integer: v.isInteger,
        number: v.isNumber,
        string: v.isString,
        date: v.isDate,
        boolean: v.isBoolean
      },
      messages: {}
    })
  };

  validate.formatters = {
    detailed: function(errors) {return errors;},
    flat: v.flattenErrorsToArray,
    grouped: function(errors) {
      var attr;

      errors = v.groupErrorsByAttribute(errors);
      for (attr in errors) {
        errors[attr] = v.flattenErrorsToArray(errors[attr]);
      }
      return errors;
    },
    constraint: function(errors) {
      var attr;
      errors = v.groupErrorsByAttribute(errors);
      for (attr in errors) {
        errors[attr] = errors[attr].map(function(result) {
          return result.validator;
        }).sort();
      }
      return errors;
    }
  };

  validate.exposeModule(validate, this, exports, module, __webpack_require__.amdD);
}).call(this,
         true ? /* istanbul ignore next */ exports : 0,
         true ? /* istanbul ignore next */ module : 0,
        __webpack_require__.amdD);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {}
/************************************************************************/
/******/ 	/* webpack/runtime/amd define */
/******/ 	(() => {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/example/example": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/example.js"],
/******/ 			["./src/example.scss"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_tiny_components_validator"] = self["webpackChunk_tiny_components_validator"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;