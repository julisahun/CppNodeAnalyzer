import Variable from "./variable";
export default class Scope {
    constructor() {
        this.variables = {};
        this.usedVariables = [];
    }
    declareVariable(name, type) {
        this.variables[name] = new Variable(name, type);
    }
    useVariable(name) {
        var _a;
        (_a = this.variables[name]) === null || _a === void 0 ? void 0 : _a.use();
        this.usedVariables.push(name);
    }
    getUnUsedVariables() {
        return Object.values(this.variables).filter(variable => !variable.isUsed());
    }
    containsVariable(name) {
        return name in this.variables;
    }
}
