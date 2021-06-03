import * as riot from 'riot'

import FormValidator from './../FormValidator'
import FieldError from './../field-error.riot'

riot.register('field-error', FieldError)
riot.mount('field-error')

const formValidation = new FormValidator('form', {
    'email': {
        'presence': true,
        'email': true
    },
    'password': {
        'presence': true
    }
})