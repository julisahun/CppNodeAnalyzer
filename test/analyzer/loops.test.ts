import { analyze } from "../tests";

describe("loops", () => {
  const path = "analyzer/loops";

  it("should detect no loops", () => {
    const result = analyze(`${path}/noLoop.cpp`);
    expect(result.analysis.isIterative).toEqual(false);
  });

  it("should detect while loops", () => {
    const result = analyze(`${path}/while.cpp`);
    expect(result.analysis.isIterative).toEqual(true);
  });

  it("should pass updating condition in while loops", () => {
    const result = analyze(`${path}/updatingConditionWhile.cpp`);
    expect(result.analysis.containsConstantConditions).toEqual(false);
  });

  it("should pass updating condition in for loops", () => {
    const result = analyze(`${path}/updatingConditionFor.cpp`);
    expect(result.analysis.containsConstantConditions).toEqual(false);
  });

  it("should detect constant conditions in while loops", () => {
    const result = analyze(`${path}/nonUpdatingConditionWhile.cpp`);
    expect(result.analysis.containsConstantConditions).toEqual(true);
  });

  it("should detect constant conditions in for loops", () => {
    const result = analyze(`${path}/nonUpdatingConditionFor.cpp`);
    expect(result.analysis.containsConstantConditions).toEqual(true);
  });

  it("should detect breaks in while loops", () => {
    const result = analyze(`${path}/breakWhile.cpp`);
    expect(result.analysis.usesBreaks).toEqual(true);
  });

  it("should pass constant conditions in while loops with breaks", () => {
    const result = analyze(`${path}/breakWhile.cpp`);
    expect(result.analysis.containsConstantConditions).toEqual(false);
  });

  it("should detect breaks in for loops", () => {
    const result = analyze(`${path}/breakFor.cpp`);
    expect(result.analysis.usesBreaks).toEqual(true);
  });

  it("should pass constant conditions in for loops with breaks", () => {
    const result = analyze(`${path}/breakFor.cpp`);
    expect(result.analysis.containsConstantConditions).toEqual(false);
  });
});
