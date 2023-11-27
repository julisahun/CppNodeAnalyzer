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
  evaluate,
};