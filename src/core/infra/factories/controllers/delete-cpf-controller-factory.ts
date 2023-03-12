import { DeleteCpfController } from "../../controllers/delete-cpf.controller";
import { Controller } from "../../protocols";
import { deleteCpfFactory } from "../use-cases/delete-cpf-factory";
import { CheckCpfValidationFactory } from "../validators/check-cpf-validator-factory";

export function deleteCpfControllerFactory(): Controller {
    return new DeleteCpfController(CheckCpfValidationFactory(),  deleteCpfFactory())
}
