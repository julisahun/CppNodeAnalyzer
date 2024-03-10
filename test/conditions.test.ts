import "./tests";
import Analyzer from "../src/analyzer";
import fs from "fs";
import { analyzerResult } from "../src/data/types";

describe("conditions", () => {
  it('should detect constant conditions', () => {
    const code: string = fs.readFileSync("test/sources/conditions/constantCondition.cpp").toString();
    const analyzer: Analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.containsConstantConditions).toEqual(true)
  });

  it('should detect complex constant conditions', () => {
    const code: string = fs.readFileSync("test/sources/conditions/complexConstantCondition.cpp").toString();
    const analyzer: Analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.containsConstantConditions).toEqual(true)
  });

  it('should pass variable conditions', () => {
    const code: string = fs.readFileSync("test/sources/conditions/variableCondition.cpp").toString();
    const analyzer: Analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.containsConstantConditions).toEqual(false)
  });
});
