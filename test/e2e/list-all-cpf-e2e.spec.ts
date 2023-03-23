import { generate } from "cpf";
import supertest from "supertest";
import { ExpressApp } from "../../src/core/infra/config/express-app";
import { ConnectionDatabase } from "../../src/core/infra/database/connection-database";
import { faker } from "@faker-js/faker";
import { Cpf } from "../../src/core/domain/entities";



describe('GET /cpf', () => {
    const app = supertest(new ExpressApp().getInstance)
    const connection = new ConnectionDatabase()

    async function generateCpf(): Promise<string> {
        return generate().replace(/[-.]/g, "")
    }

    async function addCpf(cpf: string): Promise<Cpf.StateWithoutId> {
        const newCpf = new Cpf({
            id: faker.datatype.uuid(),
            cpf,
            createdAt: (new Date).toISOString()
        })
        await connection.getConnection().cpf.create({
            data: newCpf.getState()
        })
        return newCpf.getStateWithoutID()
    }

    afterEach(async () => {
        await connection.clearStorage('cpf')
    })
    afterAll(async () => {
        await connection.clearStorage('cpf')
        await connection.close()
    })

    it('[200]:should get a registred cpf', async () => {
        const cpf1 = await generateCpf()
        const cpf2 = await generateCpf()
        const savedCpf1 = await addCpf(cpf1)
        const savedCpf2 = await addCpf(cpf2)
        const response = await app.get(`/cpf`)
        expect(await response.body.length).toBe(2)
        expect(await response.body[0]).toEqual(savedCpf1)
        expect(await response.body[1]).toEqual(savedCpf2)
    })

    it('[200]:should get a registred cpf', async () => {
        const response = await app.get(`/cpf`)
        expect(response.body.length).toBe(0)
        expect(response.body).toEqual([])
    })
})