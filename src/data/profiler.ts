import { analyzerResult } from "./types";

class Profiler {
  libraries: string[];
  unUsedVariables: string[];
  redeclaration: boolean;
  constantConditions: boolean;
  breaks: boolean;
  usesFunctions: boolean;
  recursive: boolean;
  constructor() {
    this.libraries = [];
    this.unUsedVariables = [];
    this.redeclaration = false;
    this.constantConditions = false;
    this.breaks = false;
    this.usesFunctions = false;
    this.recursive = false;
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

  registerFunction() {
    this.usesFunctions = true;
  }

  registerRecursion() {
    this.recursive = true;
  }

  result(): analyzerResult {
    return {
      usedLibraries: this.libraries,
      unUsedVariables: this.unUsedVariables,
      containsRedeclarations: this.redeclaration,
      containsConstantConditions: this.constantConditions,
      usesFunctions: this.usesFunctions,
      usesBreaks: this.breaks,
      isRecursive: this.recursive,
    };
  }
}

export default Profiler;
