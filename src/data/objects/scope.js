import Variable from "./variable.js";

export default class Scope {
  constructor({ type }) {
    this.variables = {}
    this.condition = null
    this.usedVariables = []
    this.type = type
    this.loops = false
    switch (type) {
      case 'while':
        this.loops = true
        break;
      case 'for':
        this.loops = true
        break;
      default:
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
    return conditionVariables.every(variable => this.usedVariables.includes(variable))

  }
}