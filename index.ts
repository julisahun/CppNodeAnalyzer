import Analyzer from "./src/analyzer";
import * as dotenv from "dotenv";
import fs from "fs";
dotenv.config();


const analyze = () => {
  const code = fs.readFileSync(`code.cpp`).toString();
  const analyzer = new Analyzer();
  return analyzer.analyze(code);
};

console.log(analyze());


module.exports = Analyzer;
