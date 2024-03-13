import Variable from "./variable";

export default class Scope {
  variables: { [key: string]: Variable };
  usedVariables: string[];
  constructor() {
    this.variables = {};
    this.usedVariables = [];
  }

  declareVariable(name: string, type: string) {
    this.variables[name] = new Variable(name, type);
  }

  useVariable(name: string) {
    this.variables[name]?.use();
    this.usedVariables.push(name);
  }

  getUnUsedVariables() {
    return Object.values(this.variables).filter(
      (variable) => !variable.isUsed(),
    );
  }

  containsVariable(name: string) {
    return name in this.variables;
  }
}
