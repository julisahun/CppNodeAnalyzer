import Profiler from "./profiler";
import Scope from "./objects/scope";
import ConditionalScope from "./objects/conditionalScope";
import Condition from "./objects/condition";
import FunctionScope from "./objects/functionScope";
import {SyntaxNode as Node} from "tree-sitter"

const conditionalScopes = ["if", "else if", "while", "for"]

class Data {
  currentScope: Scope;
  scopes: Scope[];
  profiler: Profiler;
  constructor() {
    this.currentScope = null
    this.scopes = [];
    this.profiler = new Profiler()
  }

  declareVariable(name: string, type: string) {
    const alreadyDeclared = this.scopes.some(scope => scope.containsVariable(name))
    if (alreadyDeclared) this.profiler.registerRedeclaration()
    this.currentScope.declareVariable(name, type)
  }

  useVariable(name: string) {
    for (let scope of this.scopes) {
      scope.useVariable(name)
      if (scope.containsVariable(name)) 
        break;
    }    
  }

  registerInclude(name: string) {
    const libraryName = name.replace(/[<>"']/g, '')
    this.profiler.addInclude(libraryName)
  }

  createScope({type, returnType}:{type?: string, returnType?: string} = {}) {
    let newScope: Scope
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
    if (leavingScope instanceof ConditionalScope && !leavingScope.conditionUpdated()) 
      this.profiler.registerConstantCondition()
  }

  storeCondition(nodes: Node[]) {
    const condition = new Condition(nodes)
    if (this.currentScope instanceof ConditionalScope) 
      this.currentScope.condition = condition
  }

  breakStatement() {
    if (this.currentScope instanceof ConditionalScope) {
      this.currentScope.registerBreak()
      this.profiler.registerBreak()
    }
  }

  setFunctionName(name: string) {
    if (this.currentScope instanceof FunctionScope)
      this.currentScope.name = name
  }

  storeParameter(type: string, name: string) {
    if (this.currentScope instanceof FunctionScope)
      this.currentScope.addParameter(type, name)
  }

  diagnose() {
    return this.profiler.result()
  }
}

export default Data;
