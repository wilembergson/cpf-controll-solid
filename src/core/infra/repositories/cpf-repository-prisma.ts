import { Cpf } from "../../domain/entities";
import { CpfRepository } from "../../domain/repositories";
import { ConnectionDatabase } from "../database/connection-database";

export class CpfRepositoryPrisma implements CpfRepository {
    constructor(
        private readonly database: ConnectionDatabase
    ) { }
    
    
    async add(data: Cpf): Promise<void> {
        const { id, cpf, createdAt } = data.getState()
        await this.database.getConnection().cpf.upsert({
            where: { id },
            create: { id, cpf, createdAt },
            update: { cpf, createdAt }
        })
    }
    
    async check(data: string): Promise<Cpf.State> {
        return await this.database.getConnection().cpf.findFirst({
            where: {
                cpf: data
            }
        })
    }
    
    async delete(data: string): Promise<void> {
        await this.database.getConnection().cpf.delete({
            where: {
                cpf: data
            }
        })
    }
}