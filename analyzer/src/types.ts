import Variable from "./data/objects/variable";

export type analyzerResult = {
  analysis: {
    usedLibraries: string[];
    unUsedVariables: string[];
    containsRedeclarations: boolean;
    containsConstantConditions: boolean;
    usesFunctions: boolean;
    usesBreaks: boolean;
    usesContinues: boolean;
    isRecursive: boolean;
    functions: FunctionObject[];
    methods: MethodObject[];
  };
  formattedCode: string;
};

export type FunctionObject = {
  name: string;
  parameters: Variable[];
  type: string;
  dependencies: string[];
}

export type MethodObject = {
  type: string;
  name: string;
}
