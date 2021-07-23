import { LazyExoticComponent } from 'react'

import Home from './Home'

interface RouteItem {
  key: string
  path: string
  component: LazyExoticComponent<any>
}

const routes: RouteItem[] = [
  { key: 'home', path: '/home', component: Home }
]

export default routes