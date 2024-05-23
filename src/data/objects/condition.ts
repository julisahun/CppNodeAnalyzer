import { SyntaxNode as Node } from "tree-sitter";

export default class Condition {
  nodes: Node[];
  constructor(nodes: Node[]) {
    this.nodes = nodes;
  }

  hasVariables() {
    return this.nodes.some((node) => node.type === "identifier");
  }

  variables() {
    return this.nodes
      .filter((node) => node.type === "identifier")
      .map((node) => node.text);
  }
}
