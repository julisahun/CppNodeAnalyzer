import Data from "./data/service.js";
let store;

function analyze(tree, options = {}) {
  const rootNode = tree.rootNode;
  store = new Data(options);
  try {
    traverse(rootNode);
  } catch (e) {
    console.error(e);
  } finally {
    return store.diagnose();
  }
}

function traverse(node, depth = 0) {
  utils.log(node, depth);
  if (analyzerExperts[node.type]) {
    return analyzerExperts[node.type](node, depth);
  } else {
    node.children.forEach((c) => traverse(c, depth + 1));
  }
}

function identifierTraverser(node, depth) {
  const name = node.text;
  store.useVariable(name);
  return store.getValue(name);
}

function declarationTraverser(node, depth) {
  const type = node.child(0).text;
  const name = node.child(1).child(0).text;
  const value = traverse(node.child(1).child(2), depth + 1);
  store.declareVariable(name, type, value);
}

function expression_statementTraverser(node, depth) {
  if (node.child(0)?.children.length >= 3) {
    const name = node.child(0).child(0).text;
    const value = traverse(node.child(0).child(2), depth + 1);
    store.setValue(name, value);
  }
}

function function_definitionTraverser(node, depth) {
  traverse(node.child(2), depth + 1);
}

function while_statementTraverser(node, depth) {
  const condition = node.child(1).child(1);
  const initialEvaluation = traverse(condition, depth + 1);
  store.crateWhile(condition);
}

function binary_expressionTraverser(node, depth) {
  const leftHandOperand = traverse(node.child(0), depth + 1);
  const operator = node.child(1).text;
  const rightHandOperand = traverse(node.child(2), depth + 1);
  if (leftHandOperand && rightHandOperand) {
    return utils.evaluate(leftHandOperand, operator, rightHandOperand);
  }
}

function number_literalTraverser(node, depth) {
  return parseInt(node.text);
}

const analyzerExperts = {
  declaration: declarationTraverser,
  expression_statement: expression_statementTraverser,
  identifier: identifierTraverser,
  function_definition: function_definitionTraverser,
  while_statement: while_statementTraverser,
  binary_expression: binary_expressionTraverser,
  number_literal: number_literalTraverser,
};

export default {
  analyze,
};
