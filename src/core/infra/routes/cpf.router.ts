import { Router } from "express";
import { adaptRoute } from "../adapters/route-adapter";
import addCpfControllerFactory from "../factories/controllers/add-cpf-controller-factory";
import checkCpfControllerFactory from "../factories/controllers/check-cpf-controller-factory";

const cpfRouter = Router()

cpfRouter.post('/cpf', adaptRoute(addCpfControllerFactory()))
cpfRouter.get('/cpf/:cpf', adaptRoute(checkCpfControllerFactory()))

export default cpfRouter
