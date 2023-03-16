import { generate } from "cpf";
import { HttpRequest, Validation } from "../../src/core/infra/protocols";
import supertest from "supertest";
import { ExpressApp } from "../../src/core/infra/config/express-app";
import { ConnectionDatabase } from "../../src/core/infra/database/connection-database";
import { faker } from "@faker-js/faker";

function generateCpf(): string {
    return generate().replace(/[-.]/g, "")
}

function makeRequest(): any {
    return {
        cpf: generateCpf()
    }
}
function makeInvalidRequest(): any {
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
        connection.close()
    })

    it('[200]:should be able to add a new cpf', async () => {
        const response = await app.post("/cpf").send(makeRequest())
        expect(response.statusCode).toEqual(204)
    })

    it('[400]:should throw to add an invalid cpf', async () => {
        const response = await app.post("/cpf").send(makeInvalidRequest())
        expect(response.statusCode).toEqual(400)
    })
})