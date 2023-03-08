import { Cpf } from "../entities";

export interface CpfRepository {
    add: (data: Cpf) => Promise<void>
    check: (data: string) => Promise<any>
    listAll: () => Promise<Cpf[]>
    delete: (data: string) => Promise<void>
}