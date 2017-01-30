import httpStatus from 'http-status'
import Promise from 'bluebird'
import APIError from '../helpers/APIError'
import Solution, { serializeSolution } from '../models/solution.model'
import sandboxTest from '../helpers/sandbox'
import Task from '../models/task.model'

/**
 * Loads solution and appends it to req
 */
function load(req, res, next, id) {
  Solution.get(id)
    .then((solution) => {
      req.solution = solution // eslint-disable-line no-param-reassign
      return next()
    })
    .catch(e => next(e))
}

/**
 * Create new solution
 * @property {string} req.body.name - name of the user.
 * @returns {Solution}
 */
function create(req, res, next) {
  Task.getLatest()
    .then((latestTask) => {
      const solution = new Solution({
        name: req.body.name,
        ip: req.ip,
        code: latestTask.initialCode,
        task: latestTask
      })

      return solution.save()
    })
    .then(savedSolution => res.json(serializeSolution(savedSolution)))
    .catch(e => next(e))
}

/**
 * Get an existing solution by IP, or create new if none exists
 * @property {string} req.body.name - name of the user.
 * @returns {Solution}
 */
function findOrCreate(req, res, next) {
  Solution.findActive({ ip: req.ip })
    .then(solution => res.json(serializeSolution(solution)))
    .catch(() => create(req, res, next))
}

/**
 * Get the loaded solution
 * @returns {Solution}
 */
function get(req, res) {
  return res.json(serializeSolution(req.solution))
}

/**
 * Update the existing solution
 * @property {string} req.body.code - latest code.
 */
function update(req, res, next) {
  const solution = req.solution
  if (solution.getRemainingTime() > 0 && solution.ip === req.ip) {
    solution.code = req.body.code
    solution.submittedAt = Date.now()
    solution.results = []
    solution.save()
      .then((updatedSolution) => {
        res.json(serializeSolution(updatedSolution))
        testSolution(updatedSolution)
      })
      .catch(e => next(e))
  } else {
    next(new APIError('Only active games that are owned by your ip can be updated!', httpStatus.FORBIDDEN))
  }
}

function testSolution(solution) {
  const updatedSolution = solution
  Promise.all(
    solution.task.tests.map(test => sandboxTest(solution.code, solution.task.execName, test))
  ).then((outputs) => {
    updatedSolution.results = outputs.map(out => ({
      arguments: out.arguments,
      result: out.result,
      success: out.success
    }))
    return updatedSolution.save()
  })
}

export default { load, get, findOrCreate, create, update }
