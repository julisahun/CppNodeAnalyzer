import { analyzerResult } from 'cpp-node-analyzer/src/types';
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
    this.options = { ...defaultOptions, ...options };
  }

  validate(code: string) {
    this.verdict = {
      valid: true,
      errors: []
    };
    const cppNodeAnalyzer = new Analyzer();
    const result = cppNodeAnalyzer.analyze(code);
    this.validateLibraries(result);
    this.validateProgramType(result);
    this.validateFunctions(result);
    this.validateMethods(result);
    return this.verdict;
  }

  validateLibraries(result: analyzerResult) {
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

  validateProgramType(result: analyzerResult) {
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

  validateFunctions(result: analyzerResult) {
    const { mustUseFunctions } = this.options;
    const functions = result.analysis.functions;
    const missingFunctions = mustUseFunctions.filter(mustUseFunction => {
      const functionUsed = functions.find(usedFunction => usedFunction.name === mustUseFunction.name);
      if (!functionUsed) return true;

      for (let i = 0; i < mustUseFunction.parameters.length; i++) {
        const { name, type } = mustUseFunction.parameters[i];
        const { name: usedName, type: usedType } = functionUsed.parameters[i];
        if (name !== usedName) return true;
        if (type !== usedType) return true;
      }
      return false;
    })
    if (missingFunctions.length) {
      this.verdict.valid = false;
      this.verdict.errors.push('The program does not use all the required functions: ' + missingFunctions.map(({name}) => name).join(', '));
    }
  }

  validateMethods(result: analyzerResult) { 
    const { forced, prohibited } = this.options.methods;
    const methods = result.analysis.methods;
    const missingMethods = forced.filter(forcedMethod => !methods.some(method => method.name === forcedMethod.name && method.type === forcedMethod.type));
    const prohibitedMethods = prohibited.filter(prohibitedMethod => methods.some(method => method.name === prohibitedMethod.name && method.type === prohibitedMethod.type));
    if (missingMethods.length) {
      this.verdict.valid = false;
      this.verdict.errors.push('The program does not use all the required methods: ' + missingMethods.map(({ name }) => name).join(', '));
    }
    if (prohibitedMethods.length) {
      this.verdict.valid = false;
      this.verdict.errors.push('The program uses a prohibited method: ' + prohibitedMethods.map(({ name }) => name).join(', '));
    }
  }
}

export default Validator;