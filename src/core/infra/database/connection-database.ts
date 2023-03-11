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

    static getInstance(): ConnectionDatabase {
        if (!this.instance) {
            this.instance = new ConnectionDatabase()
        }
        return this.instance
    }

}

export const connection = new ConnectionDatabase()