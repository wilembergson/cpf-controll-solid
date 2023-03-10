
import { prismaConnection } from "../../database/prisma-database"

export const MongoHelper = {
  prismaConnection,
  async connect(): Promise<void> {
    await prismaConnection.getConnection()
  },

  async disconnect(): Promise<void> {
    await this.connection.close()
    this.connection = null
  },

  /*async getCollection(name: string): Promise<Collection> {
    return this.connection.db().collection(name)
  },*/

  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id.toJSON() })
  }
}