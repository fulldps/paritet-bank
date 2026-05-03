import { Pool } from 'pg'
import { QueryResultRow } from 'pg'

let pool: Pool | null = null

export const getPool = (): Pool => {
  if (!pool) {
    pool = new Pool({
      host: String(process.env.DB_HOST || 'localhost'),
      port: Number(process.env.DB_PORT || 5432),
      user: String(process.env.DB_USER || 'paritet'),
      password: String(process.env.DB_PASSWORD || 'paritet_secret'),
      database: String(process.env.DB_NAME || 'paritet_bank'),
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
  }
  return pool
}

export const query = <T extends QueryResultRow = any>(text: string, params?: any[]) =>
  getPool().query<T>(text, params)
