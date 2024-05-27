import { analyze } from "../tests";

describe("conditions", () => {
  const path = "analyzer/conditions";
  it("should detect constant conditions", async () => {
    const result = await analyze(`${path}/constantCondition.cpp`);
    expect(result.analysis.containsConstantConditions).toEqual(true);
  });

  it("should detect complex constant conditions", async () => {
    const result = await analyze(`${path}/complexConstantCondition.cpp`);
    expect(result.analysis.containsConstantConditions).toEqual(true);
  });

  it("should pass variable conditions", async () => {
    const result = await analyze(`${path}/variableCondition.cpp`);
    expect(result.analysis.containsConstantConditions).toEqual(false);
  });
});
