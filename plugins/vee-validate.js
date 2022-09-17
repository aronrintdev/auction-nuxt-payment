import { extend } from 'vee-validate'
import {
  required,
  email,
  numeric,
  min_value as minValue,
  max_value as maxValue,
  min,
  max,
  confirmed,
  alpha_num as alphaNum,
  alpha_spaces as alphaSpaces
} from 'vee-validate/dist/rules'

import { ADDRESS_REGEX } from '~/static/constants/address'

// Install required rule.
extend('required', required)

// Install email rule.
extend('email', email)

// Install numeric rule.
extend('numeric', numeric)

// Install min value rule.
extend('min_value', minValue)

// Install max value rule.
extend('max_value', maxValue)

// Install min rule.
extend('min', min)

// Install max rule.
extend('max', max)

// Install numeric rule.
extend('numeric', numeric)

// Install confirmed rule.
extend('confirmed', confirmed)

// Install oneUppercase rule.
extend('oneUppercase', (value) => {
  const regExp = /[A-Z]/

  return regExp.test(value)
})

// Install oneSymbol rule.
extend('oneSymbol', (value) => {
  const regExp = /[^\p{L}\d\s@#]/u

  return regExp.test(value)
})

// Install oneDigit rule.
extend('oneDigit', (value) => {
  const regExp = /[0-9]/

  return regExp.test(value)
})

// Install price rule.
extend('price', (value) => {
  const regExp = /([0-9]*)(\.)([0-9]{2})$/

  return regExp.test(value)
})

// Install regex rule.
extend('validAddress', (value) => {
  return ADDRESS_REGEX.test(value)
})

extend('validEmail', (value) => {
  const regExp = /^[a-zA-Z]+[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/

  return regExp.test(value)
})

// Install alphaNum rule.
extend('alphaNum', alphaNum)

// Install alphaSpaces rule.
extend('alphaSpaces', alphaSpaces)
