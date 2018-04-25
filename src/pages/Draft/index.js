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
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Rank</TableHeaderColumn>
                <TableHeaderColumn>Auction</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Postion</TableHeaderColumn>
                <TableHeaderColumn>Team</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map(player => (
                <TableRow>
                  <TableRowColumn>{player.rank}</TableRowColumn>
                  <TableRowColumn>{player.auction}</TableRowColumn>
                  <TableRowColumn>{player.firstName} {player.lastName}</TableRowColumn>
                  <TableRowColumn>{player.position}</TableRowColumn>
                  <TableRowColumn>{player.teamAbbr}</TableRowColumn>
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
