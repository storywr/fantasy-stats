import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import history from '../../utils//history'

import Homepage from '../Homepage'
import Players from '../Players'

export const App = () => (
  <Router history={history}>
    <MuiThemeProvider>
      <div id='App'>
        <Switch>
          <Route path='/players' component={Players} />
          <Route path='/' component={Homepage} />
        </Switch>
      </div>
    </MuiThemeProvider>
  </Router>
)

export default App
