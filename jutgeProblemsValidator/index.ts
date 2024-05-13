import Validator from './src/validator'
import { ValidatorOptions } from './src/types'
import programs from './P12509.json'
import fs from 'fs'


let validator = new Validator()

validator.setOptions({ programType: 'recursive', mustUseFunctions: [{ name: 'factorial', type: 'int', parameters: [{ type: 'int', name: 'n' }] }] })

let [valid, invalid, errors] = [0, 0, 0] 

for(let source of programs) {
  try {
  let result = validator.validate(source)
  if (result.valid) valid++
  else invalid++
  } catch(e) {
    if (e.message.includes('This code is not analyzable') || e.message.includes('Error preprocessing code')) errors++
    else {
      console.log(e)
      errors++
      break
    }
  }
}
let total = valid + invalid + errors
console.log(`Valid: ${valid/total * 100}, Invalid: ${invalid/total * 100}, Errors: ${errors/ total * 100}%`)
