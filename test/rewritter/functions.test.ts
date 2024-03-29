import { analyze } from "../tests";

describe("should rewrite functions", () => {
  const path = "rewritter/functions";
  it("should rewrite function declaration", () => {
    const result = analyze(`${path}/declaration.cpp`);
    expect(result.categoricalCode).toEqual(`int f0();`);
  });
});
