import { CheckCpfUsecase } from "../../../application/use-cases/check-cpf"
import { PrismaRepositoryFactory } from "../repositories/prisma-repository-factory"

export function checkCpfFactory() {
    const repositoryFactory = new PrismaRepositoryFactory()
    return new CheckCpfUsecase(repositoryFactory)
}