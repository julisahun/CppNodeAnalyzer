import Condition from "./condition";
import Scope from "./scope";

export default class ConditionalScope extends Scope {
  loops: boolean;
  breaks: boolean;
  condition: Condition;
  constructor({ loops = false }) {
    super();
    this.loops = loops;
    this.breaks = false;
    this.condition = null;
  }

  conditionUpdated() {
    const conditionVariables = this.condition.variables();
    if (!conditionVariables.length) return false;
    if (!this.loops) return true;
    if (this.breaks) return true;
    console.log(
      conditionVariables.some((variable) => {
        console.log(variable, this.usedVariables);
        this.usedVariables.includes(variable);
      }),
    );
    return conditionVariables.some((variable) =>
      this.usedVariables.includes(variable),
    );
  }

  registerBreak() {
    this.breaks = true;
  }
}
