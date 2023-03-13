import { Router } from "express";
import { adaptRoute } from "../adapters/route-adapter";
import{
    addCpfControllerFactory,
    checkCpfControllerFactory,
    deleteCpfControllerFactory,
    listAllCpfControllerFactory
} from "../factories/controllers";

const cpfRouter = Router()

cpfRouter.post('/cpf', adaptRoute(addCpfControllerFactory()))
cpfRouter.get('/cpf/:cpf', adaptRoute(checkCpfControllerFactory()))
cpfRouter.delete('/cpf/:cpf', adaptRoute(deleteCpfControllerFactory()))
cpfRouter.get('/cpf', adaptRoute(listAllCpfControllerFactory()))

export default cpfRouter
