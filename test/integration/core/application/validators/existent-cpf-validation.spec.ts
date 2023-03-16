import { faker } from "@faker-js/faker";
import { HttpRequest } from "../../../../../src/core/infra/protocols";
import { ExistsCpfException } from "../../../../../src/core/application/exceptions";
import { ExistentCpfValidation } from "../../../../../src/core/application/validators";
import { CheckCpf } from "../../../../../src/core/domain/use-cases";
import { ConnectionDatabase } from "../../../../../src/core/infra/database/connection-database";
import { PrismaRepositoryFactory } from "../../../../../src/core/infra/factories/repositories/prisma-repository-factory";
import { CheckCpfUsecase } from "../../../../../src/core/application/use-cases";
import { generate } from "cpf";
import { Cpf } from "../../../../../src/core/domain/entities";


let connection: ConnectionDatabase
let repositoryFactory: PrismaRepositoryFactory
let checkCpfUsecase: CheckCpf
let sut: ExistentCpfValidation

beforeAll(() => {
    connection = new ConnectionDatabase()
    repositoryFactory = new PrismaRepositoryFactory()
    checkCpfUsecase = new CheckCpfUsecase(repositoryFactory)
    sut = new ExistentCpfValidation(checkCpfUsecase)
})
afterEach(async () => {
    await connection.clearStorage('cpf')
})
afterAll(async () => {
    await connection.clearStorage('cpf')
    connection.close()
})

function generateCpf(): string {
    return generate().replace(/[-.]/g, "")
}

function addNewCpf(cpf: string): Cpf.State {
    const data = new Cpf({
        id: faker.datatype.uuid(),
        cpf,
        createdAt: (new Date).toISOString()
    })
    return data.getState()
}

function makeRequestWithBodyData(cpf: string): HttpRequest {
    return {
        body: {
            cpf
        }
    }
}

function makeRequestWithParamsData(cpf: string): HttpRequest {
    return {
        body: {},
        params: {
            cpf
        }
    }
}

describe('Existent cpf validation', () => {
    it('should find a registred cpf passing data body', async () => {
        const cpf = generateCpf()
        await connection.getConnection().cpf.create({
            data: addNewCpf(cpf)
        })
        const error = await sut.validate(makeRequestWithBodyData(cpf))
        expect(error).toEqual(new ExistsCpfException())
    })

    it('should find a registred cpf passing data params', async () => {
        const cpf = generateCpf()
        await connection.getConnection().cpf.create({
            data: addNewCpf(cpf)
        })
        const error = await sut.validate(makeRequestWithParamsData(cpf))
        expect(error).toEqual(new ExistsCpfException())
    })

    it('should find a registred cpf passing data body', async () => {
        const cpf = generateCpf()
        const error = await sut.validate(makeRequestWithBodyData(cpf))
        expect(error).toBeFalsy()
    })
})
