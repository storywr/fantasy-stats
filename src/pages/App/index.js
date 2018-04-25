import React from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import styled from 'styled-components'

import history from '../../utils//history'

import AutoCompleteBar from '../../containers/AutoCompleteBar'
import MaterialDrawer from '../../containers/MaterialDrawer'

import Draft from '../Draft'
import Player from '../Player'
import Scoring from '../Scoring'

const Wrapper = styled.div`
  padding: 0 10%;
`

export const App = () => (
  <Router history={history}>
    <MuiThemeProvider>
      <Wrapper>
        <AutoCompleteBar />
        <MaterialDrawer />
        <Switch>
          <Route path='/players/:playerId' component={Player} />
          <Route path='/draft' component={Draft} />
          <Route path='/scoring' component={Scoring} />
        </Switch>
      </Wrapper>
    </MuiThemeProvider>
  </Router>
)

export default App
