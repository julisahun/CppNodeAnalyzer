import Parser from "web-tree-sitter";
import { execSync } from 'child_process';

export async function parse(code: string) {
  await Parser.init();
  const parser = new Parser();
  let Cpp: Parser.Language;
  try {
  Cpp = await Parser.Language.load(`tree-sitter-cpp.wasm`);
  } catch (e) {
    execSync('npx tree-sitter build --wasm node_modules/tree-sitter-cpp')
    Cpp = await Parser.Language.load(`tree-sitter-cpp.wasm`);
  }
  parser.setLanguage(Cpp);

  const tree = parser.parse(code);
  return tree;
} 

