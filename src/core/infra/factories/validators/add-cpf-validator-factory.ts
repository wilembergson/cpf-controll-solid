import { CpfFormatValidation, ExistentCpfValidation, ValidationComposite } from "../../../application/validators";
import { RequiredFieldValidation } from "../../../application/validators/required-field-validation";
import { CpfValidatorAdapter } from "../../adapters/cpf-validator-adapter";
import { Validation } from "../../protocols";
import { checkCpfFactory } from "../use-cases/check-cpf-factory";

export function AddCpfValidationFactory(): ValidationComposite{
    const validations: Validation[] = []
    for(const field of ['cpf']){
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CpfFormatValidation(new CpfValidatorAdapter()))
    validations.push(new ExistentCpfValidation(checkCpfFactory()))
    return new ValidationComposite(validations)
}