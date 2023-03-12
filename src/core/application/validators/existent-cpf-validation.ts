import { CheckCpf } from "../../domain/use-cases";
import { HttpRequest, Validation } from "../../infra/protocols";
import { ExistsCpfException } from "../exceptions";

export class ExistentCpfValidation implements Validation{
    constructor(
        private readonly checkCpf: CheckCpf
    ){}

    async validate(input: HttpRequest): Promise<Error> {
        const cpf = await this.checkCpf.execute(input.body.cpf)
        if(cpf) return new ExistsCpfException()
    }

}