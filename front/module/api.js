import axios from 'axios'
import { apiUrl } from '../config.json'

const fetch = axios.create({
  baseURL: apiUrl
})

/**
 * Start a new task or fetch an existing active task
 */
export function fetchActiveTask(name) {
  return fetch.post('solutions', { name })
}
