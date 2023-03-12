import { CpfValidator, HttpRequest, Validation } from "../../infra/protocols";
import { InvalidCpfException } from "../exceptions";

export class CpfFormatValidation implements Validation{
    constructor(
        private readonly cpfValidator: CpfValidator
    ){}

    async validate(input: HttpRequest): Promise<Error> {
        const isValid = this.cpfValidator.isValid(input.body.cpf)
        if(!isValid) return new InvalidCpfException()
    }
    
}