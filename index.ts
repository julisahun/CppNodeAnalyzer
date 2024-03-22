import * as fs from "fs";
import Analyzer from "./src/analyzer";
import * as dotenv from "dotenv";
dotenv.config();

const fileName = "code.cpp";
const code = fs.readFileSync(fileName).toString();

const analyzer = new Analyzer();
const result = analyzer.analyze(code);
console.log(result.analysis);
console.log(result.categoricalCode);
