import { ListAllCpfUsecase } from "../../../application/use-cases"
import { PrismaRepositoryFactory } from "../repositories/prisma-repository-factory"

export function listAllCpfFactory() {
    const repositoryFactory = new PrismaRepositoryFactory()
    return new ListAllCpfUsecase(repositoryFactory)
}