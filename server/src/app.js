import express from 'express'
import cors from 'cors'
import healthRoutes from './routes/health.routes.js'
import eventsRoutes from './routes/events.routes.js'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)

app.use(express.json())

app.use('/api/health', healthRoutes)
app.use('/api/events', eventsRoutes)

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  })
})

export default app