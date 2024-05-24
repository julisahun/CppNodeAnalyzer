import Analyzer from "./src/analyzer";
import { FunctionObject, PropertyObject, AnalyzerResult } from "./src/types";
import * as dotenv from "dotenv";
dotenv.config();

export default Analyzer;

export type { FunctionObject, PropertyObject, AnalyzerResult };

