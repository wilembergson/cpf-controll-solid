import { CheckCpf } from "../../domain/use-cases";
import { HttpRequest, Validation } from "../../infra/protocols";
import { ExistsCpfException } from "../exceptions";

export class ExistentCpfValidation implements Validation{
    constructor(
        private readonly checkCpf: CheckCpf
    ){}

    async validate(input: HttpRequest): Promise<Error> {
        let paramCpf:string
        (input.body.cpf ? paramCpf = input.body.cpf : paramCpf = input.params.cpf)
        const cpf = await this.checkCpf.execute(paramCpf)
        if(cpf) return new ExistsCpfException()
    }

}