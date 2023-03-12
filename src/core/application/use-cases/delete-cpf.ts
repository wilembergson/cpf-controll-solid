import { Cpf } from "../../domain/entities";
import { RepositoryFactory } from "../../domain/factories";
import { CpfRepository } from "../../domain/repositories";
import { CheckCpf, DeleteCpf } from "../../domain/use-cases";

export class DeleteCpfUsecase implements DeleteCpf {
    private readonly cpfRepository: CpfRepository

    constructor(repositoryFactory: RepositoryFactory) {
        this.cpfRepository = repositoryFactory.cpfRepository()
    }

    async execute(input: string): Promise<void> {
        await this.cpfRepository.delete(input)
    }
}