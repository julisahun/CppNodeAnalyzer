import profiler from "./profiler.js";

class Variable {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.used = false;
  }

  use() {
    this.used = true;
  }

  isUsed() {
    return this.used
  }
}

class Scope {
  constructor({type}) {
    this.variables = {}
    this.condition = null
    this.usedVariables = []
    switch (type) {
      case 'while':
        this.loops = true
        break;
      default:
        this.loops = false
    }
  }

  declareVariable(name, type) {
    this.variables[name] = new Variable(name, type);
  }

  useVariable(name) {
    this.variables[name]?.use();
    this.usedVariables.push(name)
  }

  getUnUsedVariables() {
    return Object.values(this.variables).filter(variable => !variable.isUsed())
  }

  containsVariable(name) {
    return name in this.variables
  }

  conditionUpdated() {
    const conditionVariables = this.condition.variables()
    console.log({conditionVariables, usedVariables: this.usedVariables})
    return conditionVariables.every(variable => this.usedVariables.includes(variable))
    
  }
}

class Condition {
  constructor(nodes) {
    this.nodes = nodes
  }

  hasVariables() {
    return this.nodes.some(node => node.type === 'identifier')
  }

  variables() {
    return this.nodes.filter(node => node.type === 'identifier').map(node => node.text)
  }
}

class Data {
  constructor() {
    this.currentScope = null
    this.scopes = [];
    this.libraries = [];
    this.unUsedVariables = [];
    let globalScope = new Scope({})
    this.scopes.push(globalScope)
    this.currentScope = globalScope 
    this.profiler = new profiler()
  }

  declareVariable(name, type) {
    const alreadyDeclared = this.scopes.some(scope => scope.containsVariable(name))
    if (alreadyDeclared) this.profiler.registerRedeclaration()
    this.currentScope.declareVariable(name, type)
  }

  useVariable(name) {
    for (let scope of this.scopes) {
      scope.useVariable(name)
      if (scope.containsVariable(name)) 
        break;
    }    
  }

  registerInclude(name) {
    const libraryName = name.replace(/[<>"']/g, '')
    this.profiler.addInclude(libraryName)
  }

  createScope(params = {}) {
    let newScope = new Scope(params)
    this.currentScope = newScope
    this.scopes.unshift(newScope)
  }

  leaveScope() {
    let leavingScope = this.scopes.pop()
    this.currentScope = this.scopes.slice(-1)
    let unUsedVariables = leavingScope.getUnUsedVariables()
    unUsedVariables.forEach(v => this.profiler.addUnUsedVariable(v.name))
    if (leavingScope.loops && !leavingScope.conditionUpdated()) 
      this.profiler.registerConstantCondition()
  }

  storeCondition(nodes) {
    const condition = new Condition(nodes)
    this.currentScope.condition = condition
    if (!condition.hasVariables()) 
      this.profiler.registerConstantCondition()
  }

  bulk() {
    console.log(this.variables);
  }

  diagnose() {
    return this.profiler.result()
  }
}

export default Data;
