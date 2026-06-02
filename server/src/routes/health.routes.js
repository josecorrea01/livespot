import { Router } from 'express'
import { pool } from '../db/pool.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'LiveSpot API',
    timestamp: new Date().toISOString(),
  })
})

router.get('/db', async (req, res) => {
  const result = await pool.query(`
    SELECT
      NOW() AS server_time,
      CURRENT_DATABASE() AS database_name
  `)

  res.json({
    status: 'ok',
    database: result.rows[0].database_name,
    serverTime: result.rows[0].server_time,
  })
})

export default router