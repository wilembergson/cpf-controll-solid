export class InvalidCpfException extends Error {
  constructor() {
    super('Invalid CPF')
    this.name = 'InvalidCPFError'
  }
}