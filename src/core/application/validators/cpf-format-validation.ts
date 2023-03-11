import { CpfValidator, Validation } from "../../infra/protocols";
import { InvalidCpfException } from "../exceptions";

export class CpfFormatValidation implements Validation{
    constructor(
        private readonly cpfValidator: CpfValidator
    ){}

    async validate(input: string): Promise<Error> {
        const isValid = this.cpfValidator.isValid(input)
        if(!isValid) return new InvalidCpfException()
    }
    
}