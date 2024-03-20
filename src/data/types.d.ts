export type analyzerResult = {
  usedLibraries: string[];
  unUsedVariables: string[];
  containsRedeclarations: boolean;
  containsConstantConditions: boolean;
  usesFunctions: boolean;
  usesBreaks: boolean;
  usesContinues: boolean;
  isRecursive: boolean;
};
