import MainPage from '../containers/MainPageContainer'
import TaskPage from '../containers/TaskPageContainer'
import ResultsPage from '../containers/ResultsPageContainer'
import AppLayout from '../components/AppLayout'
import AdminPage from '../containers/AdminPageContainer'

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
    },
    {
      path: 'admin',
      component: AdminPage
    }
  ]
}

export default routes
