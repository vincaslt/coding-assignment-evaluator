import express from 'express'
import solutionRoutes from './solution.route'
import taskRoutes from './task.route'

const router = express.Router()

router.use('/solutions', solutionRoutes)
router.use('/tasks', taskRoutes)

export default router
