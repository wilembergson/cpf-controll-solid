export class NotFoundCpfException extends Error {
  constructor() {
    super('CPF not found')
    this.name = 'NotFoundCpfException'
  }
}