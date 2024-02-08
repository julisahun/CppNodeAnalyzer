class profiler {
  constructor() {
    this.libraries = [];
    this.unUsedVariables = [];
    this.reDeclaration = false;
  }

  addInclude(name) {
    this.libraries.push(name)
  }

  addUnUsedVariable(name) {
    this.unUsedVariables.push(name)
  }

  registerReDeclaration() {
    this.reDeclaration = true
  }

  result() {
    return {
      usedLibraries: this.libraries,
      unUsedVariables: this.unUsedVariables,
      containsReDeclarations: this.reDeclaration
    }
  }
}


export default profiler
