import { SyntaxNode as Node } from "tree-sitter";
import * as utils from "./utils";

export function identifierTraverser(node: Node, depth: number) {
  const name = node.text;
  this.store.useVariable(name);
}

export function declarationTraverser(node: Node, depth: number) {
  const type = node.child(0).text;
  let name = utils.findChild({ node: node.child(1), type: "identifier" }).text;
  const valueNode = node.child(1).child(2);
  if (valueNode) this.traverse(valueNode, depth + 1);
  this.store.declareVariable(name, type);
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
  const parameterList = node.child(1);
  parameterList.children.forEach((parameter) =>
    this.traverse(parameter, depth + 1),
  );
}

export function parameter_declarationTraverser(node: Node, depth: number) {
  const type = node.child(0).text;
  const name = utils.findChild({
    node: node.child(1),
    type: "identifier",
  }).text;
  this.store.storeParameter(name, type);
}

export function call_expressionTraverser(node: Node, depth: number) {
  const name = node.child(0).text;
  this.store.registerCall(name);
  node.children.forEach((c) => this.traverse(c, depth + 1));
}

export function update_expressionTraverser(node: Node, depth: number) {
  const name = utils.findChild({ node, type: "identifier" }).text;
  this.store.useVariable(name);
}
