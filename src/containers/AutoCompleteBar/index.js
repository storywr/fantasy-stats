import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { withRouter } from 'react-router-dom'

import AutoComplete from 'material-ui/AutoComplete'

import { fetchPlayers, selectPlayerNames } from '../../ducks/players'

const Wrapper = styled.div`
  body {
    margin: 0px;
  }
  margin-bottom: 16px;
`

export class AutoCompleteBar extends Component {
  componentDidMount() {
    this.props.fetchPlayers()
    this.refs['autocomplete'].focus()
  }

  state = {
    dataSource: this.props.players
  }

  searchPlayer = (player) => {
    this.props.history.push(`/players/${player.id}`)
    this.refs[`autocomplete`].setState({searchText:''})
  }

  render() {
    const dataSourceConfig = {
      text: 'name',
      value: 'id',
    }
   
    return (
      <Wrapper>
        <AutoComplete
          ref={`autocomplete`}
          hintText="Ex. Todd Gurley"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.props.players}
          floatingLabelText="Search Players"
          maxSearchResults={10}
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
