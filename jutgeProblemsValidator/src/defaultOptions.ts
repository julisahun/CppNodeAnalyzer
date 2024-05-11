import { ValidatorOptions } from "./types";
const defaultOptions: ValidatorOptions = {
  libraries: {
    forced: [],
    prohibited: []
  },
  mustUseFunctions: [],
  properties: {
    forced: [],
    prohibited: []
  },
  programType: "n/a"
}

export default defaultOptions;