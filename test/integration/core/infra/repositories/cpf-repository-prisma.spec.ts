import { faker } from "@faker-js/faker"
import { Cpf } from "../../../../../src/core/domain/entities"
import { CpfRepository } from "../../../../../src/core/domain/repositories"
import { ConnectionDatabase } from "../../../../../src/core/infra/database/connection-database"
import { CpfRepositoryPrisma } from "../../../../../src/core/infra/repositories"
import { generate } from "cpf"

describe('CpfRepositoryPrisma', () => {
    let connection: ConnectionDatabase
    let sut: CpfRepository

    function makeCpf() {
        const cpf = new Cpf({
            cpf: generate().replace(/[-.]/g, ""),
            createdAt: (new Date).toISOString()
        })
        return cpf
    }

    beforeAll(() => {
        connection = new ConnectionDatabase()
        sut = new CpfRepositoryPrisma(connection)
    })

    afterAll(async () => {
        await connection.clearStorage('cpf')
        connection.close()
    })

    it('should not throws when persist a cpf', async () => {
        const cpf = makeCpf()
        await expect(sut.add(cpf)).resolves.not.toThrow()
    })

    it('should be able to get a customer by key', async () => {
        const cpfData = makeCpf()
        await sut.add(cpfData)
        const response = await sut.check(cpfData.getState().cpf)
        expect(response).toStrictEqual(cpfData.getState())
      })
})