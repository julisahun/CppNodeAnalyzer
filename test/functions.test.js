import "./tests.js";
import Analyzer from "../src/analyzer";
import fs from "fs";

describe('functions', () => {
  it('should detect no function', () => {
    const code = fs.readFileSync("test/sources/functions/noFunction.cpp").toString();
    const analyzer = new Analyzer();
    const result = analyzer.analyze(code);
    expect(result.usesFunctions).toEqual(false)
  });
  
  it('should detect function', () => {
    const code = fs.readFileSync("test/sources/functions/function.cpp").toString();
    const analyzer = new Analyzer();
    const result = analyzer.analyze(code);
    expect(result.usesFunctions).toEqual(true)
  });

  it('should detect non recursive functions', () => {
    const code = fs.readFileSync("test/sources/functions/nonRecursiveFunction.cpp").toString();
    const analyzer = new Analyzer();
    const result = analyzer.analyze(code);
    expect(result.isRecursive).toEqual(false)
  })

  it('should detect recursive functions', () => {
    const code = fs.readFileSync("test/sources/functions/recursiveFunction.cpp").toString();
    const analyzer = new Analyzer();
    const result = analyzer.analyze(code);
    expect(result.isRecursive).toEqual(true)
  })
})