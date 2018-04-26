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

const MobileTableCol = styled(TableRowColumn)`
  @media (max-width: 767px) {
    display: none;
  }
`

export class Draft extends Component {
  componentDidMount() {
    this.props.fetchDraft()
  }

  render() {
    const { isLoading, players } = this.props
    console.log(isLoading)
    console.log(players)
    return (
      <Wrapper>
        {!isLoading &&
          <Table multiSelectable>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Rank</TableHeaderColumn>
                <MobileHeaderCol>Auction</MobileHeaderCol>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <MobileHeaderCol>Postion</MobileHeaderCol>
                <MobileHeaderCol>Team</MobileHeaderCol>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {players.map(player => (
                <TableRow>
                  <TableRowColumn>{player.rank}</TableRowColumn>
                  <MobileTableCol>{player.auction}</MobileTableCol>
                  <TableRowColumn>{player.firstName} {player.lastName}</TableRowColumn>
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
