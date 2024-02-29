class Profiler {
  libraries: string[];
  unUsedVariables: string[];
  redeclaration: boolean;
  constantConditions: boolean;
  breaks: boolean;
  constructor() {
    this.libraries = [];
    this.unUsedVariables = [];
    this.redeclaration = false;
    this.constantConditions = false;
    this.breaks = false;
  }

  addInclude(name: string) {
    this.libraries.push(name)
  }

  addUnUsedVariable(name: string) {
    this.unUsedVariables.push(name)
  }

  registerRedeclaration() {
    this.redeclaration = true
  }

  registerConstantCondition() {
    this.constantConditions = true
  }

  registerBreak() {
    this.breaks = true
  }

  result() {
    return {
      usedLibraries: this.libraries,
      unUsedVariables: this.unUsedVariables,
      containsRedeclarations: this.redeclaration,
      containsConstantConditions: this.constantConditions,
      usesBreaks: this.breaks
    }
  }
}


export default Profiler
