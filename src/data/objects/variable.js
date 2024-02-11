export default class Variable {
    constructor(name, type) {
      this.name = name;
      this.type = type;
      this.used = false;
    }
  
    use() {
      this.used = true;
    }
  
    isUsed() {
      return this.used
    }
  }