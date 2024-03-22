import "./tests";
import { analyze } from "./tests";

describe("scopes", () => {
  it("should detect usage across scopes", () => {
    const result = analyze("scopes/usedVariable.cpp");
    expect(result.analysis.unUsedVariables).toEqual([]);
  });

  it("should detect redeclarations across scopes", () => {
    const result = analyze("scopes/redeclaration.cpp");
    expect(result.analysis.containsRedeclarations).toEqual(true);
  });
});
