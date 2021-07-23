import React, { Suspense } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Loading from 'src/common/Loading'

import routes from './routes'

const Pages = () => (
  <div className="pages">
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Redirect exact path="/" to="/home" />

          {routes.map(item => (
            <Route
              key={item.key}
              path={item.path}
              component={item.component}
            />
          ))}
        </Switch>
      </Suspense>
    </Router>
  </div>
)

export default Pages