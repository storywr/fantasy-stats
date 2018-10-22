import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { fetchDraft, selectIsLoading, selectDraft } from '../../ducks/draft'

const Wrapper = styled.div`
  margin-top: 24px;
`

const TabCol = styled(TableRowColumn)`
  cursor: pointer;
  min-width: 40px;
  width: 40px;
`

const TabHeadCol = styled(TableHeaderColumn)`
  min-width: 40px;
  width: 40px;
`

export class Draft extends Component {
  componentDidMount() {
    this.props.fetchDraft()
  }

  handleSelectPlayer = (idx) => {
    const player = this.props.players[idx]
    this.props.history.push(`/players/${player.id}`)
  }

  render() {
    const { isLoading, players } = this.props
    console.log(isLoading)
    console.log(players)
    return (
      <Wrapper>
        {!isLoading &&
          <Table fixedHeader={true} height='400px' bodyStyle={{overflowX:'visible'}} onRowSelection={this.handleSelectPlayer}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TabHeadCol>Rank</TabHeadCol>
                <TabHeadCol>Auction</TabHeadCol>
                <TabHeadCol>Name</TabHeadCol>
                <TabHeadCol>Postion</TabHeadCol>
                <TabHeadCol>Team</TabHeadCol>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover>
              {players.map(player => (
                <TableRow>
                  <TabCol>{player.rank}</TabCol>
                  <TabCol>{player.auction}</TabCol>
                  <TabCol>{player.firstName} {player.lastName}</TabCol>
                  <TabCol>{player.position}</TabCol>
                  <TabCol>{player.teamAbbr}</TabCol>
                </TableRow>
              ))}
            </TableBody>
        </Table>
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  players: selectDraft(state)
})
export default connect(mapStateToProps, { fetchDraft })(Draft)
