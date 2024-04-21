import fs from "fs";
import Analyzer from "../src/analyzer";
import { analyzerResult } from "../src/data/types";

export const analyze = (filename: string): analyzerResult => {
  const code = fs.readFileSync(`test/sources/${filename}`).toString();
  const analyzer = new Analyzer();
  return analyzer.analyze(code);
};
