import "../tests";
import { analyze } from "../tests";

describe("simple", () => {
  const path = "analyzer/simple";
  it("should detect includes", () => {
    const result = analyze(`${path}/includes.cpp`);
    expect(result.analysis.usedLibraries).toEqual([
      "local library",
      "iostream",
    ]);
  });

  it("should detect unused variable", () => {
    const result = analyze(`${path}/unusedVariable.cpp`);
    expect(result.analysis.unUsedVariables).toEqual(["a"]);
  });

  it("should detect redeclaration", () => {
    const result = analyze(`${path}/redeclaration.cpp`);
    expect(result.analysis.shadows).toBe(true);
  });

  it("should not detect used variable", () => {
    const result = analyze(`${path}/usedVariable.cpp`);
    expect(result.analysis.unUsedVariables).toEqual([]);
  });
});
