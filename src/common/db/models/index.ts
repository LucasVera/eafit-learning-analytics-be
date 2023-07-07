import { Sequelize } from 'sequelize-typescript'
import { inspect } from 'util'
import * as config from '../config'
import * as pg from 'pg'
import { Classes } from './Classes'
import { ClassScreenshots } from './ClassScreenshots'
import { ClassFaces } from './ClassFaces'
pg

let connection: Sequelize

const syncConnection = (resolve, reject): Promise<Sequelize> => {
  return connection
    .sync()
    .then((r) => resolve(r))
    .catch((e) => {
      console.log('Error syncing sequelize db', inspect(e))
      return reject(e)
    })
}

export const loadDb = (): Promise<Sequelize> => new Promise((resolve, reject) => {
  try {
    if (connection && connection.config && connection.connectionManager) {
      // connection already made. Reuse it
      connection.connectionManager.initPools()
      // if (connection.connectionManager.hasOwnProperty('getConnection')) delete connection.connectionManager.getConnection;
      return syncConnection(resolve, reject)
    }
    connection = new Sequelize({
      ...config,
      dialectModule: pg,
      native: false,
      logging: false,
      models: [
        Classes,
        ClassScreenshots,
        ClassFaces
      ],
    })

    return syncConnection(resolve, reject)
  } catch (ex) {
    console.log('Error loading Sequelie DB', ex)
    return reject(ex)
  }
})
