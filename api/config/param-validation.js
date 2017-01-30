import Joi from 'joi'

export default {
  // POST /api/solutions
  createSolution: {
    body: {
      name: Joi.string().required()
    }
  },

  updateSolution: {
    body: {
      code: Joi.string().required()
    }
  },

  // POST /api/tasks
  createTask: {
    password: Joi.string().required(),
    description: Joi.string().required(),
    tests: Joi.array().items(Joi.object().keys({
      arguments: Joi.array(),
      result: Joi.any().required()
    })),
    initialCode: Joi.string(),
    execName: Joi.string(),
    timeLimit: Joi.number()
  }
}
