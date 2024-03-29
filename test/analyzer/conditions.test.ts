import { analyze } from "../tests";

describe("conditions", () => {
  const path = "analyzer/conditions";
  it("should detect constant conditions", () => {
    const result = analyze(`${path}/constantCondition.cpp`)
    expect(result.analysis.containsConstantConditions).toEqual(true);
  });

  it("should detect complex constant conditions", () => {
    const result = analyze(`${path}/complexConstantCondition.cpp`)
    expect(result.analysis.containsConstantConditions).toEqual(true);
  });

  it("should pass variable conditions", () => {
    const result = analyze(`${path}/variableCondition.cpp`)
    expect(result.analysis.containsConstantConditions).toEqual(false);
  });
});
