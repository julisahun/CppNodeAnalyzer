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
    if (this.breaks) return true;
    const conditionVariables = this.condition.variables();
    if (!conditionVariables.length) return false;
    if (!this.loops) return true;
    return conditionVariables.some((variable) =>
      this.usedVariables.includes(variable),
    );
  }

  registerBreak() {
    this.breaks = true;
  }
}
