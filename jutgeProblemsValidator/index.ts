import analyzer from 'cpp-node-analyzer'

let codeAnalyzer = new analyzer()
console.log(codeAnalyzer.analyze(`#include <iostream>`))