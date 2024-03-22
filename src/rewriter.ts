import { SyntaxNode as Node } from "tree-sitter";

type Position = {
  row: number;
  column: number;
};

type Token = {
  start: Position;
  end: Position;
  name: string;
};

export class ReWriter {
  tokens: Token[];
  variablesCounter: number;
  functionsCounter: number;
  classesCounter: number;
  tokensMap: { [key: string]: string };
  constructor() {
    this.tokensMap = {};
    this.tokens = [];
    this.variablesCounter = 0;
    this.functionsCounter = 0;
    this.classesCounter = 0;
  }

  storeToken({ node, type }: { node: Node; type: string }): void {
    const mappedTokenName = this.getName(type, node.text);
    this.tokensMap[node.text] = mappedTokenName;
    this.tokens.push({
      start: node.startPosition,
      end: node.endPosition,
      name: mappedTokenName,
    });
  }

  useToken({ node }: { node: Node }): void {
    if (!this.tokensMap[node.text])
      throw new Error(`Token ${node.text} not found, please user storeToken first.`);
    if (this.tokensMap[node.text]) {
      this.tokens.push({
        start: node.startPosition,
        end: node.endPosition,
        name: this.tokensMap[node.text],
      });
    }
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

  rewrite(code: string) {
    let rows = code.split("\n");
    this.tokens.sort(({ start: startA }, { start: startB }) => {
      if (startA.row !== startB.row) {
        return startA.row - startB.row;
      } else {
        return startB.column - startA.column;
      }
    });
    for (let token of this.tokens) {
      let row = token.start.row;
      let start = token.start.column;
      let end = token.end.column;
      let name = token.name;
      let line = rows[row];
      let newLine = line.substring(0, start) + name + line.substring(end);
      rows[row] = newLine;
    }
    return rows.join("\n");
  }
}
