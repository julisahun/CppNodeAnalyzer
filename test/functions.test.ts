import "./tests";
import Analyzer from "../src/analyzer";
import fs from "fs";
import { analyzerResult } from "../src/data/types";

describe('functions', () => {
  it('should detect no function', () => {
    const code: string = fs.readFileSync("test/sources/functions/noFunction.cpp").toString();
    const analyzer: Analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.usesFunctions).toEqual(false)
  });
  
  it('should detect function', () => {
    const code: string = fs.readFileSync("test/sources/functions/function.cpp").toString();
    const analyzer: Analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.usesFunctions).toEqual(true)
  });

  it('should detect non recursive functions', () => {
    const code: string = fs.readFileSync("test/sources/functions/nonRecursiveFunction.cpp").toString();
    const analyzer: Analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.isRecursive).toEqual(false)
  })

  it('should detect recursive functions', () => {
    const code: string = fs.readFileSync("test/sources/functions/recursiveFunction.cpp").toString();
    const analyzer: Analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.isRecursive).toEqual(true)
  })

  it('should detect recursive functions with multiple calls', () => {
    const code: string = fs.readFileSync("test/sources/functions/recursiveFunctions2.cpp").toString();
    const analyzer: Analyzer = new Analyzer();
    const result: analyzerResult = analyzer.analyze(code);
    expect(result.isRecursive).toEqual(true)
  })
})