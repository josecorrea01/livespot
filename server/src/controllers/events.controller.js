import { pool } from '../db/pool.js'

export async function getEvents(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        title,
        category,
        TO_CHAR(event_date, 'YYYY-MM-DD') AS date,
        TO_CHAR(event_time, 'HH24:MI') AS time,
        host,
        image,
        description,
        price,
        status
      FROM events
      ORDER BY event_date ASC, event_time ASC
    `)

    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching events:', error)

    res.status(500).json({
      message: 'Error fetching events',
    })
  }
}

export async function getEventById(req, res) {
  const { id } = req.params

  try {
    const result = await pool.query(
      `
        SELECT
          id,
          title,
          category,
          TO_CHAR(event_date, 'YYYY-MM-DD') AS date,
          TO_CHAR(event_time, 'HH24:MI') AS time,
          host,
          image,
          description,
          price,
          status
        FROM events
        WHERE id = $1
      `,
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Event not found',
      })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching event by id:', error)

    res.status(500).json({
      message: 'Error fetching event',
    })
  }
}