import "./tests.js";
import analyzer from "../src/analyzer.js";
import fs from "fs";

describe("simple", () => {
  it('should detect includes', () => {
    const code = fs.readFileSync("test/sources/simple/includes.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.usedLibraries).toEqual(['iostream', 'local library'])
  });

  it('should detect unused variable', () => {
    const code = fs.readFileSync("test/sources/simple/unusedVariable.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.unUsedVariables).toEqual(['a'])
  })

  it('should detect redeclaration', () => {
    const code = fs.readFileSync("test/sources/simple/redeclaration.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.containsRedeclarations).toBe(true)
  })

  it('should not detect used variable', () => {
    const code = fs.readFileSync("test/sources/simple/usedVariable.cpp").toString()
    const result = analyzer.analyze(code)
    expect(result.unUsedVariables).toEqual([])
  })
});
