
/**
 * 
 */
class InputControl {

    // class properties
    /**
     * @property {string} ajaxUrl The URL used for Ajax requests
     */
    static ajaxUrl = 'route.php';

    /**
     * @property {string} ajaxAction_getRules The 'action' value : will trigger the sending of rules upon detection
     */
    static ajaxAction_getRules = 'getRules';

    /**
     * @property {string} ajaxAction_getConfig The 'action' value : will trigger the sending of config upon detection
     */
     static ajaxAction_getConfig = 'getConfig';

    static defaultConfig = {
        // elements = '.field', fieldName = 'id'
        'invalid_message_class':    'invalid_message'
    };

    /**
     * @property {json} defaultMessages Messages which will be shown if the fields are invalid, if no message is supplied into the rules array.
     */
    static defaultMessages = {};

    /**
     * @property { object[] } instances All instances
     */
    static instances = [];

    /**
     * @property { string[] } comparisonOperators Comparison operators
     */
    static comparisonOperators = ['<', '<=', '===', '==', '!==', '!=', '>=', '>'];


    // instance properties
    /**
     * @property {json} fieldsRules The fields rules
     */
    fieldsRules = {};

    /**
     * @property {json} fieldsValue The fields value
     */
    fieldsValue = {};

    /**
     * @property {?string} fieldName The field name
     */
    fieldName;

    /**
     * @property {?string} fieldInput The field input
     */
    fieldInput;

    /**
     * @property {?string} fieldValue The field value
     */
    fieldValue;

    /**
      * @property {?string} fieldIsValid The field validity (true if the field value is valid)
      */
    fieldIsValid;

    /**
      * @property {?string} fieldMessage The field invalidity message
      */
    fieldMessage;

    /**
      * @property {?json} validateJsResult The validate JS result (detailed)
      */
    validateJsResult;

    // constructor
    /**
     * @param {json} fieldsRules The fields rules
     * @param {?json} config The config (if not supplied, take account the php config)
     * 
     * @todo config merge
     */
    constructor (fieldsRules = {}, config = null)
    {
        if (Object.keys(fieldsRules).length > 0) {
            this.fieldsRules = fieldsRules;
        } else {
            this.fieldsRules = InputControl.getRules();
        }

        InputControl.instances.push(this);

        // get config from php
        this.config = InputControl.getConfigFromPhp();

        // add customized validators
        InputControl.addCustomizedValidators();
        // Before using it we must add the parse and format functions
        // Here is a sample implementation using moment.js
        validate.extend(validate.validators.datetime, {
            // The value is guaranteed not to be null or undefined but otherwise it
            // could be anything.
            parse: function(value, options) {
                return +moment.utc(value);
            },
            // Input is a unix timestamp
            format: function(value, options) {
                var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
                return moment.utc(value).format(format);
            }
        });

        validate.validators['!='].options = {message: "Différent de svp"};
        validate.validators.inclusion.options = {message: "Pas inclus"};
        // validate.validators.datetime.options = {message: "Pas un datetime"};
        // validate.validators.datetime.options = {message: "Pas un datetime"};

        a(
            // validate(
            //     {'test': '2020-06-01'},
            //     {'test': {
            //         datetime:   {
            //             dateOnly:  true,
            //             '>=':  '2021-03-28',
            //         }
            //     }},
            // )
            validate.single(
                '2021-02-28 10:30:40',
                {datetime: {
                    datetime:   true,
                    '>=':   '2021-02-28 08:30:40'
                }}
                // 3,
                // {  '>=': {'>=' : 10, presence: true, 'message': 'salutéé !'}  }
                // {  'datetime': {
                //     dateOnly: true,
                //     earliest: {
                //         earliest: '2021-03-28',
                //         message: 'pas avant le 2021-03-28 svp'
                //     }
                // }  }
            )
            // validate({foo: "some value", bar: 'toto'}, {foo: {custom: "some options"}})
        )

        
        // todo: config merge...
        // validate.validators.presence.options = {message: "can't be empty"};

        // test
        this.fieldsRules.promoStartDate.date['>='] = '2021-04-22';
        this.fieldsRules.promoEndDate.date['>='] = '2021-04-01';
        log('fieldsRules', this.fieldsRules);
        //

        this.listenFields();

        // validate.validators.presence.options = {message: "can't be empty"};
    }

    /**
     * Add customized validators
     */
    static addCustomizedValidators()
    {
        // COMPARISON OPERATORS
        // >=
        validate.validators['>='] = function(value, options, key, attributes) {
            let isValid = ( value >= (options['>='] ?? options) );
            if (!isValid) {
                return InputControl.generateErrorMessage('>=', null, value, options, key, attributes);
            }
        };
        // >
        validate.validators['>'] = function(value, options, key, attributes) {
            let isValid = ( value > (options['>'] ?? options) );
            if (!isValid) {
                return InputControl.generateErrorMessage('>', null, value, options, key, attributes);
            }
        };
        // <=
        validate.validators['<='] = function(value, options, key, attributes) {
            let isValid = ( value <= (options['<='] ?? options) );
            if (!isValid) {
                return InputControl.generateErrorMessage('<=', null, value, options, key, attributes);
            }
        };
        // <
        validate.validators['<'] = function(value, options, key, attributes) {
            let isValid = ( value < (options['<'] ?? options) );
            if (!isValid) {
                return InputControl.generateErrorMessage('<', null, value, options, key, attributes);
            }
        };
        // !==
        validate.validators['!=='] = function(value, options, key, attributes) {
            let isValid = ( value !== (options['!=='] ?? options) );
            if (!isValid) {
                return InputControl.generateErrorMessage('!==', null, value, options, key, attributes);
            }
        };
        // !=
        validate.validators['!='] = function(value, options, key, attributes) {
            let isValid = ( value != (options['!='] ?? options) );
            if (!isValid) {
                return InputControl.generateErrorMessage('!=', null, value, options, key, attributes);
            }
        };
        // DATE
        validate.validators['date'] = function(value, options, key, attributes) {
            let validateResult, isValid, expectedValue, operator, obj;
            validateResult = validate.single(
                value,
                {datetime: {dateOnly:true} }
            );
            isValid = ( validateResult === undefined );
            if (!isValid) {
                return InputControl.generateErrorMessage('date', null, value, options, key, attributes);
            }
            // DATE {{COMPARISON_OPERATORS}}
            let iCount = InputControl.comparisonOperators.length;
            for (let i = 0; i < iCount; i++) {
                operator = InputControl.comparisonOperators[i];
                expectedValue = valOr(options,[operator]);
                if (expectedValue !== null) {
                    a(value, operator, expectedValue)
                    obj = {};
                    obj[operator] = expectedValue;
                    validateResult = validate.single(
                        value,
                        obj
                    );
                    isValid = ( validateResult === undefined );
                    if (!isValid) {
                        return InputControl.generateErrorMessage('date', operator, value, options, key, attributes);
                    }
                }
            }
        };
        // DATETIME
        validate.validators['datetime'] = function(value, options, key, attributes) {
            let validateResult, isValid, expectedValue, operator, obj;
            value = '2018-01-20 05:12:50'
            isValid = (
                (new Date(value).toString() !== 'Invalid Date') &&
                (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value))
            );
            if (!isValid) {
                return InputControl.generateErrorMessage('datetime', null, value, options, key, attributes);
            }
            // DATETIME {{COMPARISON_OPERATORS}}
            let iCount = InputControl.comparisonOperators.length;
            for (let i = 0; i < iCount; i++) {
                operator = InputControl.comparisonOperators[i];
                expectedValue = valOr(options,[operator]);
                if (expectedValue !== null) {
                    // a(value, operator, expectedValue)
                    obj = {};
                    obj[operator] = expectedValue;
                    validateResult = validate.single(
                        value,
                        obj
                    );
                    isValid = ( validateResult === undefined );
                    if (!isValid) {
                        return InputControl.generateErrorMessage('datetime', operator, value, options, key, attributes);
                    }
                }
            }
        };
    }

    /**
     * Generate and returns the error message
     * 
     * @param {string} rule Rule
     * @param {string|null} subRule Sub-rule
     * @param {*} value Field value
     * @param {*} options Fields rules
     * @param {string} key Field name
     * @param {*} attributes Fields values
     * @param {object|null} instance The instance (if null, take account of the last instance)
     * 
     * @returns {string}
     */
    static generateErrorMessage(rule, subRule, value, options, key, attributes, instance = null)
    {
        if (instance == null) {
            instance = InputControl.getInstance();
        }
        let messages = instance.config.default_messages;
        let message, expectedValue;
        if (subRule == null) {
            // RULE ONLY
            expectedValue =
                valOr( options, [rule,rule] ) ??
                valOr( options, [rule] ) ??
                options;
            message = 
                valOr( options, ['message'] ) ??
                valOr( options, [instance.getConfig('prioritary_message_param')] ) ??
                valOr( messages, [rule,rule] ) ??
                valOr( messages, [rule] ) ??
                null;
        } else {
            // RULE & SUB-RULE
            expectedValue =
                valOr( options, [subRule,subRule] ) ??
                valOr( options, [subRule] );
            message =
                valOr( options, [subRule,'message'] ) ??
                valOr( options, [instance.getConfig('prioritary_message_param')] ) ??
                valOr( messages, [rule,rule+'.'+subRule] ) ??
                null;
        }
        if (message == null) {
            message =
                valOr( options, ['message'] ) ??
                instance.getConfig('message') ??
                'Donnée incorrecte';
        }
        let newMessage = message;
        let strBefore = instance.getConfig('str_before_replacement');
        let strAfter = instance.getConfig('str_after_replacement');
        // expected
        if (typeof(expectedValue) !== 'string') {
            expectedValue = JSON.stringify(expectedValue);
        }
        newMessage = newMessage.replace(
            strBefore + 'expected' + strAfter,
            expectedValue
        );
        // value
        if (typeof(value) !== 'string') {
            value = JSON.stringify(value);
        }
        newMessage = newMessage.replace(
            strBefore + 'value' + strAfter,
            value
        );
        // field
        newMessage = newMessage.replace(
            strBefore + 'field' + strAfter,
            key
        );
        log(newMessage)
        log('♠♠ instance', instance)
        log ('♠message', message)
        log('◘♦♣♠◘ fieldValue (value)', value)
        log('◘♦♣♠◘ fieldRules (options)', options)
        log('◘♦♣♠◘ fieldName (key)', key)
        log('◘♦♣♠◘ fieldsValues (attributes)', attributes)
        log('◘♦♣♠◘ message', message)
        log('◘♦♣♠◘ newMessage', newMessage)
        return newMessage;
    }

    // class methods
    /**
     * Check if MULTIPLE fields are valid and returns the result :
     *  - is data valid ?
     *  - valid fields ?
     *  - invalid fields ?
     *  - if error : what error ?
     * 
     * @param {json} fieldsValue The data to check (all the fields to be checked). Like this :
     *  [ $fieldName => $fieldValue,.. ]
     * @param {json} fieldsRules All fields rules
     * 
     * @returns {json}
     */
    static checkAll(fieldsValue, fieldsRules)
    {
        log('♠ fieldsValue', fieldsValue);
        log('♠ fieldsRules', fieldsRules);
        let libResult = validate(fieldsValue, fieldsRules);
        return InputControl.resultFromValidateResult(libResult);
    }

    /**
     * Returns a result from a validateJs result
     * 
     * @param {json} validateJsResult The validateJs result
     * 
     * @returns {json}
     */
    static resultFromValidateResult(validateJsResult) {
        
    }

    /**
     * Collects values
     * 
     * @param {string|HTMLElement|object} elements Selector | DOM element | jQuery object
     * '.field' by default
     * @param {string} fieldName Possibilities :
     *  - 'id' :        The name of each field will match the id of each input
     *  - attrName :    The name of each field will match the value of the specified attribute
     * 
     * @returns 
     */
    static collectValues(elements = '.field', fieldName = 'id')
    {
        let sField, fieldsValue = {};
        $(elements).each(function() {
            if (
                ( typeof(fieldName) === 'string' ) &&
                (
                    ( $(this).attr('data-ignored') === undefined ) ||
                    ( $(this).attr('data-ignored') == false )
                )
            ) {
                sField = $(this).attr(fieldName);
                fieldsValue[sField] = $(this).value();
            }
        })
        return fieldsValue;
    }

    /**
     * Returns the name of the current .js file (without extension)
     * 
     * @returns {string}
     */
    static getJsFileName()
    {
        let url = document.location.href;
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        return url;
    }

    /**
     * Apply and returns the config which were defined in the PHP class
     * 
     * @param {?string} page The PHP file name (without extension). Eg: 'adm_promo'.
     * If not supplied, the caller js file name is taken account.
     * @param {boolean} logTheResult If true, result will be logged in console (with 'err' on failure)
     * 
     * @returns {json|null} Null on failure
     */
    static getConfigFromPhp(page = null, logTheResult = true)
    {
        if (isEmpty(page)) {
            page = InputControl.getJsFileName();
        }
        let data = {
            'page': page,
            'action': InputControl.ajaxAction_getConfig,
            'bJSON': 1,
            'bLoadHtml': false
        }
        let json = $.ajax({
            'type': 'POST',
            'url': InputControl.ajaxUrl,
            'async': false,
            'data': data,
            'dataType': 'json',
            'cache': false
        })
        .done(function(data) {
            if (logTheResult) {
                log('InputControl.getConfigFromPhp()', data)
            }
        })
        .fail(function(err) {
            if (logTheResult) {
                log('InputControl.getConfigFromPhp() : error', err)
            }
        }).responseJSON ?? null;
        return json;
    }

    /**
     * returns the desired instance (last by default)
     * 
     * @param {number} desiredInstance Index of desired instance. integer (-1 by default)
     * 
     * @returns {object} Returns an InputControl object
     */
    static getInstance(desiredInstance = -1)
    {
        if (InputControl.instances.length === 0) {
            return;
        }
        let instancesCount = InputControl.instances.length;
        if (desiredInstance > 0) {
            return InputControl.instances[ desiredInstance ]
        } else if (desiredInstance < 0) {
            return InputControl.instances[ instancesCount + desiredInstance ]
        }
    }

    /**
     * Returns the fields rules which were defined in the PHP class
     * 
     * @param {?string} page The PHP file name (without extension). Eg: 'adm_promo'.
     * If not supplied, the caller js file name is taken account.
     * @param {boolean} logTheResult If true, result will be logged in console (with 'err' on failure)
     * @param {boolean} getConfig If true, get the config from PHP.
     * 
     * @returns {json|null} Null on failure
     */
    static getRules(page = null, logTheResult = true, getConfig = true)
    {
        if (isEmpty(page)) {
            page = InputControl.getJsFileName();
        }
        let data = {
            'page': page,
            'action': InputControl.ajaxAction_getRules,
            'bJSON': 1,
            'bLoadHtml': false
        }
        return $.ajax({
            'type': 'POST',
            'url': InputControl.ajaxUrl,
            'async': false,
            'data': data,
            'dataType': 'json',
            'cache': false
        })
        .done(function(data) {
            if (logTheResult) {
                log('InputControl.getRules()', data)
            }
        })
        .fail(function(err) {
            if (logTheResult) {
                log('InputControl.getRules() : error', err)
            }
        }).responseJSON ?? null;
        if (getConfig) {
            InputControl.getConfig();
        }
    }

    // instance methods
    /**
     * Check if MULTIPLE fields are valid and returns the result :
     *  - is data valid ?
     *  - valid fields ?
     *  - invalid fields ?
     *  - if error : what error ?
     * 
     * @returns {json}
     */
    checkAll() {
        this.fieldsValue = fieldsValue;
        let libResult = validate(this.fieldsValue, this.fieldsRules);
        log('libResult', libResult);
        return libResult;
    }

    /**
     * Collect all fields value and returns whether their content is valid or not, and details
     * 
     * @param {string|HTMLElement|object} elements Selector | DOM element | jQuery object
     * '.field' by default
     * @param {string} fieldName Possibilities :
     *  - 'id' :        The name of each field will match the id of each input
     *  - attrName :    The name of each field will match the value of the specified attribute
     * 
     * @returns {json}
     */
    checkFields(elements = '.field', fieldName = 'id')
    {
        this.fieldsValue = InputControl.collectValues(elements, fieldName);
        return this.checkAll();
    }

    /**
     * @getter
     * Returns the config param value (or the default if not setted)
     * 
     * @param {string} paramName The parameter name
     *  
     * @returns {*}
     */
    getConfig(paramName)
    {
        return this.config[paramName] ?? InputControl.defaultConfig[paramName] ?? null;
    }

    /**
     * Returns wheter a field is valid or not
     * 
     * @param {string} fieldName The field name
     * @param {?*} fieldValue The field value
     * 
     * @returns {boolean}
     */
    isFieldValid(fieldName, fieldValue = null)
    {
        let value, rules, validateJsResult;
        if (fieldName !== this.fieldName) {
            this.fieldName = fieldName;
        }
        if (fieldValue === null) {
            fieldValue = this.getFieldValue(fieldName);
            this.fieldValue = fieldValue;
        }
        value = {};
        value[fieldName] = fieldValue;
        rules = {};
        rules[fieldName] = this.fieldsRules[fieldName];
        this.validateJsResult = validate(
            value,
            rules,              // here!!
            {format: "grouped"} // grouped (by default) | flat | detailed
        );
        this.fieldMessage = this.messageFromValidateResult(false);
        log('◘◘', fieldName, fieldValue, this.validateJsResult, (this.validateJsResult == null))
        return (this.validateJsResult == null);
    }

    /**
     * Returns the span which will contain the message describing that the field is invalid, encapsulated in a jQuery object.
     * 
     * @param {?string} fieldName The field name
     * 
     * @returns {object} Null on failure
     */
    fieldMessageObject(fieldName = null, createIfUndefined = true)
    {
        if (fieldName == null) {
            fieldName = this.fieldName;
        }
        let $msg = $('#' + fieldName + 'Message');
        let $msgCount = $msg.length;
        console.log(
            'here',
            $msg,
            $msgCount
        )
        if (createIfUndefined && ($msgCount === 0)) {
            let $input = this.fieldObject(fieldName);
            let msgSpanId = fieldName + 'Message';
            $input.after(`<span id="${msgSpanId}" class="${this.getConfig('invalid_message_class')}"></span>`);
            return $('#' + msgSpanId);
        }
        return $msg;
    }

    /**
     * Returns the input which is associated to a field name, encapsulated in a jQuery object.
     * 
     * @param {?string} fieldName The field name
     * 
     * @returns {object} Null on failure
     */
    fieldObject(fieldName = null)
    {
        if (fieldName == null) {
            fieldName = this.fieldName;
        }
        return $('#' + fieldName);
    }

    /**
     * Returns the input which is associated to a field name, encapsulated in a jQuery object.
     * 
     * @param {?string} fieldName The field name
     * 
     * @returns {object} Null on failure
     */
    getFieldValue(fieldName = null)
    {
        return this.fieldObject(fieldName).value();
    }

    /**
     * Returns the invalid field message.
     * 
     * @returns {?string}
     */
    getMessage()
    {
        return this.fieldMessage ?? null;
    }

    listenFields()
    {
        let oThis = this;
        let fields = Object.keys(this.fieldsRules);
        let fieldsCount = fields.length;
        for (let i = 0; i < fieldsCount; i++) {
            oThis.fieldName = fields[i];
            oThis.fieldInput = oThis.fieldObject();
            oThis.fieldInput.on('change', function() {
                oThis.fieldName = $(this).attr('id');
                oThis.fieldValue = oThis.getFieldValue();
                oThis.fieldIsValid = oThis.isFieldValid(oThis.fieldName, oThis.fieldValue);
                oThis.setFieldValidity(oThis.fieldName, oThis.fieldIsValid);
                // alert(oThis.getMessage())
            })
        }
    }

    /**
     * Returns a result from a validateJs result
     * 
     * @param {boolean} isDetailed Is the source validateJs result detailed ?
     * 
     * @returns {string}
     */
    messageFromValidateResult(isDetailed = true) {
        let libResult = this.validateJsResult;
        if (!isDetailed) {
            return libResult[this.fieldName] ?? libResult[0] ?? null;
        } else {
            log('◘' , this.fieldName, 'libResult', libResult)

        }
    }

    setFieldValidity(fieldName, fieldIsValid = null, showMessage = true) {
        if (fieldName == null) {
            fieldName = this.fieldName;
        }
        if (fieldIsValid == null) {
            fieldIsValid = this.isFieldValid(fieldName)
        }
        let $msg = this.fieldMessageObject(fieldName, true);
        let $input = this.fieldObject(fieldName);
        $input.removeClass(['invalid', 'valid']);
        switch (fieldIsValid) {
            case true:
                $input.addClass('valid');
                if (showMessage) {
                    $msg.html( '' );
                }
                break;
            case false:
                $input.addClass('invalid');
                if (showMessage) {
                    $msg.html( this.getMessage() );
                }
        }
    }
}