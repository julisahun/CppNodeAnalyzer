import fs from "fs";
import Analyzer from "../src/analyzer";
import { AnalyzerResult } from "../src/types";

export const analyze = async (filename: string): Promise<AnalyzerResult> => {
  const code = fs.readFileSync(`test/sources/${filename}`).toString();
  const analyzer = new Analyzer();
  return analyzer.analyze(code);
};
