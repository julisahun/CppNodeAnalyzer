import * as fs from "fs";
import Analyzer from "./src/analyzer";

const fileName = "code.cpp";
const code = fs.readFileSync(fileName).toString();

const analyzer = new Analyzer();
const result = analyzer.analyze(code);
console.log(result);
