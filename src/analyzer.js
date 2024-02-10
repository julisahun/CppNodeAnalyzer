import Data from "./data/service.js";
import parser from "./parser.js";
import utils from "./utils.js";
let store;

function analyze(code) {
  const tree = parser.parse(code);
  const rootNode = tree.rootNode;
  store = new Data();
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
  traverse(node.child(1).child(2), depth + 1);
  store.declareVariable(name, type);
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
  store.createScope({ type: "while" });
}

function binary_expressionTraverser(node, depth) {
  const leftHandOperand = traverse(node.child(0), depth + 1);
  const operator = node.child(1).text;
  const rightHandOperand = traverse(node.child(2), depth + 1);
}

function number_literalTraverser(node, depth) {
  return parseInt(node.text);
}

function using_declarationTraverser(node, depth) {
  //NO_OP
}

function preproc_includeTraverser(node, depth) {
  if (node.child(0).text === '#include') {
    store.registerInclude(node.child(1).text)
  }
}

function compound_statementTraverser(node, depth) {
  const body = node.child(1);
  traverse(body, depth + 1);
  store.leaveScope()
}

function condition_clauseTraverser(node, depth) {
  const condition = utils.flatten(node.child(1));
  store.createScope();
  store.storeCondition(condition);
  // traverse(node.child(1), depth + 1);
}

const traversers = {
  declaration: declarationTraverser,
  // expression_statement: expression_statementTraverser,
  identifier: identifierTraverser,
  // function_definition: function_definitionTraverser,
  while_statement: while_statementTraverser,
  // binary_expression: binary_expressionTraverser,
  // number_literal: number_literalTraverser,
  // using_declaration: using_declarationTraverser,
  condition_clause: condition_clauseTraverser,
  compound_statement: compound_statementTraverser,
  preproc_include: preproc_includeTraverser
};

export default {
  analyze,
};
