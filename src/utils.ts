import { Node } from "./types";

export function log(node: Node, depth: number): void {
  if (true) return;
  console.log(depth, node.type, node.text);
}

export const currentEnv = globalThis.window ? "browser" : "node"; 

export function logChildren(node: Node, depth: number): void {
  node.children.forEach((c) => log(c, depth + 1));
}

export function flatten(node: Node, notFrom?: string): Node[] {
  if (node.type === notFrom) return [];
  if (node.children.length === 0) {
    return [node];
  }
  return node.children.flatMap((n) => [node, ...flatten(n, notFrom)]);
}

export function findChildren({
  node,
  type,
  notFrom,
}: {
  node: Node;
  type: string;
  notFrom?: string;
}): Node[] {
  let children = flatten(node, notFrom);
  if (children.some(c => c.type === 'ERROR')) throw new Error(`This code is not analyzable: ${node.text}`);
  return children.filter((c: Node) => c.type === type);
}

export function findChild({
  node,
  type,
  notFrom,
}: {
  node: Node;
  type: string;
  notFrom?: string;
}): Node {
  return findChildren({ node, type, notFrom })[0];
}
