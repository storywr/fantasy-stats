import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPlayers, selectPlayers } from '../../ducks/players'

export class Homepage extends Component {
  componentDidMount() {
    this.props.fetchPlayers()
  }

  render() {
    const { currentPage, fetchProductSkuList, totalPages } = this.props

    return (
      <div>
        test
      </div>
    )
  }
}

const mapStateToProps = state => ({
  players: selectPlayers(state),
})
export default connect(mapStateToProps, { fetchPlayers })(Homepage)
