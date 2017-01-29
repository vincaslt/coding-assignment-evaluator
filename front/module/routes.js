import MainPage from '../containers/MainPageContainer'
import TaskPage from '../containers/TaskPageContainer'
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
