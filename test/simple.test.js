import "./tests.js";
import analyzer from "../src/analyzer.js";
import fs from "fs";

describe("simple", () => {
  it("should pass simple code", () => {
    const code = fs.readFileSync("test/sources/simple/simple.cpp").toString();
    const result = analyzer.analyze(code);
    expect(result).toEqual({ status: "ok", flags: [] });
  });

  it("should accept global variables", () => {
    const code = fs
      .readFileSync("test/sources/simple/global_variable.cpp")
      .toString();
    const result = analyzer.analyze(code);
    expect(result).toEqual({ status: "ok", flags: [] });
  });

  it("should reject global variables", () => {
    const code = fs
      .readFileSync("test/sources/simple/global_variable.cpp")
      .toString();
    const options = { allowGlobalVariables: false };
    const result = analyzer.analyze(code, options);
    expect(result).toEqual({ status: "error", flags: ["global-variables"] });
  });
});
