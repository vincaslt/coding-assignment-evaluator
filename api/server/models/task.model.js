import mongoose, { Schema } from 'mongoose'
import httpStatus from 'http-status'
import Promise from 'bluebird'
import APIError from '../helpers/APIError'

const TaskSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  initialCode: {
    type: String,
    required: true,
    default: 'function solve() { /* Your code here */ }'
  },
  execName: {
    type: String,
    required: true,
    default: 'solve'
  },
  timeLimit: {
    type: Number,
    required: true,
    default: 900000
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  tests: {
    type: [{
      arguments: {
        type: [Schema.Types.Mixed],
        default: []
      },
      result: {
        type: Schema.Types.Mixed,
        required: true
      }
    }]
  }
})

TaskSchema.statics = {
  /**
   * Get task by id
   * @param {ObjectId} id - The objectId of task.
   * @returns {Promise<Task, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((task) => {
        if (task) {
          return task
        }
        return Promise.reject(new APIError('No such task exists!', httpStatus.NOT_FOUND, true))
      })
  },

  /**
   * Get the latest task
   * @returns {Promise<Task, APIError>}
   */
  getLatest() {
    return this.findOne()
      .sort({ createdAt: -1 })
      .exec()
      .then((task) => {
        if (task) {
          return task
        }
        return Promise.reject(new APIError('There are no tasks created!', httpStatus.NOT_FOUND, true))
      })
  }
}

export function serializeTask(task) {
  return {
    ...task.toJSON()
  }
}

export default mongoose.model('Task', TaskSchema)

