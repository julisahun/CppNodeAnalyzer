import { FunctionObject } from 'cpp-node-analyzer';

export interface ValidatorOptions {
  libraries?: {
    forced: string[];
    prohibited: string[];
  }
  mustUseFunctions?: FunctionObject[];
  programType?: ProgramType;
}

export interface Verdict {
  valid: boolean;
  errors: string[];
}

type ProgramType = 'iterative' | 'recursive' | 'n/a'