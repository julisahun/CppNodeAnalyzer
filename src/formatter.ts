export default class Formatter {
  code: string;
  constructor() {
    this.code = '';
  }

  append(code: string) {
    this.code += code;
  }

  print() {
    console.log(this.code);
  }
}