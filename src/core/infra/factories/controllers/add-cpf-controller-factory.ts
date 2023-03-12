import { AddCpfController } from "../../controllers";
import { Controller } from "../../protocols";
import { addCpfFactory } from "../use-cases/add-cpf-factory";
import { AddCpfValidationFactory } from "../validators/add-cpf-validator-factory";

export function addCpfControllerFactory(): Controller {
    return new AddCpfController(AddCpfValidationFactory(), addCpfFactory())
}
