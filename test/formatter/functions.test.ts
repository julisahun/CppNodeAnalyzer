import { analyze } from "../tests";

describe("should rewrite functions", () => {
  const path = "formatter/functions";
  it("should rewrite function declaration", () => {
    const result = analyze(`${path}/declaration.cpp`);
    expect(result.formattedCode).toEqual(`int f01();`);
  });
});
