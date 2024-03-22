import "./tests";
import { analyze } from "./tests";

describe("simple", () => {
  it("should detect includes", () => {
    const result = analyze("simple/includes.cpp");
    expect(result.analysis.usedLibraries).toEqual(["iostream", "local library"]);
  });

  it("should detect unused variable", () => {
    const result = analyze("simple/unusedVariable.cpp");
    expect(result.analysis.unUsedVariables).toEqual(["a"]);
  });

  it("should detect redeclaration", () => {
    const result = analyze("simple/redeclaration.cpp");
    expect(result.analysis.containsRedeclarations).toBe(true);
  });

  it("should not detect used variable", () => {
    const result = analyze("simple/usedVariable.cpp");
    expect(result.analysis.unUsedVariables).toEqual([]);
  });
});
