import "./tests.js";
import analyzer from "../src/analyzer.js";
import fs from "fs";

describe("conditions", () => {
  it('should detect constant conditions', () => {
    const code = fs.readFileSync("test/sources/conditions/constantCondition.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.containsConstantConditions).toEqual(true)
  });

  it('should detect complex constant conditions', () => {
    const code = fs.readFileSync("test/sources/conditions/complexConstantCondition.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.containsConstantConditions).toEqual(true)
  });

  it('should pass variable conditions', () => {
    const code = fs.readFileSync("test/sources/conditions/variableCondition.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.containsConstantConditions).toEqual(false)
  });

  it('should detect constant conditions in loops', () => {
    const code = fs.readFileSync("test/sources/conditions/nonUpdatingCondition.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.containsConstantConditions).toEqual(true)
  });
});
