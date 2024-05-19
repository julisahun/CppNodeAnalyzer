import Validator from '../src/validator'
import programs from './P79817.json'
import readline from 'readline'

let validator = new Validator()

validator.setOptions({ programType: { iterative: true, recursive: false } })

let [valid, invalid, errors] = [[], [], []]
let n = programs.length
let i = 0
for (let source of programs.slice(0, n)) {
  i++
  try {
    let result = validator.validate(source)
    if (result.valid) valid.push(source)
    else invalid.push(source)
  } catch (e) {
    if (e.message.includes('This code is not analyzable') || e.message.includes('Error preprocessing code')) { }
    else {
      console.log({ source, error: e })
    }
    errors.push(source)
  }
  if (i % 100 === 0) console.log(`${i}/${n} programs validated`)
}
let total = n
console.log(`Valid: ${valid.length / total * 100}%, Invalid: ${invalid.length / total * 100}%, Errors: ${errors.length / total * 100}%`)

import readlineSync from 'readline-sync'

let res = readlineSync.question(`Do you want to see the valid programs? (y/n)`)
if (res === 'y') {
  let keep = true
  do {
    let i = Math.floor(Math.random() * valid.length)
    console.log(valid[i])
    keep = readlineSync.question(`Do you want to see another valid program? (y/n)`) === 'y'
  } while (keep)
}

res = readlineSync.question(`Do you want to see the invalid programs? (y/n)`)
if (res === 'y') {
  let keep = true
  do {
    let i = Math.floor(Math.random() * invalid.length)
    console.log(invalid[i])
    keep = readlineSync.question(`Do you want to see another invalid program? (y/n)`) === 'y'
  } while (keep)
}

res = readlineSync.question(`Do you want to see the errors programs? (y/n)`)
  let keep = true
  do {
  let i = Math.floor(Math.random() * errors.length)
  console.log(errors[i])
  keep = readlineSync.question(`Do you want to see another errors program? (y/n)`) === 'y'
} while (keep)

