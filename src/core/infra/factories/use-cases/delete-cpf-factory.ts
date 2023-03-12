import { DeleteCpfUsecase } from "../../../application/use-cases/delete-cpf"
import { PrismaRepositoryFactory } from "../repositories/prisma-repository-factory"

export function deleteCpfFactory() {
    const repositoryFactory = new PrismaRepositoryFactory()
    return new DeleteCpfUsecase(repositoryFactory)
}