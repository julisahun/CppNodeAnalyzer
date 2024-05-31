import { currentEnv } from "./utils";
import type { SyntaxNode as WebSyntaxNode } from "web-tree-sitter";
import type { SyntaxNode as NodeSyntaxNode } from "tree-sitter";

const isNode = currentEnv === 'node';

type SyntaxNode = typeof isNode extends true ? NodeSyntaxNode : WebSyntaxNode;

type Variable = {
  name: string;
  type: string;
}

export type Node = SyntaxNode;

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
