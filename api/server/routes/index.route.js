import express from 'express'
import solutionRoutes from './solution.route'

const router = express.Router()

router.use('/solutions', solutionRoutes)

export default router
