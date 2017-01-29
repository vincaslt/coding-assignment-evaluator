import express from 'express'
import validate from 'express-validation'
import paramValidation from '../../config/param-validation'
import solutionController from '../controllers/solution.controller'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  // TODO: GET /api/solutions - Get list of solutions
  /** POST /api/solutions - Create new solution or get active one */
  .post(validate(paramValidation.createSolution), solutionController.findOrCreate)

router.route('/:solutionId')
  /** GET /api/solutions/:solutionId - Get solution */
  .get(solutionController.get)
  /** POST /api/solutions/:solutionId - update existing solution */
  .post(solutionController.update)

/** Load solution when API with solutionId route parameter is hit */
router.param('solutionId', solutionController.load)

export default router
