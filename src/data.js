let variables = {};
let functions = {};
let loop = {};

function declareVariable(name, type) {
  variables[name] = { used: false, type };
}

function useVariable(name) {
  variables[name].used = true;
}

function bulk() {
  console.log(variables);
}

export default {
  declareVariable,
  useVariable,
  bulk,
};
