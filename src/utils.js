function log(node, depth) {
  console.log(depth, node.type, node.text);
}

function evaluate(left, operator, right) {
  left = parseInt(left);
  right = parseInt(right);
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "/":
      return left / right;
    case "*":
      return left * right;
    case "<":
      return left < right;
    case ">":
      return left > right;
    case "==":
      return left === right;
    case "!=":
      return left !== right;
    case "<=":
      return left <= right;
    case ">=":
      return left >= right;
    default:
      throw new Error("Unknown operator");
  }
}

export default {
  log,
  evaluate,
};
