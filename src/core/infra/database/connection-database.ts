import { PrismaClient } from '@prisma/client';
import { Database } from "./database";

export class ConnectionDatabase implements Database<PrismaClient> {
    private static instance: ConnectionDatabase | null
    private client: PrismaClient

    constructor() {
        this.client = new PrismaClient()
    }

    getConnection() {
        return this.client
    }

    async clearStorage (table:string): Promise<void> {
        const keys = await this.client[table].deleteMany()
      }

    close(): void {
        this.client.$disconnect()
    }
}

export const connection = new ConnectionDatabase()