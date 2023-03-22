import { ServerError } from "../../../application/exceptions"
import { BaseException } from "../../../application/exceptions/base-exception"
import { HttpResponse } from "../../protocols/http"

export function badRequest(error: BaseException): HttpResponse {
  return {
    statusCode: error.statuscode,
    body: error
  }
}

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (): HttpResponse => ({
  statusCode: 201,
  body: undefined
})