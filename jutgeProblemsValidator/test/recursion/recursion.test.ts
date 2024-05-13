import { readSources, evaluate } from '../test';
import Validator from '../../src/validator';
import verdicts from './verdicts.json';

let validator = new Validator()

function validateProgram(programId: string) {
  let sources = readSources(__dirname + '/sources/' + programId)
  for (let { source, name } of sources) {
    it(`program ${programId} - ${name}`, () => {
      let result = evaluate(source, validator)
      expect(result).toEqual(verdicts[programId][name])
    })
  }
}

describe('should validate recursive programs', () => {
  validator.setOptions({ programType: 'recursive', mustUseFunctions: [{ name: 'factorial', type: 'int', parameters: [{ type: 'int', name: 'n' }] }] })
  const programs = ['P12509']
  programs.forEach(validateProgram)
})

describe('should validate iterative programs', () => {
  validator.setOptions({ programType: 'iterative' })
  const programs = ['P79817']
  programs.forEach(validateProgram)
})