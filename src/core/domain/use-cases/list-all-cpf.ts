import { Cpf } from "../entities";

export interface ListAllCpf {
    execute(): Promise<Cpf.StateWithoutId[]>
}