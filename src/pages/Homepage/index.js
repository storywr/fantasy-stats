import React, { Component } from 'react'
import { connect } from 'react-redux'

import AutoComplete from 'material-ui/AutoComplete'

import { fetchPlayers, selectPlayerNames } from '../../ducks/players'

export class Homepage extends Component {
  componentDidMount() {
    this.props.fetchPlayers()
  }

  state = {
    dataSource: this.props.players
  }

  render() {
    console.log(this.props.players)    
    return (
      <div>
        <AutoComplete
          hintText="Type a player's name"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.props.players}
          floatingLabelText="Search Players"
          maxSearchResults={5}
          fullWidth={true}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  players: selectPlayerNames(state),
})
export default connect(mapStateToProps, { fetchPlayers })(Homepage)
