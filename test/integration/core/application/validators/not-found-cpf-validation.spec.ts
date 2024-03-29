import { faker } from "@faker-js/faker";
import { RequiredFieldValidation } from "../../../../../src/core/application/validators/required-field-validation";
import { HttpRequest } from "../../../../../src/core/infra/protocols";
import { MissingParamError, NotFoundCpfException } from "../../../../../src/core/application/exceptions";
import { NotFoundCpfValidation } from "../../../../../src/core/application/validators";
import { CheckCpf } from "../../../../../src/core/domain/use-cases";
import { ConnectionDatabase } from "../../../../../src/core/infra/database/connection-database";
import { PrismaRepositoryFactory } from "../../../../../src/core/infra/factories/repositories/prisma-repository-factory";
import { CheckCpfUsecase } from "../../../../../src/core/application/use-cases";
import { generate } from "cpf";
import { Cpf } from "../../../../../src/core/domain/entities";


let connection: ConnectionDatabase
let repositoryFactory: PrismaRepositoryFactory
let checkCpfUsecase: CheckCpf
let sut: NotFoundCpfValidation

beforeAll(() => {
    connection = new ConnectionDatabase()
    repositoryFactory = new PrismaRepositoryFactory()
    checkCpfUsecase = new CheckCpfUsecase(repositoryFactory)
    sut = new NotFoundCpfValidation(checkCpfUsecase)
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

describe('Not found cpf validation', () => {
    it('should find a registred cpf passing data body', async () => {
        const cpf = generateCpf()
        await connection.getConnection().cpf.create({
            data: addNewCpf(cpf)
        })
        const error = await sut.validate(makeRequestWithBodyData(cpf))
        expect(error).toBeFalsy()
    })

    it('should find a registred cpf passing data params', async () => {
        const cpf = generateCpf()
        await connection.getConnection().cpf.create({
            data: addNewCpf(cpf)
        })
        const error = await sut.validate(makeRequestWithParamsData(cpf))
        expect(error).toBeFalsy()
    })

    it('should find a registred cpf passing data body', async () => {
        const cpf = generateCpf()
        const error = await sut.validate(makeRequestWithBodyData(cpf))
        expect(error).toEqual(new NotFoundCpfException())
    })
})
