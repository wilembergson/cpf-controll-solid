import { generate } from "cpf"
import { DeleteCpfUsecase } from "../../../../../src/core/application/use-cases"
import { DeleteCpf } from "../../../../../src/core/domain/use-cases"
import { ConnectionDatabase } from "../../../../../src/core/infra/database/connection-database"
import { PrismaRepositoryFactory } from "../../../../../src/core/infra/factories/repositories/prisma-repository-factory"
import { Cpf } from "../../../../../src/core/domain/entities"

describe('DeleteCpf', () => {
    let connection: ConnectionDatabase
    let repositoryFactory: PrismaRepositoryFactory
    let sut: DeleteCpf

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
        sut = new DeleteCpfUsecase(repositoryFactory)
    })

    afterEach(async () => {
        await connection.clearStorage('cpf')
    })
    afterAll(async () => {
        await connection.clearStorage('cpf')
        connection.close()
    })

    it('should delete a registred cpf', async () => {
        const cpfData = await connection.getConnection().cpf.create({
            data: makeCpf()
        })
        await sut.execute(cpfData.cpf)
        const response = await connection.getConnection().cpf.findFirst({
            where:{
                cpf:cpfData.cpf
            }
        })
        expect(response).toBeNull()
    })
})