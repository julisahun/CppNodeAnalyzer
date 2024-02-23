import Scope from "./scope";
import Variable from "./variable";

export default class functionScope extends Scope {
    parameters: string[];
    returnType: string;
    name: string;
    constructor({returnType}) {
        super()
        this.parameters = []
        this.returnType = returnType
        this.name = null
    }

    addParameter(name: string, type: string) {

    }
}