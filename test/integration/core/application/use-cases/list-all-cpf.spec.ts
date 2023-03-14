import { generate } from "cpf"
import { ListAllCpfUsecase } from "../../../../../src/core/application/use-cases"
import { ListAllCpf } from "../../../../../src/core/domain/use-cases"
import { ConnectionDatabase } from "../../../../../src/core/infra/database/connection-database"
import { PrismaRepositoryFactory } from "../../../../../src/core/infra/factories/repositories/prisma-repository-factory"
import { Cpf } from "../../../../../src/core/domain/entities"

describe('ListAllCpf', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: PrismaRepositoryFactory
    let sut: ListAllCpf

    function makeCpf() {
        const cpf = new Cpf({
            cpf: generate().replace(/[-.]/g, ""),
            createdAt: (new Date).toISOString()
        })
        return cpf.getState()
    }

    beforeAll(() => {
        connection = new ConnectionDatabase()
        repositoryFactory = new PrismaRepositoryFactory()
        sut = new ListAllCpfUsecase(repositoryFactory)
    })

    afterEach(async () => {
        await connection.clearStorage('cpf')
    })
    afterAll(async () => {
        await connection.clearStorage('cpf')
        connection.close()
    })

    it('should get the list of registred cpf', async () => {
        const cpfList = [makeCpf(), makeCpf()]
        await connection.getConnection().cpf.createMany({
            data: cpfList
        })
        const response = await sut.execute()
        const result = cpfList.map(item => {
            const { id, ...cpfItem } = Object.assign({}, { ...item })
            return cpfItem
        })
        expect(response).toStrictEqual(result)
    })

    it('should return an empty list if there are no cpf registred', async () => {
        const response = await sut.execute()
        console.log(response)
        expect(response).toEqual([])
    })
})