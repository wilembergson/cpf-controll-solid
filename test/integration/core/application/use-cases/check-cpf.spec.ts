import { generate } from "cpf"
import { CheckCpfUsecase } from "../../../../../src/core/application/use-cases"
import { CheckCpf } from "../../../../../src/core/domain/use-cases"
import { ConnectionDatabase } from "../../../../../src/core/infra/database/connection-database"
import { PrismaRepositoryFactory } from "../../../../../src/core/infra/factories/repositories/prisma-repository-factory"
import { faker } from "@faker-js/faker"

describe('CheckCpf', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: PrismaRepositoryFactory
    let sut: CheckCpf

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new PrismaRepositoryFactory()
        sut = new CheckCpfUsecase(repositoryFactory)
    })

    afterAll(async () => {
        connection.clearStorage('cpf')
        connection.close()
    })
    
    it('should get an registred cpf', async () => {
        const data = {
            id: faker.datatype.uuid(),
            cpf: generate().replace(/[-.]/g, ""),
            createdAt: (new Date).toISOString()
          }
        await connection.getConnection().cpf.create({
            data: data
        })
        const response = await sut.execute(data.cpf)
        const {id, ...result} = Object.assign({}, {...data})
        expect(response).toStrictEqual(result)
    })

    it('should return null for an unregistred cpf', async () => {
        const data = {
            id: faker.datatype.uuid(),
            cpf: generate().replace(/[-.]/g, ""),
            createdAt: (new Date).toISOString()
          }
        const response = await sut.execute(data.cpf)
        expect(response).toBeNull()
    })
})