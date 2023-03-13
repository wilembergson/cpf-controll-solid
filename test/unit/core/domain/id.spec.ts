import { faker } from "@faker-js/faker"
import { ID } from "../../../../src/core/domain/entities"

describe('ID', () => {
    it('should not throws if valid value is provided.', () => {
        const value = faker.datatype.uuid()
        expect(() => new ID(value)).not.toThrow()
    })
})