import "./tests";
import Analyzer from "../src/analyzer";
import fs from "fs";
import { analyzerResult } from "../src/data/types";

describe("scopes", () => {
  it("should detect usage across scopes", () => {
    const code: string = fs
      .readFileSync("test/sources/scopes/usedVariable.cpp")
      .toString();
    const analyzer: Analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.analysis.unUsedVariables).toEqual([]);
  });

  it("should detect redeclarations across scopes", () => {
    const code: string = fs
      .readFileSync("test/sources/scopes/redeclaration.cpp")
      .toString();
    const analyzer: Analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.analysis.containsRedeclarations).toEqual(true);
  });
});
