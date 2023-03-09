import { Cpf } from "../../domain/entities";
import { RepositoryFactory } from "../../domain/factories";
import { CpfRepository } from "../../domain/repositories";
import { AddCpf } from "./contracts";

export class AddCpfCase implements AddCpf{
    private readonly cpfRepository: CpfRepository

    constructor( repositoryFactory: RepositoryFactory) {
        this.cpfRepository = repositoryFactory.createCpfRepository()
    }
    async execute(input: AddCpf.Input): Promise<AddCpf.Output> {
        const cpf = new Cpf(input)
        await this.cpfRepository.add(cpf)
        return cpf.getState()
    }
}