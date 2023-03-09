import { PrismaClient } from "@prisma/client";
import { Cpf } from "../../domain/entities";
import { CpfRepository } from "../../domain/repositories";
import { Database } from "../database";

export class CpfRepositoryPrisma implements CpfRepository {
    constructor(private readonly database: Database<PrismaClient>) { }

    async add(data: Cpf): Promise<void> {
        const { id, cpf, createdAt } = data.getState()
        await this.database.getConnection().cpf.upsert({
            where: { id },
            create: { id, cpf, createdAt},
            update: { cpf, createdAt}
        })
    }

}