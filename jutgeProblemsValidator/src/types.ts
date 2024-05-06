import { FunctionObject, MethodObject } from 'cpp-node-analyzer';

export interface ValidatorOptions {
  libraries?: {
    forced: string[];
    prohibited: string[];
  }
  mustUseFunctions?: FunctionObject[];
  methods?: {
    forced: MethodObject[];
    prohibited: MethodObject[];
  }
  programType?: ProgramType;
}

export interface Verdict {
  valid: boolean;
  errors: string[];
}

type ProgramType = 'iterative' | 'recursive' | 'n/a'