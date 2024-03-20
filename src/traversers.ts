import { SyntaxNode as Node } from "tree-sitter";
import * as utils from "./utils";

const reservedIdentifiers = ["cin", "cout", 'endl'];

export function identifierTraverser(node: Node, depth: number) {
  const name = node.text;
  if (reservedIdentifiers.includes(name)) return;
  this.store.useVariable(name);
  this.rewriter.useToken({ node });
}

export function declarationTraverser(node: Node, depth: number) {
  const type = node.child(0).text;
  let nameNode = utils.findChild({ node: node.child(1), type: "identifier" });
  const valueNode = node.child(1).child(2);
  if (valueNode) this.traverse(valueNode, depth + 1);
  this.store.declareVariable(nameNode.text, type);
  this.rewriter.storeToken({ node: nameNode, type: "variable" });
}

export function while_statementTraverser(node: Node, depth: number) {
  const conditionNodes = utils.flatten(node.child(1));
  conditionNodes.forEach((c) => this.traverse(c, depth + 1));
  const bodyNode = node.child(2);
  this.store.createScope({ type: "while" });
  this.store.storeCondition(conditionNodes);
  this.traverse(bodyNode, depth + 1);
  this.store.leaveScope();
}

export function for_statementTraverser(node: Node, depth: number) {
  const initializerNode = node.child(2);
  const conditionNodes = utils.flatten(node.child(3));
  const incrementNode = node.child(5);
  const bodyNode = node.child(7);
  this.store.createScope();
  this.traverse(initializerNode, depth + 1);
  this.traverse(node.child(3), depth + 1);
  this.store.createScope({ type: "for" });
  this.store.storeCondition(conditionNodes);
  this.traverse(bodyNode, depth + 1);
  this.traverse(incrementNode, depth + 1);
  this.store.leaveScope();
  this.store.leaveScope();
}

export function if_statementTraverser(node: Node, depth: number) {
  this.traverse(node.child(1), depth + 1);
  this.store.createScope({ type: "if" });
  const conditionNodes = utils.flatten(node.child(1));
  this.store.storeCondition(conditionNodes);
  const bodyNode = node.child(2);
  this.traverse(bodyNode, depth + 1);
  this.store.leaveScope();
  const elseNode = node.children.find((c) => c.type === "else_clause");
  if (elseNode) this.traverse(elseNode, depth);
}

export function preproc_includeTraverser(node: Node, depth: number) {
  if (node.child(0).text === "#include") {
    this.store.registerInclude(node.child(1).text);
  }
}

export function compound_statementTraverser(node: Node, depth: number) {
  node.children.forEach((c) => this.traverse(c, depth + 1));
}

export function break_statementTraverser(node: Node, depth: number) {
  this.store.breakStatement();
}

export function continue_statementTraverser(node: Node, depth: number) {
  this.store.continueStatement();
}

export function function_definitionTraverser(node: Node, depth: number) {
  const type = node.child(0).text;
  this.store.createScope({ type: "function", returnType: type });
  this.traverse(node.child(1), depth + 1);
  this.traverse(node.child(2), depth + 1);
  this.store.leaveScope();
}

export function function_declaratorTraverser(node: Node, depth: number) {
  const name = node.child(0).text;
  this.store.setFunctionName(name);
  this.rewriter.storeToken({ node: node.child(0), type: "function" });
  const parameterList = node.child(1);
  parameterList.children.forEach((parameter) =>
    this.traverse(parameter, depth + 1),
  );
}

export function parameter_declarationTraverser(node: Node, depth: number) {
  const type = node.child(0).text;
  const nameNode = utils.findChild({
    node: node.child(1),
    type: "identifier",
  });
  this.store.storeParameter(nameNode.text, type);
  this.rewriter.storeToken({ node: nameNode, type: "variable" });
}

export function call_expressionTraverser(node: Node, depth: number) {
  const nameNode = utils.findChild({node,
    type: "identifier",
  });
  this.store.registerCall(nameNode.text);
  node.children.forEach((c) => this.traverse(c, depth + 1));
}

export function update_expressionTraverser(node: Node, depth: number) {
  const name = utils.findChild({ node, type: "identifier" }).text;
  this.store.useVariable(name);
}

export function using_declarationTraverser() {
  // NO_OP
}

export function else_clauseTraverser(node: Node, depth: number) {
  this.store.createScope();
  node.children.forEach((c) => this.traverse(c, depth + 1));
  this.store.leaveScope();
}
