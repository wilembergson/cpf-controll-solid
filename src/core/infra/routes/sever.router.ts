import { Router } from "express";
import cpfRouter  from "./cpf.router";

const serverRouter = Router()

serverRouter.use(cpfRouter)

export default serverRouter