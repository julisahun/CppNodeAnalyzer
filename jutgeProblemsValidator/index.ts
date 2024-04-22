import Validator from './src/validator'

let validator = new Validator()

export function setOptions(options) {
  validator.setOptions(options)
}

export function validate(code) {
  return validator.validate(code)
}