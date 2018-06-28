import React from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import styled from 'styled-components'

import history from '../../utils//history'

import AutoCompleteBar from '../../containers/AutoCompleteBar'
import MaterialDrawer from '../../containers/MaterialDrawer'
import NavigationBar from '../../components/NavigationBar'

import Advanced from '../Advanced'
import BaseStats from '../BaseStats'
import Draft from '../Draft'
import News from '../News'
import Player from '../Player'
import Scoring from '../Scoring'

const Wrapper = styled.div`
  @media (max-width: 767px) {
    padding: 0 3%;
  }

  padding: 0 7%;
`

export const App = () => (
  <Router history={history}>
    <MuiThemeProvider>
      <NavigationBar />
      <Wrapper>
        <AutoCompleteBar />
        <Switch>
          <Route path='/players/:playerId' component={Player} />
          <Route path='/advanced' component={Advanced} />
          <Route path='/stats' component={BaseStats} />
          <Route path='/draft' component={Draft} />
          <Route path='/scoring' component={Scoring} />
          <Route component={News} />
        </Switch>
      </Wrapper>
    </MuiThemeProvider>
  </Router>
)

export default App
