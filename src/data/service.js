import defaultOptions from "./options.js";

class Variable {
  constructor(name, type, value) {
    this.name = name;
    this.type = type;
    this.used = false;
    this.value = value;
  }

  use() {
    this.used = true;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
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
    this.loop = null;
    this.options = { defaultOptions, ...options };
    this.flags = [];
  }

  declareVariable(name, type, value) {
    this.variables[name] = new Variable(name, type, value);
  }

  useVariable(name) {
    this.variables[name].use();
  }

  getValue(name) {
    return this.variables[name].getValue();
  }

  setValue(name, value) {
    this.variables[name].setValue(value);
  }

  declareFunction(name, type) {
    if (!this.options.allowFunctions) {
      throw new Error("Functions are not allowed");
    }
  }

  createWhile(condition) {
    this.loop = new While(condition);
  }

  bulk() {
    console.log(this.variables);
  }

  diagnose() {
    return this.bulk();
  }
}

export default Data;
