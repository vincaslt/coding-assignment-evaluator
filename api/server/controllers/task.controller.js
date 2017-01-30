import httpStatus from 'http-status'
import APIError from '../helpers/APIError'
import Task, { serializeTask } from '../models/task.model'
import config from '../../config/env'

/**
 * Create new task
 * @property {string} req.body.password - required (envConfig.adminPassword)
 * @property {string} req.body.description - required
 * @property {Test} req.body.tests - required
 * @property {string} req.body.initialCode - optional
 * @property {string} req.body.execName - optional
 * @property {number} req.body.timeLimit - optional
 * @returns {Task}
 */
function create(req, res, next) {
  // A single admin password defined in config for simplicity
  if (req.body.password === config.adminPassword) {
    const task = new Task({
      description: req.body.description,
      tests: req.body.tests,
      initialCode: req.body.initialCode,
      execName: req.body.execName,
      timeLimit: req.body.timeLimit
    })

    task.save()
      .then(savedTask => res.json(serializeTask(savedTask)))
      .catch(e => next(e))
  } else {
    next(new APIError('Invalid password!', httpStatus.FORBIDDEN, true))
  }
}

/**
 * Get the latest task
 * @returns {Task}
 */
function get(req, res, next) {
  Task.getLatest()
    .then(solution => res.json(serializeTask(solution)))
    .catch(e => next(e))
}

export default { create, get }
