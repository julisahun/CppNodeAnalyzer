import "../tests";
import { analyze } from "../tests";

describe("scopes", () => {
  const path = "analyzer/scopes";
  it("should detect usage across scopes", async () => {
    const result = await analyze(`${path}/usedVariable.cpp`);
    expect(result.analysis.unUsedVariables).toEqual([]);
  });

  it("should detect redeclarations across scopes", async () => {
    const result = await analyze(`${path}/redeclaration.cpp`);
    expect(result.analysis.shadows).toEqual(true);
  });
});
