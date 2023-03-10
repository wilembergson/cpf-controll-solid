import { AddCpfUsecase } from "../../application/use-cases";
import { noContent, serverError } from "../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../protocols";

export class CpfController {
    constructor(private readonly addCpfUsecase: AddCpfUsecase) { }

    async add(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { cpf } = httpRequest.body
            await this.addCpfUsecase.execute({
                cpf,
                createdAt: new Date().toLocaleDateString()
            })
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}