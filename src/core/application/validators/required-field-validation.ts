import { HttpRequest, Validation } from "../../infra/protocols";
import { MissingParamError } from "../exceptions";

export class RequiredFieldValidation implements Validation{
    constructor(
        private readonly fieldName: string
    ){}
    
    async validate(input: HttpRequest): Promise<Error> {
        if(!input.body[this.fieldName]) return new MissingParamError(this.fieldName)
    }
}