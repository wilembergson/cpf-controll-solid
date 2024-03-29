import { generate } from "cpf";
import supertest from "supertest";
import { ExpressApp } from "../../src/core/infra/config/express-app";
import { ConnectionDatabase } from "../../src/core/infra/database/connection-database";
import { faker } from "@faker-js/faker";


async function makeRequest(): Promise<any> {
    return {
        cpf: generate().replace(/[-.]/g, "")
    }
}
async function makeInvalidRequest(): Promise<any> {
    return {
        cpf: faker.datatype.string(11)
    }
}

describe('POST /cpf', () => {
    const app = supertest(new ExpressApp().getInstance)
    const connection = new ConnectionDatabase()
    
    afterEach(async () => {
        await connection.clearStorage('cpf')
    })
    afterAll(async () => {
        await connection.clearStorage('cpf')
        await connection.close()
    })

    it('[200]:should be able to add a new cpf', async () => {
        const response = await app.post("/cpf").send(await makeRequest())
        expect(response.statusCode).toEqual(201)
    })

    it('[400]:should throw to add an invalid cpf', async () => {
        const response = await app.post("/cpf").send(await makeInvalidRequest())
        expect(response.statusCode).toEqual(422)
    })
})