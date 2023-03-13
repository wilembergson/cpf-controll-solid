import { Cpf } from "../entities";

export interface CpfRepository {
    add(data: Cpf): Promise<void>
    check(data: string): Promise<Cpf.State>
    delete(data: string): Promise<void>
    listAll(): Promise<Cpf.State[]>
}

