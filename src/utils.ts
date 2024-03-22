import { SyntaxNode as Node } from "tree-sitter";

export function log(node: Node, depth: number): void {
  if (process.env.NODE_ENV !== "dev") return;
  console.log(depth, node.type, node.text);
}

export function flatten(node: Node): Node[] {
  if (node.children.length === 0) {
    return [node];
  }
  return node.children.flatMap(flatten);
}

export function findChild({
  node,
  type,
}: {
  node: Node;
  type: string;
}): Node | undefined {
  let children = flatten(node);
  if (type === "else_clause") console.log(children.map((c) => c.type));
  return children.find((c: Node) => c.type === type);
}
