const { execSync } = require("child_process");

// List of test files
const testFiles = ["simple", "condition", "loops", "functions", "scopes"];

// Function to run Jest for each test file
const runTests = () => {
  testFiles.forEach((testFile) => {
    try {
      execSync(`npm test ${testFile}`, { stdio: "inherit" });
    } catch (error) {
      console.error(
        `Error occurred while running tests in ${testFile}:`,
        error,
      );
      process.exit(1);
    }
  });
};

// Run the tests
runTests();
