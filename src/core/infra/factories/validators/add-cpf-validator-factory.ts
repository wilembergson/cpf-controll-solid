import { CpfFormatValidation, ValidationComposite } from "../../../application/validators";
import { CpfValidatorAdapter } from "../../adapters/cpf-validator-adapter";
import { Validation } from "../../protocols";

export function AddCpfValidationFactory(): ValidationComposite{
    const validations: Validation[] = []
    validations.push(new CpfFormatValidation(new CpfValidatorAdapter()))
    return new ValidationComposite(validations)
}