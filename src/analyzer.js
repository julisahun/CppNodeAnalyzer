import data from "./data.js";

function analyze(tree, options = {}) {
  const rootNode = tree.rootNode;
  data.init(options);
  try {
    traverse(rootNode);
  } catch (e) {
    console.error(e);
  } finally {
    return data.diagnose();
  }
}

function traverse(node, depth) {
  utils.log(node, depth);
  if (analyzerExperts[node.type]) {
    analyzerExperts[node.type](node, depth);
  } else {
    node.children.forEach((c) => traverse(c, depth + 1));
  }
}

function identifierTraverser(node, depth) {
  const name = node.text;
  data.useVariable(name);
}

function declarationTraverser(node, depth) {
  const type = node.child(0).text;
  const name = node.child(1).child(0).text;
  data.declareVariable(name, type);

  traverse(node.child(1).child(2), depth + 1);
}

function expression_statementTraverser(node, depth) {
  traverse(node.child(0).child(2), depth + 1);
}

function function_definitionTraverser(node, depth) {
  traverse(node.child(2), depth + 1);
}

function while_statementTraverser(node, depth) {
  const codition = node.child(1).child(1);
}

const analyzerExperts = {
  declaration: declarationTraverser,
  expression_statement: expression_statementTraverser,
  identifier: identifierTraverser,
  function_definition: function_definitionTraverser,
};

export default {
  analyze,
};
