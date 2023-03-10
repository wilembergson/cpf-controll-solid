import { AddCpfUsecase } from "../../application/use-cases";
import { CpfRepository } from "../../domain/repositories";
import { CpfController } from "../controllers";
import { prismaConnection } from "../database/prisma-database";
import { CpfRepositoryPrisma } from "../repositories";
import { PrismaRepositoryFactory } from "./prisma-repository-factory";

function cpfControllerFactory(): CpfController {
    //const cpfRepository: CpfRepository = new CpfRepositoryPrisma(prismaConnection)
    const repositoryFactory = new PrismaRepositoryFactory()

    const addCpfUsecase = new AddCpfUsecase(repositoryFactory)

    return new CpfController(addCpfUsecase)
}

export const cpfController = cpfControllerFactory()