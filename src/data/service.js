import defaultOptions from "./options.js";

class Variable {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.used = false;
  }

  use() {
    this.used = true;
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

class Data {
  constructor(options) {
    this.variables = {};
    this.functions = {};
    this.loops = {};
    this.options = { defaultOptions, ...options };
    this.flags = [];
  }

  declareVariable(name, type) {
    variables[name] = new Variable(name, type);
  }

  useVariable(name) {
    variables[name].use();
  }

  declareFunction(name, type) {
    if (!this.options.allowFunctions) {
      throw new Error("Functions are not allowed");
    }
  }

  bulk() {
    console.log(variables);
  }
}

export default Data;
