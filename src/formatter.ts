import { SyntaxNode as Node } from "tree-sitter";
import * as utils from "./utils";

export class Formatter {
  variablesCounter: number;
  functionsCounter: number;
  classesCounter: number;
  tokensMap: { [key: string]: string };
  reverseTokensMap: { [key: string]: string };
  constructor() {
    this.tokensMap = {};
    this.reverseTokensMap = {};
    this.variablesCounter = 0;
    this.functionsCounter = 0;
    this.classesCounter = 0;
  }

  tokenizeIdentifier(node: Node) {
    const isFunction =
      node.type === "function_declarator" ||
      node.children.some((c) => c.type === "function_declarator");
    const name = utils.findChild({
      node,
      type: "identifier",
    }).text;
    if (this.isAlreadyMapped(name)) return { name, mappedName: this.mapToken(name) };
    return {
      name,
      mappedName: this.registerToken(
        name,
        isFunction ? "function" : "variable",
      ),
    };
  }

  registerToken(name: string, type: string) {
    if (name === "main" && type === "function") return "main";
    const mappedToken = this.getName(type, name);
    this.tokensMap[name] = mappedToken;
    this.reverseTokensMap[mappedToken] = name;
    return mappedToken;
  }

  mapToken(name: string) {
    if (!this.tokensMap[name]) return name;
    return this.tokensMap[name];
  }

  unMapToken(name: string) {
    if (!this.reverseTokensMap[name]) return name;
    return this.reverseTokensMap[name];
  }

  isAlreadyMapped(name: string) {
    return name in this.tokensMap;
  }

  getName(type: string, name: string): string {
    switch (type) {
      case "variable":
        return `v${this.variablesCounter++}`;
      case "function":
        return `f${this.functionsCounter++}`;
      case "class":
        return `c${this.classesCounter++}`;
      default:
        return name;
    }
  }
}
