import { createSelector } from 'reselect'

export const userInfo = state => state.userInfo
export const activeTask = state => state.activeTask
export const code = state => state.code
export const taskForm = state => state.taskForm
export const latestSolutions = state => state.latestSolutions

export const latestSolutionsSelector = createSelector(
  latestSolutions, ({ solutions = [] }) => (
    solutions.map(({ id, name, submittedAt }) => ({
      id,
      name,
      submittedAt: new Date(submittedAt)
    }))
  )
)
