const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

const testFiles = {
  analyzer: ["simple", "condition", "loops", "functions", "scopes", "properties", "preprocess"]
  // formatter: ["variables", "functions", "scopes", "includes"],
};

async function runTest(test) {
  return new Promise(async (resolve, reject) => {
    try {
      await exec(`npm test ${test}`, { stdio: "inherit" })
      console.log(`Test ${test} passed!`)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

const runTests = async () => {
  for (module in testFiles) {
    const moduleTests = testFiles[module];
    const results = await Promise.allSettled(
      moduleTests.map(test => runTest(`${module}/${test}`))
    );
    const failedTests = results
      .map((result, index) => ({ ...result, test: moduleTests[index] }))
      .filter((result) => result.status === "rejected");
    if (failedTests.length > 0) {
      console.error(`Failed tests for ${module}:`);
      failedTests.forEach(({ test, reason }) =>
        console.error(`- ${test}: ${reason}`),
      );
      process.exit(1);
    } else {
      console.log(`All tests for ${module} passed!\u{2705}`);
    }
  }
};

runTests();
