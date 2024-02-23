import * as fs from "fs";
import analyzer from "./src/analyzer.js";
const fileName = "code.cpp";
const code = fs.readFileSync(fileName).toString();
const result = analyzer.analyze(code);
console.log(result);
