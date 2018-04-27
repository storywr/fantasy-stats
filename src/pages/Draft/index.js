import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

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

const MaterialCard = styled(Card)`
  margin: 40px 0;
`

const MobileHeaderCol = styled(TableHeaderColumn)`
  @media (max-width: 767px) {
    display: none;
  }
`

const TableCol = styled(TableRowColumn)`
  cursor: pointer;
`

const MobileTableCol = styled(TableCol)`
  @media (max-width: 767px) {
    display: none;
  }
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
          <Table onRowSelection={this.handleSelectPlayer}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Rank</TableHeaderColumn>
                <MobileHeaderCol>Auction</MobileHeaderCol>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <MobileHeaderCol>Postion</MobileHeaderCol>
                <MobileHeaderCol>Team</MobileHeaderCol>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover>
              {players.map(player => (
                <TableRow>
                  <TableCol>{player.rank}</TableCol>
                  <MobileTableCol>{player.auction}</MobileTableCol>
                  <TableCol>{player.firstName} {player.lastName}</TableCol>
                  <MobileTableCol>{player.position}</MobileTableCol>
                  <MobileTableCol>{player.teamAbbr}</MobileTableCol>
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
