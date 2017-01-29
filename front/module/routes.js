import MainPage from '../containers/MainPageContainer'
import TaskPage from '../containers/TaskPageContainer'
import ResultsPage from '../components/ResultsPage'
import AppLayout from '../components/AppLayout'

const routes = {
  path: '/',
  component: AppLayout,
  indexRoute: { component: MainPage },
  childRoutes: [
    {
      path: 'task/:id',
      component: TaskPage
    },
    {
      path: 'task/:id/results',
      component: ResultsPage
    }
  ]
}

export default routes
