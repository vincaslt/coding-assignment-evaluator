import mongoose, { Schema } from 'mongoose'
import httpStatus from 'http-status'
import Promise from 'bluebird'
import APIError from '../helpers/APIError'

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
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true
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
    type: String
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
    const elapsed = Date.now() - this.startedAt.getTime()
    const remaining = this.task.timeLimit - elapsed
    return remaining > 0 ? remaining : 0
  }
}

SolutionSchema.statics = {
  getLatest(count) {
    return this.find({})
      .sort({'submittedAt': -1})
      .limit(20)
      .populate('task')
      .exec()
      .then((solutions) => {
        if (solutions) {
          return solutions
        }
        return Promise.reject(new APIError('There are no solutions!', httpStatus.NOT_FOUND, true))
      })
  },

  /**
   * Get solution by id
   * @param {ObjectId} id - The objectId of solution.
   * @returns {Promise<Solution, APIError>}
   */
  get(id) {
    return this.findById(id)
      .populate('task')
      .exec()
      .then((solution) => {
        if (solution) {
          return solution
        }
        return Promise.reject(new APIError('No such solution exists!', httpStatus.NOT_FOUND, true))
      })
  },

  findActive(query) {
    return this.find(query)
      .populate('task')
      .exec()
      .then((solutions = []) => {
        const activeSolution = solutions.find(solution => (
          solution.getRemainingTime() > 0 && !solution.submittedAt
        ))
        if (activeSolution) {
          return activeSolution
        }
        return Promise.reject(new APIError('No active solution exists!', httpStatus.NOT_FOUND, true))
      })
  }
}

export function serializeSolution(solution) {
  return {
    id: solution._id,
    name: solution.name,
    ip: solution.ip,
    startedAt: solution.startedAt,
    submittedAt: solution.submittedAt,
    code: solution.code,
    results: solution.results,
    remainingTime: solution.getRemainingTime(),
    description: solution.task.description
  }
}

export default mongoose.model('Solution', SolutionSchema)

