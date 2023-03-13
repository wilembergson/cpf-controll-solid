import { ListAllCpfController } from "../../controllers/list-all-cpf.controller";
import { Controller } from "../../protocols";
import { listAllCpfFactory } from "../use-cases/list-all-cpf-factory";

export function listAllCpfControllerFactory(): Controller {
    return new ListAllCpfController( listAllCpfFactory())
}
