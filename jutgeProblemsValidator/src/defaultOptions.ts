import { ValidatorOptions } from "./types";
const defaultOptions: ValidatorOptions = {
  libraries: {
    forced: [],
    prohibited: []
  },
  mustUseFunctions: [],
  methods: {
    forced: [],
    prohibited: []
  },
  programType: "n/a"
}

export default defaultOptions;