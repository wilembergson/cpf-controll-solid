import { CpfValidator } from "../protocols";
import {cpf} from 'cpf-cnpj-validator'

export class CpfValidatorAdapter implements CpfValidator{
    isValid(value: string): boolean {
        return cpf.isValid(value)
    }

}