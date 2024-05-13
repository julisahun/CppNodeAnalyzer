import { SyntaxNode as Node } from "tree-sitter";
import * as utils from "./utils";

const reservedIdentifiers = ["cin", "cout", "endl"];

export function identifierTraverser(node: Node, depth: number) {
  const name = node.text;
  if (!reservedIdentifiers.includes(name)) {
    this.store.useVariable(name);
  }
  return this.formatter.mapToken(name);
}

export function declarationTraverser(node: Node, depth: number) {
  const { mappedName, name } = this.formatter.tokenizeIdentifier(node);
  let children = node.children.map((c) => this.traverse(c, depth + 1));
  const type = children.shift();
  this.store.declareVariable(name, type);
  return `${type} ${children.join("").replace(name, mappedName)}`;
}

export function while_statementTraverser(node: Node, depth: number) {
  let preScopeChildren = node.children
    .slice(0, 2)
    .map((n) => this.traverse(n, depth + 1));
  this.store.createScope({ type: "while" });
  const conditionNodes = utils.flatten(node.child(1));
  this.store.storeCondition(conditionNodes);
  let postScopeChildren = node.children.slice(2).map((n) => this.traverse(n, depth + 1));
  this.store.leaveScope();
  return `${[...preScopeChildren, ...postScopeChildren].join("")}`;
}

export function for_statementTraverser(node: Node, depth: number) {
  this.store.createScope();
  let preScopeChildren = node.children
    .slice(0, 4)
    .map((n) => this.traverse(n, depth + 1));
  this.store.createScope({ type: "for" });
  const conditionNodes = utils.flatten(node.child(3));
  this.store.storeCondition(conditionNodes);
  let postScopeChildren = node.children.slice(4).map((n) => this.traverse(n, depth + 1));
  this.store.leaveScope();
  this.store.leaveScope();
  return `${[...preScopeChildren, ...postScopeChildren].join("")}`;
}

export function if_statementTraverser(node: Node, depth: number) {
  let condition = this.traverse(node.child(1), depth + 1);
  this.store.createScope({ type: "if" });
  const conditionNodes = utils.flatten(node.child(1));
  this.store.storeCondition(conditionNodes);
  const bodyNode = node.child(2);
  let body = this.traverse(bodyNode, depth + 1);
  this.store.leaveScope();
  const elseNode = node.children.find((c) => c.type === "else_clause");
  let elseClause = "";
  if (elseNode) elseClause = this.traverse(elseNode, depth);
  return `if${condition}${body}${elseClause}`;
}

export function preproc_includeTraverser(node: Node, depth: number) {
  let [include, library] = node.children.map((c) => this.traverse(c, depth + 1));
  this.store.registerInclude(library);
  return `${include} ${library}\n`;
}

export function compound_statementTraverser(node: Node, depth: number) {
  let identifiers = utils
    .findChildren({ node, type: "identifier", notFrom: "declaration" })
    .map((n) => n.text);
  let sortedChildren = node.children.sort((nodeA, nodeB) => {
    if (nodeA.type === "{") return -1;
    if (nodeB.type === "{") return 1;
    if (nodeA.type === "}") return 1;
    if (nodeB.type === "}") return -1;
    if (nodeA.type === "declaration" && nodeB.type !== "declaration") return -1;
    if (nodeA.type !== "declaration" && nodeB.type === "declaration") return 1;
    if (nodeA.type === "declaration" && nodeB.type === "declaration") {
      const [nameA, nameB] = [nodeA, nodeB].map(
        (n) => utils.findChild({ node: n, type: "identifier" }).text
      );
      return identifiers.indexOf(nameA) - identifiers.indexOf(nameB);
    }
    return 0;
  });
  let children = sortedChildren.map((c) => this.traverse(c, depth + 1));
  return `${children.join("")}`;
}

export function break_statementTraverser(node: Node, depth: number) {
  this.store.breakStatement();
  return node.text;
}

export function continue_statementTraverser(node: Node, depth: number) {
  this.store.continueStatement();
  return node.text;
}

export function function_definitionTraverser(node: Node, depth: number) {
  const name = utils.findChild({
    node: node,
    type: "identifier",
  }).text;
  let mappedName: string;
  if (this.formatter.isAlreadyMapped(name)) {
    mappedName = this.formatter.mapToken(name);
  } else {
    mappedName = this.formatter.registerToken(name, "function");
  }
  this.store.createScope({ type: "function" });
  let children = node.children.map((c) => this.traverse(c, depth + 1));
  const type = children.shift();
  this.store.setFunctionType(type);
  this.store.leaveScope();
  return `${type} ${children.join("").replace(name, mappedName)}`;
}

export function function_declaratorTraverser(node: Node, depth: number) {
  const name = this.formatter.unMapToken(this.traverse(node.child(0)));
  this.store.setFunctionName(name);
  let remainingChildren = node.children.slice(1).map((c) => this.traverse(c, depth + 1));
  return `${name}${remainingChildren.join(",")}`;
}

export function parameter_declarationTraverser(node: Node, depth: number) {
  let name = ''
  let mappedName = ''
  if (utils.findChild({ node, type: "identifier" })) {
    let mappedData = this.formatter.tokenizeIdentifier(node);
    name = mappedData.name;
    mappedName = mappedData.mappedName;
  }
  let children = node.children.map((c) => this.traverse(c, depth + 1));
  let type =
    utils.findChild({ node, type: "template_type" })?.text ||
    utils.findChild({ node, type: "sized_type_specifier" })?.text ||
    utils.findChild({ node, type: "type_identifier" })?.text ||
    utils.findChild({ node, type: "primitive_type" })?.text;
  this.store.storeParameter(name, type);
  return `${type} ${children.join("").replace(name, mappedName)}`;
}

export function call_expressionTraverser(node: Node, depth: number) {
  const { name } = this.formatter.tokenizeIdentifier(node);
  let children = node.children.map((c) => this.traverse(c, depth + 1));
  const isFunction = !utils.findChild({ node, type: "field_identifier" });
  if (isFunction) this.store.registerCall(name);
  return children.join("");
}

export function using_declarationTraverser(node: Node, depth: number) {
  let children = node.children.map((c) => this.traverse(c, depth + 1));
  let semiColon = children.pop();
  return `${children.join(" ")}${semiColon}`;
}

export function else_clauseTraverser(node: Node, depth: number) {
  this.store.createScope();
  let children = node.children.map((c) => this.traverse(c, depth + 1));
  this.store.leaveScope();
  return `${children.join("")}`;
}

export function return_statementTraverser(node: Node, depth: number) {
  let children = node.children.map((c) => this.traverse(c, depth + 1));
  let returnKeyWord = children.shift();
  return `${returnKeyWord} ${children.join("")}`;
}

export function condition_clauseTraverser(node: Node, depth: number) {
  let children = node.children.map((c) => this.traverse(c, depth + 1));
  return children.join("");
}

export function translation_unitTraverser(node: Node, depth: number) {
  let { includeChildren, nonIncludeChildren } = node.children.reduce(
    (acc, children) => {
      if (children.type === "preproc_include") {
        acc.includeChildren.push(children);
      } else {
        acc.nonIncludeChildren.push(children);
      }
      return acc;
    },
    { includeChildren: [], nonIncludeChildren: [] }
  );

  let sortedIncludes = includeChildren.sort((nodeA, nodeB) => {
    return nodeA.text < nodeB.text ? -1 : 1;
  });
  let nonDuplicateIncludes = sortedIncludes.filter((node, index, array) => {
    return (
      index === 0 ||
      node.text.replace("\n", "") !== array[index - 1].text.replace("\n", "")
    );
  });
  let children = [...nonDuplicateIncludes, ...nonIncludeChildren].map((c) =>
    this.traverse(c, depth + 1)
  );
  return children.join("");
}

export function field_expressionTraverser(node: Node, depth: number) {
  let identifier = utils.findChild({ node, type: "identifier" });
  let methodName = utils.findChild({ node, type: "field_identifier" });
  this.store.registerProperty(identifier.text, methodName.text);
  return `${this.formatter.mapToken(identifier.text)}.${methodName.text}`;
}

export function errorTraverser(node: Node, depth: number) {
  throw new Error(`This code is not analyzable: ${node.text}`);
}
