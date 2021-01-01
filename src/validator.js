import validate from 'validate.js'
import serialize from 'form-serialize'

/**
 *  Validate entire Form or a single Element
 *
 *  Using validator.js 
 *
 *  @author Björn Hase, Tentakelfabrik, me@tentakelfabrik.de
 *
 */
class Validator {

    /**
     *
     *  @param {array} rules
     */
    constructor(rules, component) {
        this._rules = rules
        this._component = component

        this._errors = {

        }
    }

    /**
     *  handle validation
     *
     *  if key not set,
     *
     *  @param  {object} event
     *  @param  {object} key
     *
     */
    handle(event, key) {

        event.preventDefault()

        let data = null, rules, errors

        if (key) {
            if (event.target.value) {
                data = event.target.value
            }
        } else {
            data = serialize(event.target, {
                hash: true
            })
        }

        // validate single
        if (key) {
            rules = this._rules[key]

            errors = validate.single(data, rules, {
                flat: true
            })

            if (errors) {
                this._errors[key] = errors
            } else {
                delete this._errors[key]
            }

        // validate entire form
        } else {
            this._errors = validate(data, this._rules)
        }

        // update component
        this._component.update()
    }

    /**
     *
     *
     *  @param  {[type]} key
     *  @return {[type]}
     */
    errors(key) {

        if (key) {
            return this._errors[key]
        }

        return this._errors

    }
}

export default Validator