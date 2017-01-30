import express from 'express'
import solutionRoutes from './solution.route'
import taskRoutes from './task.route'

const router = express.Router()

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
)

router.use('/solutions', solutionRoutes)
router.use('/tasks', taskRoutes)

export default router
