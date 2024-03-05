import Scope from "./scope";

export default class functionScope extends Scope {
    parameters: string[];
    returnType: string;
    name: string;
    calls: string[];
    constructor({returnType}) {
        super()
        this.parameters = []
        this.returnType = returnType
        this.name = null,
        this.calls = []
    }

    addParameter(name: string, type: string) {

    }

    registerCall(name: string) {
        this.calls.push(name)
    }
}