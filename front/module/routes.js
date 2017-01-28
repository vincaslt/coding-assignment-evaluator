import MainPage from '../components/MainPage'
import TaskPage from '../components/TaskPage'
import AppLayout from '../components/AppLayout'

const routes = {
  path: '/',
  component: AppLayout,
  indexRoute: { component: MainPage },
  childRoutes: [
    {
      path: 'task/:id',
      component: TaskPage
      // TODO: add results page
    }
  ]
}

export default routes
