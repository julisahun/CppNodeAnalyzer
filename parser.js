import Parser from 'tree-sitter'
import Cpp from 'tree-sitter-cpp' 
import fs from 'fs'
import analyzer from './src/analizer.js'
import utils from './src/utils.js'
import data from './src/data.js'
globalThis.utils = utils

const fileName = 'test.cpp'

const parser = new Parser();
parser.setLanguage(Cpp);

const code = fs.readFileSync(fileName).toString();
const tree = parser.parse(code);

analyzer.traverse(tree.rootNode, 0);
data.bulk()
