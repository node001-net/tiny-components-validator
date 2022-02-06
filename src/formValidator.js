import validate from 'validate.js'
import serialize from 'form-serialize'

/**
 *  Form Validator with RiotJS Components
 *
 *
 *  @author HerrHase
 *  @
 *
 */

class FormValidator
{
    /**
     *
     *  @param {[type]} formSelector [description]
     *  @param {[type]} constraits   [description]
     */
    constructor(formElement, constraits, onSuccess)
    {
        // constraits for validate.js
        this.constraits = constraits

        // adding onSuccess
        this._onSuccess = onSuccess

        // if form not found
        if (!this._onSuccess) {
            console.error('FormValidator: onSuccess not found!')
        }

        // get form and elements
        this.form = formElement

        // if form not found
        if (!this.form) {
            console.error('FormValidator: form not found!')
        }

        this.elements = this.form.querySelectorAll('field-error')

        // adding submit event
        this.form.addEventListener('submit', (event) => {
            this._onSubmit(event)
        })

        // adding event if a element is updated
        this.form.addEventListener('field-update', (event) => {
            this._onFieldUpdate(event)
        })
    }

    /**
     *  handle submit
     *
     *
     *  @param  {Event} event
     *
     */
    _onSubmit(event)
    {
        // getting data from target of submit event
        const data = serialize(event.target, {
            hash: true
        })

        // options for validate.js
        const options = {
            fullMessages: false
        }

        validate.async(data, this.constraits, options).then(

            // handling success
            () => {
                this._onSuccess(event, data)
            },

            // handling error
            (errors) => {

                event.preventDefault()

                // send each element a event
                this.elements.forEach((element) => {
                    let elementErrors = false

                    // check for errors by name
                    if (errors[element.attributes.name.nodeValue]) {
                        elementErrors = errors[element.attributes.name.nodeValue]
                    }

                    this._dispatchCustomEvent(elementErrors, element)
                })

            }
        )
    }

    /**
     *  send update to fields
     *
     *
     *  @param  {Event} event
     *
     */
    _onFieldUpdate(event)
    {
        // workaround, make sure that value for single is undefined if it is empty
        if (event.detail.value == '') {
            event.detail.value = undefined
        }

        let errors = validate.single(event.detail.value, this.constraits[event.detail.name])

        // search for element by name and dispatch event
        this.elements.forEach((element) => {
            if (element.attributes.name.nodeValue == event.detail.name) {
                this._dispatchCustomEvent(errors, element)
            }
        })
    }

    /**
     *  dispatch event to single element
     *
     *  @param  {Array} errors
     *  @param  {Element} element
     *
     */
    _dispatchCustomEvent(errors, element)
    {
        let detail = false

        if (errors) {
            detail = errors
        }

        const formValidationEvent = new CustomEvent('form-validation', {
            'detail': detail
        })

        element.dispatchEvent(formValidationEvent)
    }
}

export default FormValidator