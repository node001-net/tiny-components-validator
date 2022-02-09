import * as riot from 'riot'

import FormValidator from './formValidator'
import FieldError from './fieldError.riot'
import FormComponent from './formComponent.riot'

// register & mount riot component
riot.register('field-error', FieldError)
riot.mount('field-error')

// creating formValidation
const formValidation = new FormValidator(document.querySelector('.form-html'), {
    'email': {
        'presence': true,
        'email': true
    },
    'password': {
        'presence': true
    }
}, true)

formValidation.onSuccess((event, data) => {
    event.preventDefault()

    // show message and content of data from form
    document.querySelector('#result .content').innerHTML = '<p>' + JSON.stringify(data) + '</p>'
    document.querySelector('#result').classList.remove('hidden')
})

riot.register('form-component', FormComponent)
riot.mount('form-component')