import { faker } from "@faker-js/faker";
import { CpfValidator, HttpRequest } from "../../../../../src/core/infra/protocols";
import { ExistsCpfException, InvalidCpfException } from "../../../../../src/core/application/exceptions";
import { CpfFormatValidation, ExistentCpfValidation } from "../../../../../src/core/application/validators";
import { CheckCpf } from "../../../../../src/core/domain/use-cases";
import { ConnectionDatabase } from "../../../../../src/core/infra/database/connection-database";
import { PrismaRepositoryFactory } from "../../../../../src/core/infra/factories/repositories/prisma-repository-factory";
import { CheckCpfUsecase } from "../../../../../src/core/application/use-cases";
import { generate } from "cpf";
import { Cpf } from "../../../../../src/core/domain/entities";
import { CpfValidatorAdapter } from "../../../../../src/core/infra/adapters/cpf-validator-adapter";

let cpfValidator: CpfValidator
let sut: CpfFormatValidation

beforeAll(() => {
    cpfValidator = new CpfValidatorAdapter()
    sut = new CpfFormatValidation(cpfValidator)
})

function generateCpf(): string {
    return generate().replace(/[-.]/g, "")
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
    it('should validate the cpf passed by body', async () => {
        const cpf = generateCpf()
        const error = await sut.validate(makeRequestWithBodyData(cpf))
        expect(error).toBeFalsy()
    })

    it('should validate the cpf passed by params', async () => {
        const cpf = generateCpf()
        const error = await sut.validate(makeRequestWithParamsData(cpf))
        expect(error).toBeFalsy()
    })

    it('should throw with cpf passed by body', async () => {
        const cpf = faker.datatype.bigInt().toString()
        const error = await sut.validate(makeRequestWithBodyData(cpf))
        expect(error).toEqual(new InvalidCpfException())
    })

    it('should throw with cpf passed by params', async () => {
        const cpf = faker.datatype.bigInt().toString()
        const error = await sut.validate(makeRequestWithParamsData(cpf))
        expect(error).toEqual(new InvalidCpfException())
    })
})
