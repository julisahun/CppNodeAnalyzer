import { FunctionObject, MethodObject } from '../types';

class Profiler {
  libraries: string[];
  unUsedVariables: string[];
  redeclaration: boolean;
  constantConditions: boolean;
  breaks: boolean;
  continues: boolean;
  usesFunctions: boolean;
  recursive: boolean;
  functions: FunctionObject[];
  methods: MethodObject[];
  constructor() {
    this.libraries = [];
    this.unUsedVariables = [];
    this.redeclaration = false;
    this.constantConditions = false;
    this.breaks = false;
    this.continues = false;
    this.usesFunctions = false;
    this.recursive = false;
    this.functions = [];
    this.methods = [];
  }

  addInclude(name: string) {
    this.libraries.push(name);
  }

  addUnUsedVariable(name: string) {
    this.unUsedVariables.push(name);
  }

  registerRedeclaration() {
    this.redeclaration = true;
  }

  registerConstantCondition() {
    this.constantConditions = true;
  }

  registerBreak() {
    this.breaks = true;
  }

  registerContinue() {
    this.continues = true;
  }

  registerFunction() {
    this.usesFunctions = true;
  }

  registerRecursion() {
    this.recursive = true;
  }

  addFunction(func: FunctionObject) {
    this.functions.push(func);
  }

  addMethod(method: MethodObject) {
    this.methods.push(method);
  }

  result() {
    return {
      usedLibraries: this.libraries,
      unUsedVariables: this.unUsedVariables,
      containsRedeclarations: this.redeclaration,
      containsConstantConditions: this.constantConditions,
      usesFunctions: this.usesFunctions,
      usesBreaks: this.breaks,
      usesContinues: this.continues,
      isRecursive: this.recursive,
      functions: this.functions,
      methods: this.methods
    };
  }
}

export default Profiler;
