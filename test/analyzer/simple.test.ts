import "../tests";
import { analyze } from "../tests";

describe("simple", () => {
  const path = "analyzer/simple";
  it("should detect includes", async () => {
    const result = await analyze(`${path}/includes.cpp`);
    expect(result.analysis.usedLibraries).toEqual([
      "local library",
      "iostream",
    ]);
  });

  it("should detect unused variable", async () => {
    const result = await analyze(`${path}/unusedVariable.cpp`);
    expect(result.analysis.unUsedVariables).toEqual(["a"]);
  });

  it("should detect redeclaration", async () => {
    const result = await analyze(`${path}/redeclaration.cpp`);
    expect(result.analysis.shadows).toBe(true);
  });

  it("should not detect used variable", async () => {
    const result = await analyze(`${path}/usedVariable.cpp`);
    expect(result.analysis.unUsedVariables).toEqual([]);
  });
});
