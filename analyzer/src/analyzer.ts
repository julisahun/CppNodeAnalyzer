import Data from "./data/service";
import { Formatter } from "./formatter";
import parser from "./parser";
import * as utils from "./utils";
import * as traversers from "./traversers";
import { SyntaxNode as Node } from "tree-sitter";
import { analyzerResult } from "./data/types";
import { preprocess } from "./preprocessor";

export default class Analyzer {
  store: Data;
  formatter: Formatter;
  constructor() {
    this.store = new Data();
    this.formatter = new Formatter();
  }
  analyze(code: string): analyzerResult {
    code = preprocess(code);
    const tree = parser.parse(code);
    const rootNode = tree.rootNode;
    this.store.createScope({ type: "global" });
    try {
      let formattedCode = this.traverse(rootNode);
      let result = {
        analysis: this.store.diagnose(),
        formattedCode,
      };
      return result;
    } catch (e) {
      console.error(e);
    } finally {
      this.store.leaveScope();
    }
  }

  traverse(node: Node, depth: number = 0) {
    utils.log(node, depth);
    let formattedCode: string;
    if (this.traversers[node.type]) {
      formattedCode = this.traversers[node.type](node, depth);
    } else if (node.children.length) {
      formattedCode = node.children
        .map((c) => this.traverse(c, depth + 1))
        .join("");
    } else {
      formattedCode = node.text;
    }
    return formattedCode;
  }

  traversers = {
    declaration: traversers.declarationTraverser.bind(this),
    identifier: traversers.identifierTraverser.bind(this),
    while_statement: traversers.while_statementTraverser.bind(this),
    for_statement: traversers.for_statementTraverser.bind(this),
    if_statement: traversers.if_statementTraverser.bind(this),
    compound_statement: traversers.compound_statementTraverser.bind(this),
    condition_clause: traversers.condition_clauseTraverser.bind(this),
    preproc_include: traversers.preproc_includeTraverser.bind(this),
    break_statement: traversers.break_statementTraverser.bind(this),
    continue_statement: traversers.continue_statementTraverser.bind(this),
    function_definition: traversers.function_definitionTraverser.bind(this),
    function_declarator: traversers.function_declaratorTraverser.bind(this),
    parameter_declaration: traversers.parameter_declarationTraverser.bind(this),
    call_expression: traversers.call_expressionTraverser.bind(this),
    using_declaration: traversers.using_declarationTraverser.bind(this),
    else_clause: traversers.else_clauseTraverser.bind(this),
    return_statement: traversers.return_statementTraverser.bind(this),
    translation_unit: traversers.translation_unitTraverser.bind(this),
  };
}