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
  };
  formattedCode: string;
};

export type FunctionObject = {
  name: string;
  parameters: Variable[];
  type: string;
  dependencies: string[];
}