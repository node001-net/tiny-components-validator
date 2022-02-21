# Tiny Components - Validator

Created with [Riot.js](https://riot.js.org)

Validate Form or a Single Form-Field, Error Messages can be show just in time
or after Submit entire Form.

For Validation this Component uses [Validate.js](https://validatejs.org/)

## Install

```bash
npm install @tiny-components/validator --save
```

## You can use it like this

```javascript
<form class="form" onsubmit={ (event) => ( state.validator.submit(event) ) }>>
    <div class="field">
        <label>
            email
            <input type="email" name="email" onkeyup={ (event) => { state.validator.handle(event, 'email') }} />
        </label>
        <field-error errors={ state.validator.errors('email') } ></field-error>
    </div>
    <div class="field">
        <label>
            password
            <input type="password" name="email" onkeyup={ (event) => { state.validator.handle(event, 'password') }} />
        </label>
        <field-error errors={ state.validator.errors('password') } ></field-error>
    </div>
    <button type="submit">Send</button>
</form>

<script>
    import Validator from './validator.js'

    export default {

        state: {
            validator: { }
        },

        onBeforeMount() {
            // creating formValidator
            this.state.validator = new FormValidator(this.$('.form'), {
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
         */
        handleSuccess(event, data)
        {
            event.preventDefault()
            this.update()
        },

        /**
         *
         */
        handleError(event, errors, data)
        {
            this.update()
        }

    }
</script>
```