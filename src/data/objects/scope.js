import Variable from "./variable.js";

export default class Scope{
  constructor() {
    this.variables = {}
    this.usedVariables = []
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
}