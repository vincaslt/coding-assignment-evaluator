import axios from 'axios'
import { apiUrl } from '../config.json'

const fetch = axios.create({
  baseURL: apiUrl
})

/**
 * Start a new task or fetch an existing active task
 */
function fetchActiveTask(name) {
  return fetch.post('solutions', { name })
}

function fetchTaskById(taskId) {
  return fetch.get(`solutions/${taskId}`)
}

function submitSolution(taskId, code) {
  return fetch.post(`solutions/${taskId}`, { code })
}

export default { fetchActiveTask, fetchTaskById, submitSolution }
