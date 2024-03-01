import Data from "./data/service";
import parser from "./parser";
import utils from "./utils";
import {SyntaxNode as Node} from "tree-sitter"

let store;

export function analyze(code: string) {
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

function traverse(node: Node, depth: number = 0) {
  utils.log(node,depth);
  if (traversers[node.type]) {
    return traversers[node.type](node, depth);
  } else {
    node.children.forEach((c) => traverse(c, depth + 1));
  }
}

function identifierTraverser(node: Node, depth: number) {
  const name = node.text;
  store.useVariable(name);
}

function declarationTraverser(node: Node, depth: number) {
  const type = node.child(0).text;
  let name: string
  if (node.child(1).childCount === 0) {
    name = node.child(1).text;
  } else {
    traverse(node.child(1).child(2), depth + 1);
    name = node.child(1).child(0).text;
  }
  store.declareVariable(name, type);
}


function while_statementTraverser(node: Node, depth: number) {
  store.createScope({ type: "while" });
  const conditionNode = node.child(1);
  const bodyNode = node.child(2);

  traverse(conditionNode, depth + 1);
  traverse(bodyNode, depth + 1);
  store.leaveScope();
}
function for_statementTraverser(node: Node, depth: number) {
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

function if_statementTraverser(node: Node, depth: number) {
  store.createScope({ type: "if" });
  const conditionNode = node.child(1);
  const bodyNode = node.child(2);
  traverse(conditionNode, depth + 1);
  traverse(bodyNode, depth + 1);
  store.leaveScope();
}

function preproc_includeTraverser(node: Node, depth: number) {
  if (node.child(0).text === '#include') {
    store.registerInclude(node.child(1).text)
  }
}

function compound_statementTraverser(node: Node, depth: number) {
  node.children.forEach((c) => traverse(c, depth + 1));
}

function condition_clauseTraverser(node: Node, depth: number) {
  const condition = utils.flatten(node.child(1));
  store.storeCondition(condition);
}

function break_statementTraverser(node: Node, depth: number) {
  store.breakStatement();
}

function function_definitionTraverser(node: Node, depth: number) {
  const type = node.child(0).text;
  store.createScope({ type: "function", returnType: type });
  traverse(node.child(1), depth + 1);
  traverse(node.child(2), depth + 1);
  store.leaveScope();
}

function function_declaratorTraverser(node: Node, depth: number) {
  const name = node.child(0).text;
  store.setFunctionName(name);
  const parameterList = node.child(1)
  parameterList.children.forEach(parameter => traverse(parameter, depth + 1))
}

function parameter_declarationTraverser(node: Node, depth: number) {
  const type = node.child(0).text;
  const name = node.child(1).text;
  store.storeParameter(name, type);
}

const traversers = {
  declaration: declarationTraverser,
  identifier: identifierTraverser,
  while_statement: while_statementTraverser,
  for_statement: for_statementTraverser,
  if_statement: if_statementTraverser,
  condition_clause: condition_clauseTraverser,
  compound_statement: compound_statementTraverser,
  preproc_include: preproc_includeTraverser,
  break_statement: break_statementTraverser,
  function_definition: function_definitionTraverser,
  function_declarator: function_declaratorTraverser,
  parameter_declaration: parameter_declarationTraverser,
};

