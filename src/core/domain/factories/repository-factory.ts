import { CpfRepository } from "../repositories";

export interface RepositoryFactory {
    createCpfRepository: () => CpfRepository
}