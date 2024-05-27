import "../tests";
import { analyze } from "../tests";

describe("scopes", () => {
  const path = "analyzer/properties";
  it("should not detect no properties", async () => {
    const result = await analyze(`${path}/noProperties.cpp`);
    expect(result.analysis.properties).toEqual([]);
  });

  it("should detect size property", async () => {
    const result = await analyze(`${path}/size.cpp`);
    expect(result.analysis.properties).toEqual([{ type: "vector<int>", name: "size" }]);
  });
});
