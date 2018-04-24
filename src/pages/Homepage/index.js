import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import AutoComplete from 'material-ui/AutoComplete'

import { fetchPlayers, selectPlayerNames } from '../../ducks/players'

const Wrapper = styled.div`
  padding: 0.5rem 4rem;
`

export class Homepage extends Component {
  componentDidMount() {
    this.props.fetchPlayers()
  }

  state = {
    dataSource: this.props.players
  }

  searchPlayer = (player) => {
    console.log(player)
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
export default connect(mapStateToProps, { fetchPlayers })(Homepage)
