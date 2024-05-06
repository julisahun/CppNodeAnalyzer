import Analyzer from "./src/analyzer";
import { FunctionObject } from "./src/types";
import * as dotenv from "dotenv";
dotenv.config();

import { analyze } from "./test/tests"; 
let result = analyze("../../code.cpp");
console.log(result.analysis)

export default Analyzer;

export type { FunctionObject };

