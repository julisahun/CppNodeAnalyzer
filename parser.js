const Parser = require('tree-sitter');
const Cpp = require('tree-sitter-cpp');
let fs = require('fs')
const fileName = 'test.cpp'

const parser = new Parser();
parser.setLanguage(Cpp);

const code = fs.readFileSync(fileName).toString();
const tree = parser.parse(code);

const node = tree.rootNode;
let identifiersUsed = {}
i = 0
traverse(node, i);


const traverseDeclaration = (node) => {
  const id = node.child(1).child(0).text
  identifiersUsed[id] = false
}

function traverse(node, i) {
  console.log(i, node.type, node.text)
  for (let child of node.children) {
    if (child.isNamed)
      traverse(child, i + 1);
  }
}

console.log(identifiersUsed)