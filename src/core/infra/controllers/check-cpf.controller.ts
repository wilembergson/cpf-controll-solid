import { CheckCpf } from "../../domain/use-cases";
import { badRequest, ok, serverError } from "../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "../protocols";

export class CheckCpfController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly checkCpfUsecase: CheckCpf
        ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = await this.validation.validate(httpRequest)
            if (error) return badRequest(error)
            const { cpf } = httpRequest.params
            const result = await this.checkCpfUsecase.execute(cpf)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}