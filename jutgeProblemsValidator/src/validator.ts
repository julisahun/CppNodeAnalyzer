import defaultOptions from './defaultOptions';
import { ValidatorOptions, Verdict } from './types';
import Analyzer from 'cpp-node-analyzer';

class Validator {
  options: ValidatorOptions;
  verdict: Verdict;
  constructor() {
    this.options = defaultOptions;
    this.verdict = {
      valid: true,
      errors: []
    };
  }

  setOptions(options: ValidatorOptions) {
    this.options = options;
  }

  validate(code: string) {
    const cppNodeAnalyzer = new Analyzer();
    const result = cppNodeAnalyzer.analyze(code);
    this.validateLibraries(result);
    this.validateProgramType(result);
    this.validateFunctions(result);
    return this.verdict;
  }

  validateLibraries(result: any) {
    let usedLibraries = result.analysis.usedLibraries;
    const { forced: forcedLibraries, prohibited: prohibitedLibraries } = this.options.libraries;
    const usesForcedLibraries = forcedLibraries.every(forcedLibrary => usedLibraries.includes(forcedLibrary));
    if (!usesForcedLibraries) {
      this.verdict.valid = false;
      this.verdict.errors.push('The program does not use all the required libraries');
    }
    const usesProhibitedLibraries = prohibitedLibraries.some(prohibitedLibrary => usedLibraries.includes(prohibitedLibrary));
    if (usesProhibitedLibraries) {
      this.verdict.valid = false;
      this.verdict.errors.push('The program uses a prohibited library');
    }
  }

  validateProgramType(result: any) {
    const { programType } = this.options;
    if (programType === 'n/a') return;
    if (programType === 'iterative' && result.analysis.isRecursive) {
      this.verdict.valid = false;
      this.verdict.errors.push('The program is recursive');
    }
    if (programType === 'recursive' && !result.analysis.isRecursive) {
      this.verdict.valid = false;
      this.verdict.errors.push('The program is iterative');
    }
  }

  validateFunctions(result: any) {
    const { mustUseFunctions } = this.options;
    const functions = result.analysis.functions;
    const missingFunctions = Object.entries(mustUseFunctions).filter(([name, parameters]) => {
      if (!functions[name]) return true;
      for (let i = 0; i < parameters.length; i++) {
        if (parameters[i].name) {
          if (parameters[i].name !== functions[name][i].name) return true;
        }
        if (parameters[i].type) {
          if (parameters[i].type !== functions[name][i].type) return true;
        }
      }
      return false;
    })
    if (!missingFunctions.length) {
      this.verdict.valid = false;
      this.verdict.errors.push('The program does not use all the required functions:', missingFunctions.map(([name]) => name).join(', '));
    }
  }

}

export default Validator;