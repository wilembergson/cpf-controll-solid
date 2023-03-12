import { CpfFormatValidation, NotFoundCpfValidation, ValidationComposite } from "../../../application/validators";
import { CpfValidatorAdapter } from "../../adapters/cpf-validator-adapter";
import { Validation } from "../../protocols";
import { checkCpfFactory } from "../use-cases/check-cpf-factory";

export function CheckCpfValidationFactory(): ValidationComposite{
    const validations: Validation[] = []
    validations.push(new CpfFormatValidation(new CpfValidatorAdapter()))
    validations.push(new NotFoundCpfValidation(checkCpfFactory()))
    return new ValidationComposite(validations)
}