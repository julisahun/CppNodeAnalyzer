import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
