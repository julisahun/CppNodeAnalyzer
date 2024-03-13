export default class Variable {
  name: string;
  type: string;
  used: boolean;
  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
    this.used = false;
  }

  use() {
    this.used = true;
  }

  isUsed() {
    return this.used;
  }
}
