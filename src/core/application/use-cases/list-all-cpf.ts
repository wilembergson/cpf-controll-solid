import { Cpf } from "../../domain/entities";
import { RepositoryFactory } from "../../domain/factories";
import { CpfRepository } from "../../domain/repositories";
import { ListAllCpf } from "../../domain/use-cases/list-all-cpf";

export class ListAllCpfUsecase implements ListAllCpf {
    private readonly cpfRepository: CpfRepository

    constructor(repositoryFactory: RepositoryFactory) {
        this.cpfRepository = repositoryFactory.cpfRepository()
    }
    async execute(): Promise<Cpf.StateWithoutId[]> {
        const result = await this.cpfRepository.listAll()
        const list = result.map(item => {
            const newCpf = new Cpf(item)
            return newCpf.getStateWithoutID()
        })
        return list
    }
}