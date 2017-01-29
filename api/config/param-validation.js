import Joi from 'joi'

export default {
  // POST /api/solutions
  createSolution: {
    body: {
      name: Joi.string().required()
    }
  }
}
