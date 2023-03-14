import { faker } from "@faker-js/faker"
import { Cpf } from "../../../../src/core/domain/entities"
import { generate } from 'cpf'

function makeCpf(){
    return new Cpf({
        id: faker.datatype.uuid(),
        cpf: generate().replace(/[-.]/g, ""),
        createdAt: (new Date).toISOString()
    })
}

describe('Cpf', () => {
    it('should be possible create a instance', () => {
        const cpf = makeCpf()
        expect(() => cpf).not.toThrow()
    })

    it('should be able to get state.', () => {
        const cpf = makeCpf()
        expect(cpf.getState()).toHaveProperty('id')
        expect(cpf.getState()).toHaveProperty('cpf')
        expect(cpf.getState()).toHaveProperty('createdAt')
      })

      it('should be able to get state without ID', () => {
        const cpf = makeCpf()
        expect(cpf.getStateWithoutID()).toHaveProperty('cpf')
        expect(cpf.getStateWithoutID()).toHaveProperty('createdAt')
      })
})