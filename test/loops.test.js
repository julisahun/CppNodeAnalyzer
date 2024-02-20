import "./tests.js";
import analyzer from "../src/analyzer.js";
import fs from "fs";

describe('loops', () => {

  it('should pass updating condition in while loops', () => {
    const code = fs.readFileSync("test/sources/loops/updatingConditionWhile.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.containsConstantConditions).toEqual(false)
  });

  it('should pass updating condition in for loops', () => {
    const code = fs.readFileSync("test/sources/loops/updatingConditionFor.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.containsConstantConditions).toEqual(false)
  });

  it('should detect constant conditions in while loops', () => {
    const code = fs.readFileSync("test/sources/loops/nonUpdatingConditionWhile.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.containsConstantConditions).toEqual(true)
  });

  it('should detect constant conditions in for loops', () => {
    const code = fs.readFileSync("test/sources/loops/nonUpdatingConditionFor.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.containsConstantConditions).toEqual(true)
  });

  it('should detect breaks in while loops', () => {
    const code = fs.readFileSync("test/sources/loops/breakWhile.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.usesBreaks).toEqual(true)
  });

  it('should pass constant conditions in while loops with breaks', () => {
    const code = fs.readFileSync("test/sources/loops/breakWhile.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.containsConstantConditions).toEqual(false)
  });

  it('should detect breaks in for loops', () => {
    const code = fs.readFileSync("test/sources/loops/breakFor.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.usesBreaks).toEqual(true)
  });

  it('should pass constant conditions in for loops with breaks', () => {
    const code = fs.readFileSync("test/sources/loops/breakFor.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.containsConstantConditions).toEqual(false)
  });
})