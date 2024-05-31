import "../tests";
import { analyze } from "../tests";

describe("preprocessing", () => {
  const path = "analyzer/preprocess";
  it("should preprocess code", async () => {
    const result = await analyze(`${path}/whileDefine.cpp`);
    expect(result.analysis.isIterative).toEqual(true);
  });

});
