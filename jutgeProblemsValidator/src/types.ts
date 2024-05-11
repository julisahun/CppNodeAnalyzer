import { FunctionObject, PropertyObject } from 'cpp-node-analyzer';

export interface ValidatorOptions {
  libraries?: {
    forced: string[];
    prohibited: string[];
  }
  mustUseFunctions?: FunctionObject[];
  properties?: {
    forced: PropertyObject[];
    prohibited: PropertyObject[];
  }
  programType?: ProgramType;
}

export interface Verdict {
  valid: boolean;
  errors: string[];
}

type ProgramType = 'iterative' | 'recursive' | 'n/a'