import { FunctionObject, PropertyObject } from '../types';

class Profiler {
  libraries: string[];
  unUsedVariables: string[];
  shadows: boolean;
  constantConditions: boolean;
  breaks: boolean;
  continues: boolean;
  usesFunctions: boolean;
  recursive: boolean;
  iterative: boolean;
  functions: FunctionObject[];
  properties: PropertyObject[];
  constructor() {
    this.libraries = [];
    this.unUsedVariables = [];
    this.shadows = false;
    this.constantConditions = false;
    this.breaks = false;
    this.continues = false;
    this.usesFunctions = false;
    this.recursive = false;
    this.iterative = false;
    this.functions = [];
    this.properties = [];
  }

  addInclude(name: string) {
    this.libraries.push(name);
  }

  addUnUsedVariable(name: string) {
    this.unUsedVariables.push(name);
  }

  registerShadowing() {
    this.shadows = true;
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

  registerLoop() {
    this.iterative = true;
  }

  addFunction(func: FunctionObject) {
    this.functions.push(func);
  }

  addProperty(property: PropertyObject) {
    this.properties.push(property);
  }

  result() {
    return {
      usedLibraries: this.libraries,
      unUsedVariables: this.unUsedVariables,
      shadows: this.shadows,
      containsConstantConditions: this.constantConditions,
      usesFunctions: this.usesFunctions,
      usesBreaks: this.breaks,
      usesContinues: this.continues,
      isRecursive: this.recursive,
      isIterative: this.iterative,
      functions: this.functions,
      properties: this.properties
    };
  }
}

export default Profiler;
