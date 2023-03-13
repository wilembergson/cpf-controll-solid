import { CheckCpf, DeleteCpf } from "../../domain/use-cases";
import { badRequest, noContent, ok, serverError } from "../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "../protocols";

export class DeleteCpfController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly deleteCpfUsecase: DeleteCpf
        ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = await this.validation.validate(httpRequest)
            if (error) return badRequest(error)
            const { cpf } = httpRequest.params
            const result = await this.deleteCpfUsecase.execute(cpf)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}