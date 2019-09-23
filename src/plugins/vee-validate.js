import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, between, max } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('maxInstructions', {
  ...max,
  message: 'Should be text with no more than 30 words',
})

extend('betweenCurrency', {
  ...between,
  message: 'Should be a number between 5 and 500',
})

extend('url', {
  validate(value) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i'
    )
    return !!pattern.test(value)
  },
  message: 'Please enter URL',
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
