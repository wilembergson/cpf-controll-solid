import { AddCpfUsecase } from "../../../application/use-cases"
import { PrismaRepositoryFactory } from "../repositories/prisma-repository-factory"

export function addCpfFactory() {
    const repositoryFactory = new PrismaRepositoryFactory()
    return new AddCpfUsecase(repositoryFactory)
}