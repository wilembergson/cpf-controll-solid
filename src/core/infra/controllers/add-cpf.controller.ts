import { AddCpf } from "../../domain/use-cases";
import { badRequest, noContent, serverError } from "../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "../protocols";

export class AddCpfController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly addCpfUsecase: AddCpf
        ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { cpf } = httpRequest.body
            const error = await this.validation.validate(httpRequest)
            if (error) return badRequest(error)
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