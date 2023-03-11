import { AddCpfUsecase } from "../../../application/use-cases";
import { AddCpfController } from "../../controllers";
import { Controller } from "../../protocols";
import { PrismaRepositoryFactory } from "../repositories/prisma-repository-factory";

export default function addCpfControllerFactory(): Controller {
    const repositoryFactory = new PrismaRepositoryFactory()
    const addCpfUsecase = new AddCpfUsecase(repositoryFactory)
    return new AddCpfController(addCpfUsecase)
}
