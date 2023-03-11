import { CheckCpf } from "../../domain/use-cases";
import { Validation } from "../../infra/protocols";
import { ExistsCpfException } from "../exceptions";

export class ExistentCpfValidation implements Validation{
    constructor(
        private readonly checkCpf: CheckCpf
    ){}

    async validate(input: string): Promise<Error> {
        const cpf = await this.checkCpf.execute(input)
        if(cpf) return new ExistsCpfException()
    }

}