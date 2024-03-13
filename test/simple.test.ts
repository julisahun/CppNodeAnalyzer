import "./tests";
import Analyzer from "../src/analyzer";
import fs from "fs";
import { analyzerResult } from "../src/data/types";

describe("simple", () => {
  it("should detect includes", () => {
    const code: string = fs
      .readFileSync("test/sources/simple/includes.cpp")
      .toString();
    const analyzer: Analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.usedLibraries).toEqual(["iostream", "local library"]);
  });

  it("should detect unused variable", () => {
    const code: string = fs
      .readFileSync("test/sources/simple/unusedVariable.cpp")
      .toString();
    const analyzer: Analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.unUsedVariables).toEqual(["a"]);
  });

  it("should detect redeclaration", () => {
    const code: string = fs
      .readFileSync("test/sources/simple/redeclaration.cpp")
      .toString();
    const analyzer: Analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.containsRedeclarations).toBe(true);
  });

  it("should not detect used variable", () => {
    const code = fs
      .readFileSync("test/sources/simple/usedVariable.cpp")
      .toString();
    const analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.unUsedVariables).toEqual([]);
  });
});
