export interface CheckCpf {
    execute(input: string): Promise<CheckCpf.Output>
}

export namespace CheckCpf {
    export type Output = {
        cpf:string
        createdAt:string
    }
}