import { currentEnv } from "./utils";

export async function parse(code: string) {
  let parser = currentEnv === 'node' ? parseForNode : parseForBrowser;
  return parser(code);
}

async function parseForNode(code: string) {
  const { default: NodeParser } = await import('tree-sitter')
  const { default: Cpp } = await import('tree-sitter-cpp')
  const parser = new NodeParser();
  parser.setLanguage(Cpp);
  const tree = parser.parse(code);
  return tree;
}

async function parseForBrowser(code: string) {
  const { default: WebParser } = await import('web-tree-sitter')
  await WebParser.init();
  const parser = new WebParser();
  const Cpp = await WebParser.Language.load('tree-sitter-cpp.wasm');
  parser.setLanguage(Cpp);

  const tree = parser.parse(code);
  return tree;
}
