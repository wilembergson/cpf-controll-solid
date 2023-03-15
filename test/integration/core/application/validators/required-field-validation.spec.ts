import { faker } from "@faker-js/faker";
import { RequiredFieldValidation } from "../../../../../src/core/application/validators/required-field-validation";
import { HttpRequest } from "../../../../../src/core/infra/protocols";
import { MissingParamError } from "../../../../../src/core/application/exceptions";

const fieldName = 'cpf'

function makeSut(){
    return new RequiredFieldValidation(fieldName)
}
function makeSuccessRequest(): HttpRequest{
    return {
        body:{
            [fieldName]: faker.datatype.string(11)
        }
    }
}

function makeFailRequest(): HttpRequest{
    return {
        body:{
            ['any']: faker.datatype.string().length.toFixed(11)
        }
    }
}

describe('Required field validation', () => {
    it('should not return an  error if validation succeeds', async () => {
        const sut = makeSut()
        const error = await sut.validate(makeSuccessRequest())
        expect(error).toBeFalsy()
    })

    it('should return a MissingParamError if validation fails', async () => {
        const sut = makeSut()
        const error = await sut.validate(makeFailRequest())
        expect(error).toEqual(new MissingParamError(fieldName))
    })    
})
