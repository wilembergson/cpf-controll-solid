import { CpfValidator, Validation } from "../../infra/protocols";
import { InvalidCpfException } from "../exceptions";

export class CpfFormatValidation implements Validation{
    constructor(
        private readonly cpfValidator: CpfValidator
    ){}

    async validate(input: any): Promise<Error> {
        const isValid = await this.cpfValidator.isValid(input.body.cpf)
        if(!isValid) return new InvalidCpfException()
    }
    
}