import * as fs from "fs";
import * as analyzer from "./src/analyzer";

const fileName = "code.cpp";
const code = fs.readFileSync(fileName).toString();

const result = analyzer.analyze(code);
console.log(result)
