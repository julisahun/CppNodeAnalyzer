import { analyze } from "../tests";

describe("should rewrite functions", () => {
  const path = "formatter/functions";
  it("should format function declaration", () => {
    const result = analyze(`${path}/declaration.cpp`);
    expect(result.formattedCode).toEqual(`int f0();`);
  });

  it("should format function definition", () => {
    const result = analyze(`${path}/definition.cpp`);
    expect(result.formattedCode).toEqual(`int f0(){return 0;}`);
  });

  it("should format function with parameters", () => {
    const result = analyze(`${path}/parameters.cpp`);
    expect(result.formattedCode).toEqual(`int f0(int v0,int v1){return v0+v1;}`);
  });

  it("should format function with calls", () => {
    const result = analyze(`${path}/calling.cpp`);
    expect(result.formattedCode).toEqual(`int f0();int f1();int f0(){return f1();}`);
  });
});
