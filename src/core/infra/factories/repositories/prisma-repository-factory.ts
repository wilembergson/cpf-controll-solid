import { RepositoryFactory } from "../../../domain/factories";
import { CpfRepository } from "../../../domain/repositories";
import { connection } from "../../database/connection-database";
import { CpfRepositoryPrisma } from "../../repositories";

export class PrismaRepositoryFactory implements RepositoryFactory {
    constructor() { }

    cpfRepository(): CpfRepository {
        return new CpfRepositoryPrisma(connection)
    }

}