import Profiler from "./profiler.js";
import Scope from "./objects/scope.js";
import Condition from "./objects/condition.js";

class Data {
  constructor() {
    this.currentScope = null
    this.scopes = [];
    this.libraries = [];
    this.unUsedVariables = []; 
    this.profiler = new Profiler()
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
    let leavingScope = this.scopes.shift()
    this.currentScope = this.scopes[0]
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

  diagnose() {
    return this.profiler.result()
  }
}

export default Data;
