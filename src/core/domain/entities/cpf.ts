import { ID } from "./id"

export class Cpf {
    private id: ID
    private cpf: string
    private createdAt: string

    constructor({id, ...rest}: Cpf.Constructor){
        Object.assign(this, rest, {id: new ID(id)})
    }

    getState(): Cpf.State {
        return {
            id: this.id.value,
            cpf: this.cpf,
            createdAt: this.createdAt
        }
    }

    getStateWithoutID(): Cpf.StateWithoutId {
        return {
            cpf: this.cpf,
            createdAt: this.createdAt
        }
    }
}

export namespace Cpf {
    export type Constructor = {
        id?: string
        cpf: string
        createdAt: string
    }
    export type State = {
        id: string
        cpf: string
        createdAt: string
    }
    export type StateWithoutId = {
        cpf: string
        createdAt: string
    }
}