import "../tests";
import { analyze } from "../tests";

describe("scopes", () => {
  const path = "analyzer/preprocess";
  it("should preprocess code", () => {
    const result = analyze(`${path}/whileDefine.cpp`);
    expect(result.analysis.isIterative).toEqual(true);
  });

});
