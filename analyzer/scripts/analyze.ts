import { analyze } from "../test/tests"; 
let result = analyze("../../code.cpp");
console.log(result.analysis)
console.log(result.formattedCode)
