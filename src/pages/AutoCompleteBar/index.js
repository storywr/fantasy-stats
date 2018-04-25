import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Link, Route, Switch, withRouter } from 'react-router-dom'

import Player from '../Player'

import AutoComplete from 'material-ui/AutoComplete'

import { fetchPlayers, selectPlayerNames } from '../../ducks/players'

const Wrapper = styled.div`
  margin-bottom: 36px;
`

export class AutoCompleteBar extends Component {
  componentDidMount() {
    this.props.fetchPlayers()
  }

  state = {
    dataSource: this.props.players
  }

  searchPlayer = (player) => {
    console.log(player)
    this.props.history.push(`/players/${player.id}`)
  }

  render() {
    const dataSourceConfig = {
      text: 'name',
      value: 'id',
    }
   
    return (
      <Wrapper>
        <AutoComplete
          hintText="Type a player's name"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.props.players}
          floatingLabelText="Search Players"
          maxSearchResults={5}
          fullWidth={true}
          onNewRequest={this.searchPlayer}
          dataSourceConfig={dataSourceConfig}
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  players: selectPlayerNames(state),
})

const Connected = connect(mapStateToProps, { fetchPlayers })(AutoCompleteBar)

export default withRouter(Connected)
