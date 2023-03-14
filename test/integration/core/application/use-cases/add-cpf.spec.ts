import { generate } from "cpf"
import { AddCpfUsecase } from "../../../../../src/core/application/use-cases"
import { AddCpf } from "../../../../../src/core/domain/use-cases"
import { ConnectionDatabase } from "../../../../../src/core/infra/database/connection-database"
import { PrismaRepositoryFactory } from "../../../../../src/core/infra/factories/repositories/prisma-repository-factory"

describe('AddCpf', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: PrismaRepositoryFactory
    let sut: AddCpf

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new PrismaRepositoryFactory()
        sut = new AddCpfUsecase(repositoryFactory)
    })

    afterAll(() => {
        connection.clearStorage('cpf')
        connection.close()
    })
    
    it('should add a new cpf', async () => {
        const input = {
            cpf: generate().replace(/[-.]/g, "")
        }
        const response = await sut.execute(input)
        expect(input.cpf).toStrictEqual(response.cpf)
        expect(response).toHaveProperty('id')
        expect(response).toHaveProperty('createdAt')
    })
})