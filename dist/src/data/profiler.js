class Profiler {
    constructor() {
        this.libraries = [];
        this.unUsedVariables = [];
        this.redeclaration = false;
        this.constantConditions = false;
        this.breaks = false;
    }
    addInclude(name) {
        this.libraries.push(name);
    }
    addUnUsedVariable(name) {
        this.unUsedVariables.push(name);
    }
    registerRedeclaration() {
        this.redeclaration = true;
    }
    registerConstantCondition() {
        this.constantConditions = true;
    }
    registerBreak() {
        this.breaks = true;
    }
    result() {
        return {
            usedLibraries: this.libraries,
            unUsedVariables: this.unUsedVariables,
            containsRedeclarations: this.redeclaration,
            containsConstantConditions: this.constantConditions,
            usesBreaks: this.breaks
        };
    }
}
export default Profiler;
