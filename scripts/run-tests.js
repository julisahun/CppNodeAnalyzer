const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const testFiles = {
  analyzer: ["simple", "condition", "loops", "functions", "scopes"],
  formatter: ["variables", "functions"]
};

const runTests = async () => {
  for (module in testFiles) {
    const moduleTests = testFiles[module];
    const results = await Promise.allSettled(moduleTests.map(async testFile =>
      exec(`npm test ${module}/${testFile}`, { stdio: "inherit" })
    ));
    const failedTests = results.map((result, index) => ({...result, test: moduleTests[index]})).filter(result => result.status === "rejected");
    if (failedTests.length > 0) {
      console.error(`Failed tests for ${module}:`);
      failedTests.forEach(({test, reason}) => console.error(`- ${test}: ${reason}`));
      process.exit(1);
    }
  }
};

runTests();
