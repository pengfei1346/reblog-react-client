import React,{Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import BaseLayout from './views/layout'
import routes from './router/index'
import './App.css'
import 'normalize.css'

class App extends Component{

  render() {

    return(
      <Router>
        <Switch>
          <BaseLayout>
            {routes.map((r, key) => (
              <Route
                component={r.component}
                exact={!!r.exact}
                key={key}
                path={r.path}
              />
            ))}
          </BaseLayout>
        </Switch>
      </Router>
    )
  }
}
export default App
