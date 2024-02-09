import "./tests.js";
import analyzer from "../src/analyzer.js";
import fs from "fs";

describe("scopes", () => {
  it('should detect usage across scopes', () => {
    const code = fs.readFileSync("test/sources/scopes/usedVariable.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.unUsedVariables).toEqual([])
  });

  it('should detect redeclarations across scopes', () => {
    const code = fs.readFileSync("test/sources/scopes/redeclaration.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result.containsRedeclarations).toEqual(true)
  });

});
