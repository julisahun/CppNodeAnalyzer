import {SyntaxNode as Node} from "tree-sitter"
import utils from "./utils";

export function identifierTraverser(node: Node, depth: number) {
  const name = node.text;
  this.store.useVariable(name);
}

export function declarationTraverser(node: Node, depth: number) {
  const type = node.child(0).text;
  let name: string
  if (node.child(1).childCount === 0) {
    name = node.child(1).text;
  } else {
    this.traverse(node.child(1).child(2), depth + 1);
    name = node.child(1).child(0).text;
  }
  this.store.declareVariable(name, type);
}

export function while_statementTraverser(node: Node, depth: number) {
  this.store.createScope({ type: "while" });
  const conditionNode = node.child(1);
  const bodyNode = node.child(2);

  this.traverse(conditionNode, depth + 1);
  this.traverse(bodyNode, depth + 1);
  this.store.leaveScope();
}

export function for_statementTraverser(node: Node, depth: number) {
  node.children.forEach((c) => utils.log(c, depth + 1));
  const initializerNode = node.child(2);
  const condition = utils.flatten(node.child(3));
  const incrementNode = node.child(5);
  const bodyNode = node.child(7);
  this.store.createScope()
  this.traverse(initializerNode, depth + 1);
  this.store.createScope({ type: "for" });
  this.store.storeCondition(condition);
  this.traverse(bodyNode, depth + 1);
  this.traverse(incrementNode, depth + 1);
  this.store.leaveScope();
  this.store.leaveScope();
}

export function if_statementTraverser(node: Node, depth: number) {
  this.store.createScope({ type: "if" });
  const conditionNode = node.child(1);
  const bodyNode = node.child(2);
  this.traverse(conditionNode, depth + 1);
  this.traverse(bodyNode, depth + 1);
  this.store.leaveScope();
}

export function preproc_includeTraverser(node: Node, depth: number) {
  if (node.child(0).text === '#include') {
    this.store.registerInclude(node.child(1).text)
  }
}

export function compound_statementTraverser(node: Node, depth: number) {
  node.children.forEach((c) => this.traverse(c, depth + 1));
}

export function condition_clauseTraverser(node: Node, depth: number) {
  const condition = utils.flatten(node.child(1));
  this.store.storeCondition(condition);
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
  const parameterList = node.child(1)
  parameterList.children.forEach(parameter => this.traverse(parameter, depth + 1))
}

export function parameter_declarationTraverser(node: Node, depth: number) {
  const type = node.child(0).text;
  const name = node.child(1).text;
  this.store.storeParameter(name, type);
}