import { AddCpfController, CheckCpfController } from "../../controllers";
import { Controller } from "../../protocols";
import { checkCpfFactory } from "../use-cases/check-cpf-factory";
import { CheckCpfValidationFactory } from "../validators/check-cpf-validator-factory";

export default function checkCpfControllerFactory(): Controller {
    return new CheckCpfController(CheckCpfValidationFactory(),  checkCpfFactory())
}
