import Solution from '../models/solution.model'

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
  const solution = new Solution({
    name: req.body.name,
    ip: req.ip
  })

  solution.save()
    .then(savedSolution => res.json(savedSolution))
    .catch(e => next(e))
}

/**
 * Get an existing solution by IP, or create new if none exists
 * @property {string} req.body.name - name of the user.
 * @returns {Solution}
 */
function findOrCreate(req, res, next) {
  console.log(req.ip)
  Solution.findActiveByIp(req.ip)
    .then(solution => res.json(solution))
    .catch(() => create(req, res, next))
}

/**
 * Get the loaded solution
 * @returns {Solution}
 */
function get(req, res) {
  return res.json(req.solution)
}

export default { load, get, findOrCreate, create }
