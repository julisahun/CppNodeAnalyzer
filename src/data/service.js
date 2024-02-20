import Profiler from "./profiler.js";
import Scope from "./objects/scope.js";
import ConditionalScope from "./objects/conditionalScope.js";
import Condition from "./objects/condition.js";
import FunctionScope from "./objects/functionScope.js";

const conditionalScopes = ["if", "else if", "while", "for"]

class Data {
  constructor() {
    this.currentScope = null
    this.scopes = [];
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

  createScope({type, returnType} = {}) {
    let newScope
    if (conditionalScopes.includes(type)) {
      newScope = new ConditionalScope({ loops: type === "while" || type === "for" })
    } else if (type === "function") {
      newScope = new FunctionScope({ returnType })
    } else {
      newScope = new Scope()
    }
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
  }

  breakStatement() {
    this.currentScope.registerBreak()
    this.profiler.registerBreak()
  }

  setFunctionName(name) {
    this.currentScope.name = name
  }

  storeParameter(type, name) {
    this.currentScope.addParameter(type, name)
  }

  diagnose() {
    return this.profiler.result()
  }
}

export default Data;
