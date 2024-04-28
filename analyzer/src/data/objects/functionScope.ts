import Scope from "./scope";
import Variable from "./variable";
import { FunctionObject } from "../../types";

export default class functionScope extends Scope {
  parameters: Variable[];
  returnType: string;
  name: string;
  calls: string[];
  constructor({ returnType }) {
    super();
    this.parameters = [];
    this.returnType = returnType;
    (this.name = null), (this.calls = []);
  }

  addParameter(name: string, type: string) {
    this.parameters.push(new Variable(name, type));
  }

  registerCall(name: string) {
    this.calls.push(name);
  }

  getParameters() {
    return this.parameters.map(({name, type}) => ({name, type}))
  }

  getFunction(): FunctionObject {
    return {
      name: this.name,
      parameters: this.parameters,
      type: this.returnType,
      dependencies: this.calls,
    }
  }
}
