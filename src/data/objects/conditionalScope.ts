import Condition from "./condition";
import Scope from "./scope";

export default class ConditionalScope extends Scope {
    loops: boolean;
    breaks: boolean;
    condition: Condition;
    constructor({ loops = false }) {
        super()
        this.loops = loops
        this.breaks = false
        this.condition = null
    }

    conditionUpdated() {
        const conditionVariables = this.condition.variables()
        return (conditionVariables.length && conditionVariables.every(variable => this.usedVariables.includes(variable))) || this.breaks
    }
    
    registerBreak() {
        this.breaks = true
    }
}