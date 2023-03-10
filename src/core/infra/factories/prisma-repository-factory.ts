import { RepositoryFactory } from "../../domain/factories";
import { CpfRepository } from "../../domain/repositories";
import { prismaConnection } from "../database/prisma-database";
import { CpfRepositoryPrisma } from "../repositories";

export class PrismaRepositoryFactory implements RepositoryFactory{
    constructor(){}
    
    cpfRepository(): CpfRepository {
        return new CpfRepositoryPrisma(prismaConnection)
    }
    
}