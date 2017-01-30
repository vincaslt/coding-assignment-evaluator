import express from 'express'
import validate from 'express-validation'
import paramValidation from '../../config/param-validation'
import taskController from '../controllers/task.controller'

const router = express.Router()

router.route('/')
  /** POST /api/tasks - Create a new active task */
  .post(validate(paramValidation.createTask), taskController.create)

export default router
