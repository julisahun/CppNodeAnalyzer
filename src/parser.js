import Parser from "tree-sitter";
import Cpp from "tree-sitter-cpp";

export default (code) => {
  const parser = new Parser();
  parser.setLanguage(Cpp);

  const tree = parser.parse(code);
  return tree;
};
