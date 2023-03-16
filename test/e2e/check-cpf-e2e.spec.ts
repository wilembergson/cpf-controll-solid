import { generate } from "cpf";
import { HttpRequest, Validation } from "../../src/core/infra/protocols";
import supertest from "supertest";
import { ExpressApp } from "../../src/core/infra/config/express-app";
import { ConnectionDatabase } from "../../src/core/infra/database/connection-database";
import { faker } from "@faker-js/faker";
import { Cpf } from "../../src/core/domain/entities";
import { badRequest } from "../../src/core/infra/helpers/http/http-helper";



describe('GET /cpf', () => {
    const app = supertest(new ExpressApp().getInstance)
    const connection = new ConnectionDatabase()

    function generateCpf(): string {
        return generate().replace(/[-.]/g, "")
    }

    async function addCpf(cpf: string): Promise<Cpf.StateWithoutId> {
        const newCpf = new Cpf({
            id: faker.datatype.uuid(),
            cpf: cpf,
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
        connection.close()
    })

    it('[200]:should get a registred cpf', async () => {
        const cpf = generateCpf()
        const savedCpf = await addCpf(cpf)
        const response = await app.get(`/cpf/${cpf}`)
        expect(response.body).toEqual(savedCpf)
    })

    it('[200]:should throw error getting an unregistred cpf', async () => {
        const cpf = generateCpf()
        const response = await app.get(`/cpf/${cpf}`)
        expect(response.status).toEqual(400)
    })
})