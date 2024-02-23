function log(node, depth) {
  console.log(depth, node.type, node.text);
}

function flatten(node) {
  if (node.children.length === 0) {
    return [node];
  }
  return node.children.flatMap(flatten);
}

export default {
  log,
  flatten
};
