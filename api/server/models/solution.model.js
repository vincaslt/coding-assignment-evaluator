import mongoose, { Schema } from 'mongoose'
import httpStatus from 'http-status'
import Promise from 'bluebird'
import APIError from '../helpers/APIError'
import taskData from '../taskData'

const SolutionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true,
    match: [/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/, '{VALUE} is not a valid ip number.']
  },
  startedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  submittedAt: {
    type: Date
  },
  code: {
    type: String,
    default: taskData.initialCode // TODO: dynamic task selection with its code
  },
  results: {
    type: [{
      arguments: {
        type: [Schema.Types.Mixed]
      },
      result: {
        type: Schema.Types.Mixed,
        required: true
      },
      success: {
        type: Boolean,
        required: true
      }
    }]
  }
})

SolutionSchema.methods = {
  getRemainingTime() {
    // TODO: get task from database
    const elapsed = Date.now() - this.startedAt.getTime()
    const remaining = taskData.timeLimit - elapsed
    return remaining > 0 ? remaining : 0
  }
}

SolutionSchema.statics = {
  /**
   * Get solution by id
   * @param {ObjectId} id - The objectId of solution.
   * @returns {Promise<Solution, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((solution) => {
        if (solution) {
          return solution
        }
        return Promise.reject(new APIError('No such solution exists!', httpStatus.NOT_FOUND))
      })
  },

  findActive(query) {
    return this.find(query)
      .exec()
      .then((solutions = []) => {
        const activeSolution = solutions.find(solution => (
          solution.getRemainingTime() > 0 && !solution.submittedAt
        ))
        if (activeSolution) {
          return activeSolution
        }
        return Promise.reject(new APIError('No active solution exists!', httpStatus.NOT_FOUND))
      })
  }
}

export function serializeSolution(solution) {
  return {
    ...solution.toJSON(),
    remainingTime: solution.getRemainingTime(),
    description: taskData.description // TODO: dynamic task selection with its description
  }
}

export default mongoose.model('Solution', SolutionSchema)

