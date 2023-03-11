export class ExistsCpfException extends Error {
  constructor() {
    super('CPF alread registred')
    this.name = 'ExistsCpfException'
  }
}