import { analyze } from "../tests";

describe("functions", () => {
  const path = "analyzer/functions";
  it("should detect no function", () => {
    const result = analyze(`${path}/noFunction.cpp`);
    expect(result.analysis.usesFunctions).toEqual(false);
  });

  it("should detect function", () => {
    const result = analyze(`${path}/function.cpp`);
    expect(result.analysis.usesFunctions).toEqual(true);
  });

  it("should detect non recursive functions", () => {
    const result = analyze(`${path}/nonRecursiveFunction.cpp`);
    expect(result.analysis.isRecursive).toEqual(false);
  });

  it("should detect recursive functions", () => {
    const result = analyze(`${path}/recursiveFunction.cpp`);
    expect(result.analysis.isRecursive).toEqual(true);
  });

  it("should detect recursive functions with multiple calls", () => {
    const result = analyze(`${path}/recursiveFunctions2.cpp`);
    expect(result.analysis.isRecursive).toEqual(true);
  });

  it("should detect function signature", () => {
    const result = analyze(`${path}/signature.cpp`)
    const functions = result.analysis.functions;
    expect(functions.length).toEqual(1)
    expect(functions[0].name).toEqual("functionName")
    expect(functions[0].parameters).toEqual([
      { name: 'a', type: 'int', used: false },
      { name: 'b', type: 'bool', used: false },
      { name: 'c', type: 'char' , used: false },
      { name: 'd', type: 'long', used: false }
    ])
  })
});
