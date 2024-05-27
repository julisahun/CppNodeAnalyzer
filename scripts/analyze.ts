import { analyze } from "../test/tests"; 

async function main() {
  let result = await analyze("../../code.cpp");
  console.log(result.analysis)
  console.log(result.formattedCode)
}

main()