import { Cpf } from "../../domain/entities";
import { RepositoryFactory } from "../../domain/factories";
import { CpfRepository } from "../../domain/repositories";
import { AddCpf } from "../../domain/use-cases";

export class AddCpfUsecase implements AddCpf{
    private readonly cpfRepository: CpfRepository

    constructor( repositoryFactory: RepositoryFactory) {
        this.cpfRepository = repositoryFactory.cpfRepository()
    }
    async execute(input: AddCpf.Input): Promise<AddCpf.Output> {
        const cpf = new Cpf({
            cpf: input.cpf,
            createdAt: (new Date).toISOString()
        })
        await this.cpfRepository.add(cpf)
        return cpf.getState()
    }
}