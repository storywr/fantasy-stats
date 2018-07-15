import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styled from 'styled-components'

import history from '../../utils//history'

import AutoCompleteBar from '../../containers/AutoCompleteBar'
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

  background-color: ${p => p.nightMode ? '#424242' : '#F5F5F5'}
  min-height: 100vh;

  padding: 0 7%;
`

export default class App extends Component {

  state = {
    nightMode: true
  }

  onToggle = () => this.setState({ nightMode: !this.state.nightMode })

  render() {
    return (
      <Router history={history}>
        <MuiThemeProvider muiTheme={this.state.nightMode && getMuiTheme(darkBaseTheme)}>
          <NavigationBar
            nightMode={this.state.nightMode}
            onToggle={this.onToggle}
          />
          <Wrapper nightMode={this.state.nightMode}>
            <AutoCompleteBar muiTheme={this.state.nightMode && getMuiTheme(darkBaseTheme)}/>
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
  }
}
