import Parser from "web-tree-sitter";

export async function parse(code: string) {
  await Parser.init();
  const parser = new Parser();
  const Cpp = await Parser.Language.load('./tree-sitter-cpp.wasm');
  parser.setLanguage(Cpp);

  const tree = parser.parse(code);
  return tree;
} 

