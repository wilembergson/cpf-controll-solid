import { Cpf } from "../../domain/entities";
import { RepositoryFactory } from "../../domain/factories";
import { CpfRepository } from "../../domain/repositories";
import { CheckCpf } from "../../domain/use-cases";

export class CheckCpfUsecase implements CheckCpf {
    private readonly cpfRepository: CpfRepository

    constructor(repositoryFactory: RepositoryFactory) {
        this.cpfRepository = repositoryFactory.cpfRepository()
    }

    async execute(input: string): Promise<CheckCpf.Output> {
        const result = await this.cpfRepository.check(input)
        if (!result) return null
        const cpf = new Cpf(result)
        return cpf.getStateWithoutID()
    }
}