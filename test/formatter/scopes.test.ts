import { analyze } from "../tests";

describe("should format scopes", () => {
  const path = "formatter/scopes";
  it("should format variables declaration to the top of the scope", () => {
    const result = analyze(`${path}/variables.cpp`);
    expect(result.formattedCode).toEqual(`if(true){int v0=0;int v1=0;if(true){}}`);
  });
  
  it("should place first, first used variable", () => {
    const result = analyze(`${path}/first_use.cpp`);
    expect(result.formattedCode).toEqual(`if(true){int v0=0;int v1=0;if(true){}if(v0>2){}std::cout<<v1;}`);
  });
});