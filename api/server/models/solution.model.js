import mongoose, { Schema } from 'mongoose'
import httpStatus from 'http-status'
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

// TODO: instance method getTimeRemaining

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

  findActiveByIp(ip) {
    // TODO: account for remaining time > 0
    return this.findOne({ ip })
      .exec()
      .then((solution) => {
        if (solution) {
          return solution
        }
        return Promise.reject(new APIError('No such solution exists!', httpStatus.NOT_FOUND))
      })
  }
}

export default mongoose.model('Solution', SolutionSchema)

