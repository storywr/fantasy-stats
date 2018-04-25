import React from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import styled from 'styled-components'

import history from '../../utils//history'

import AutoCompleteBar from '../../containers/AutoCompleteBar'
import MaterialDrawer from '../../containers/MaterialDrawer'

import Player from '../Player'

const Wrapper = styled.div`
  padding: 0 15%;
`

export const App = () => (
  <Router history={history}>
    <MuiThemeProvider>
      <Wrapper>
        <AutoCompleteBar />
        <MaterialDrawer />
        <Switch>
          <Route path='/players/:playerId' component={Player} />
        </Switch>
      </Wrapper>
    </MuiThemeProvider>
  </Router>
)

export default App
