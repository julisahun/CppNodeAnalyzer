import Data from "./data/service.js";
import parser from "./parser.js";
import utils from "./utils.js";
let store;

function analyze(code) {
  const tree = parser.parse(code);
  const rootNode = tree.rootNode;
  store = new Data();
  store.createScope({ type: "global" });
  try {
    traverse(rootNode);
  } catch (e) {
    console.error(e);
  } finally {
    store.leaveScope()
    return store.diagnose();
  }
}

function traverse(node, depth = 0) {
  utils.log(node, depth);
  if (traversers[node.type]) {
    return traversers[node.type](node, depth);
  } else {
    node.children.forEach((c) => traverse(c, depth + 1));
  }
}

function identifierTraverser(node, depth) {
  const name = node.text;
  store.useVariable(name);
}

function declarationTraverser(node, depth) {
  const type = node.child(0).text;
  const name = node.child(1).child(0).text;
  console.log(name)
  traverse(node.child(1).child(2), depth + 1);
  store.declareVariable(name, type);
}


function while_statementTraverser(node, depth) {
  store.createScope({ type: "while" });
  const conditionNode = node.child(1);
  const bodyNode = node.child(2);

  traverse(conditionNode, depth + 1);
  traverse(bodyNode, depth + 1);
  store.leaveScope();
}
function for_statementTraverser(node, depth) {
  node.children.forEach((c) => utils.log(c, depth + 1));
  const initializerNode = node.child(2);
  const condition = utils.flatten(node.child(3));
  const incrementNode = node.child(5);
  const bodyNode = node.child(7);
  store.createScope()
  traverse(initializerNode, depth + 1);
  store.createScope({ type: "for" });
  store.storeCondition(condition);
  traverse(bodyNode, depth + 1);
  traverse(incrementNode, depth + 1);
  store.leaveScope();
  store.leaveScope();
}

function preproc_includeTraverser(node, depth) {
  if (node.child(0).text === '#include') {
    store.registerInclude(node.child(1).text)
  }
}

function compound_statementTraverser(node, depth) {
  node.children.forEach((c) => traverse(c, depth + 1));
}

function condition_clauseTraverser(node, depth) {
  const condition = utils.flatten(node.child(1));
  store.storeCondition(condition);
}

function break_statementTraverser(node, depth) {
  store.breakStatement();
}

function function_definitionTraverser(node, depth) {
  const type = node.child(0).text;
  store.createScope({ type: "function", returnType: type });
  traverse(node.child(1), depth + 1);
  traverse(node.child(2), depth + 1);
  store.leaveScope();
}

function function_declaratorTraverser(node, depth) {
  const name = node.child(0).text;
  store.setFunctionName(name);
  const parameterList = node.child(1)
  parameterList.forEach(parameter => traverse(parameter, depth + 1))
}

function parameter_declarationTraverser(node, depth) {
  const type = node.child(0).text;
  const name = node.child(1).text;
  store.storeParameter(name, type);
}

const traversers = {
  declaration: declarationTraverser,
  identifier: identifierTraverser,
  while_statement: while_statementTraverser,
  for_statement: for_statementTraverser,
  condition_clause: condition_clauseTraverser,
  compound_statement: compound_statementTraverser,
  preproc_include: preproc_includeTraverser,
  break_statement: break_statementTraverser,
  function_definition: function_definitionTraverser,
  function_declarator: function_declaratorTraverser,
  parameter_declaration: parameter_declarationTraverser,
};

export default {
  analyze,
};
