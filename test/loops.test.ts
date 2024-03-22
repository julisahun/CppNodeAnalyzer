import "./tests";
import { analyze } from "./tests";

describe("loops", () => {
  it("should pass updating condition in while loops", () => {
    const result = analyze("loops/updatingConditionWhile.cpp");
    expect(result.analysis.containsConstantConditions).toEqual(false);
  });

  it("should pass updating condition in for loops", () => {
    const result = analyze("loops/updatingConditionFor.cpp");
    expect(result.analysis.containsConstantConditions).toEqual(false);
  });

  it("should detect constant conditions in while loops", () => {
    const result = analyze("loops/nonUpdatingConditionWhile.cpp");
    expect(result.analysis.containsConstantConditions).toEqual(true);
  });

  it("should detect constant conditions in for loops", () => {
    const result = analyze("loops/nonUpdatingConditionFor.cpp");
    expect(result.analysis.containsConstantConditions).toEqual(true);
  });

  it("should detect breaks in while loops", () => {
    const result = analyze("loops/breakWhile.cpp");
    expect(result.analysis.usesBreaks).toEqual(true);
  });

  it("should pass constant conditions in while loops with breaks", () => {
    const result = analyze("loops/breakWhile.cpp");
    expect(result.analysis.containsConstantConditions).toEqual(false);
  });

  it("should detect breaks in for loops", () => {
    const result = analyze("loops/breakFor.cpp");
    expect(result.analysis.usesBreaks).toEqual(true);
  });

  it("should pass constant conditions in for loops with breaks", () => {
    const result = analyze("loops/breakFor.cpp");
    expect(result.analysis.containsConstantConditions).toEqual(false);
  });
});
