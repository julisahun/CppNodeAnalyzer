export interface ValidatorOptions {
  libraries: {
    forced: string[];
    prohibited: string[];
  }
  mustUseFunctions: {
    [key: string]: { name: string; type: string }[]
  };
  programType: ProgramType;
}

export interface Verdict {
  valid: boolean;
  errors: string[];
}

type ProgramType = 'iterative' | 'recursive' | 'n/a'