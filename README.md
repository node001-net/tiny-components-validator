# Tiny Components - Validator

Created with [Riot.js](https://riot.js.org)

Validate Form or a Single Form-Field, Error Messages can be show just in time
or after Submit entire Form.

For Validation this Component uses [Validate.js](https://validatejs.org/)

## Install

```bash
npm install @tiny-components/validator --save
```

## How to use

```javascript
<form onsubmit={ (event) => { state.validator.handle(event) }} novalidate>
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
        onBeforeMount() {
            this.state.validator = new Validator({
                email: {
                    presence: true
                    email: true
                },
                password: {
                    presence: true
                }
            }, this)
        }
    }
</script>
```