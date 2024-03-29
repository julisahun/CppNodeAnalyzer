import "../tests";
import { analyze } from "../tests";

describe("scopes", () => {
  const path = "analyzer/scopes";
  it("should detect usage across scopes", () => {
    const result = analyze(`${path}/usedVariable.cpp`);
    expect(result.analysis.unUsedVariables).toEqual([]);
  });

  it("should detect redeclarations across scopes", () => {
    const result = analyze(`${path}/redeclaration.cpp`);
    expect(result.analysis.containsRedeclarations).toEqual(true);
  });
});
