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
    functions: {
      [key: string]: { name: string; type: string }[];
    };
  };
  formattedCode: string;
};
