import { CpfRepository } from "../repositories";

export interface RepositoryFactory {
    cpfRepository(): CpfRepository
}