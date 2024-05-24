type Variable = {
  name: string;
  type: string;
}

export type AnalyzerResult = {
  analysis: {
    usedLibraries: string[];
    unUsedVariables: string[];
    shadows: boolean;
    containsConstantConditions: boolean;
    usesFunctions: boolean;
    usesBreaks: boolean;
    usesContinues: boolean;
    isRecursive: boolean;
    isIterative: boolean;
    functions: FunctionObject[];
    properties: PropertyObject[];
  };
  formattedCode: string;
};

export type FunctionObject = {
  name: string;
  parameters: Variable[];
  type: string;
  dependencies?: string[];
}

export type PropertyObject = {
  type: string;
  name: string;
}
