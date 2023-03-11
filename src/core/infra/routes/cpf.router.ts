import { Router } from "express";
import addCpfControllerFactory from "../factories/controllers/add-cpf-controller-factory";
import { adaptRoute } from "../adapters/route-adapter";

const cpfRouter = Router()

cpfRouter.post('/cpf', adaptRoute(addCpfControllerFactory()))

export default cpfRouter

/*export class CpfRouter extends ExpressRouter {
    protected configRouter(): void {
       this.expressRouter.post("/", cpfController.add)
    }  
}*/