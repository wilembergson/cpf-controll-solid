import { Router } from "express";
import { cpfController } from "../factories/cpf-controller-factory";
import { ExpressRouter } from "../protocols/express-router";
import { adaptRoute } from "../adapters/express-route-adapter";

const cpfRouter = Router()

cpfRouter.post('/cpf', adaptRoute(cpfController))

export default cpfRouter

/*export class CpfRouter extends ExpressRouter {
    protected configRouter(): void {
       this.expressRouter.post("/", cpfController.add)
    }  
}*/