import Scope from "./scope.js";

export default class functionScope extends Scope {
    constructor({returnType}) {
        super()
        this.parameters = []
        this.returnType = returnType
        this.name = null
    }

    addParameter(parameters) {

    }
}