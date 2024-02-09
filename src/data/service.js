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
  constructor() {
    this.variables = {}
  }

  declareVariable(name, type) {
    this.variables[name] = new Variable(name, type);
  }

  useVariable(name) {
    this.variables[name].use();
  }

  getUnUsedVariables() {
    return Object.values(this.variables).filter(variable => !variable.isUsed())
  }

  containsVariable(name) {
    return name in this.variables
  }
}


class Function {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.invoked = false;
    this.isRecursive = false;
  }
}

class While {
  constructor(condition) {
    this.breaks = false;
    this.conditionUpdates = false;
    this.condition = condition;
  }
}

class Condition {
  constructor(nodes) {
    this.nodes = nodes
  }

  hasVariables() {
    return this.nodes.some(node => node.type === 'identifier')
  }

}

class Data {
  constructor() {
    this.currentScope = null
    this.scopes = [];
    this.libraries = [];
    this.unUsedVariables = [];
    let globalScope = new Scope()
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
      if (scope.containsVariable(name)) {
        scope.useVariable(name)
        break;
      }
    }    
  }

  registerInclude(name) {
    const libraryName = name.replace(/[<>"']/g, '')
    this.profiler.addInclude(libraryName)
  }

  createScope() {
    let newScope = new Scope()
    this.currentScope = newScope
    this.scopes.unshift(newScope)
  }

  leaveScope() {
    let leavingScope = this.scopes.pop()
    this.currentScope = this.scopes.slice(-1)
    let unUsedVariables = leavingScope.getUnUsedVariables()
    unUsedVariables.forEach(v => this.profiler.addUnUsedVariable(v.name))
  }

  storeCondition(nodes) {
    this.condition = new Condition(nodes)
    if (!this.condition.hasVariables()) 
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
