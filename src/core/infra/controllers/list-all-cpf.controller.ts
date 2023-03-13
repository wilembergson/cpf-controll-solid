import { ListAllCpf } from "../../domain/use-cases";
import { badRequest, noContent, ok, serverError } from "../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Validation } from "../protocols";

export class ListAllCpfController implements Controller {
    constructor(
        private readonly listAllCpfUsecase: ListAllCpf
        ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const result = await this.listAllCpfUsecase.execute()
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}