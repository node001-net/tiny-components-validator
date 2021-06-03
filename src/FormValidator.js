import validate from 'validate.js'
import serialize from 'form-serialize'

/**
 *
 *
 *
 */
class FormValidator
{
    /**
     *
     *  @param {[type]} formSelector [description]
     *  @param {[type]} constraits   [description]
     */
    constructor(formSelector, constraits)
    {
        this.errors = []

        // getting selector to find form-element
        this.formSelector = formSelector

        // constraits for validate.js
        this.constraits = constraits

        // get form and elements
        this.form = document.querySelector(this.formSelector)
        this.elements = this.form.querySelectorAll('field-error')

        // adding submit event
        this.form.addEventListener('submit', (event) => {
            this.onSubmit(event)
        })

        // adding event if a element is updated
        this.form.addEventListener('field-update', (event) => {
            this.onFieldUpdate(event)
        })
    }

    /**
     *
     *  @param  {[type]} name [description]
     *  @return {[type]}      [description]
     */
    findElementByName(name) {

        let result

        this.elements.forEach((element) => {
            if (element.attributes.name.nodeValue == name) {
                result = element
                return false
            }
        })

        return result
    }

    /**
     *
     *  @param  {[type]} event [description]
     *  @return {[type]}       [description]
     */
    onSubmit(event) {
        let errors = validate(serialize(event.target, {
            hash: true
        }), this.constraits)

        if (errors) {
            event.preventDefault()

            this.elements.forEach((element) => {
                let elementErrors = false

                if (errors[element.attributes.name.nodeValue]) {
                    elementErrors = errors[element.attributes.name.nodeValue]
                }

                this.dispatchCustomEvent(elementErrors, element)
            })
        }
    }

    /**
     *
     *  @param  {[type]} event [description]
     *  @return {[type]}       [description]
     */
    onFieldUpdate(event) {

        // if value is a empty string make him undefined
        if (!event.detail.value) {
            event.detail.value = undefined
        }

        let errors = validate.single(event.detail.value, this.constraits[event.detail.name])
        let element = this.findElementByName(event.detail.name)

        this.dispatchCustomEvent(errors, element)
    }

    /**
     *
     *  @param  {[type]} errors  [description]
     *  @param  {[type]} element [description]
     *  @return {[type]}         [description]
     */
    dispatchCustomEvent(errors, element)
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