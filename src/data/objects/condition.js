export default class Condition {
  constructor(nodes) {
    this.nodes = nodes
  }

  hasVariables() {
    return this.nodes.some(node => node.type === 'identifier')
  }

  variables() {
    return this.nodes.filter(node => node.type === 'identifier').map(node => node.text)
  }
}