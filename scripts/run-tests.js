const { execSync } = require("child_process");

const testFiles = {
  analyzer: ["simple", "condition", "loops", "functions", "scopes"],
  rewritter: ["variables", "functions"]
};

const runTests = () => {
  for (module in testFiles) {
    const moduleTests = testFiles[module];
    moduleTests.forEach((testFile) => {
      try {
        execSync(`npm test ${module}/${testFile}`, { stdio: "inherit" });
      } catch (error) {
        console.error(
          `Error occurred while running tests in ${testFile}:`,
          error,
        );
        process.exit(1);
      }
    });
  }
};

runTests();
