import { readSources, evaluate } from '../test';
import Validator from '../../src/validator';
import verdicts from './verdicts.json';

let validator = new Validator()

function validateProgram(programId: string) {
  let sources = readSources(__dirname + '/sources/' + programId)
  for (let { source, name } of sources) {
    it(`program ${name}`, () => {
      let result = evaluate(source, validator)
      console.log(verdicts[programId])
      expect(result).toEqual(verdicts[programId][name])
    })
  }
}

describe('should validate recursive programs', () => {
  validator.setOptions({ programType: 'recursive' })
  const programs = ['P12509']
  programs.forEach(validateProgram)
})