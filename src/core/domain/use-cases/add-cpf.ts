export interface AddCpf {
    execute(input: AddCpf.Input): Promise<AddCpf.Output>
}

export namespace AddCpf {
    export type Input = {
        cpf: string
        createdAt: string
    }
    export type Output = {
        id: string
        cpf: string
        createdAt: string
    }
}