import * as fs from "fs";
import parser from "./src/parser.js";
import analyzer from "./src/analyzer.js";
import utils from "./src/utils.js";
globalThis.utils = utils;

const fileName = "code.cpp";
const code = fs.readFileSync(fileName).toString();

const tree = parser.parse(code);
const result = analyzer.analyze(tree);
