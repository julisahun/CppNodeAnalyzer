import { analyze } from "../tests";

describe("should rewrite variables", () => {
  const path = "rewritter/variables";
  it("should rewrite single variable", () => {
    const result = analyze(`${path}/variable.cpp`);
    expect(result.categoricalCode).toEqual(`int v0=5;`);
  });

  it("should rewrite multiple variables", () => {
    const result = analyze(`${path}/variables.cpp`);
    expect(result.categoricalCode).toEqual(`int v0=5;int v1=6;`);
  });
});
