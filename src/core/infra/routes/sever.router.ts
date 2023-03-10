import { Router } from "express";
import { ExpressRouter } from "../protocols/express-router";
import cpfRouter  from "./cpf.router";

const serverRouter = Router()

serverRouter.use(cpfRouter)

export default serverRouter

/*export class ServerRouter extends ExpressRouter{
    protected configRouter(): void {
        const cpfRouter = new CpfRouter()

        this.expressRouter.use("/cpf", cpfRouter.expressRouter)
    }
    
}*/