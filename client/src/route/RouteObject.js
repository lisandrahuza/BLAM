import RouteWrapper from './RouteWrapper'
import { generatePath } from 'react-router'
import Homepage from '../components/pages'
import GenericLayout from '../components/layouts/GenericLayout'
import MoviePage from '../components/pages/MoviePage'
import ActorPage from '../components/pages/ActorPage'
import AdminPage from '../components/pages/AdminPage'
import FullLayout from '../components/layouts/FullLayout'

const getRoutes = () => ({
  home: {
    title: 'Homepage',
    path: '/',
    element: Homepage,
    layout: GenericLayout
  },
  movie: {
    title: 'MoviePage',
    path: '/movie/:id',
    element: MoviePage,
    layout: GenericLayout
  },
  actor: {
    title: 'ActorPage',
    path: '/actor/:id',
    element: ActorPage,
    layout: GenericLayout
  },
  admin: {
    title: 'AdminPage',
    path: '/admin',
    element: AdminPage,
    layout: FullLayout
  }
})

const getPath = (key, params) => {
  const routes = getRoutes()
  return params ? generatePath(routes[key].path, params) : routes[key].path
}
export default getRoutes

export { getPath, RouteWrapper }
