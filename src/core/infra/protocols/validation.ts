import { BaseException } from "../../application/exceptions/base-exception";

export interface Validation {
  validate(input: any): Promise<BaseException>
}