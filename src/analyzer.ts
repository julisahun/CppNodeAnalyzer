import Data from "./data/store";
import { Formatter } from "./formatter";
import * as parser from "./parser";
import * as utils from "./utils";
import * as traversers from "./traversers";
import { AnalyzerResult, Node } from "./types";

export default class Analyzer {
  store: Data;
  formatter: Formatter;
  constructor() {
    this.store = new Data();
    this.formatter = new Formatter();
  }
  async analyze(code: string): Promise<AnalyzerResult> {
    try {
      if (utils.currentEnv === "node") {
        const preprocessor = await import("./preprocessor")
        code = preprocessor.preprocess(code);
      } else if (code.includes('#define')) {
        throw new Error('This code is not analyzable');
      }
    } catch (e) {
      throw new Error(`Error preprocessing code: ${e.message}`);
    }
    const tree = await parser.parse(code);
    const rootNode = tree.rootNode as Node;
    this.store.createScope({ type: "global" });
    let formattedCode = this.traverse(rootNode);
    let result = {
      analysis: this.store.diagnose(),
      formattedCode,
    };
    this.store.leaveScope();
    return result;
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
    field_expression: traversers.field_expressionTraverser.bind(this),
    ERROR: traversers.errorTraverser.bind(this),
  };
}
