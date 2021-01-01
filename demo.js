import * as riot from 'riot'
import Demo from './demo.riot'

import FieldError from './src/field-error.riot'

riot.register('field-error', FieldError)
riot.mount('field-error')

// let it rain
riot.register('demo', Demo)
riot.mount('demo')